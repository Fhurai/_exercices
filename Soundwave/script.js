// Get the current width of the browser window in pixels.
// This value determines how many "droplets" (vertical bars) will be generated.
const windowSize = window.outerWidth;

/**
 * When the DOM is fully loaded:
 * 1. Generate the initial soundwave visualization.
 * 2. Start an interval that animates the wave by moving/modulating droplets.
 */
document.addEventListener('DOMContentLoaded', () => {
  generateWave();
  setInterval(moveModulation, 1); // Animates the wave every 1ms (very fast).
});

/**
 * Generates the main wave container and populates it with droplets.
 * The container is styled as a flex row, centered, and fills the screen.
 */
function generateWave() {
  const waveContainer = document.createElement('div');
  waveContainer.className = 'flex flex-nowrap justify-center overflow-hidden h-screen w-full px-1';
  waveContainer.id = 'wave-container';
  document.body.appendChild(waveContainer);
  generateDroplet();
}

/**
 * Generates a number of droplets equal to the window width.
 * Each droplet is a flex column containing a modulation (the visual bar).
 */
function generateDroplet() {
  for (let i = 0; i < windowSize; i++) {
    const droplet = document.createElement('div');
    droplet.className = `flex-1 min-w-0 flex flex-col items-center justify-end`;
    droplet.id = 'droplet' + i;

    // Each droplet contains a modulation (upper, base, lower).
    droplet.appendChild(generateModulation());
    document.getElementById('wave-container').appendChild(droplet);
  }
}

/**
 * Generates a modulation element, which visually represents a single vertical bar:
 * - An upper segment (random height, gray)
 * - A base segment (fixed height, red, acts as the "wave" line)
 * - A lower segment (random height, gray)
 * The heights and margins are randomized for a dynamic effect.
 * @returns {HTMLElement} The modulation element.
 */
function generateModulation() {
  const modulation = document.createElement('div');
  modulation.className = 'flex flex-col items-center justify-center h-full w-full';

  // Random heights for upper and lower segments to create a wave effect.
  const upperHeight = parseInt(Math.random() * 50 + 1);
  const lowerHeight = parseInt(Math.random() * 50 + 1);

  // Upper segment (gray, rounded top)
  const upper = document.createElement('div');
  upper.className = `w-full bg-gray-400 rounded-t`;
  upper.style.height = `${upperHeight}px`;
  upper.style.marginTop = `${lowerHeight}px`;

  // Base segment (red, acts as the "wave" line)
  const base = document.createElement('div');
  base.className = `w-full h-[4px] bg-red-500 my-[1px] rounded-full h-min-[4px]`;

  // Lower segment (gray, rounded bottom)
  const lower = document.createElement('div');
  lower.className = `w-full bg-gray-400 rounded-b`;
  lower.style.height = `${lowerHeight}px`;
  lower.style.marginBottom = `${upperHeight}px`;

  // Assemble the modulation bar.
  modulation.appendChild(upper);
  modulation.appendChild(base);
  modulation.appendChild(lower);

  return modulation;
}

/**
 * Animates the wave by moving the first droplet to the end and regenerating its modulation.
 * This creates a continuous "moving" soundwave effect.
 */
function moveModulation() {
  const container = document.getElementById('wave-container');
  if (container.children.length > 0) {
    const first = container.firstElementChild;
    // Remove old modulation and add a new randomized one.
    first.innerHTML = '';
    first.appendChild(generateModulation());
    // Move the first droplet to the end of the container.
    container.appendChild(first);
  }
}