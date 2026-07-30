# Panel de administración — Uruguayan Jerky

## Qué es
`admin.html` es una página privada (no aparece en el menú ni en Google) desde
donde podés agregar, editar y eliminar productos y códigos de descuento sin
tocar código. Los cambios se reflejan al instante en la web principal.

## Configuración (una sola vez)

1. Subí este proyecto completo a Netlify (arrastrando la carpeta, o conectado a un repo de GitHub).
2. En Netlify: **Site settings → Environment variables → Add a variable**
   - Key: `ADMIN_PASSWORD`
   - Value: la contraseña que quieras usar para entrar al panel (elegí una que solo sepas vos).
3. Volvé a desplegar el sitio (Netlify lo hace solo si conectaste un repo; si lo subiste a mano, hacé "Trigger deploy" o volvé a arrastrar la carpeta).

## Cómo usarlo

- Entrá a `tusitio.netlify.app/admin.html` (o `tudominio.com/admin.html` una vez que tengas dominio propio).
- Ingresá la contraseña que configuraste.
- Ahí podés:
  - **Productos:** agregar nuevos (nombre, descripción, precio, foto, dato destacado como "≈ 49 g de proteína" — dejalo vacío si no aplica, por ejemplo para yogures o mermeladas), editarlos o eliminarlos.
  - **Códigos de descuento:** crear códigos con % de descuento y/o envío gratis, editarlos o eliminarlos.
- Los cambios quedan guardados en la nube de Netlify (Netlify Blobs) — no se pierden, y los ve cualquiera que entre a tu web, al instante.

## Seguridad

- La contraseña viaja protegida (HTTPS) y nunca queda visible en el código del sitio.
- Igualmente, no compartas el link de `/admin.html` públicamente, y elegí una
  contraseña que no uses en otro lado.
- Si en algún momento creés que alguien más la sabe, cambiala en Netlify
  (Environment variables) y volvé a desplegar — la vieja deja de funcionar al toque.

## Nota técnica

Este panel depende de "Netlify Functions" y "Netlify Blobs", que ya están
incluidos y configurados en este proyecto (carpeta `netlify/functions` y
`package.json`). No hay que instalar nada aparte: Netlify lo resuelve solo
al desplegar.
