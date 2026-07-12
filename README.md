# Store

Учебный интернет-магазин на React. В приложении есть регистрация, авторизация, каталог товаров, фильтр по категориям, страница товара, профиль и корзина.

## Стек

- React
- TypeScript
- Vite
- React Router
- Zustand
- CSS Modules
- json-server-auth

## Запуск

Установить зависимости:

```bash
npm install
```

Запустить fake API:

```bash
npm run server
```

Запустить frontend в отдельном терминале:

```bash
npm run dev
```

После запуска приложение будет доступно по адресу, который покажет Vite в терминале.

## Дополнительные команды

Проверка кода:

```bash
npm run lint
```

Сборка проекта:

```bash
npm run build
```

Предпросмотр production-сборки:

```bash
npm run preview
```

## Fake API

Данные для fake API лежат в `server/db.json`.

Права доступа для `json-server-auth` настроены в `server/routes.json`.

Frontend обращается к API через `/api`, proxy настроен в `vite.config.ts`.
