// we-app.js — vanilla JS interactivity for the homepage
// Hero pane switcher, mini-pane demo, keyboard demo pulser, shortcut map readout.

(function () {
  'use strict';

  // ───────── Hero pane switcher ─────────
  const heroShots = document.querySelectorAll('.we-screenshot-stack .we-screenshot');
  const heroBtns = document.querySelectorAll('.hero-try-key');
  let lastInteraction = 0;

  function applyHeroPanes(n) {
    heroShots.forEach(img => {
      img.dataset.active = (parseInt(img.dataset.n, 10) === n) ? 'true' : 'false';
    });
    heroBtns.forEach(btn => {
      btn.dataset.active = (parseInt(btn.dataset.n, 10) === n) ? 'true' : 'false';
    });
  }

  function setHeroPaneCount(n, fromUser) {
    if (fromUser) lastInteraction = Date.now();
    applyHeroPanes(n);
  }

  heroBtns.forEach(btn => {
    btn.addEventListener('click', () => setHeroPaneCount(parseInt(btn.dataset.n, 10), true));
  });

  window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (['1','2','3','5'].includes(e.key)) {
      setHeroPaneCount(parseInt(e.key, 10), true);
    }
  });

  if (heroShots.length === 4) {
    const seq = [3, 5, 1, 2, 3];
    let seqIdx = 0;
    setInterval(() => {
      if (Date.now() - lastInteraction < 12000) return;
      seqIdx = (seqIdx + 1) % seq.length;
      applyHeroPanes(seq[seqIdx]);
    }, 3500);
  }

  // ───────── Mini-pane demo (features card 01) ─────────
  const miniPanes = document.querySelectorAll('.mini-pane-wrap .mini-pane-img');
  const miniLabel = document.querySelector('.mini-pane-label');
  if (miniPanes.length === 4) {
    const mSeq = [3, 5, 1, 2, 3];
    let mIdx = 0;
    function applyMini(n) {
      miniPanes.forEach(img => {
        img.dataset.active = (parseInt(img.dataset.n, 10) === n) ? 'true' : 'false';
      });
      if (miniLabel) miniLabel.textContent = n + '-pane';
    }
    applyMini(mSeq[mIdx]);
    setInterval(() => {
      mIdx = (mIdx + 1) % mSeq.length;
      applyMini(mSeq[mIdx]);
    }, 1800);
  }

  // ───────── Keyboard demo (features card 02) ─────────
  const kbdRows = document.querySelectorAll('.kbd-demo .kbd-demo-row');
  if (kbdRows.length > 0) {
    let kIdx = 0;
    function applyKbd() {
      kbdRows.forEach((r, i) => {
        r.dataset.pulsing = (i === kIdx) ? 'true' : 'false';
      });
    }
    applyKbd();
    setInterval(() => {
      kIdx = (kIdx + 1) % kbdRows.length;
      applyKbd();
    }, 1400);
  }

  // ───────── Shortcuts kbmap (hover readout) ─────────
  const SHORTCUTS = {
    '←': 'Previous image',
    '→': 'Next image',
    '↑': 'Jump back 10',
    '↓': 'Jump forward 10',
    'Home': 'First image',
    'End': 'Last image',
    'Space': 'Start / pause slideshow',
    'I': 'Toggle EXIF inspector',
    'F': 'Toggle fullscreen',
    'S': 'Toggle shuffle',
    '1': 'Single pane',
    '2': 'Two panes',
    '3': 'Three panes (default)',
    '5': 'Five panes',
    '⌘O': 'Open folder',
    '⌘W': 'Close window',
    '⌘Q': 'Quit',
    'Esc': 'Exit fullscreen',
  };
  const kbmapKeys = document.querySelectorAll('.kbmap-key');
  const kbmapReadout = document.querySelector('.kbmap-readout');
  const DEFAULT_READOUT = 'Hover any key to see what it does.';

  function setReadout(text) {
    if (!kbmapReadout) return;
    if (text && text.indexOf('—') !== -1) {
      kbmapReadout.innerHTML = text.replace(/—\s*(.+)$/, '— <span class="accent">$1</span>');
    } else {
      kbmapReadout.textContent = text || DEFAULT_READOUT;
    }
  }
  if (kbmapReadout) setReadout(DEFAULT_READOUT);

  kbmapKeys.forEach(key => {
    const label = key.dataset.k || key.textContent.trim();
    const action = SHORTCUTS[label];
    key.addEventListener('mouseenter', () => setReadout(action ? (label + ' — ' + action) : null));
    key.addEventListener('mouseleave', () => setReadout(null));
  });
})();
