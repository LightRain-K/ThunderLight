# ⚡️ ThunderLight 

<p align="center">
  <img src="https://thuderlight.online/logocircle.ico" alt="ThunderLight Logo" width="120" height="120">
</p>

<h3 align="center">Приватный мессенджер нового поколения со сквозным шифрованием (E2EE)</h3>

<p align="center">
  <a href="https://thuderlight.online/"><img src="https://img.shields.io/badge/Website-thuderlight.online-blue?style=flat-square&logo=google-chrome&logoColor=white" alt="Website"></a>
  <img src="https://img.shields.io/badge/Security-E2EE-emerald?style=flat-square&logo=shield&logoColor=white" alt="Security E2EE">
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License">
</p>

---

**ThunderLight** — это бесплатный, быстрый и абсолютно анонимный мессенджер с открытым исходным кодом. Наша главная цель — дать пользователям полный контроль над их личными данными и перепиской без необходимости доверять централизованным серверам.

> 🌐 **Попробуйте интерактивный симулятор шифрования прямо на нашем сайте:** [thuderlight.online](https://thuderlight.online/)

---

## ✨ Основные особенности (Features)

* **🔒 Сквозное шифрование (E2EE):** Все сообщения шифруются прямо на вашем устройстве перед отправкой. Ни провайдер, ни владельцы серверов не могут перехватить или прочесть ваш трафик.
* **🕵️ Полная анонимность:** Никакой регистрации по номеру телефона или почте. Только уникальные криптографические ключи.
* **⚡️ Высокая скорость:** Современный стек технологий обеспечивает мгновенную доставку сообщений с минимальным пингом.
* **🌐 Web RTC & P2P:** Прямое соединение между собеседниками для максимальной независимости.

---

## 🛠 Технологический стек

Проект разделен на несколько независимых модулей для обеспечения безопасности и кроссплатформенности:

* **Frontend (Лендинг):** HTML5, TailwindCSS, JavaScript (чистый JS без тяжелых фреймворков для мгновенной загрузки).
* **Сетевой уровень:** WebRTC, Web Crypto API.
* **Веб-сервер:** Nginx (с полной поддержкой современных протоколов HTTP/2, IPv4 и IPv6).

---

## 🚀 Как развернуть проект локально

Если вы хотите запустить веб-сайт проекта у себя на локальной машине:

1. **Клонируйте репозиторий:**
   ```bash
   git clone [https://github.com/kirill2009kazakov16/thunderlight.git](https://github.com/kirill2009kazakov16/thunderlight.git)
   cd thunderlight
