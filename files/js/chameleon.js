// chameleon.js: A cute chameleon cursor follower

(function chameleon() {
  const chameleonEl = document.createElement("div");
  
  let chameleonPosX = 32;
  let chameleonPosY = 32;
  let mousePosX = 0;
  let mousePosY = 0;
  
  const isReducedMotion =
    window.matchMedia(`(prefers-reduced-motion: reduce)`) === true ||
    window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;

  if (isReducedMotion) {
    return;
  }

  // Simple chameleon styles
  chameleonEl.id = "chameleon";
  chameleonEl.style.width = "32px";
  chameleonEl.style.height = "32px";
  chameleonEl.style.position = "fixed";
  chameleonEl.style.pointerEvents = "none";
  chameleonEl.style.zIndex = "9999";
  chameleonEl.style.left = chameleonPosX + "px";
  chameleonEl.style.top = chameleonPosY + "px";

  // Simple SVG chameleon
  chameleonEl.innerHTML = `
    <svg viewBox="0 0 32 32" width="32" height="32">
      <!-- body -->
      <ellipse cx="16" cy="18" rx="8" ry="10" fill="#90EE90" stroke="#228B22" stroke-width="0.5"/>
      <!-- head -->
      <circle cx="16" cy="8" r="6" fill="#7FD87F" stroke="#228B22" stroke-width="0.5"/>
      <!-- eye -->
      <circle cx="16" cy="6" r="2" fill="#FFD700"/>
      <circle cx="16" cy="6" r="1" fill="#000"/>
      <!-- tail -->
      <path d="M 22 22 Q 26 20 28 24" stroke="#228B22" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    </svg>
  `;

  document.body.appendChild(chameleonEl);

  document.addEventListener("mousemove", (event) => {
    mousePosX = event.clientX;
    mousePosY = event.clientY;
  });

  const frame = () => {
    const diffX = mousePosX - chameleonPosX;
    const diffY = mousePosY - chameleonPosY;
    const distance = Math.sqrt(diffX * diffX + diffY * diffY);

    if (distance > 0) {
      const speed = 0.25;
      chameleonPosX += (diffX * speed) / (distance || 1);
      chameleonPosY += (diffY * speed) / (distance || 1);
    }

    chameleonEl.style.left = chameleonPosX + "px";
    chameleonEl.style.top = chameleonPosY + "px";

    requestAnimationFrame(frame);
  };

  frame();
})();
