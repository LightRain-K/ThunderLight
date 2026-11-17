(function () {
  var btn = document.getElementById('mobileMenuBtn');
  var links = document.getElementById('navLinks');
  if (btn && links) {
    btn.addEventListener('click', function () { links.classList.toggle('open'); });
    links.addEventListener('click', function (event) {
      if (event.target.tagName === 'A') links.classList.remove('open');
    });
  }
})();

function tlToast(message) {
  var el = document.querySelector('.toast');
  if (!el) {
    el = document.createElement('div');
    el.className = 'toast';
    document.body.appendChild(el);
  }
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(el._timer);
  el._timer = setTimeout(function () { el.classList.remove('show'); }, 1800);
}

function tlCopy(text, okMessage) {
  var done = function () { tlToast(okMessage || 'Скопировано'); };
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(done, function () { tlFallbackCopy(text, done); });
  } else {
    tlFallbackCopy(text, done);
  }
}

function tlFallbackCopy(text, done) {
  var area = document.createElement('textarea');
  area.value = text;
  area.style.position = 'fixed';
  area.style.opacity = '0';
  document.body.appendChild(area);
  area.select();
  try { document.execCommand('copy'); done(); } catch (e) { tlToast('Не удалось скопировать'); }
  document.body.removeChild(area);
}

function tlFormatNumber(value, digits) {
  if (!isFinite(value)) return '—';
  var d = typeof digits === 'number' ? digits : 2;
  return Number(value.toFixed(d)).toLocaleString('ru-RU');
}

(function () {
  try {
    var match = location.pathname.match(/^\/tools\/([a-z0-9-]+)\.html$/i);
    if (match && match[1] !== 'index') {
      var slug = match[1];
      var title = (document.title || '').split(' — ')[0];
      var list = JSON.parse(localStorage.getItem('tl_recent') || '[]');
      list = list.filter(function (item) { return item.slug !== slug; });
      list.unshift({ slug: slug, title: title, time: Date.now() });
      localStorage.setItem('tl_recent', JSON.stringify(list.slice(0, 6)));
    }
  } catch (e) { /* storage may be unavailable */ }
})();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js').catch(function () { /* offline mode unavailable */ });
  });
}

