(function(){
  const toggle = document.querySelector('[data-menu-toggle]');
  const panel = document.querySelector('[data-mobile-menu]');
  const header = document.querySelector('[data-header]');

  function setMenu(open){
    if(!toggle || !panel) return;
    const openLabel = toggle.dataset.openLabel || 'Open menu';
    const closeLabel = toggle.dataset.closeLabel || 'Close menu';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? closeLabel : openLabel);
    panel.hidden = !open;
    document.body.classList.toggle('menu-open', open);
  }

  if(toggle && panel){
    setMenu(false);
    toggle.addEventListener('click', function(event){
      event.stopPropagation();
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });

    panel.addEventListener('click', function(event){
      const target = event.target.closest('a');
      if(target) setMenu(false);
    });

    document.addEventListener('click', function(event){
      if(toggle.getAttribute('aria-expanded') === 'true' && header && !header.contains(event.target)){
        setMenu(false);
      }
    });

    document.addEventListener('keydown', function(event){
      if(event.key === 'Escape') setMenu(false);
    });

    window.addEventListener('resize', function(){
      if(window.innerWidth > 980) setMenu(false);
    });
  }

  const filterBtns=[...document.querySelectorAll('[data-filter-btn]')];
  const cards=[...document.querySelectorAll('[data-project-card]')];
  let currentFilter='all';
  const loadBtn=document.querySelector('[data-load-more]');
  let visibleLimit=12;

  function applyFilters(){
    let shown=0;
    cards.forEach(card=>{
      const filters=(card.dataset.filter||'').split(' ');
      const match=currentFilter==='all'||filters.includes(currentFilter);
      card.classList.remove('hidden-by-load');
      if(match&&shown<visibleLimit){card.classList.remove('is-hidden');shown++;}
      else{card.classList.add('is-hidden');if(match)card.classList.add('hidden-by-load');}
    });
    if(loadBtn){
      const more=cards.some(c=>c.classList.contains('hidden-by-load'));
      loadBtn.style.display=more?'inline-flex':'none';
    }
  }

  if(cards.length){applyFilters();}
  filterBtns.forEach(btn=>btn.addEventListener('click',()=>{
    currentFilter=btn.dataset.filterBtn;
    visibleLimit=12;
    filterBtns.forEach(b=>b.setAttribute('aria-pressed',String(b===btn)));
    applyFilters();
  }));
  if(loadBtn){loadBtn.addEventListener('click',()=>{visibleLimit+=12;applyFilters();});}

  document.querySelectorAll('[data-static-form]').forEach(form=>{
    form.addEventListener('submit',e=>{
      e.preventDefault();
      let note=form.querySelector('.form-note');
      if(note){note.textContent='This static form is ready for endpoint integration. Please use WhatsApp as the working path for now.';note.setAttribute('role','status');}
    });
  });
})();


// Language switch: always navigate in the same browser tab/window.
document.querySelectorAll('[data-lang-switch], .lang-switch').forEach(function(link){
  link.removeAttribute('target');
  link.addEventListener('click', function(event){
    const href = link.getAttribute('href');
    if(!href || href.charAt(0) === '#') return;
    event.preventDefault();
    window.location.assign(href);
  });
});

// Animated statistics counters.
(function(){
  const counters = Array.from(document.querySelectorAll('.stat-card strong'));
  if(!counters.length) return;
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function parseCounter(text){
    const match = String(text).trim().match(/([0-9][0-9,\.]*)(.*)$/);
    if(!match) return null;
    const value = Number(match[1].replace(/,/g,''));
    if(!Number.isFinite(value)) return null;
    return { value, suffix: match[2] || '' };
  }

  function animateCounter(el){
    if(el.dataset.animated === 'true') return;
    const parsed = parseCounter(el.textContent);
    if(!parsed) return;
    el.dataset.animated = 'true';
    if(reduceMotion){
      el.textContent = Math.round(parsed.value) + parsed.suffix;
      return;
    }
    const duration = parsed.value >= 500 ? 1400 : 1150;
    const startTime = performance.now();
    function tick(now){
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(parsed.value * eased) + parsed.suffix;
      if(progress < 1){
        requestAnimationFrame(tick);
      }else{
        el.textContent = Math.round(parsed.value) + parsed.suffix;
      }
    }
    el.textContent = '0' + parsed.suffix;
    requestAnimationFrame(tick);
  }

  if('IntersectionObserver' in window){
    const observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.querySelectorAll('.stat-card strong').forEach(animateCounter);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.35 });
    document.querySelectorAll('.stats-section').forEach(function(section){ observer.observe(section); });
  }else{
    counters.forEach(animateCounter);
  }
})();

// Portfolio filter arrow-hover rail controls - RTL visual arrows corrected
(function(){
  const shells = document.querySelectorAll('[data-filter-rail-shell]');
  if (!shells.length) return;

  const rtlModelCache = new WeakMap();

  function getRtlScrollModel(el){
    if (rtlModelCache.has(el)) return rtlModelCache.get(el);
    const initial = el.scrollLeft;
    el.scrollLeft = 1;
    const model = el.scrollLeft === 0 ? 'negative' : 'positive';
    el.scrollLeft = initial;
    rtlModelCache.set(el, model);
    return model;
  }

  function getMaxScroll(el){
    return Math.max(0, el.scrollWidth - el.clientWidth);
  }

  function getIsRtl(el){
    return getComputedStyle(el).direction === 'rtl';
  }

  function getVisualPosition(el){
    const max = getMaxScroll(el);
    if (!getIsRtl(el)) return el.scrollLeft;
    const model = getRtlScrollModel(el);
    if (model === 'negative') return Math.abs(el.scrollLeft);
    return Math.max(0, max - el.scrollLeft);
  }

  function scrollToVisualPosition(el, position){
    const max = getMaxScroll(el);
    const clamped = Math.max(0, Math.min(max, position));
    if (!getIsRtl(el)) {
      el.scrollTo({ left: clamped, behavior: 'smooth' });
      return;
    }
    const model = getRtlScrollModel(el);
    const left = model === 'negative' ? -clamped : max - clamped;
    el.scrollTo({ left, behavior: 'smooth' });
  }

  shells.forEach((shell) => {
    const rail = shell.querySelector('.filters-segmented-control');
    const prev = shell.querySelector('[data-filter-arrow="prev"]');
    const next = shell.querySelector('[data-filter-arrow="next"]');
    if (!rail || !prev || !next) return;

    let hoverLock = false;

    const updateState = () => {
      const max = getMaxScroll(rail);
      const pos = getVisualPosition(rail);
      const isStart = pos <= 4;
      const isEnd = pos >= max - 4;

      // Visual rule:
      // prev = visual start, next = visual end.
      // In Arabic CSS places prev on the right and next on the left.
      prev.disabled = isStart;
      next.disabled = isEnd;

      rail.classList.toggle('is-edge-left', !isStart);
      rail.classList.toggle('is-edge-right', !isEnd);
    };

    const releaseLock = () => {
      window.setTimeout(() => { hoverLock = false; }, 420);
    };

    const goStart = () => {
      if (hoverLock) return;
      hoverLock = true;
      scrollToVisualPosition(rail, 0);
      releaseLock();
    };

    const goEnd = () => {
      if (hoverLock) return;
      hoverLock = true;
      scrollToVisualPosition(rail, getMaxScroll(rail));
      releaseLock();
    };

    // Do not swap arrows in RTL.
    // Arabic visible left arrow is next -> moves left/end.
    // Arabic visible right arrow is prev -> returns right/start.
    prev.addEventListener('mouseenter', goStart);
    next.addEventListener('mouseenter', goEnd);
    prev.addEventListener('focus', goStart);
    next.addEventListener('focus', goEnd);

    prev.addEventListener('click', goStart);
    next.addEventListener('click', goEnd);

    rail.querySelectorAll('.filter-btn').forEach((button) => {
      button.addEventListener('click', updateState);
    });

    window.setTimeout(() => {
      scrollToVisualPosition(rail, 0);
      updateState();
    }, 90);

    rail.addEventListener('scroll', updateState, { passive: true });
    window.addEventListener('resize', () => {
      scrollToVisualPosition(rail, 0);
      updateState();
    });

    updateState();
  });
})();

// Footer scroll-linked reveal and link entrance
(function(){
  const footer = document.querySelector('.site-footer');
  if (!footer) return;

  footer.classList.add('footer-motion-enabled');

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let ticking = false;

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  const updateFooterMotion = () => {
    ticking = false;

    if (reduceMotion.matches) {
      footer.style.setProperty('--footer-lift', '0px');
      footer.style.setProperty('--footer-content-opacity', '1');
      footer.classList.add('is-footer-visible');
      return;
    }

    const rect = footer.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    // Starts as the footer enters the viewport and completes before it reaches mid-screen.
    const travel = Math.max(260, viewportHeight * 0.55);
    const progress = clamp((viewportHeight - rect.top) / travel, 0, 1);
    const lift = (1 - progress) * 36;
    const opacity = 0.74 + (progress * 0.26);

    footer.style.setProperty('--footer-lift', `${lift.toFixed(2)}px`);
    footer.style.setProperty('--footer-content-opacity', opacity.toFixed(3));
    footer.classList.toggle('is-footer-visible', progress > 0.08);
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateFooterMotion);
  };

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  reduceMotion.addEventListener?.('change', requestUpdate);

  updateFooterMotion();
})();
