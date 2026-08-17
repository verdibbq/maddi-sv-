/* ==========================================================================
   MADDI — main.js
   - Menú móvil
   - Partículas del header (pétalos)
   - Copiar IP
   - Jugadores online reales (API pública mcsrvstat.us, sin backend propio)
   - Envío del formulario de Foro
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- Configuración del servidor ---------- */
  // Cambiá esto si la IP pública final es distinta.
  const SERVER_IP = "maddi.lat";

  /* ---------- Configuración de Tebex ----------
     Public Token de la tienda (Integrations → API Keys en el panel de Tebex).
     Es seguro tenerlo visible en el navegador: solo permite LEER datos
     públicos de la tienda (no permite cobrar ni modificar nada).
  */
  const TEBEX_PUBLIC_TOKEN = "148mi-c8357ac767f14dac0f175fd7ad5a618a28c68bd0";

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str ?? "";
    return div.innerHTML;
  }

  async function fetchTebexSidebar() {
    try {
      const res = await fetch(`https://headless.tebex.io/api/accounts/${TEBEX_PUBLIC_TOKEN}/sidebar`);
      if (!res.ok) throw new Error("Respuesta no válida del sidebar de Tebex");
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      console.warn("No se pudo obtener información de Tebex:", err);
      return [];
    }
  }

  /* ---------- Menú móvil ---------- */
  const toggle = document.querySelector(".nav__toggle");
  const links = document.querySelector(".nav__links");
  if (toggle && links) {
    const setMenu = (open) => {
      links.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
      document.body.classList.toggle("nav-open", open);
    };

    toggle.addEventListener("click", () => {
      setMenu(!links.classList.contains("is-open"));
    });

    links.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenu(false));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setMenu(false);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 860) setMenu(false);
    });
  }

  /* ---------- Partículas flotantes del header ---------- */
  const field = document.querySelector(".hero__particles");
  if (field && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const PETAL_COUNT = 22;
    for (let i = 0; i < PETAL_COUNT; i++) {
      const petal = document.createElement("span");
      petal.className = "petal";
      const size = 6 + Math.random() * 8;
      petal.style.width = `${size}px`;
      petal.style.height = `${size}px`;
      petal.style.left = `${Math.random() * 100}%`;
      petal.style.setProperty("--drift", `${(Math.random() * 120 - 60).toFixed(0)}px`);
      petal.style.animationDuration = `${9 + Math.random() * 10}s`;
      petal.style.animationDelay = `${Math.random() * 12}s`;
      field.appendChild(petal);
    }
  }

  /* ---------- Copiar IP ---------- */
  const copyBtn = document.querySelector("[data-copy-ip]");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(SERVER_IP);
        copyBtn.dataset.copied = "true";
        const original = copyBtn.textContent;
        copyBtn.textContent = "¡Copiada!";
        setTimeout(() => {
          copyBtn.textContent = original;
          copyBtn.dataset.copied = "false";
        }, 1800);
      } catch (err) {
        console.error("No se pudo copiar la IP", err);
      }
    });
  }

  /* ---------- Jugadores online reales ----------
     Usa la API pública y gratuita de mcsrvstat.us (sin API key, con CORS
     habilitado), así el conteo es real sin necesitar backend propio.
     Docs: https://api.mcsrvstat.us
  */
  const onlineEl = document.querySelector("[data-online-count]");
  const statusDot = document.querySelector("[data-status-dot]");
  const statusLabel = document.querySelector("[data-status-label]");
  const pingEl = document.querySelector("[data-ping]");

  async function fetchServerStatus() {
    if (!onlineEl && !statusDot) return;
    try {
      const res = await fetch(`https://api.mcsrvstat.us/3/${SERVER_IP}`);
      if (!res.ok) throw new Error("Respuesta no válida de mcsrvstat.us");
      const data = await res.json();

      if (data.online) {
        if (onlineEl) onlineEl.textContent = `${data.players?.online ?? 0} / ${data.players?.max ?? "-"}`;
        if (statusDot) statusDot.classList.remove("status-dot--off");
        if (statusLabel) statusLabel.textContent = "Servidor online";
        if (pingEl) pingEl.textContent = data.debug?.ping ? "En línea" : "En línea";
      } else {
        if (onlineEl) onlineEl.textContent = "0 / -";
        if (statusDot) statusDot.classList.add("status-dot--off");
        if (statusLabel) statusLabel.textContent = "Servidor offline";
        if (pingEl) pingEl.textContent = "—";
      }
    } catch (err) {
      console.warn("No se pudo consultar el estado del servidor:", err);
      if (onlineEl) onlineEl.textContent = "—";
      if (statusLabel) statusLabel.textContent = "Sin datos";
    }
  }

  fetchServerStatus();
  setInterval(fetchServerStatus, 60000); // refresca cada 60s

  /* ---------- Formulario de Foro (Reportar abuso / problema / consultas) ----------
     Se envía a maddisoporte@gmail.com usando FormSubmit (https://formsubmit.co),
     un servicio gratuito que reenvía formularios HTML por correo sin backend
     propio. La PRIMERA vez que alguien envíe el formulario, FormSubmit manda
     un correo de confirmación a maddisoporte@gmail.com que hay que aprobar
     una sola vez para activar el buzón.
  */
  const form = document.querySelector("[data-contact-form]");
  if (form) {
    const statusBox = form.querySelector("[data-form-status]");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector("button[type='submit']");
      submitBtn.disabled = true;
      submitBtn.textContent = "Enviando...";

      try {
        const res = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" }
        });

        if (res.ok) {
          statusBox.textContent = "Tu mensaje fue enviado. Te responderemos por correo a la brevedad.";
          statusBox.className = "form-status is-visible form-status--ok";
          form.reset();
        } else {
          throw new Error("Fallo el envío");
        }
      } catch (err) {
        statusBox.textContent = "No pudimos enviar el formulario. Probá de nuevo o escribinos a maddisoporte@gmail.com.";
        statusBox.className = "form-status is-visible form-status--err";
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Enviar";
      }
    });
  }

  /* ---------- Compras recientes (Tebex, en vivo) ----------
     Muestra los últimos compradores reales de la tienda usando el módulo
     "recent_payments" del sidebar de Tebex. Si el módulo no está habilitado
     en la tienda, o todavía no hay compras, el cuadro se queda oculto en
     vez de mostrar algo vacío o roto.
  */
  const recentBuyersBox = document.querySelector("[data-recent-buyers]");
  if (recentBuyersBox) {
    const list = recentBuyersBox.querySelector("[data-recent-buyers-list]");

    async function renderRecentBuyers() {
      const modules = await fetchTebexSidebar();
      const mod = modules.find((m) => m.type === "recent_payments");
      const payments = mod?.data?.payments || [];

      if (!payments.length) {
        recentBuyersBox.hidden = true;
        return;
      }

      list.innerHTML = payments.slice(0, 9).map((p) => {
        const skin = encodeURIComponent(p.username_id || p.username || "steve");
        const itemName = p.package?.name || "";
        const tooltip = itemName ? `${p.username} — ${itemName}` : p.username;
        return `
          <li class="recent-buyers__item" title="${escapeHtml(tooltip)}">
            <span class="recent-buyers__avatar">
              <img src="https://api.mineatar.io/head/${skin}" alt="${escapeHtml(p.username)}" loading="lazy">
            </span>
          </li>
        `;
      }).join("");

      recentBuyersBox.hidden = false;
    }

    renderRecentBuyers();
    setInterval(renderRecentBuyers, 90000); // refresca cada 90s
  }
});
