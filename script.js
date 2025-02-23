

//koniec sekcji 1 


// karuzela ofera
// Wybieramy tylko sekcję 2 i jej slider
// Wybieramy sekcję 2 oraz jej slider
const ofertaSection = document.querySelector("#section2");
const ofertaSlider = ofertaSection.querySelector(".simple-grid");
const ofertaItems = ofertaSlider.querySelectorAll(".grid-item");

// Tworzymy kontener kropek BEZPOŚREDNIO wewnątrz sekcji 2, jeśli go nie ma
let ofertaDotsContainer = ofertaSection.querySelector(".slider-dots");

if (!ofertaDotsContainer) {
    ofertaDotsContainer = document.createElement("div");
    ofertaDotsContainer.classList.add("slider-dots");
    ofertaSection.appendChild(ofertaDotsContainer); // Kropki są dodane do sekcji 2, a nie na całą stronę
} else {
    ofertaDotsContainer.innerHTML = "";
}

// Tworzymy kropki nawigacyjne dla każdego kafelka
ofertaItems.forEach((_, index) => {
    const ofertaDot = document.createElement("span");
    ofertaDot.classList.add("dot");
    if (index === 0) ofertaDot.classList.add("active");
    ofertaDot.dataset.index = index;
    ofertaDotsContainer.appendChild(ofertaDot);
});

const ofertaDots = ofertaDotsContainer.querySelectorAll(".dot");

// Funkcja do aktualizacji aktywnej kropki
function updateOfertaDots() {
    let closestIndex = Math.round(ofertaSlider.scrollLeft / ofertaSlider.clientWidth);
    ofertaDots.forEach((dot, index) => {
        dot.classList.toggle("active", index === closestIndex);
    });
}

// Dodajemy obsługę scrolla do aktualizacji kropek
ofertaSlider.addEventListener("scroll", updateOfertaDots);

// Kliknięcie w kropkę przewija slider do odpowiedniego kafelka
ofertaDots.forEach((ofertaDot) => {
    ofertaDot.addEventListener("click", () => {
        const index = parseInt(ofertaDot.dataset.index, 10);
        ofertaSlider.scrollTo({
            left: index * ofertaSlider.clientWidth,
            behavior: "smooth",
        });
    });
});

// 🔹 Obsługa swipe - teraz działa w całej sekcji, nie tylko na kafelkach
let isSwiping = false;
let startX, scrollLeft;

// Funkcja rozpoczynająca przeciąganie
function startSwipe(e) {
    isSwiping = true;
    startX = e.touches ? e.touches[0].pageX : e.pageX;
    scrollLeft = ofertaSlider.scrollLeft;
    ofertaSlider.style.scrollSnapType = "none"; // Wyłączamy snap na czas przewijania
}

// Funkcja przesuwająca slider
function moveSwipe(e) {
    if (!isSwiping) return;
    e.preventDefault(); // Zapobiega niechcianemu przewijaniu pionowemu
    const x = e.touches ? e.touches[0].pageX : e.pageX;
    const walk = (x - startX) * 1.5; // Czułość przesuwania
    ofertaSlider.scrollLeft = scrollLeft - walk;
}

// Funkcja kończąca przeciąganie
function endSwipe() {
    isSwiping = false;
    ofertaSlider.style.scrollSnapType = "x mandatory"; // Włączamy snap po przewinięciu
}

// Dodajemy eventy do całej sekcji, nie tylko do slidera
ofertaSection.addEventListener("mousedown", startSwipe);
ofertaSection.addEventListener("mousemove", moveSwipe);
ofertaSection.addEventListener("mouseup", endSwipe);
ofertaSection.addEventListener("mouseleave", endSwipe);

// Obsługa dotykowa na całej sekcji
ofertaSection.addEventListener("touchstart", startSwipe);
ofertaSection.addEventListener("touchmove", moveSwipe);
ofertaSection.addEventListener("touchend", endSwipe);


//modale

const tiles = document.querySelectorAll('.tile');
const modals = document.querySelectorAll('.modal');

function openModal(modalNumber) {
    const modal = document.getElementById(`modal${modalNumber}`);
    if (modal) {
        modal.classList.add('active');
        // Przewiń do góry modala przy otwarciu
        modal.querySelector('.modal-scrollable').scrollTo(0, 0);
    }
}

function closeModal() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => modal.classList.remove('active'));
}

// Zamknięcie modala po kliknięciu poza treść
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
});

// Zamknięcie modala klawiszem Esc
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

//koniec sekcji2
//sekcaj3






//gallerycontaeiner 

const lightbox = document.getElementById('lightbox');
const carousel = document.getElementById('carousel');
const dotsContainer = document.getElementById('dots');
const description = document.getElementById('description');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const images = [
    ['images/realizacja1.jpeg', 'images/realizacja1_2.jpeg', 'images/realizacja1_3.jpeg'],
    ['images/realizacja2.jpeg', 'images/realizacja2_2.jpeg', 'images/realizacja2_3.jpeg'],
    ['images/realizacja3.jpeg', 'images/realizacja3_2.jpeg', 'images/realizacja3_3.jpeg'],
    ['images/realizacja4.jpeg', 'images/realizacja4_2.jpeg', 'images/realizacja4_3.jpeg'],
    ['images/realizacja5.jpeg', 'images/realizacja5_2.jpeg', 'images/realizacja5_3.jpeg'],
    ['images/realizacja6.jpeg', 'images/realizacja6_2.jpeg', 'images/realizacja6_3.jpeg'],
    ['images/realizacja7.jpeg', 'images/realizacja7_2.jpeg', 'images/realizacja7_3.jpeg'],
    ['images/realizacja8.jpeg', 'images/realizacja8_2.jpeg', 'images/realizacja8_3.jpeg'],
    ['images/realizacja9.jpeg', 'images/realizacja9_2.jpeg', 'images/realizacja9_3.jpeg']
    
];
const descriptions = [
    "Projekt eleganckiego salonu z nowoczesnym oświetleniem i wygodną sofą.",
    "Stylowa kuchnia z wyspą i naturalnymi materiałami wykończeniowymi.",
    "Przytulna sypialnia z minimalistycznym wystrojem i ciepłym oświetleniem.",
    "2Projekt eleganckiego salonu z nowoczesnym oświetleniem i wygodną sofą.",
    "2Stylowa kuchnia z wyspą i naturalnymi materiałami wykończeniowymi.",
    "2Przytulna sypialnia z minimalistycznym wystrojem i ciepłym oświetleniem.",
    "3Projekt eleganckiego salonu z nowoczesnym oświetleniem i wygodną sofą.",
    "3Stylowa kuchnia z wyspą i naturalnymi materiałami wykończeniowymi.",
    "3Przytulna sypialnia z minimalistycznym wystrojem i ciepłym oświetleniem."
];

let currentGallery = 0;
let currentIndex = 0;
function openLightbox(galleryIndex) {
currentGallery = galleryIndex; // Zapisz, która realizacja została kliknięta
currentIndex = 0; // Zacznij od pierwszego zdjęcia w danej realizacji
description.innerText = descriptions[currentGallery]; // Wyświetl opis realizacji
updateCarousel(); // Zaktualizuj widok Lightboxa
lightbox.classList.add('visible'); // Pokaż Lightbox
}

function closeLightbox(event) {
if (event.target === lightbox) {
lightbox.classList.remove('visible'); // Ukryj Lightbox, jeśli kliknięto poza zdjęciem
}
}
function updateCarousel() {
    const galleryImages = images[currentGallery]; // Pobierz zdjęcia dla bieżącej galerii

    console.log('Gallery images:', galleryImages); // Przenieś log tutaj

    // Renderuj zdjęcia w carousel
    carousel.innerHTML = galleryImages
        .map(src => `<img src="${src}" alt="Zdjęcie">`)
        .join('');

    // Ustaw szerokość kontenera na podstawie liczby zdjęć
    carousel.style.width = `${galleryImages.length * 100}%`;

    // Przesuń carousel na właściwe zdjęcie
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Renderuj kropki nawigacyjne
    renderDots();
}
prevButton.addEventListener('click', () => {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = images[currentGallery].length - 1;
    }
    updateCarousel();
});

nextButton.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex >= images[currentGallery].length) {
        currentIndex = 0;
    }
    updateCarousel();
});


function updateCarousel() {
    const galleryImages = images[currentGallery];

    // Renderowanie zdjęć z aktualnym indeksem
    carousel.innerHTML = galleryImages
        .map((src, index) =>
            `<img src="${src}" alt="Zdjęcie" class="${index === currentIndex ? 'active' : ''}" data-index="${index}">`
        )
        .join('');

    // Przesunięcie karuzeli
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Obsługa kliknięcia w konkretne zdjęcie
    document.querySelectorAll('.carousel img').forEach(img => {
        img.addEventListener('click', (e) => {
            const clickedIndex = parseInt(e.target.dataset.index);
            if (clickedIndex !== currentIndex) {
                currentIndex = clickedIndex;
                updateCarousel(); // Przełącz na kliknięte zdjęcie
            }
        });
    });

    renderDots();
}




function renderDots() {
dotsContainer.innerHTML = images[currentGallery]
.map((_, i) => 
    `<span class="dot ${i === currentIndex ? 'active' : ''}" onclick="goToSlide(${i})"></span>`
)
.join('');
}


function goToSlide(index) {
currentIndex = index; // Ustaw bieżące zdjęcie
updateCarousel(); // Zaktualizuj widok
}


let lastScrollY = window.scrollY;
const footer = document.querySelector('footer');

document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('visible')) {
        if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + images[currentGallery].length) % images[currentGallery].length;
            updateCarousel();
        } else if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % images[currentGallery].length;
            updateCarousel();
        }
    }
});

// koniec galery container 

// nawigacja przejscia:


// Pobierz linki nawigacyjne
const navLinks = document.querySelectorAll(".nav-menu a");

// Konfiguracja IntersectionObserver
const observerOptions = {
    root: null, // Obserwujemy widok przeglądarki
    rootMargin: "0px", // Bez marginesów
    threshold: 0.5, // Sekcja jest uznana za aktywną, jeśli co najmniej 50% jej wysokości jest widoczne
};

// Funkcja callback dla IntersectionObserver
function observerCallback(entries, observer) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Pobierz ID widocznej sekcji
            const sectionId = entry.target.id;

            // Usuń klasę 'active' ze wszystkich linków
            navLinks.forEach((link) => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${sectionId}`) {
                    link.classList.add("active");
                }
            });

            console.log(`Aktywna sekcja: ${sectionId}`); // Debugowanie
        }
    });
}

// Stwórz IntersectionObserver
const observer = new IntersectionObserver(observerCallback, observerOptions);

// Obserwuj wszystkie sekcje
document.querySelectorAll("section").forEach((section) => {
    observer.observe(section);
});
// formualrz




