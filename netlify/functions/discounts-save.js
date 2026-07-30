const { getStore } = require('@netlify/blobs');

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  const given = event.headers['x-admin-password'];
  if (!adminPassword || given !== adminPassword) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Contraseña incorrecta' }) };
  }

  try {
    const discounts = JSON.parse(event.body);
    if (typeof discounts !== 'object' || discounts === null || Array.isArray(discounts)) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Formato inválido' }) };
    }
    const store = getStore('jerky-data');
    await store.setJSON('discounts', discounts);
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
