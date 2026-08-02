const { getStore } = require('@netlify/blobs');

exports.handler = async function () {
  try {
    const store = getStore('jerky-data');
    let reviews = await store.get('reviews', { type: 'json' });
    if (!reviews) {
      reviews = [];
      await store.setJSON('reviews', reviews);
    }
    // más nuevas primero
    reviews.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      body: JSON.stringify(reviews)
    };
  } catch (err) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([])
    };
  }
};
