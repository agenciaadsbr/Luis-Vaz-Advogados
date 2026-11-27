/* LP: visita, revelação ao rolar e formulário */
(function () {
  // 1) Registra a visita
  if (window.LP) window.LP.trackVisit();

  // 2) Revelar ao rolar (o topo nunca fica escondido)
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('js');
    var els = document.querySelectorAll('section:not(#topo) > div, footer > div');
    els.forEach(function (el) { el.classList.add('rv'); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });
    els.forEach(function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('in');
      else io.observe(el);
    });
  }

  // 3) Formulário
  var form = document.getElementById('lead-form');
  if (!form) return;
  var nome = document.getElementById('f-nome');
  var tel = document.getElementById('f-tel');
  var hp = document.getElementById('f-site');
  var btn = document.getElementById('f-btn');
  var btnTxt = document.getElementById('f-btn-txt');
  var msg = document.getElementById('f-msg');
  var fNome = document.getElementById('fld-nome');
  var fTel = document.getElementById('fld-tel');
  var C = window.LP_CONFIG || {};
  var tried = false, busy = false, fails = 0;

  function mask(v) {
    var d = String(v || '').replace(/\D/g, '');
    if (d.length > 11 && d.indexOf('55') === 0) d = d.slice(2);
    d = d.slice(0, 11);
    if (!d.length) return '';
    if (d.length < 3) return '(' + d;
    if (d.length < 7) return '(' + d.slice(0, 2) + ') ' + d.slice(2);
    if (d.length < 11) return '(' + d.slice(0, 2) + ') ' + d.slice(2, 6) + '-' + d.slice(6);
    return '(' + d.slice(0, 2) + ') ' + d.slice(2, 7) + '-' + d.slice(7);
  }
  function digits() { return tel.value.replace(/\D/g, ''); }
  function cleanName() { return nome.value.trim().replace(/\s+/g, ' '); }
  function nameOk() { return cleanName().length >= 3; }
  function telOk() {
    var d = digits();
    if (d.length !== 11) return false;            // celular com DDD
    if (d[0] === '0' || d[2] !== '9') return false; // DDD válido + 9º dígito
    return !/^(\d)\1+$/.test(d);
  }
  function validate() {
    fNome.classList.toggle('bad', tried && !nameOk());
    fTel.classList.toggle('bad', tried && !telOk());
    nome.setAttribute('aria-invalid', tried && !nameOk() ? 'true' : 'false');
    tel.setAttribute('aria-invalid', tried && !telOk() ? 'true' : 'false');
    return nameOk() && telOk();
  }

  tel.addEventListener('input', function () {
    var end = tel.selectionStart === tel.value.length;
    tel.value = mask(tel.value);
    if (end) tel.setSelectionRange(tel.value.length, tel.value.length);
    if (tried) validate();
  });
  nome.addEventListener('input', function () { if (tried) validate(); });

  function newLeadId() {
    try { if (window.crypto && crypto.randomUUID) return crypto.randomUUID(); } catch (e) {}
    return 'lv-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
  }

  function setBusy(on) {
    busy = on;
    btn.disabled = on;
    btn.classList.toggle('sending', on);
    btnTxt.textContent = on ? 'Enviando…' : 'Solicitar análise do meu caso';
  }

  function showError() {
    fails += 1;
    var wa = 'https://wa.me/' + String(C.WHATSAPP_NUMBER || '').replace(/\D/g, '');
    msg.innerHTML = '';
    msg.appendChild(document.createTextNode('Não foi possível enviar agora. Verifique sua conexão e tente de novo.'));
    if (fails >= 2) {
      msg.appendChild(document.createTextNode(' Se preferir, '));
      var a = document.createElement('a');
      a.href = wa; a.target = '_blank'; a.rel = 'noopener';
      a.textContent = 'fale direto pelo WhatsApp';
      msg.appendChild(a);
      msg.appendChild(document.createTextNode('.'));
    }
    msg.classList.add('on');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (busy) return;
    tried = true;
    msg.classList.remove('on');
    if (!validate()) { (nameOk() ? tel : nome).focus(); return; }
    if (hp && hp.value) return; // bot

    var n = cleanName();
    var w = '55' + digits();
    setBusy(true);

    // Só segue para a /redirect depois que o Supabase confirmar a gravação
    var timedOut = false;
    var timer = setTimeout(function () { timedOut = true; setBusy(false); showError(); }, 12000);
    window.LP.saveLead(n, w).then(function () {
      if (timedOut) return;
      clearTimeout(timer);
      window.LP.store('lp_lead_nome', n.split(' ')[0]);
      window.LP.store('lp_lead_id', newLeadId());
      location.href = '/redirect';
    }).catch(function () {
      if (timedOut) return;
      clearTimeout(timer);
      setBusy(false);
      showError();
    });
  });
})();
