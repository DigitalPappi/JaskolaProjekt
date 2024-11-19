/ Dane projektów
const projects = Array.from({ length: 15 }, (_, i) => ({
  title: `Projekt ${i + 1}`,
  description: `Opis projektu ${i + 1}`,
  image: `https://via.placeholder.com/300x200?text=Projekt+${i + 1}`
}));

const itemsPerPage = 3;
let currentPage = 0;

// Elementy DOM
const projectGallery = document.querySelector('.project-gallery');
const paginationDots = document.querySelector('.pagination-dots');
const prevSection = document.getElementById('prev-section');
const nextSection = document.getElementById('next-section');

// Funkcja renderująca projekty
function renderProjects() {
  projectGallery.innerHTML = '';
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleProjects = projects.slice(startIndex, endIndex);

  visibleProjects.forEach((project) => {
    const projectCard = document.createElement('div');
    projectCard.classList.add('project');
    projectCard.innerHTML = `
      <img src="${project.image}" alt="${project.title}">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
    `;
    projectGallery.appendChild(projectCard);
  });
}

// Funkcja renderująca kropeczki
function renderDots() {
  paginationDots.innerHTML = '';
  const totalPages = Math.ceil(projects.length / itemsPerPage);

  for (let i = 0; i < totalPages; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === currentPage) dot.classList.add('active');
    dot.addEventListener('click', () => {
      currentPage = i;
      updateView();
    });
    paginationDots.appendChild(dot);
  }
}

// Aktualizacja widoku
function updateView() {
  renderProjects();
  renderDots();
  updateArrows();
}

// Aktualizacja widoczności strzałek
function updateArrows() {
  const totalPages = Math.ceil(projects.length / itemsPerPage);
  prevSection.style.display = currentPage === 0 ? 'none' : 'block';
  nextSection.style.display = currentPage === totalPages - 1 ? 'none' : 'block';
}

// Obsługa strzałek
prevSection.addEventListener('click', () => {
  if (currentPage > 0) {
    currentPage--;
    updateView();
  }
});

nextSection.addEventListener('click', () => {
  const totalPages = Math.ceil(projects.length / itemsPerPage);
  if (currentPage < totalPages - 1) {
    currentPage++;
    updateView();
  }
});

// Inicjalizacja widoku
updateView();
