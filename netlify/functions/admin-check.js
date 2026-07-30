exports.handler = async function (event) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  const given = event.headers['x-admin-password'];
  if (!adminPassword) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Falta configurar ADMIN_PASSWORD en Netlify.' }) };
  }
  if (given !== adminPassword) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Contraseña incorrecta' }) };
  }
  return { statusCode: 200, body: JSON.stringify({ ok: true }) };
};
