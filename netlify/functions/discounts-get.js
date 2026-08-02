const { getStore } = require('@netlify/blobs');

const DEFAULT_DISCOUNTS = {
  'BIENVENIDA': { percent: 10, freeShipping: true, label: '10% off + envío gratis por tu primera compra', active: true, singleUse: false }
};

exports.handler = async function () {
  try {
    const store = getStore('jerky-data');
    let discounts = await store.get('discounts', { type: 'json' });
    if (!discounts) {
      discounts = DEFAULT_DISCOUNTS;
      await store.setJSON('discounts', discounts);
    }
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      body: JSON.stringify(discounts)
    };
  } catch (err) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(DEFAULT_DISCOUNTS)
    };
  }
};
