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
