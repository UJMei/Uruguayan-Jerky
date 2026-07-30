const { getStore } = require('@netlify/blobs');

// Productos iniciales: se usan la primera vez, antes de que edites nada desde el panel.
const DEFAULT_PRODUCTS = [
  {
    id: '50g',
    kicker: '50 g',
    name: 'Jerky 50g',
    desc: '¿Todavía no lo probaste? Tamaño ideal si es la primera vez.',
    price: 240,
    badge: '≈ 24 g de proteína',
    img: ''
  },
  {
    id: '100g',
    kicker: 'Más pedido · 100 g',
    name: 'Jerky 100g',
    desc: 'El tamaño perfecto para la semana.',
    price: 380,
    badge: '≈ 49 g de proteína',
    img: ''
  },
  {
    id: '200g',
    kicker: 'Pack ahorro · 200 g',
    name: 'Jerky 200g',
    desc: '¿Te quedaste con ganas de más? El pack ahorro es ideal para vos.',
    price: 690,
    badge: '≈ 98 g de proteína',
    img: ''
  }
];

exports.handler = async function () {
  try {
    const store = getStore('jerky-data');
    let products = await store.get('products', { type: 'json' });
    if (!products) {
      products = DEFAULT_PRODUCTS;
      await store.setJSON('products', products);
    }
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      body: JSON.stringify(products)
    };
  } catch (err) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(DEFAULT_PRODUCTS)
    };
  }
};
