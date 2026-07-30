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
    const { id, dataUrl } = JSON.parse(event.body);
    if (!id || !dataUrl || !dataUrl.startsWith('data:')) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Datos inválidos' }) };
    }

    const match = dataUrl.match(/^data:(.+);base64,(.*)$/);
    if (!match) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Formato de imagen inválido' }) };
    }
    const contentType = match[1];
    const base64Data = match[2];
    const buffer = Buffer.from(base64Data, 'base64');

    const key = `image-${id}-${Date.now()}`;
    const store = getStore('jerky-images');
    await store.set(key, buffer, { metadata: { contentType } });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: `/.netlify/functions/image-get?key=${key}` })
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
