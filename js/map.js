const mapPlaces = [
  { id: 'kerzhen', name: 'Керженский заповедник', coords: [56.9, 44.8], category: 'Заповедник', desc: 'Уникальные сосновые боры и болота' },
  { id: 'vosp', name: 'Воскресенское Поветлужье', coords: [57.25, 45.45], category: 'Природный парк', desc: 'Экотропы и сплавы по Ветлуге' },
  { id: 'pustyn', name: 'Пустынский заказник', coords: [55.4, 43.3], category: 'Заказник', desc: 'Карстовые озёра Великое и Святое' },
  { id: 'artem', name: 'Артемовские луга', coords: [56.15, 44.2], category: 'Луга', desc: '80% птиц региона, рыбалка' },
  { id: 'nizhniy800', name: 'Эко-тропа «Нижний-800»', coords: [56.32, 44.00], category: 'Тропа', desc: '16 км пешком или на велосипеде' },
  { id: 'ichalki', name: 'Ичалковские пещеры', coords: [55.0, 44.65], category: 'Пещеры', desc: 'Подземные озёра, спелеотуризм' },
  { id: 'vetluga', name: 'Река Ветлуга', coords: [57.3, 45.5], category: 'Река', desc: 'Сплавы и чистые пляжи' },
  { id: 'mokhovye', name: 'Моховые горы', coords: [57.8, 43.6], category: 'Ландшафт', desc: 'Редкие растения и панорамы' },
  { id: 'povolje', name: 'Нацпарк «Нижегородское Поволжье»', coords: [55.2, 43.9], category: 'Нацпарк', desc: '200 редких видов, новые тропы 2025' },
  { id: 'green-city', name: 'Зелёный город', coords: [56.25, 43.75], category: 'Лес', desc: 'Хвойный лес у Волги, 30 мин от НН' }
];

const categoryColors = {
  'Заповедник': '#2D5016',
  'Природный парк': '#2D5016',
  'Заказник': '#2D5016',
  'Нацпарк': '#2D5016',
  'Тропа': '#E8500A',
  'Луга': '#8BC34A',
  'Пещеры': '#7B5EA7',
  'Река': '#2196F3',
  'Ландшафт': '#FF9800',
  'Лес': '#4CAF50'
};

let mapInstance;
let placemarkItems = [];

function loadYandexScript(callback) {
  const key = window.YANDEX_MAPS_KEY;
  if (!key) {
    const notice = document.querySelector('.map-warning');
    if (notice) notice.textContent = 'YANDEX_MAPS_KEY не найден. Добавьте config.js.';
    return;
  }
  const script = document.createElement('script');
  script.src = `https://api-maps.yandex.ru/2.1/?apikey=${key}&lang=ru_RU`;
  script.onload = callback;
  document.head.appendChild(script);
}

function initMap() {
  if (!document.getElementById('map-container')) return;
  mapInstance = new ymaps.Map('map-container', {
    center: [56.3, 44.0],
    zoom: 8,
    controls: ['zoomControl', 'fullscreenControl']
  });

  mapPlaces.forEach(place => {
    const placemark = new ymaps.Placemark(place.coords, {
      balloonContentHeader: place.name,
      balloonContentBody: `<strong>${place.category}</strong><br>${place.desc}`,
      hintContent: place.name
    }, {
      preset: 'islands#circleDotIcon',
      iconColor: categoryColors[place.category] || '#E8500A'
    });
    mapInstance.geoObjects.add(placemark);
    placemarkItems.push({ place, mark: placemark });
  });

  renderSidebar();
  setupFilters();
}

function renderSidebar() {
  const list = document.getElementById('places-list');
  if (!list) return;
  list.innerHTML = '';
  mapPlaces.forEach(place => {
    const item = document.createElement('li');
    item.innerHTML = `<strong>${place.name}</strong><span class="meta-label">${place.category}</span>`;
    item.addEventListener('click', () => {
      mapInstance.setCenter(place.coords, 10, { duration: 500 });
      const marker = placemarkItems.find(item => item.place.id === place.id);
      if (marker) marker.mark.balloon.open();
    });
    list.appendChild(item);
  });
}

function setupFilters() {
  const buttons = document.querySelectorAll('.map-filter button');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      const category = button.dataset.category;
      filterMarkers(category);
    });
  });
}

function filterMarkers(category) {
  placemarkItems.forEach(item => {
    const visible = category === 'all' || item.place.category === category;
    item.mark.options.set('visible', visible);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('map-container')) {
    loadYandexScript(() => ymaps.ready(initMap));
  }
});
