
// Pobieramy elementy sekcji 2
const ofertaSection = document.querySelector("#section2");
const ofertaSlider = ofertaSection.querySelector(".simple-grid");
const ofertaItems = ofertaSlider.querySelectorAll(".grid-item");

// Tworzymy kontener kropek BEZPOŚREDNIO wewnątrz sekcji 2, jeśli go nie ma
let ofertaDotsContainer = ofertaSection.querySelector(".slider-dots");

if (!ofertaDotsContainer) {
    ofertaDotsContainer = document.createElement("div");
    ofertaDotsContainer.classList.add("slider-dots");
    ofertaSection.appendChild(ofertaDotsContainer);
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

// 🔹 Funkcja do aktualizacji aktywnej kropki
function updateOfertaDots() {
    let closestIndex = Math.round(ofertaSlider.scrollLeft / ofertaSlider.clientWidth);
    ofertaDots.forEach((dot, index) => {
        dot.classList.toggle("active", index === closestIndex);
    });
}

// 🔹 Automatyczne dopasowanie po zatrzymaniu scrolla (bardziej intuicyjne)
function snapToNearest() {
    let scrollPosition = ofertaSlider.scrollLeft;
    let itemWidth = ofertaSlider.clientWidth;
    let index = Math.round(scrollPosition / itemWidth);

    // 🔥 INTELIGENTNE WYKRYWANIE INTENCJI
    let offset = scrollPosition % itemWidth; // Jak daleko jesteśmy od krawędzi kafelka?
    if (offset > itemWidth * 0.35) {
        index++; // Jeśli przesuniemy więcej niż 35% w bok, przeskakujemy do następnego
    }

    // Upewniamy się, że nie wychodzimy poza zakres kafelków
    index = Math.max(0, Math.min(index, ofertaItems.length - 1));

    ofertaSlider.scrollTo({
        left: index * itemWidth,
        behavior: "smooth",
    });
}

// 🔹 Obsługa scrolla do aktualizacji kropek
ofertaSlider.addEventListener("scroll", updateOfertaDots);
ofertaSlider.addEventListener("scrollend", snapToNearest);

// 🔹 Kliknięcie w kropkę przewija slider do odpowiedniego kafelka
ofertaDots.forEach((ofertaDot) => {
    ofertaDot.addEventListener("click", () => {
        const index = parseInt(ofertaDot.dataset.index, 10);
        ofertaSlider.scrollTo({
            left: index * ofertaSlider.clientWidth,
            behavior: "smooth",
        });
    });
});

// 🔹 Poprawiona obsługa swipe – większa strefa dotyku i inteligentne przewijanie
let isSwiping = false;
let isVerticalScroll = false;
let startX, startY, scrollLeft;
const threshold = 50; // Minimalny ruch do uznania za przewinięcie

// 🔹 Rozpoczęcie przeciągania (Działa w całej sekcji 2, nie tylko na obrazkach)
function startSwipe(e) {
    isSwiping = false;
    isVerticalScroll = false;
    startX = e.touches ? e.touches[0].clientX : e.pageX;
    startY = e.touches ? e.touches[0].clientY : e.pageY;
    scrollLeft = ofertaSlider.scrollLeft;
}

// 🔹 Przesuwanie kafelków – wykrywamy kierunek i blokujemy drugi
function moveSwipe(e) {
    const x = e.touches ? e.touches[0].clientX : e.pageX;
    const y = e.touches ? e.touches[0].clientY : e.pageY;
    const deltaX = x - startX;
    const deltaY = y - startY;

    // 🔹 Jeśli użytkownik zaczął przesuwać w pionie, nie przesuwamy slidera
    if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > threshold) {
        isVerticalScroll = true;
        return;
    }

    // 🔹 Jeśli użytkownik przesuwa w poziomie, blokujemy przewijanie strony
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > threshold) {
        e.preventDefault();
        isSwiping = true;
        ofertaSlider.style.scrollSnapType = "none"; // Tymczasowo wyłączamy snap
        ofertaSlider.scrollLeft = scrollLeft - deltaX * 1.2;
    }
}

// 🔹 Zakończenie swipe – przywrócenie scroll-snap
function endSwipe() {
    if (isSwiping) {
        ofertaSlider.style.scrollSnapType = "x mandatory";
        snapToNearest();
    }
}

// 🔹 Obsługa eventów dotykowych i myszy dla całej sekcji 2 (większa strefa dotyku)
ofertaSection.addEventListener("mousedown", startSwipe);
ofertaSection.addEventListener("mousemove", moveSwipe);
ofertaSection.addEventListener("mouseup", endSwipe);
ofertaSection.addEventListener("mouseleave", endSwipe);

ofertaSection.addEventListener("touchstart", startSwipe, { passive: false });
ofertaSection.addEventListener("touchmove", moveSwipe, { passive: false });
ofertaSection.addEventListener("touchend", endSwipe);


//modale


const modalData = [
    {
      id: 1,
      title: "Biura i gabinety",
      description: `
      <div class="hero-description">
    <h3>Stwórz idealne biuro</h3>
    <p>Biurka z elektryczną regulacją, kontenerki z systemem cichego domyku, wytrzymałe blaty i nowoczesny design.</p>
    <p>Idealne do aranżacji przestrzeni zarządu lub open space. Nasze meble łączą jakość, funkcjonalność i styl.</p>
  </div>
      `,
      baseImage: "1"
    },
    {
      id: 2,
      title: "Open space i coworking",
      description: `
        <div class="hero-description">
        <h3>Modułowość i wygoda</h3>
        <p>Elastyczne układy stanowisk pracy, akustyczne ścianki, systemy zarządzania kablami i więcej.</p>
      `,
      baseImage: "2"
    },
    {
      id: 3,
      title: "Fotele i Krzesła",
      description:`
      <div class="hero-description">
        <h3>Modułowość i wygoda</h3>
      <p>Wygodne i funkcjonalne fotele oraz krzesła do biur i sal konferencyjnych.</p>`,
      baseImage: "3"
    },
    {
      id: 4,
      title: "Sofy Biurowe",
      description: `
      <div class="hero-description">
        <h3>Modułowość i wygoda</h3>
      <p>Stylowe sofy do przestrzeni wypoczynkowych i stref chill.</p>`,
      baseImage: "4"
    },
    {
      id: 5,
      title: "Sale Konferencyjne",
      description: `
      <div class="hero-description">
        <h3>Modułowość i wygoda</h3>
      <p>Profesjonalne sale konferencyjne z klasą i charakterem.</p>`,
      baseImage: "5"
    },
    {
      id: 6,
      title: "Recepcje",
      description: `
      <div class="hero-description">
        <h3>Modułowość i wygoda</h3>
      <p>Recepcje, które robią wrażenie od pierwszego spojrzenia.</p>`,
      baseImage: "6"
    }
  ];
  
  // 🔹 Tworzy modale po załadowaniu strony
  document.addEventListener("DOMContentLoaded", () => {
    generateModals();
  });
  
  function generateModals() {
    const body = document.querySelector("body");
  
    modalData.forEach((modal) => {
      const modalElement = document.createElement("div");
      modalElement.id = `modal${modal.id}`;
      modalElement.classList.add("modal");
  
      modalElement.innerHTML = `
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title">${modal.title}</h2>
            <button class="close-button" onclick="closeModal()">×</button>
          </div>
          <div class="modal-scrollable" id="modal${modal.id}-scrollable">
            <!-- Opis i zdjęcia będą ładowane przy otwarciu -->
          </div>
        </div>
      `;
  
      // Zamknięcie po kliknięciu poza modal-content
      modalElement.addEventListener("click", (e) => {
        if (e.target === modalElement) closeModal();
      });
  
      // Zamknięcie klawiszem Esc
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal();
      });
  
      body.appendChild(modalElement);
    });
  }
  
  function openModal(id) {
    const modal = document.getElementById(`modal${id}`);
    const scrollable = document.getElementById(`modal${id}-scrollable`);
    const data = modalData.find((m) => m.id === id);
  
    if (!modal || !scrollable || !data) return;
  
    modal.classList.add("active");
    scrollable.scrollTo(0, 0);
  
    if (!scrollable.dataset.loaded) {
      // Dodaj opis
      const descriptionDiv = document.createElement("div");
      descriptionDiv.classList.add("modal-description");
      descriptionDiv.innerHTML = data.description;
      scrollable.appendChild(descriptionDiv);
  
      // Dodaj zdjęcia
      loadImagesDynamically(data.baseImage, scrollable);
  
      scrollable.dataset.loaded = "true";
    }
  }
  
  function closeModal() {
    document.querySelectorAll(".modal").forEach((modal) =>
      modal.classList.remove("active")
    );
  }
  function loadImagesDynamically(id, container, maxImages = 20) {
    let index = 1;
    const baseName = `images/oferta${id}`;
  
    // 🔹 Utwórz kontener na zdjęcia
    const gallery = document.createElement("div");
    gallery.classList.add("modal-gallery");
    container.appendChild(gallery); // Musi być dodane zanim dodamy zdjęcia
  
    const tryLoad = () => {
      if (index > maxImages) return;
  
      const img = new Image();
      img.src = `${baseName}-${index}.jpg`;
  
      img.onload = () => {
        gallery.appendChild(img);
        index++;
        tryLoad();
      };
  
      img.onerror = () => {
        return; // zakończ gdy brak więcej zdjęć
      };
    };
  
    tryLoad();
  }
  
  

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




