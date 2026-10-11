// Aplica el tema oscuro antes de pintar la página, para evitar un parpadeo claro.
// Va en un archivo aparte (no en línea) para que la Content-Security-Policy no necesite 'unsafe-inline'.
try { if (localStorage.getItem('theme') === 'dark') document.documentElement.classList.add('dark') } catch { /* almacenamiento bloqueado */ }
