(function () {
    var root = document.getElementById("link-root");
    if (!root) return;

    var type = root.getAttribute("data-type") || "";
    var params = new URLSearchParams(window.location.search || "");
    var id = params.get("id") || "";

    if (!id) {
        var parts = window.location.pathname.split("/").filter(Boolean);
        var last = parts.length ? parts[parts.length - 1] : "";
        if (last && ["u", "g", "c", "i"].indexOf(last) === -1 && !/\.html?$/.test(last)) {
            id = last;
        }
    }
    id = decodeURIComponent(id || "").replace(/\/+$/, "");

    var title = document.getElementById("link-title");
    var subtitle = document.getElementById("link-subtitle");
    var target = document.getElementById("link-target");
    var statusEl = document.getElementById("link-status");
    var openBtn = document.getElementById("link-open");
    var downloadBtn = document.getElementById("link-download");

    var kindName = type === "u" ? "профиль" : type === "g" ? "группу" : "канал";
    title.textContent = "Открываем " + kindName;

    if (!id) {
        title.textContent = "Ссылка неполная";
        subtitle.textContent = "В ссылке нет идентификатора. Откройте приложение или скачайте его.";
        target.classList.add("hidden");
        openBtn.classList.add("hidden");
        return;
    }

    var deepLink = "thunderlight://" + type + "/" + encodeURIComponent(id);
    var downloadUrl = "/download/?from=link";
    var isAndroid = /Android/i.test(navigator.userAgent || "");
    var isChrome = /Chrome|CriOS/i.test(navigator.userAgent || "");

    // Chrome понимает intent:// и сам откроет приложение,
    // а при его отсутствии перейдёт по browser_fallback_url.
    var intentUrl = "intent://" + type + "/" + encodeURIComponent(id) +
        "#Intent;scheme=thunderlight;package=com.example.thunderlight2;" +
        "S.browser_fallback_url=" + encodeURIComponent(downloadUrl) + ";end";

    var launchUrl = isAndroid ? intentUrl : deepLink;

    target.textContent = (type === "u" ? "@" : "") + id;
    openBtn.href = launchUrl;
    subtitle.textContent = "Если ThunderLight установлен, ссылка откроется в приложении.";

    var left = false;
    document.addEventListener("visibilitychange", function () {
        if (document.hidden) left = true;
    });
    window.addEventListener("pagehide", function () { left = true; });

    function tryLaunch() {
        left = true;
        window.location.href = launchUrl;
    }

    // Автопопытка. В Chrome без жеста может быть заблокирована —
    // тогда остаётся кнопка и ссылка на загрузку.
    statusEl.textContent = "Пытаемся открыть приложение…";
    setTimeout(tryLaunch, 350);

    setTimeout(function () {
        if (left || document.hidden) return;
        statusEl.textContent = "Не открылось? Нажмите «Открыть в приложении» или скачайте ThunderLight.";
    }, 2600);

    openBtn.addEventListener("click", function (e) {
        e.preventDefault();
        statusEl.textContent = "Открываем приложение…";
        window.location.href = launchUrl;
    });

    // В не-Chrome браузерах intent:// не поддерживается — уводим на загрузку,
    // если приложение так и не открылось.
    if (!isChrome) {
        setTimeout(function () {
            if (!left && !document.hidden) {
                window.location.href = downloadUrl;
            }
        }, 4500);
    }
})();
