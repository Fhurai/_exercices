document.addEventListener('DOMContentLoaded', () => {
    generateWave();
});

function generateWave(){
    const waveContainer = document.createElement('div');
    waveContainer.className = 'wave-container';

    document.body.appendChild(waveContainer);

    generateDroplet();

    setInterval(function(){
        moveModulation();
    }, 500);
}

function generateDroplet(){
    const windowSize = window.innerWidth / 2;
    for (let i = 0; i < windowSize; i++) {
        const droplet = document.createElement('div');
        droplet.className = 'droplet';
        droplet.id = 'droplet' + i;

        droplet.appendChild(generateModulation());

        document.querySelector('.wave-container').appendChild(droplet);
    }
}

function generateModulation(){
    const modulation = document.createElement('div');
    modulation.className = 'modulation';

    const upper = document.createElement('div');
    upper.className = 'upper';
    const upperValue = parseInt(Math.random() * 50 + 1);
    upper.style.height = upperValue + 'px';

    const base = document.createElement('div');
    base.className = 'base';

    const lower = document.createElement('div');
    lower.className = 'lower';
    const lowerValue = parseInt(Math.random() * 50 + 1);
    lower.style.height = lowerValue + 'px';

    upper.style.marginTop = lower.style.height;
    lower.style.marginBottom = upper.style.height;

    modulation.appendChild(upper);
    modulation.appendChild(base);
    modulation.appendChild(lower);

    return modulation;
}

function moveModulation(){
    const child = document.querySelector('.wave-container').firstChild;
    document.querySelector('.wave-container').firstChild.remove();
    document.querySelector('.wave-container').appendChild(child);
}