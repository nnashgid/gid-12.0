const detailedPlaces = [
  {
    id: 'kerzhenskiy',
    name: 'Керженский заповедник',
    category: 'Заповедник',
    photo: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=80&fit=crop',
    description: [
      'Керженский заповедник — это тихие сосновые боры, извилистые тропы и болота с редкими птицами.',
      'Место сохраняет аутентичную природу и позволяет увидеть лесные ландшафты без массового туризма.',
      'Здесь популярны прогулки с официальными гидами и осознанные фототуры на рассвете.'
    ],
    travel: 'От Нижнего Новгорода до Бора около 1,5 часа на автомобиле, затем трансфер к туристическому центру заповедника.',
    gear: ['Удобная обувь', 'Дождевик', 'Термос', 'бинокль', 'запас воды'],
    coords: [56.9, 44.8],
    similar: ['Воскресенское Поветлужье', 'Пустынский заказник', 'Моховые горы']
  },
  {
    id: 'vosp',
    name: 'Природный парк «Воскресенское Поветлужье»',
    category: 'Природный парк',
    photo: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80&fit=crop',
    description: [
      'Парк тянется вдоль берега Ветлуги, здесь мягкие леса и поляны, идеальные для байдарок и прогулок.',
      'Экотропы ведут к живописным берегам, а местные жители рассказывают про традиционные обычаи региона.',
      'Для путешественников доступны сплавы, экскурсии и кемпинг на берегу реки.'
    ],
    travel: 'До парка около 2 часов от Нижнего, дорога удобная, дальше — местный трансфер или лодка.',
    gear: ['Спальный мешок', 'водонепроницаемая сумка', 'средства защиты от комаров'],
    coords: [57.25, 45.45],
    similar: ['Река Ветлуга', 'Артемовские луга', 'Зелёный город']
  }
];

function loadYandexMapScript(callback) {
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

function initDetailMap(place) {
  const container = document.getElementById('place-map');
  if (!container || !place) return;

  const map = new ymaps.Map(container, {
    center: place.coords,
    zoom: 10,
    controls: ['zoomControl']
  });

  const placemark = new ymaps.Placemark(place.coords, {
    balloonContentHeader: place.name,
    balloonContentBody: place.category
  }, {
    preset: 'islands#circleDotIcon',
    iconColor: '#2D5016'
  });
  map.geoObjects.add(placemark);
}

function renderPlaceDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id') || 'kerzhenskiy';
  const place = detailedPlaces.find(item => item.id === id) || detailedPlaces[0];

  const title = document.getElementById('place-title');
  const category = document.getElementById('place-category');
  const photo = document.getElementById('place-photo');
  const breadcrumbs = document.getElementById('breadcrumbs');
  const description = document.getElementById('place-description');
  const travel = document.getElementById('place-travel');
  const gear = document.getElementById('place-gear');
  const similar = document.getElementById('place-similar');

  if (!title || !category || !photo || !breadcrumbs) return;

  title.textContent = place.name;
  category.textContent = place.category;
  photo.src = place.photo;
  breadcrumbs.innerHTML = `
    <a href="../index.html">Главная</a>
    <span> / </span>
    <a href="places.html">Места</a>
    <span> / </span>
    <span>${place.name}</span>
  `;
  description.innerHTML = place.description.map(paragraph => `<p>${paragraph}</p>`).join('');
  travel.textContent = place.travel;
  gear.innerHTML = `<ul>${place.gear.map(item => `<li>${item}</li>`).join('')}</ul>`;
  similar.innerHTML = place.similar.map(name => `<li>${name}</li>`).join('');

  loadYandexMapScript(() => ymaps.ready(() => initDetailMap(place)));
}

window.addEventListener('DOMContentLoaded', renderPlaceDetail);
