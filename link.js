(function () {
    var root = document.getElementById("link-root");
    if (!root) return;

    var type = root.getAttribute("data-type") || "";
    var params = new URLSearchParams(window.location.search || "");
    var id = params.get("id") || "";

    // Поддержка и /u/?id=name, и /u/name (если nginx сделает rewrite)
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
    target.textContent = (type === "u" ? "@" : "") + id;
    openBtn.href = deepLink;
    subtitle.textContent = "Если ThunderLight установлен, ссылка откроется в приложении.";

    var left = false;
    document.addEventListener("visibilitychange", function () {
        if (document.hidden) left = true;
    });
    window.addEventListener("pagehide", function () { left = true; });

    function tryDeepLink() {
        left = true;
        window.location.href = deepLink;
    }

    statusEl.textContent = "Пытаемся открыть приложение…";
    setTimeout(tryDeepLink, 300);

    // Если приложение не открылось — через пару секунд ведём на загрузку
    setTimeout(function () {
        if (left || document.hidden) return;
        statusEl.textContent = "Приложение не найдено — открываем страницу загрузки…";
        setTimeout(function () {
            if (!left && !document.hidden) {
                window.location.href = "/download/?from=link";
            }
        }, 1300);
    }, 2600);

    openBtn.addEventListener("click", function (e) {
        e.preventDefault();
        statusEl.textContent = "Открываем приложение…";
        tryDeepLink();
    });
})();
