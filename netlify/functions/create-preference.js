// Esta función corre en el servidor de Netlify (no en el navegador),
// así que tu Access Token de Mercado Pago queda oculto y seguro.
//
// CONFIGURACIÓN NECESARIA (una sola vez):
// 1. Andá a tu cuenta de Mercado Pago > Tu negocio > Configuración > Credenciales.
// 2. Copiá el "Access Token" de PRODUCCIÓN (no el de prueba).
// 3. En Netlify: Site settings > Environment variables > agregá:
//    MP_ACCESS_TOKEN = el token que copiaste
// 4. Volvé a desplegar el sitio para que tome la variable.

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const token = process.env.MP_ACCESS_TOKEN;
  if (!token) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Falta configurar MP_ACCESS_TOKEN en Netlify.' })
    };
  }

  try {
    const { items } = JSON.parse(event.body);

    if (!items || !Array.isArray(items) || items.length === 0) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Sin items' }) };
    }

    const preference = {
      items: items.map(it => ({
        title: it.title,
        quantity: it.quantity,
        unit_price: it.unit_price,
        currency_id: 'UYU'
      })),
      back_urls: {
        success: `${process.env.URL || ''}/?pago=exito`,
        failure: `${process.env.URL || ''}/?pago=fallido`,
        pending: `${process.env.URL || ''}/?pago=pendiente`
      },
      auto_return: 'approved'
    };

    const resp = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(preference)
    });

    const data = await resp.json();

    if (!resp.ok) {
      return { statusCode: resp.status, body: JSON.stringify({ error: data }) };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ init_point: data.init_point })
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
