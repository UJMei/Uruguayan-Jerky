const { getStore } = require('@netlify/blobs');

exports.handler = async function (event) {
  const key = event.queryStringParameters && event.queryStringParameters.key;
  if (!key) {
    return { statusCode: 400, body: 'Falta el parámetro key' };
  }

  try {
    const store = getStore('jerky-images');
    const result = await store.getWithMetadata(key, { type: 'arrayBuffer' });
    if (!result) {
      return { statusCode: 404, body: 'Imagen no encontrada' };
    }
    const contentType = (result.metadata && result.metadata.contentType) || 'image/jpeg';
    return {
      statusCode: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable'
      },
      body: Buffer.from(result.data).toString('base64'),
      isBase64Encoded: true
    };
  } catch (err) {
    return { statusCode: 500, body: 'Error al leer la imagen' };
  }
};
