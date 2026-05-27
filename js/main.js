/* ═══════════════════════════════════════════════
   PREM VIJAY KADAM — main.js v3 FINAL
   Cursor · Navbar · Drawer · Typewriter
   3D Torus Knot · Scroll Anim · Skill Bars · Form
═══════════════════════════════════════════════ */

/* ─────────────────────────────────────────────
   1. CURSOR
───────────────────────────────────────────── */
(function () {
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  let mx = -200, my = -200, rx = -200, ry = -200;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  (function animRing() {
    rx += (mx - rx) * 0.13;
    ry += (my - ry) * 0.13;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  })();

  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.width        = '54px';
      ring.style.height       = '54px';
      ring.style.borderColor  = 'rgba(0,212,212,.85)';
      ring.style.boxShadow    = '0 0 22px 4px rgba(0,212,212,.28)';
      ring.style.opacity      = '.5';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.width        = '36px';
      ring.style.height       = '36px';
      ring.style.borderColor  = 'rgba(0,212,212,.55)';
      ring.style.boxShadow    = '0 0 16px 2px rgba(0,212,212,.15)';
      ring.style.opacity      = '.6';
    });
  });
})();


/* ─────────────────────────────────────────────
   2. NAVBAR — frosted on scroll
───────────────────────────────────────────── */
(function () {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });
})();


/* ─────────────────────────────────────────────
   3. MOBILE DRAWER
───────────────────────────────────────────── */
(function () {
  const burger   = document.getElementById('hamburger');
  const drawer   = document.getElementById('drawer');
  const bg       = document.getElementById('drawerBg');
  const closeBtn = document.getElementById('drawerClose');
  if (!burger) return;

  const open  = () => { drawer.classList.add('on'); bg.classList.add('on'); document.body.style.overflow = 'hidden'; };
  const close = () => { drawer.classList.remove('on'); bg.classList.remove('on'); document.body.style.overflow = ''; };

  burger.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  bg.addEventListener('click', close);
  document.querySelectorAll('.drawer-link, .drawer-cta').forEach(l => l.addEventListener('click', close));
})();


/* ─────────────────────────────────────────────
   4. TYPEWRITER
───────────────────────────────────────────── */
(function () {
  const el = document.getElementById('typewriter');
  if (!el) return;
  const words = ['Web Designer', 'UI/UX Creator', 'Digital Builder', 'SEO Strategist', 'Front-End Dev'];
  let wi = 0, ci = 0, del = false;

  function tick() {
    const w = words[wi];
    if (!del) {
      el.textContent = w.slice(0, ++ci);
      if (ci === w.length) { del = true; setTimeout(tick, 2000); return; }
    } else {
      el.textContent = w.slice(0, --ci);
      if (ci === 0) { del = false; wi = (wi + 1) % words.length; }
    }
    setTimeout(tick, del ? 55 : 95);
  }
  setTimeout(tick, 900);
})();


/* ─────────────────────────────────────────────
   5. SCROLL FADE-UP
───────────────────────────────────────────── */
(function () {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
})();


/* ─────────────────────────────────────────────
   6. STAT COUNTER
───────────────────────────────────────────── */
(function () {
  const nums = document.querySelectorAll('.stat-n');
  let done = false;
  const obs = new IntersectionObserver(entries => {
    if (done || !entries[0].isIntersecting) return;
    done = true;
    nums.forEach(el => {
      const target = +el.dataset.target;
      let cur = 0;
      const id = setInterval(() => {
        cur = Math.min(cur + 1, target);
        el.textContent = cur;
        if (cur >= target) clearInterval(id);
      }, 130);
    });
  }, { threshold: 0.5 });
  const s = document.querySelector('.hero-stats');
  if (s) obs.observe(s);
})();


/* ─────────────────────────────────────────────
   7. SKILL BARS
───────────────────────────────────────────── */
(function () {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.sk-fill').forEach(b => b.style.width = b.dataset.w + '%');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.25 });
  const s = document.querySelector('.skills');
  if (s) obs.observe(s);
})();


/* ─────────────────────────────────────────────
   8. THREE.JS — White + Cyan Torus Knot
      Canvas is sized to the wrapper element,
      NOT the viewport — fixes clipping issue.
───────────────────────────────────────────── */
(function () {
  const canvas = document.getElementById('threeCanvas');
  const wrap   = document.getElementById('hero3d');
  if (!canvas || !wrap || typeof THREE === 'undefined') return;

  const scene    = new THREE.Scene();
  const camera   = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0, 5.2);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  function resize() {
    const s = canvas.clientWidth || wrap.clientWidth;
    if (s < 10) return;
    renderer.setSize(s, s, false);
    camera.updateProjectionMatrix();
  }
  setTimeout(resize, 80);
  window.addEventListener('resize', () => setTimeout(resize, 80));

  /* ── Main knot — white wireframe, SMALLER (0.92 radius) ── */
  const kGeo = new THREE.TorusKnotGeometry(0.92, 0.27, 200, 28, 2, 3);
  const kMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.52 });
  const knot = new THREE.Mesh(kGeo, kMat);
  scene.add(knot);

  /* ── Inner knot — cyan ── */
  const iGeo = new THREE.TorusKnotGeometry(0.48, 0.13, 120, 16, 3, 4);
  const iMat = new THREE.MeshBasicMaterial({ color: 0x00d4d4, wireframe: true, transparent: true, opacity: 0.38 });
  const inner = new THREE.Mesh(iGeo, iMat);
  scene.add(inner);

  /* ── Orbit ring — cyan ── */
  const rGeo = new THREE.TorusGeometry(1.46, 0.01, 8, 160);
  const rMat = new THREE.MeshBasicMaterial({ color: 0x00d4d4, transparent: true, opacity: 0.22 });
  const ring  = new THREE.Mesh(rGeo, rMat);
  ring.rotation.x = Math.PI / 2;
  scene.add(ring);

  /* ── Particles — cyan ── */
  const pc = 140, pp = new Float32Array(pc * 3);
  for (let i = 0; i < pc * 3; i += 3) {
    const t = Math.random() * Math.PI * 2;
    const p = Math.acos(2 * Math.random() - 1);
    const r = 1.3 + Math.random() * 0.65;
    pp[i] = r * Math.sin(p) * Math.cos(t);
    pp[i+1] = r * Math.sin(p) * Math.sin(t);
    pp[i+2] = r * Math.cos(p);
  }
  const pgeo = new THREE.BufferGeometry();
  pgeo.setAttribute('position', new THREE.BufferAttribute(pp, 3));
  const pts = new THREE.Points(pgeo, new THREE.PointsMaterial({ color: 0x00d4d4, size: 0.024, transparent: true, opacity: 0.45 }));
  scene.add(pts);

  /* ── Mouse parallax ── */
  let tx = 0, ty = 0, cx = 0, cy = 0;
  document.addEventListener('mousemove', e => {
    tx = (e.clientX / window.innerWidth  - 0.5) * 0.65;
    ty = (e.clientY / window.innerHeight - 0.5) * -0.45;
  });

  const clock = new THREE.Clock();
  (function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    knot.rotation.x  = t * 0.16;
    knot.rotation.y  = t * 0.25;
    knot.rotation.z  = t * 0.07;
    inner.rotation.x = -t * 0.22;
    inner.rotation.y = t * 0.32;
    ring.rotation.z  = t * 0.10;
    pts.rotation.y   = t * 0.05;
    pts.rotation.x   = t * 0.03;

    cx += (tx - cx) * 0.055;
    cy += (ty - cy) * 0.055;
    scene.rotation.y = cx;
    scene.rotation.x = cy;

    const s = 1 + Math.sin(t * 0.85) * 0.025;
    knot.scale.setScalar(s);
    kMat.opacity = 0.42 + Math.sin(t * 0.65) * 0.1;
    rMat.opacity = 0.12 + Math.sin(t * 1.1)  * 0.1;

    renderer.render(scene, camera);
  })();
})();


/* ─────────────────────────────────────────────
   9. ACTIVE NAV LINK
───────────────────────────────────────────── */
(function () {
  const secs  = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link');
  window.addEventListener('scroll', () => {
    let cur = '';
    secs.forEach(s => { if (window.scrollY >= s.offsetTop - 120) cur = s.id; });
    links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + cur));
  });
})();


/* ─────────────────────────────────────────────
   10. CONTACT FORM
───────────────────────────────────────────── */
function handleForm(e) {
  e.preventDefault();
  const btn  = document.querySelector('.btn-submit');
  const txt  = document.getElementById('btnTxt');
  const ico  = document.getElementById('btnIco');
  const note = document.getElementById('formNote');

  btn.disabled    = true;
  txt.textContent = 'Sending…';

  setTimeout(() => {
    txt.textContent = 'Message Sent!';
    ico.className   = 'fa-solid fa-check';
    note.textContent = "Thanks! I'll get back within 24 hours.";
    note.className   = 'fnote ok';
    setTimeout(() => {
      document.getElementById('contactForm').reset();
      txt.textContent = 'Send Message';
      ico.className   = 'fa-solid fa-paper-plane';
      note.textContent = '';
      note.className   = 'fnote';
      btn.disabled     = false;
    }, 3500);
  }, 1200);
}


/* ─────────────────────────────────────────────
   11. SMOOTH SCROLL WITH OFFSET
───────────────────────────────────────────── */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (!t) return;
      e.preventDefault();
      window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 68, behavior: 'smooth' });
    });
  });
})();
