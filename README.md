# MADDI — Sitio web (Inicio · Foro · Nosotros · Legal)

## Última actualización: ahora sí queda fijo de verdad

El cuadro se movía con la página en pantallas angostas porque había una regla mía (`@media (max-width: 860px)`) que a propósito lo pasaba de `position: fixed` a `position: static` por debajo de esa medida, para que no tapara contenido en celular. Esa regla era la que hacía que "corriera" con la página.

La saqué: ahora **`position: fixed` se mantiene siempre**, en cualquier tamaño de pantalla. En pantallas chicas simplemente se achica un poco más (128px de ancho en vez de 148px) para ocupar menos espacio, pero nunca deja de estar fijo.

---

## Actualización anterior: cuadro de compras recientes, más chico y en grilla

Achiqué el cuadro fijo de "Compras recientes" (arriba a la izquierda) y lo pasé de una lista vertical de 4 nombres a una **grilla de 9 avatares en 3 filas x 3 columnas**, solo con el busto de cada comprador — el nombre y qué compró quedaron como tooltip (aparece al pasar el mouse por arriba), para que ocupe bastante menos espacio.

**Ojo:** cuántos compradores se muestran en total depende de cuántos devuelva el módulo "Recent Payments" configurado en tu panel de Tebex — si ahí está limitado a menos de 9, la grilla se ve con algunos casilleros vacíos en vez de las 9. Si querés que siempre haya 9, revisá la configuración de ese módulo en Tebex (Escaparate/Sidebar) y subí el límite si existe esa opción.

Revisé el resto del Inicio (hero, IP, zonas) y no hacía falta reacomodar nada más: al ser fijo y angosto (148px), en pantallas de escritorio no llega a superponerse con el contenido centrado del resto de las secciones.

---

## Última actualización anterior: compras recientes reales (Tebex)

### Se sacó la sección de abajo, se agregó un cuadro fijo arriba a la izquierda
Saqué por completo la vieja sección "Últimos colaboradores" del final de la página (la de los avatares de ejemplo y la nota "esta tabla va a fncionar cuando esten los kits lpm"). En su lugar, arriba a la izquierda, apenas debajo del header, hay un cuadro fijo (`<aside class="recent-buyers">`) que **siempre está visible sin necesidad de scrollear**, con los últimos compradores reales de tu tienda.

### Cómo funciona
Usa el **Public Token** de Tebex que me pasaste (`Integrations → API Keys` en tu panel), contra el endpoint público del sidebar:
```
GET https://headless.tebex.io/api/accounts/{token}/sidebar
```
De ahí toma el módulo `recent_payments` (nombre del comprador + qué compró) y arma la lista. Es 100% cliente — sin backend, sin exponer nada sensible (el Public Token está pensado para vivir en el navegador). Se refresca solo cada 90 segundos.

**Importante:** si el cuadro no aparece en tu sitio, lo más probable es que el módulo **"Recent Payments"** no esté habilitado como sidebar module en tu tienda — se configura desde el panel de Tebex, en la sección de Escaparate/Sidebar. Si no está ahí, decime y lo buscamos juntos. Mientras no haya compras (o el módulo no esté habilitado), el cuadro se queda oculto — no muestra nada vacío ni roto.

### Responsive
En pantallas grandes queda flotando fijo en la esquina superior izquierda. En celular (menos de 860px), como taparía contenido, se convierte en un bloque normal arriba de la página en vez de quedar fijo.

### Todavía pendiente: la barra de "Objetivos de la comunidad"
Me pasaste antes una captura de la meta "500 USD" de Tebex — esa es otra función (`community_goal`), separada de esta. La dejé para el próximo paso si la querés: mismo mecanismo (mismo endpoint, mismo token), solo falta que me confirmes dónde la querés mostrar y la agrego.

---

## Configuración de Tebex
El Public Token está en `main.js`, variable `TEBEX_PUBLIC_TOKEN`. Si alguna vez cambiás de tienda o rotás el token, actualizalo ahí.

## Estructura (la que armaste vos)
```
index.html
style.css
main.js
img/  (logo, banner, fondo, íconos, bustos del equipo, video del inicio, etc.)
pages/
  foro.html
  nosotros.html
  legal.html
```

## Cómo verlo
Abrí `index.html` directamente, o mejor: serví la carpeta con un servidor local (por ejemplo "Live Server" de VS Code) para que las fuentes, el video y las llamadas a las APIs funcionen sin restricciones de `file://`.

## Jugadores online reales
`main.js` consulta la API pública gratuita mcsrvstat.us apuntando a `SERVER_IP = "maddi.lat"`, cada 60 segundos.

## Formulario del Foro
`pages/foro.html` usa FormSubmit (formsubmit.co) para mandar el mensaje a `maddisoporte@gmail.com`, con asunto (Reportar abuso / Reportar problema / Consultas). La primera vez que alguien lo envíe, FormSubmit manda un correo de activación que hay que confirmar una sola vez.

## Pendiente
1. Confirmar que el sidebar module "Recent Payments" esté habilitado en Tebex para que el cuadro de compras recientes muestre datos.
2. Decidir si sumamos también la barra de "Objetivos de la comunidad" y dónde.
3. Reemplazar el placeholder de "modalidad destacada" en `index.html` por una captura real del lobby/arena.
4. Imágenes sueltas en `img/` (`discord.jpeg`, `lobby.jpeg`, `spawn.jpeg`, `evento.webp`, `discorsforo.webp`, `logo.jpeg`) todavía sin usar en ninguna página.

## Cómo subir esto a tu repo
Este zip no incluye la carpeta `.git`. Los archivos que cambiaron hoy son `index.html`, `style.css` y `main.js`. Copialos sobre tu repo local y:
```
git add index.html style.css main.js
git commit -m "feat: compras recientes reales de Tebex, cuadro fijo arriba a la izquierda"
git push
```
