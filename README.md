# MADDI — Sitio Web

Sitio oficial del servidor de Minecraft **MADDI** (Full PvP). Incluye página de inicio, foro de novedades y contacto, sección "Nosotros" e información legal.

## Estructura

```
index.html
style.css
main.js
img/
pages/
  foro.html
  nosotros.html
  legal.html
```

Un solo archivo de estilos (`style.css`) y un solo script (`main.js`), usados por las cuatro páginas.

## Páginas

- **Inicio** (`index.html`) — presentación del servidor, IP copiable, estado en vivo, modalidad destacada y acceso a la tienda.
- **Foro** (`pages/foro.html`) — novedades, eventos y actualizaciones, más un formulario de contacto con el staff.
- **Nosotros** (`pages/nosotros.html`) — el equipo detrás del proyecto y qué buscamos con MADDI.
- **Legal** (`pages/legal.html`) — aviso legal, derechos de autor y condiciones de uso.

## Funcionalidades

- **Estado del servidor en vivo**: `main.js` consulta la API pública de mcsrvstat.us para mostrar jugadores online y estado real, sin necesitar backend propio.
- **Copiar IP** con un clic.
- **Formulario de contacto** del Foro, con selector de motivo (Reportar abuso / Reportar problema / Consultas). Se envía mediante un servicio externo de formularios; la primera vez que alguien lo use, hay que confirmar el correo de destino desde la casilla configurada.
- **Fondo animado** con destellos de rayos y partículas violeta/celeste, respetando `prefers-reduced-motion`.

## Cómo verlo

Abrí `index.html` directamente en el navegador, o serví la carpeta con un servidor local (por ejemplo, la extensión "Live Server" de VS Code) para que las fuentes y el estado del servidor funcionen sin restricciones de `file://`.

## Pendiente antes de publicar

1. Reemplazar los `href="#"` de "Tienda" (en `index.html`, `pages/foro.html`, `pages/nosotros.html`) por la URL real del Storefront de Tebex.
2. Confirmar el correo de activación del formulario de contacto.
3. Revisar que la IP configurada en `main.js` (`SERVER_IP`) coincida con la IP final del servidor.
4. Reemplazar la imagen de "modalidad destacada" en `index.html` por una captura real del lobby o la arena.
5. Conseguir un busto propio para ElElipa en el mismo estilo que el resto del staff, en la sección Nosotros.
6. Completar la tabla de "compras recientes" cuando la tienda de Tebex esté lista (requiere la Tebex Headless API o un webhook).

## Créditos

**MADDI** — servidor y marca.
Diseño y desarrollo web por **VerdiCode**.

MADDI no está afiliado con Mojang AB ni con Microsoft.
