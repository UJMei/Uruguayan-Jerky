const { getStore } = require('@netlify/blobs');

function escapeText(str) {
  return String(str || '').slice(0, 600);
}

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const body = JSON.parse(event.body);
    const name = escapeText(body.name).trim();
    const comment = escapeText(body.comment).trim();
    const rating = parseInt(body.rating, 10);
    const honeypot = body.website; // campo trampa para bots, debe venir vacío

    if (honeypot) {
      // Probablemente un bot: respondemos ok pero no guardamos nada.
      return { statusCode: 200, body: JSON.stringify({ ok: true }) };
    }

    if (!name || !comment || isNaN(rating) || rating < 1 || rating > 5) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Faltan datos o el puntaje es inválido (1 a 5).' }) };
    }

    const store = getStore('jerky-data');
    let reviews = await store.get('reviews', { type: 'json' });
    if (!Array.isArray(reviews)) reviews = [];

    const review = {
      id: 'rev-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7),
      name: name.slice(0, 60),
      rating,
      comment: comment.slice(0, 500),
      date: new Date().toISOString()
    };
    reviews.push(review);
    await store.setJSON('reviews', reviews);

    return { statusCode: 200, body: JSON.stringify({ ok: true, review }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
