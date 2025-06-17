// Calculate the number of droplets (vertical bars) based on half the window width.
// Each droplet represents a segment of the soundwave visualization.
const elementSize = window.outerWidth / 2;
const heightSize = window.outerHeight / 2;
const baseSize = 1;
const speed = 100; // Animation speed as a percentage (higher is faster)
const enableMove = true;

/**
 * When the DOM is fully loaded:
 * - If animation is disabled, create the hoverboard display area for showing values on hover.
 * - Generate the initial soundwave visualization.
 * - If animation is disabled, attach hover event listeners to display values.
 * - If animation is enabled, start an interval to animate the wave by moving/modulating droplets.
 */
document.addEventListener("DOMContentLoaded", () => {
    if (!enableMove) generateHoverboard();
    generateWave();
    if (!enableMove) hoverValue();
    if (enableMove) setInterval(moveModulation, (speed > 100 ? 1 : 100 - speed));
});

/**
 * Creates a hoverboard element at the top of the page to display values
 * when hovering over modulation bars. Only used if animation is disabled.
 */
function generateHoverboard() {
    const hoverboard = document.createElement("div");
    hoverboard.classList =
        "flex flex-nowrap justify-center items-center overflow-hidden w-full";
    hoverboard.id = "hoverboard";
    hoverboard.innerHTML = "&nbsp;";
    document.body.appendChild(hoverboard);
}

/**
 * Generates the main wave container and populates it with droplets.
 * The container is styled as a flex row, centered, and fills the width of the screen.
 * If animation is disabled, attaches a mouseleave event to clear the hoverboard display.
 */
function generateWave() {
    const waveContainer = document.createElement("div");
    waveContainer.className =
        "flex flex-nowrap justify-center items-center overflow-hidden w-full";
    waveContainer.id = "wave-container";
    document.body.appendChild(waveContainer);
    generateDroplet();

    if (!enableMove) {
        // Clear hoverboard when mouse leaves the wave area.
        waveContainer.addEventListener("mouseleave", function () {
            document.querySelector("#hoverboard").innerHTML = "&nbsp;";
        });
    }
}

/**
 * Generates a number of droplets equal to elementSize.
 * Each droplet is a flex column containing a modulation (the visual bar).
 */
function generateDroplet() {
    for (let i = 0; i < elementSize; i++) {
        const droplet = document.createElement("div");
        droplet.id = "droplet" + i;
        droplet.className = `flex-1 min-w-0 max-w-[1.5em] flex flex-col items-center justify-end`;

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
    modulation.className = "flex flex-col items-center justify-center w-full";
    modulation.id = "modulation" + id;

    // Random heights for upper and lower segments to create a wave effect.
    const upperHeight = parseInt(Math.random() * (heightSize / 2) - baseSize);
    const lowerHeight = parseInt(Math.random() * (heightSize / 2) - baseSize);

    // Calculate margins to vertically center the modulation bar.
    const upperMargin = parseInt(heightSize / 2 - upperHeight - baseSize);
    const lowerMargin = parseInt(heightSize / 2 - lowerHeight - baseSize);

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

    // Store the sum of upper and lower heights as a value attribute for display on hover.
    modulation.setAttribute("value", upperHeight + lowerHeight);
    modulation.title = upperHeight + lowerHeight;

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

/**
 * Attaches mouseover event listeners to each modulation bar.
 * When hovered, the hoverboard displays the value attribute of the modulation.
 * Only used if animation is disabled.
 */
function hoverValue() {
    document
        .querySelectorAll("#wave-container > * > *")
        .forEach((modulation) => {
            modulation.addEventListener("mouseover", function (event) {
                document.querySelector("#hoverboard").innerHTML =
                    event.currentTarget.getAttribute("value");
            });
        });
}
