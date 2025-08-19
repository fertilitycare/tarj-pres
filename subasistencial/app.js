// 1) Referencias a elementos
const card = document.getElementById('card');       // 2) Contenedor de la tarjeta
const flipZone = document.getElementById('flip-zone'); // 3) Franja superior que controla el giro

// 4) Alterna el estado de giro (frente <-> reverso)
function toggleFlip(){
  card.classList.toggle('flip'); // 5) Agrega/Quita la clase .flip
}

// 6) Giro SOLO cuando se toca la zona superior (flip-zone), no toda la tarjeta
flipZone.addEventListener('click', toggleFlip, { passive: true }); // 7) Click desktop
flipZone.addEventListener('touchend', (e) => { // 8) Tap móvil
  e.preventDefault();                          // 9) Evita zoom/selección accidental
  toggleFlip();                                // 10) Ejecuta el giro
}, { passive: false });

// 11) Anti‑zoom por doble‑tap (iOS/Android)
let lastTouch = 0;                              // 12) Guarda hora del último toque
document.addEventListener('touchend', (e) => {
  const now = Date.now();                       // 13) Tiempo actual
  if (now - lastTouch < 350) {                  // 14) Si hubo doble‑tap
    e.preventDefault();                         // 15) Bloquea zoom por doble‑tap
  }
  lastTouch = now;                              // 16) Actualiza tiempo
}, { passive: false });

// 17) IMPORTANTE: No ponemos listeners de click/touch en .card
//     para que los enlaces (hotspots) funcionen sin provocar giro.
