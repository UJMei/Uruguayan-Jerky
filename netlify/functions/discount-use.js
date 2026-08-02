const { getStore } = require('@netlify/blobs');

// Esta función la llama la propia web (sin contraseña) apenas un cliente
// termina un pedido con un código aplicado, para desactivarlo automáticamente.
exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { code } = JSON.parse(event.body);
    if (!code) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Falta el código' }) };
    }
    const store = getStore('jerky-data');
    let discounts = await store.get('discounts', { type: 'json' });
    if (!discounts || typeof discounts !== 'object') discounts = {};

    const key = code.toUpperCase();
    if (discounts[key] && discounts[key].singleUse) {
      discounts[key].active = false;
      await store.setJSON('discounts', discounts);
    }

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
