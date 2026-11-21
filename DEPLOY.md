# Деплой сайта и ссылки

Сайт лежит в этом репозитории (`site_repo`) и деплоится автоматически:
пуш в `main` → GitHub Actions `.github/workflows/main.yml` → rsync на VPS
в `/var/www/thunderlight` → `systemctl reload nginx`.

```powershell
cd site_repo
git add .
git commit -m "Links + download page"
git push origin main
```

## Ссылки

Приложение делится ссылками вида:

- `https://thuderlight.online/u/?id=username`
- `https://thuderlight.online/g/?id=chatId`
- `https://thuderlight.online/c/?id=channelId`

Эти страницы (`u/`, `g/`, `c/`) — обычные статические `index.html`, поэтому
работают на nginx сразу, без настройки rewrite. Страница пробует открыть
`thunderlight://...`, а если приложения нет — через ~4 секунды переходит на
`/download/`.

Страница загрузки: `https://thuderlight.online/download/` — берёт версию и
changelog из `/version.json`, даёт кнопку APK и инструкцию по установке.

## Красивые пути `/u/username` (опционально)

Сейчас поддерживаются и «длинные» ссылки `/u/username` — их обрабатывает
`404.html`. Чтобы nginx отдавал его, добавьте в конфиг сайта
(`/etc/nginx/sites-available/...`, внутри `server { ... }`):

```nginx
# Красивые ссылки /u/name -> /u/?id=name
location ~ ^/(u|g|c)/(.+)$ {
    return 302 /$1/?id=$2;
}

# Кастомная 404 со ссылкой на приложение/загрузку
error_page 404 /404.html;
location = /404.html {
    internal;
}
```

Проверить и применить:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

## Android App Links (опционально)

Чтобы Android открывал ссылки сразу в приложении, нужен файл
`https://thuderlight.online/.well-known/assetlinks.json` с SHA-256
отпечатком **release**-сертификата. Сейчас там лежит отпечаток debug-ключа —
он подходит только для тестовых сборок.

Получить отпечаток release-ключа:

```bash
keytool -list -v -keystore app/thunderlight-key.jks -alias <alias>
```

Добавьте его в массив `sha256_cert_fingerprints` в
`site_repo/.well-known/assetlinks.json`.

Без правильного отпечатка ссылки всё равно работают: открывается браузер →
страница-обработчик → `thunderlight://` → приложение.

## Проверка локально

```bash
# из корня site_repo
python -m http.server 8080
```

Откройте `http://localhost:8080/u/?id=test` — страница должна попытаться
открыть приложение и показать кнопку загрузки.
