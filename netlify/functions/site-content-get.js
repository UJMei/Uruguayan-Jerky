const { getStore } = require('@netlify/blobs');

const DEFAULT_CONTENT = {
  heroLead: "Carne de vaca deshidratada, con toda la paciencia del mundo. Solo carne y sal, sin conservantes. Como debe ser.",
  nutritionTitle: "Pensado para nutrir, no solo para picar.",
  macrosText: "Macronutrientes: alto en proteína, sin carbohidratos y sin azúcares agregados. Un snack que suma y sacia.",
  whyBestText: "¿Por qué es el mejor snack del mundo? No necesita heladera, no se derrite, no lo tenés que calentar, no mancha, lo podés llevar a todos lados y comer a toda hora. Además de ser ultra saciante, evita que caigas en alimentos ultra procesados.",
  productsIntro: "Elegí tu tamaño ideal. Todos se preparan especialmente para cada pedido, así nos aseguramos de que la producción sea fresca — si algo está agotado, te avisamos antes de confirmar el pedido.",
  leadNotice: "Los pedidos se toman con mínimo 72 horas de anticipación: al ser producción 100% natural y fresca, no tenemos stock guardado de antemano.",
  whatsappNumber: "59894310693",
  instagramHandle: "uruguayanjerky",
  bankInfo: { plataforma: "Prex", titular: "Mei Lee Anselmi", numero: "19727254" },
  faq: [
    { q: "¿Cómo se conserva el jerky?", a: "No necesita heladera. Guardalo en un lugar seco y fresco, y listo para comer cuando quieras." },
    { q: "¿Cuánto tarda en llegar mi pedido?", a: "Al ser producción 100% fresca y natural, el pedido se comienza a realizar una vez lo hayas pedido y tiene una demora mínima de 72hs." },
    { q: "¿Qué formas de pago aceptan?", a: "Transferencia bancaria (Prex), Mercado Pago (con opción de cuotas en tarjeta de crédito), o coordinás todo directo por WhatsApp." },
    { q: "¿A qué zonas hacen envíos?", a: "Cubrimos todo Montevideo, dividido en 3 zonas según el barrio. El costo se calcula automáticamente al elegir tu barrio en el carrito, y es gratis a partir de cierto monto de compra. Si sos del interior, escribinos por WhatsApp que tratamos de hacértelo llegar." },
    { q: "¿Tiene conservantes o aditivos?", a: "No. Es 100% carne y sal, sin conservantes artificiales ni azúcares agregados." },
    { q: "¿Cuánto dura el producto?", a: "Recomendamos consumirlo dentro de las 2 a 3 semanas. Al ser un producto 100% natural y sin conservantes, no tiene la misma duración que un jerky industrial." }
  ],
  shippingZones: [
    { key: "zona1", label: "Zona 1", cost: 180, freeFrom: 1000, neighborhoods: ["Ciudad Vieja","Centro","Cordón","Barrio Sur","Palermo","Parque Rodó","Pocitos","Punta Carretas","Aguada","La Comercial"] },
    { key: "zona2", label: "Zona 2", cost: 230, freeFrom: 1300, neighborhoods: ["Punta Gorda","Malvín","Malvín Norte","Las Canteras","Maroñas","Flor de Maroñas","Ituzaingó","Jardines del Hipódromo","Las Acacias","Piedras Blancas","Manga"] },
    { key: "zona3", label: "Zona 3", cost: 300, freeFrom: 1600, neighborhoods: ["Carrasco","Punta de Rieles","Bella Italia","Villa García","Toledo Chico","Colón","Lezica","Paso de la Arena","La Paloma","Villa del Cerro"] }
  ]
};

exports.handler = async function () {
  try {
    const store = getStore('jerky-data');
    let content = await store.get('site-content', { type: 'json' });
    if (!content) {
      content = DEFAULT_CONTENT;
      await store.setJSON('site-content', content);
    }
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      body: JSON.stringify(content)
    };
  } catch (err) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(DEFAULT_CONTENT)
    };
  }
};
