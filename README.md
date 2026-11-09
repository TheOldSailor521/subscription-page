## SubPage

Кастомная страница подписки Remnawave с фиолетовым акцентом, светлой и тёмной темами.
Основана на [remnawave/subscription-page](https://github.com/remnawave/subscription-page),
лицензия AGPL-3.0. Документация панели: [docs.rw](https://docs.rw/).

### Docker-образ

```text
ghcr.io/theoldsailor521/subscription-page:latest
```

Образ собирается из этого репозитория и включает backend и production-сборку нашего
фронтенда. Поддерживаются `linux/amd64` и `linux/arm64`. Демоданные локального preview
в образ не входят: сервер получает настоящую подписку и конфигурацию от панели Remnawave.

GitHub Actions публикует `latest` при push в `main`, а также тег
`sha-<полный SHA коммита>`. Для релиза можно отправить Git-тег вида `v1.0.0`;
он станет отдельным тегом Docker-образа. Для фиксации версии на сервере используйте
тег SHA или digest вместо `latest`.

При первой публикации GitHub создаёт пакет приватным. Для загрузки без авторизации
в [настройках пакета](https://github.com/users/TheOldSailor521/packages/container/subscription-page/settings)
нужно один раз выбрать **Change visibility → Public**. Это отдельная настройка
от публичности репозитория. См. [документацию GitHub](https://docs.github.com/en/packages/learn-github-packages/configuring-a-packages-access-control-and-visibility).

### Обновление существующего сервера

В вашем Compose-файле замените только ссылку на образ:

```yaml
services:
  remnawave-subscription-page:
    image: ghcr.io/theoldsailor521/subscription-page:latest
```

Сохраните текущие переменные окружения, порты, сети и настройки reverse proxy.
Затем выполните из каталога своего Compose-проекта:

```bash
docker compose pull remnawave-subscription-page
docker compose up -d --no-deps remnawave-subscription-page
docker compose logs --tail=100 remnawave-subscription-page
```

Если сервис у вас называется иначе, подставьте его имя.

### Новый сервер с Compose из этого репозитория

```bash
cp .env.sample .env
```

Заполните `REMNAWAVE_PANEL_URL` и `REMNAWAVE_API_TOKEN` в `.env`.
В `docker-compose-prod.yml` используется уже существующая внешняя сеть
`remnawave-network`: панель должна быть доступна контейнеру по указанному URL.
Порт приложения по умолчанию `3010` опубликован только на `127.0.0.1` для reverse proxy.

```bash
docker compose -f docker-compose-prod.yml pull
docker compose -f docker-compose-prod.yml up -d
```

### Локальная сборка образа

```bash
docker build -t subpage:local .
```

Предварительная сборка фронтенда на хосте не требуется. `.dockerignore` исключает
локальные `.env`, зависимости, результаты анализа и демосервер preview.
