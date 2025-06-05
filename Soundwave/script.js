// Get the current width of the browser window in pixels.
// This value determines how many "droplets" (vertical bars) will be generated.
const elementSize = window.outerWidth / 2;
const heightSize = window.outerHeight / 2;
const baseSize = 1;
const enableMove = true;

/**
 * When the DOM is fully loaded:
 * 1. Generate the initial soundwave visualization.
 * 2. Optionally start an interval that animates the wave by moving/modulating droplets.
 */
document.addEventListener("DOMContentLoaded", () => {
    generateWave();
    if (enableMove) setInterval(moveModulation, 1); // Animates the wave every 1ms (very fast).
});

/**
 * Generates the main wave container and populates it with droplets.
 * The container is styled as a flex row, centered, and fills the screen.
 */
function generateWave() {
    const waveContainer = document.createElement("div");
    waveContainer.className =
        "flex flex-nowrap justify-center items-center overflow-hidden w-full";
    waveContainer.id = "wave-container";
    document.body.appendChild(waveContainer);
    generateDroplet();
}

/**
 * Generates a number of droplets equal to the windowSize.
 * Each droplet is a flex column containing a modulation (the visual bar).
 */
function generateDroplet() {
    for (let i = 0; i < elementSize; i++) {
        const droplet = document.createElement("div");
        droplet.className = `flex-1 min-w-0 flex flex-col items-center justify-end`;
        droplet.id = "droplet" + i;

        // Each droplet contains a modulation (upper, base, lower).
        droplet.appendChild(generateModulation(i));
        document.getElementById("wave-container").appendChild(droplet);
    }
}

/**
 * Generates a modulation element, which visually represents a single vertical bar:
 * - An upper segment (random height, gray)
 * - A base segment (fixed height, red, acts as the "wave" line)
 * - A lower segment (random height, gray)
 * The heights and margins are randomized for a dynamic effect.
 * @param {number} id - The identifier for the modulation element.
 * @returns {HTMLElement} The modulation element.
 */
function generateModulation(id) {
    const modulation = document.createElement("div");
    modulation.className =
        "flex flex-col items-center justify-center w-full";
    modulation.id = "modulation" + id;

    // Random heights for upper and lower segments to create a wave effect.
    const upperHeight = parseInt(Math.random() * (heightSize / 2) - baseSize);
    const lowerHeight = parseInt(Math.random() * (heightSize / 2) - baseSize);

    const upperMargin = parseInt((heightSize / 2) - upperHeight - baseSize);
    const lowerMargin = parseInt((heightSize / 2) - lowerHeight - baseSize);

    // Upper segment (gray, rounded top)
    const upper = document.createElement("div");
    upper.className = `w-full bg-gray-400 rounded-t`;
    upper.style.height = `${upperHeight}px`;
    upper.style.marginTop = `${upperMargin}px`;

    // Base segment (red, acts as the "wave" line)
    const base = document.createElement("div");
    base.className = `w-full h-[${baseSize}px] bg-red-500 my-[1px] rounded-full h-min-[4px]`;

    // Lower segment (gray, rounded bottom)
    const lower = document.createElement("div");
    lower.className = `w-full bg-gray-400 rounded-b`;
    lower.style.height = `${lowerHeight}px`;
    lower.style.marginBottom = `${lowerMargin}px`;

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
    const container = document.getElementById("wave-container");
    if (container.children.length > 0) {
        const first = container.firstElementChild;
        // Remove old modulation and add a new randomized one.
        first.innerHTML = "";
        first.appendChild(generateModulation());
        // Move the first droplet to the end of the container.
        container.appendChild(first);
    }
}
