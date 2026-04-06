# ННаш гид — Экотуризм Нижегородской области

## Установка

1. Клонируй репозиторий
2. Скопируй `config.example.js` → `config.js`
3. Вставь свои API ключи в `config.js`:
   - `YANDEX_MAPS_KEY` — получить на https://developer.tech.yandex.ru/
   - `CLAUDE_API_KEY` — получить на https://console.anthropic.com/
4. Открой `index.html` в браузере или задеплой на GitHub Pages

## Деплой на GitHub Pages

Settings → Pages → Source: main branch / root

## Структура проекта

- `index.html` — главная страница
- `pages/places.html` — список мест
- `pages/map.html` — карта Нижегородской области
- `pages/routes.html` — готовые маршруты
- `pages/route-builder.html` — ИИ-конструктор маршрутов
- `pages/place-detail.html` — детальная страница места
- `pages/about.html` — о проекте
- `pages/blog.html` — истории и заметки
- `pages/events.html` — события и экскурсии
- `pages/partners.html` — партнёрам
- `css/` — стили
- `js/` — скрипты
- `assets/fonts/` — шрифты

## Безопасность API

API ключи должны храниться только в `config.js` и не попадать в коммит. В файле `config.example.js` оставлены заглушки.
