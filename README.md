# Тестовое задание: frontend + graphql

Создайте single page application, работающий c Github GraphQL API. Приложение представляет из себя «менеджер» для работы с issues на гитхабе.

На стартовом экране нужно выбрать/ввести репозиторий. После выбора для пользователя отображается список всех открытых issues в этом репозитории (название, текст и количество комментариев). Так же для issue должна быть возможность добавить комментарий.

Нужно использовать React и Github GraphQL API. Можно использовать любые сторонние билбиотеки.

## Пожелания:

- Readme с описанием проекта и шагов запуска
- Приятный и удобный интерфейс
- Адекватная обработка ошибок

## Сборка и запуск

Стандартный набор скриптов `npm run start` , `npm run build`. Генерация типов TypeScript и react хуков на основе схемы GraphQL - `npm run generator`.

Для авторизации на github необходим personal access token. Подробнее здесь https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token .

Рабочая сборка на github pages https://alex461919-test.github.io/graphql_github/ .

Нарисовалась проблема совместимости github actions, github pages и BrowserRouter. Детально разбираться лень было, перешел на HashRouter.
