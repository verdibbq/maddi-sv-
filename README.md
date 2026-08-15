# MADDI — Sitio web (Inicio · Foro · Nosotros)

## Última actualización

### 1. Fondo sin transparencia + efectos violeta/celeste
Saqué la transparencia: la imagen de batalla ahora se ve a opacidad completa (antes estaba atenuada). La viñeta que va encima se aligeró bastante, solo lo justo para que el texto siga siendo legible y para que la imagen se funda suave con el `--void` al final de la página.

Encima de la imagen agregué:
- **Estallidos de rayos violetas**: dos capas independientes de destello (`.bg-scene__lightning--a` y `--b`), cada una con su propio timing, así no siempre estalla en el mismo punto ni al mismo tiempo — se siente más como una tormenta real que como un parpadeo repetitivo.
- **Destellos violeta/celeste sobre las armaduras**: 6 puntos de brillo pulsante (`.spark`) ubicados sobre las zonas donde la imagen ya tenía brillos morados (espadas/armaduras de la izquierda) y celestes (armadura de diamante de la derecha). Titilan con duraciones y demoras distintas para que no se sincronicen.

Todo respeta `prefers-reduced-motion` (se apaga solo si el usuario tiene activado "reducir movimiento").

### 2. Logo del hero con movimiento
El logo grande "MADDI" del inicio ahora flota suavemente arriba y abajo, con el brillo violeta pulsando en sincro (`@keyframes logo-float` en `style.css`). Sutil, no una animación grande — para que el hero se sienta vivo sin distraer.

### 3. Título e IP junto al logo del header
Al lado del logo chico del header (en las 3 páginas) ahora se ve:
- **MaddiMC** — como título
- **maddi.lat** — la IP, debajo, más chica y tenue

En pantallas muy angostas (menos de 400px) el texto de la IP se oculta para que no se amontone con el botón de menú — queda solo "MaddiMC".

---

## Estructura (la que armaste vos)
```
index.html
style.css
main.js
img/
  logo.webp
  banner.webp
  fondol.webp
  icon-tienda.webp
  zonas-banner.webp
  spawninicio.webp
  ketaboi.webp
  rk.webp
  pure.webp
pages/
  foro.html
  nosotros.html
```

## Historial: qué se arregló antes
- Rutas rotas al reorganizar carpetas (`images/` → `img/`, `css/style.css` → `style.css`, `js/main.js` → `main.js`, enlaces `../` desde `pages/`).
- Bug de z-index que hacía invisible el fondo (`body` no formaba su propio stacking context) — arreglado con `position: relative; z-index: 0;` en `body`.
- Vitrina de "Nosotros" rediseñada para lucir mejor los bustos de KetaBoi, rk y Pure (halo de color, etiqueta de rango, pedestal).
- Se probó y se sacó una lanza animada bajo el logo — no quedaba bien, se revirtió por completo.

No toqué el contenido ni la estructura de carpetas que armaste — solo estilos, efectos y estas correcciones puntuales.

## Cómo verlo
Abrí `index.html` directamente, o mejor: serví la carpeta con un servidor local (por ejemplo "Live Server" de VS Code) para que las fuentes y el estado del servidor funcionen sin restricciones de `file://`.

## Jugadores online reales (ya funciona)
`main.js` consulta la API pública gratuita mcsrvstat.us apuntando a `SERVER_IP = "maddi.lat"`, cada 60 segundos, sin backend propio.

## Formulario del Foro (envío a maddisoporte@gmail.com)
`pages/foro.html` usa FormSubmit (formsubmit.co) para mandar el mensaje directo a `maddisoporte@gmail.com`, con selector de asunto (Reportar abuso / Reportar problema / Consultas). **La primera vez** que alguien lo envíe, FormSubmit manda un correo de activación a esa casilla que hay que confirmar una sola vez.

## Tabla de "compras recientes"
Sigue siendo un placeholder visual (con nota abajo en el HTML). Mostrar compras reales de Tebex necesita la Tebex Headless API o un webhook — lo conectamos cuando tu tienda esté lista.

## Pendiente antes de publicar
1. Reemplazar los `href="#"` de "Tienda" (en `index.html`, `pages/foro.html`, `pages/nosotros.html`) por la URL real de tu Storefront de Tebex.
2. Confirmar el correo de activación de FormSubmit.
3. Revisar que `SERVER_IP` en `main.js` coincida con la IP final.
4. Reemplazar el placeholder de "modalidad destacada" en `index.html` por una captura real del lobby/arena.
5. Conseguir un busto propio para ElElipa en el mismo estilo que los demás, si querés que la vitrina de Nosotros quede 100% pareja.

## Cómo subir esto a tu repo
Este zip no incluye la carpeta `.git`. Los archivos que cambiaron hoy son `style.css`, `index.html`, `pages/foro.html` y `pages/nosotros.html`. Copialos sobre tu repo local y:
```
git add style.css index.html pages/foro.html pages/nosotros.html
git commit -m "feat: fondo sin transparencia con rayos/destellos, logo animado, titulo+IP en header"
git push
```
