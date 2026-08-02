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
    const { id } = JSON.parse(event.body);
    if (!id) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Falta el id de la reseña' }) };
    }
    const store = getStore('jerky-data');
    let reviews = await store.get('reviews', { type: 'json' });
    if (!Array.isArray(reviews)) reviews = [];
    reviews = reviews.filter(r => r.id !== id);
    await store.setJSON('reviews', reviews);
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
