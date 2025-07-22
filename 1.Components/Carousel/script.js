const pictures = [
    "https://naslku.synology.me/gposesXplorerAPI/screenshots/Trivia/1.SFW/absoluteCinema.png",
    "https://naslku.synology.me/gposesXplorerAPI/screenshots/Gposes/1.SFW/Splash%20pose/ffxiv_dx11%202025-05-15%2000-24-14.png",
    "https://naslku.synology.me/gposesXplorerAPI/screenshots/Gposes/1.SFW/Cosmic%20Exploration/ffxiv_dx11%202025-05-04%2023-00-20.png",
    "https://naslku.synology.me/gposesXplorerAPI/screenshots/Gposes/1.SFW/Lost%20Alexandrian/ffxiv_dx11%202025-04-04%2014-46-55.png",
    "https://naslku.synology.me/gposesXplorerAPI/screenshots/Gposes/1.SFW/L'envie's%20retainers/ffxiv_dx11%202025-03-01%2018-34-39.png",
    "https://naslku.synology.me/gposesXplorerAPI/screenshots/Gposes/1.SFW/Sisters%20side%20by%20side/ffxiv_dx11%202025-03-01%2015-54-43.png",
    "https://naslku.synology.me/gposesXplorerAPI/screenshots/Trivia/1.SFW/Encyclopedia/15%20-%20Khal/ffxiv_dx11%202025-01-27%2022-56-15.png",
    "https://naslku.synology.me/gposesXplorerAPI/screenshots/Trivia/1.SFW/Encyclopedia/12%20-%20Fhurai/ffxiv_dx11%202025-01-27%2022-41-43.png",
    "https://naslku.synology.me/gposesXplorerAPI/screenshots/Trivia/1.SFW/Encyclopedia/13%20-%20M'laiboli/ffxiv_dx11%202025-01-27%2022-30-51.png",
    "https://naslku.synology.me/gposesXplorerAPI/screenshots/Trivia/1.SFW/Encyclopedia/14%20-%20Aleidis/ffxiv_dx11%202025-01-27%2022-22-01.png",
    "https://naslku.synology.me/gposesXplorerAPI/screenshots/Trivia/1.SFW/Encyclopedia/11%20-%20Eudialyte/ffxiv_dx11%202025-01-27%2021-51-07.png",
    "https://naslku.synology.me/gposesXplorerAPI/screenshots/Trivia/1.SFW/Encyclopedia/10%20-%20Pella/ffxiv_dx11%202025-01-27%2021-40-58.png",
    "https://naslku.synology.me/gposesXplorerAPI/screenshots/Trivia/1.SFW/Encyclopedia/9%20-%20Fureur/ffxiv_dx11%202025-01-27%2021-31-13.png",
    "https://naslku.synology.me/gposesXplorerAPI/screenshots/Trivia/1.SFW/Encyclopedia/8%20-%20Claire/ffxiv_dx11%202025-01-27%2021-17-19.png",
    "https://naslku.synology.me/gposesXplorerAPI/screenshots/Trivia/1.SFW/Encyclopedia/7%20-%20Galare/ffxiv_dx11%202025-01-27%2020-59-18.png",
    "https://naslku.synology.me/gposesXplorerAPI/screenshots/Trivia/1.SFW/Encyclopedia/6%20-%20Neyaz/ffxiv_dx11%202025-01-27%2020-47-37.png",
    "https://naslku.synology.me/gposesXplorerAPI/screenshots/Trivia/1.SFW/Encyclopedia/5%20-%20Orghana/ffxiv_dx11%202025-01-27%2020-37-01.png",
    "https://naslku.synology.me/gposesXplorerAPI/screenshots/Trivia/1.SFW/Encyclopedia/4%20-%20Jasmine/ffxiv_dx11%202025-01-27%2019-54-38.png",
    "https://naslku.synology.me/gposesXplorerAPI/screenshots/Trivia/1.SFW/Encyclopedia/3%20-%20Dethanon/ffxiv_dx11%202025-01-27%2019-20-54.png",
    "https://naslku.synology.me/gposesXplorerAPI/screenshots/Trivia/1.SFW/Encyclopedia/2%20-%20Plaisir/ffxiv_dx11%202025-01-27%2019-05-39.png",
    "https://naslku.synology.me/gposesXplorerAPI/screenshots/Trivia/1.SFW/Encyclopedia/1%20-%20L'envie/ffxiv_dx11%202025-01-27%2018-29-30.png",
    "https://naslku.synology.me/gposesXplorerAPI/screenshots/Trivia/1.SFW/Bookmark%20characters%20+%20bosses/ffxiv_dx11%202025-01-25%2011-24-07.png",
    "https://naslku.synology.me/gposesXplorerAPI/screenshots/Gposes/1.SFW/Prepa%203Screen/ffxiv_dx11%202025-01-24%2023-22-07.png",
    "https://naslku.synology.me/gposesXplorerAPI/screenshots/Gposes/1.SFW/Minfilia%20remembrance/15b.png",
];

document.addEventListener("DOMContentLoaded", function () {
    generateCarousel();
});

function generateCarousel() {
    const carousel = document.createElement("div");
    carousel.classList = "carousel";
    document.body.appendChild(carousel);

    const container = document.createElement("div");
    container.classList = "carousel-container";
    carousel.appendChild(container);

    const track = document.createElement("div");
    track.classList = "carousel-track";
    container.appendChild(track);

    pictures.forEach((picture, idx) => {
        const item = document.createElement("div");
        item.classList = "carousel-item";
        track.appendChild(item);

        const wrapper = document.createElement("div");
        wrapper.classList = "wrapper";
        item.appendChild(wrapper);

        const img = document.createElement("img");
        img.src = picture;
        if([0, 1, 2, 4, 19, 22, 23].includes(idx)) img.classList = "full-height";
        img.alt = `Image ${idx}`;
        img.loading = "lazy";
        wrapper.appendChild(img);
    });

    const navbar = document.createElement("span");
    navbar.classList = "navbar";
    carousel.appendChild(navbar);

    const btnLeft = document.createElement("button");
    btnLeft.innerHTML = "←";
    btnLeft.addEventListener("click", () => scrollOffsetCarousel(-1));
    navbar.appendChild(btnLeft);

    const btnRight = document.createElement("button");
    btnRight.innerHTML = "→";
    btnRight.addEventListener("click", () => scrollOffsetCarousel(1));
    navbar.appendChild(btnRight);
}

function scrollOffsetCarousel(direction) {
    const container = document.querySelector(".carousel-container");
    const scrollAmount = container.offsetWidth;
    container.scrollBy({
        left: direction * scrollAmount,
        behavior: "smooth",
    });
}
