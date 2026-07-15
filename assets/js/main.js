// Fixed viewport header reveal
(function(){
  const header = document.querySelector('[data-header], .site-header');
  if(!header) return;

  const footer = document.querySelector('.site-footer');
  const root = document.documentElement;
  const navShell = header.querySelector('.nav-shell');
  const reduceMotion = window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : null;

  let lastScrollY = Math.max(0, window.scrollY || window.pageYOffset || 0);
  let lastDirection = 'none';
  let stopTimer = 0;
  let frame = 0;
  let lastTouchY = null;

  const topGuard = 12;
  const directionThreshold = 3;
  const revealAfterStop = 175;

  const updateHeaderHeight = function(){
    const measured = navShell
      ? Math.ceil(navShell.getBoundingClientRect().height + 1)
      : Math.ceil(header.getBoundingClientRect().height);

    if(measured > 0){
      root.style.setProperty('--site-header-height', `${measured}px`);
    }
  };

  const footerIsVisible = function(){
    if(!footer) return false;

    const rect = footer.getBoundingClientRect();
    const viewportHeight =
      window.innerHeight || document.documentElement.clientHeight;

    return rect.top < viewportHeight && rect.bottom > 0;
  };

  const mobileMenuOpen = function(){
    const toggle = document.querySelector('[data-menu-toggle]');
    return Boolean(
      document.body.classList.contains('menu-open') ||
      (toggle && toggle.getAttribute('aria-expanded') === 'true')
    );
  };

  const serviceMenuActive = function(){
    const dropdown = header.querySelector('.nav-dropdown');
    return Boolean(
      dropdown &&
      (dropdown.matches(':hover') || dropdown.contains(document.activeElement))
    );
  };

  const headerIsEngaged = function(){
    return Boolean(
      mobileMenuOpen() ||
      serviceMenuActive() ||
      header.matches(':hover') ||
      header.contains(document.activeElement)
    );
  };

  const showHeader = function(){
    header.classList.remove('header-scroll-hidden');
    header.classList.add('header-scroll-visible');
  };

  const hideHeader = function(){
    if(headerIsEngaged()){
      showHeader();
      return;
    }

    header.classList.remove('header-scroll-visible');
    header.classList.add('header-scroll-hidden');
  };

  const revealAfterScrollingStops = function(){
    /*
     * Inside the footer, stopping after a downward scroll must not reveal
     * the header. It can return only after an upward scroll.
     */
    if(
      footerIsVisible() &&
      lastDirection !== 'up' &&
      !headerIsEngaged()
    ){
      hideHeader();
      return;
    }

    showHeader();
  };

  const scheduleStopReveal = function(){
    window.clearTimeout(stopTimer);
    stopTimer = window.setTimeout(
      revealAfterScrollingStops,
      revealAfterStop
    );
  };

  const applyScrollDirection = function(currentY){
    const delta = currentY - lastScrollY;

    if(delta > directionThreshold){
      lastDirection = 'down';
    }else if(delta < -directionThreshold){
      lastDirection = 'up';
    }

    if(reduceMotion && reduceMotion.matches){
      showHeader();
    }else if(currentY <= topGuard || headerIsEngaged()){
      showHeader();
    }else if(lastDirection === 'down'){
      hideHeader();
    }else if(lastDirection === 'up'){
      showHeader();
    }

    lastScrollY = currentY;
    scheduleStopReveal();
  };

  const onScroll = function(){
    if(frame) return;

    frame = window.requestAnimationFrame(function(){
      frame = 0;
      applyScrollDirection(
        Math.max(0, window.scrollY || window.pageYOffset || 0)
      );
    });
  };

  const onWheel = function(event){
    if(reduceMotion && reduceMotion.matches){
      showHeader();
      return;
    }

    const currentY = Math.max(0, window.scrollY || window.pageYOffset || 0);

    if(event.deltaY < -1){
      lastDirection = 'up';
    }else if(event.deltaY > 1){
      lastDirection = 'down';
    }

    if(currentY <= topGuard || headerIsEngaged()){
      showHeader();
    }else if(lastDirection === 'up'){
      showHeader();
    }else if(lastDirection === 'down'){
      hideHeader();
    }

    scheduleStopReveal();
  };

  const onScrollEnd = function(){
    revealAfterScrollingStops();
  };

  updateHeaderHeight();
  showHeader();

  window.addEventListener('scroll', onScroll, { passive:true });
  window.addEventListener('wheel', onWheel, { passive:true });
  window.addEventListener('scrollend', onScrollEnd, { passive:true });

  window.addEventListener('touchstart', function(event){
    const touch = event.touches && event.touches[0];
    lastTouchY = touch ? touch.clientY : null;
  }, { passive:true });

  window.addEventListener('touchmove', function(event){
    const touch = event.touches && event.touches[0];
    if(!touch || lastTouchY === null) return;

    const movement = touch.clientY - lastTouchY;
    const currentY = Math.max(0, window.scrollY || window.pageYOffset || 0);

    if(movement > 3){
      lastDirection = 'up';
    }else if(movement < -3){
      lastDirection = 'down';
    }

    if(currentY <= topGuard || headerIsEngaged()){
      showHeader();
    }else if(lastDirection === 'up'){
      showHeader();
    }else if(lastDirection === 'down'){
      hideHeader();
    }

    lastTouchY = touch.clientY;
    scheduleStopReveal();
  }, { passive:true });

  window.addEventListener('touchend', function(){
    lastTouchY = null;
    scheduleStopReveal();
  }, { passive:true });

  window.addEventListener('resize', function(){
    updateHeaderHeight();
    lastScrollY = Math.max(0, window.scrollY || window.pageYOffset || 0);

    if(footerIsVisible() && lastDirection !== 'up'){
      hideHeader();
    }else{
      showHeader();
    }
  });

  header.addEventListener('mouseenter', showHeader);
  header.addEventListener('focusin', showHeader);

  document.addEventListener('keydown', function(event){
    if(event.key === 'Tab' || event.key === 'Escape'){
      showHeader();
    }
  });

  reduceMotion?.addEventListener?.('change', showHeader);
})();

(function(){
  const toggle = document.querySelector('[data-menu-toggle]');
  const panel = document.querySelector('[data-mobile-menu]');
  const header = document.querySelector('[data-header]');

  /*
   * The header uses transform for its scroll motion. A fixed descendant
   * would therefore be confined to the header instead of the viewport.
   * Move the mobile panel to body before initializing the menu.
   */
  if(panel && panel.parentElement !== document.body){
    document.body.appendChild(panel);
  }

  let menuCloseTimer;

  function setMenu(open, immediate){
    if(!toggle || !panel) return;

    const openLabel = toggle.dataset.openLabel || 'Open menu';
    const closeLabel = toggle.dataset.closeLabel || 'Close menu';
    const reduceMotion = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    window.clearTimeout(menuCloseTimer);

    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? closeLabel : openLabel);
    panel.setAttribute('aria-hidden', String(!open));
    document.body.classList.toggle('menu-open', open);

    if(open){
      panel.hidden = false;

      window.requestAnimationFrame(function(){
        window.requestAnimationFrame(function(){
          if(toggle.getAttribute('aria-expanded') === 'true'){
            panel.classList.add('is-open');
          }
        });
      });

      return;
    }

    panel.classList.remove('is-open');

    const finishClose = function(){
      if(toggle.getAttribute('aria-expanded') === 'false'){
        panel.hidden = true;
      }
    };

    if(immediate || reduceMotion){
      finishClose();
    }else{
      menuCloseTimer = window.setTimeout(finishClose, 420);
    }
  }

  if(toggle && panel){
    setMenu(false, true);
    toggle.addEventListener('click', function(event){
      event.stopPropagation();
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });

    panel.addEventListener('click', function(event){
      const target = event.target.closest('a');
      if(target && !target.matches('[data-mobile-services-trigger]')){
        setMenu(false);
      }
    });

    document.addEventListener('click', function(event){
      const servicesPanel = document.querySelector('[data-mobile-services-panel]');
      if(
        toggle.getAttribute('aria-expanded') === 'true' &&
        header &&
        !header.contains(event.target) &&
        !panel.contains(event.target) &&
        !(servicesPanel && servicesPanel.contains(event.target))
      ){
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

  const whatsappNumber = '201000336679';
  const ignoredValues = new Set([
    'Select type',
    'Select service',
    'اختر النوع',
    'اختر الخدمة'
  ]);
  const fieldLabels = {
    en: {
      name: 'Name',
      phone: 'Phone / WhatsApp',
      email: 'Email',
      location: 'Location',
      project_type: 'Project type',
      service: 'Required service',
      message: 'Message'
    },
    ar: {
      name: 'الاسم',
      phone: 'رقم الهاتف / واتساب',
      email: 'البريد الإلكتروني',
      location: 'الموقع',
      project_type: 'نوع المشروع',
      service: 'الخدمة المطلوبة',
      message: 'الرسالة'
    }
  };
  const fieldOrder = [
    'name',
    'phone',
    'email',
    'location',
    'project_type',
    'service',
    'message'
  ];

  document.querySelectorAll('.contact-form').forEach(form=>{
    form.addEventListener('submit',e=>{
      e.preventDefault();

      if(!form.reportValidity()) return;

      const isArabic =
        document.documentElement.lang.toLowerCase().startsWith('ar') ||
        document.documentElement.dir === 'rtl';
      const language = isArabic ? 'ar' : 'en';
      const formData = new FormData(form);
      const lines = fieldOrder.reduce((messageLines, fieldName)=>{
        const value = String(formData.get(fieldName) || '').trim();
        if(!value || ignoredValues.has(value)) return messageLines;

        messageLines.push(`${fieldLabels[language][fieldName]}: ${value}`);
        return messageLines;
      }, []);
      const intro = isArabic
        ? 'مرحبًا ASG، أود إرسال استفسار عن مشروع.'
        : 'Hello ASG, I would like to send a project inquiry.';
      const sourceLabel = isArabic ? 'الصفحة' : 'Source page';
      const message = [
        intro,
        '',
        ...lines,
        `${sourceLabel}: ${window.location.href}`
      ].join('\n');
      const whatsappUrl =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      const note = form.querySelector('.form-note');

      if(note){
        note.textContent = isArabic
          ? 'جارٍ فتح واتساب مع بيانات طلبك.'
          : 'Opening WhatsApp with your project details.';
        note.setAttribute('role', 'status');
      }

      window.location.assign(whatsappUrl);
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
      footer.classList.add('is-footer-visible');
      return;
    }

    const rect = footer.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    // Starts as the footer enters the viewport and completes before it reaches mid-screen.
    const travel = Math.max(260, viewportHeight * 0.55);
    const progress = clamp((viewportHeight - rect.top) / travel, 0, 1);
    const lift = (1 - progress) * 36;

    footer.style.setProperty('--footer-lift', `${lift.toFixed(2)}px`);
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

// Footer Explore smooth scroll to top
(function(){
  const links = document.querySelectorAll('[data-scroll-top]');
  if(!links.length) return;

  links.forEach(function(link){
    link.addEventListener('click', function(event){
      const isMobileFooterTrigger =
        window.matchMedia('(max-width: 640px)').matches &&
        link.classList.contains('footer-accordion-trigger');

      if(isMobileFooterTrigger) return;

      event.preventDefault();

      const reduceMotion = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: reduceMotion ? 'auto' : 'smooth'
      });
    });
  });
})();

// Counter cards and numbers animate on every viewport visit
(function(){
  const sections = Array.from(document.querySelectorAll('.stats-section'));
  if(!sections.length) return;

  const reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const activeFrames = new WeakMap();
  const activeTimers = new WeakMap();

  function parseCounter(text){
    const match = String(text).trim().match(/([0-9][0-9,\.]*)(.*)$/);
    if(!match) return null;

    const value = Number(match[1].replace(/,/g, ''));
    if(!Number.isFinite(value)) return null;

    return {
      value:value,
      suffix:match[2] || ''
    };
  }

  function prepareCounter(counter){
    if(counter.dataset.counterTarget) return;

    const parsed = parseCounter(counter.textContent);
    if(!parsed) return;

    counter.dataset.counterTarget = String(parsed.value);
    counter.dataset.counterSuffix = parsed.suffix;
  }

  function finalCounterText(counter){
    const target = Number(counter.dataset.counterTarget || 0);
    const suffix = counter.dataset.counterSuffix || '';
    counter.textContent = Math.round(target).toLocaleString('en-US') + suffix;
  }

  function cancelCounter(counter){
    const frame = activeFrames.get(counter);
    const timer = activeTimers.get(counter);

    if(frame){
      window.cancelAnimationFrame(frame);
      activeFrames.delete(counter);
    }

    if(timer){
      window.clearTimeout(timer);
      activeTimers.delete(counter);
    }
  }

  function resetCounter(counter){
    cancelCounter(counter);
    prepareCounter(counter);

    const suffix = counter.dataset.counterSuffix || '';
    counter.textContent = '0' + suffix;
  }

  function animateCounter(counter, delay){
    prepareCounter(counter);
    cancelCounter(counter);

    const target = Number(counter.dataset.counterTarget || 0);
    const suffix = counter.dataset.counterSuffix || '';

    if(reduceMotion){
      finalCounterText(counter);
      return;
    }

    counter.textContent = '0' + suffix;

    const timer = window.setTimeout(function(){
      activeTimers.delete(counter);

      const duration = target >= 500 ? 1120 : 920;
      const startTime = performance.now();

      function tick(now){
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(target * eased);

        counter.textContent = current.toLocaleString('en-US') + suffix;

        if(progress < 1){
          const frame = window.requestAnimationFrame(tick);
          activeFrames.set(counter, frame);
        }else{
          activeFrames.delete(counter);
          finalCounterText(counter);
        }
      }

      const frame = window.requestAnimationFrame(tick);
      activeFrames.set(counter, frame);
    }, delay);

    activeTimers.set(counter, timer);
  }

  function resetSection(section){
    section.dataset.statsActive = 'false';
    section.classList.remove('stats-reveal-visible');

    section.querySelectorAll('.stat-card strong').forEach(function(counter){
      resetCounter(counter);
    });
  }

  function playSection(section){
    if(section.dataset.statsActive === 'true') return;

    section.dataset.statsActive = 'true';

    const counters = Array.from(
      section.querySelectorAll('.stat-card strong')
    );

    counters.forEach(function(counter){
      resetCounter(counter);
    });

    window.requestAnimationFrame(function(){
      section.classList.add('stats-reveal-visible');

      counters.forEach(function(counter, index){
        /*
         * Match the CSS card stagger: every card starts 55ms after
         * the previous one, so its number begins counting with it.
         */
        animateCounter(counter, index * 55);
      });
    });
  }

  sections.forEach(function(section){
    section.classList.add('stats-reveal-ready');
    section.dataset.statsActive = 'false';

    section.querySelectorAll('.stat-card strong').forEach(function(counter){
      prepareCounter(counter);

      if(reduceMotion){
        finalCounterText(counter);
      }else{
        resetCounter(counter);
      }
    });
  });

  if(reduceMotion || !('IntersectionObserver' in window)){
    sections.forEach(function(section){
      section.dataset.statsActive = 'true';
      section.classList.add('stats-reveal-visible');

      section.querySelectorAll('.stat-card strong').forEach(function(counter){
        finalCounterText(counter);
      });
    });
    return;
  }

  const observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      const section = entry.target;

      if(entry.intersectionRatio >= 0.22){
        playSection(section);
        return;
      }

      /*
       * Reset only when the section is almost completely outside the
       * viewport, so the reset itself is not visible to the user.
       */
      if(entry.intersectionRatio <= 0.04){
        resetSection(section);
      }
    });
  }, {
    threshold:[0,0.04,0.22,0.5],
    rootMargin:'0px 0px -6% 0px'
  });

  sections.forEach(function(section){
    observer.observe(section);
  });
})();


// Fixed page scroll-to-top button
(function(){
  const initializeScrollTopButton = function(){
    const button = document.querySelector('[data-page-scroll-top]');
    if(!button) return;

    const mainHero = document.querySelector(
      'main > .hero, main > section.hero, main .hero'
    );
    const header = document.querySelector('.site-header');
    const reduceMotion = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)');

    let ticking = false;

    const heroHasPassed = function(){
      if(!mainHero){
        return Math.max(
          0,
          window.scrollY || window.pageYOffset || 0
        ) > 420;
      }

      const heroBottom = mainHero.getBoundingClientRect().bottom;
      const headerHeight = header
        ? Math.ceil(header.getBoundingClientRect().height)
        : 0;

      return heroBottom <= headerHeight + 2;
    };

    const updateVisibility = function(){
      ticking = false;
      button.classList.toggle('is-visible', heroHasPassed());
    };

    const requestVisibilityUpdate = function(){
      if(ticking) return;

      ticking = true;
      window.requestAnimationFrame(updateVisibility);
    };

    button.addEventListener('click', function(){
      window.scrollTo({
        top:0,
        left:0,
        behavior:reduceMotion && reduceMotion.matches ? 'auto' : 'smooth'
      });
    });

    window.addEventListener('scroll', requestVisibilityUpdate, { passive:true });
    window.addEventListener('pageshow', requestVisibilityUpdate);
    window.addEventListener('resize', requestVisibilityUpdate);
    window.addEventListener('load', requestVisibilityUpdate);

    if('ResizeObserver' in window && mainHero){
      const heroResizeObserver = new ResizeObserver(requestVisibilityUpdate);
      heroResizeObserver.observe(mainHero);
    }

    updateVisibility();
  };

  if(document.readyState === 'loading'){
    document.addEventListener(
      'DOMContentLoaded',
      initializeScrollTopButton,
      { once:true }
    );
  }else{
    initializeScrollTopButton();
  }
})();

// Custom form dropdowns matching Services menu
(function(){
  const selects = Array.from(
    document.querySelectorAll('.contact-form select')
  );

  if(!selects.length) return;

  let openDropdown = null;

  const closeDropdown = function(dropdown, returnFocus){
    if(!dropdown || !dropdown.classList.contains('is-open')) return;

    dropdown.classList.remove('is-open');

    const trigger = dropdown.querySelector('.custom-select-trigger');
    if(trigger){
      trigger.setAttribute('aria-expanded', 'false');
      if(returnFocus) trigger.focus();
    }

    if(openDropdown === dropdown){
      openDropdown = null;
    }
  };

  const closeAll = function(except){
    document.querySelectorAll('.custom-select.is-open').forEach(function(item){
      if(item !== except) closeDropdown(item, false);
    });
  };

  selects.forEach(function(select, selectIndex){
    if(select.dataset.customized === 'true') return;
    select.dataset.customized = 'true';
    select.classList.add('custom-select-native');

    const wrapper = document.createElement('div');
    wrapper.className = 'custom-select';

    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'custom-select-trigger';
    trigger.setAttribute('aria-haspopup', 'listbox');
    trigger.setAttribute('aria-expanded', 'false');

    const menuId = `custom-select-menu-${selectIndex + 1}-${Math.random()
      .toString(36)
      .slice(2, 8)}`;

    const menu = document.createElement('div');
    menu.className = 'custom-select-menu';
    menu.id = menuId;
    menu.setAttribute('role', 'listbox');
    menu.setAttribute(
      'aria-label',
      select.getAttribute('aria-label') ||
      select.closest('label')?.childNodes[0]?.textContent?.trim() ||
      'Select option'
    );

    trigger.setAttribute('aria-controls', menuId);

    const options = Array.from(select.options);

    const syncTrigger = function(){
      const selected = select.options[select.selectedIndex] || options[0];
      trigger.textContent = selected ? selected.textContent : '';
      wrapper.classList.toggle(
        'is-invalid',
        select.required && !select.value
      );

      menu.querySelectorAll('.custom-select-option').forEach(function(button){
        button.setAttribute(
          'aria-selected',
          String(button.dataset.value === select.value)
        );
      });
    };

    options.forEach(function(option, optionIndex){
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'custom-select-option';
      button.setAttribute('role', 'option');
      button.dataset.value = option.value;
      button.textContent = option.textContent;
      button.tabIndex = -1;

      button.addEventListener('click', function(){
        select.value = option.value;
        select.dispatchEvent(new Event('change', { bubbles:true }));
        syncTrigger();
        closeDropdown(wrapper, true);
      });

      button.addEventListener('keydown', function(event){
        const optionButtons = Array.from(
          menu.querySelectorAll('.custom-select-option')
        );
        const currentIndex = optionButtons.indexOf(button);

        if(event.key === 'ArrowDown'){
          event.preventDefault();
          optionButtons[
            Math.min(currentIndex + 1, optionButtons.length - 1)
          ].focus();
        }else if(event.key === 'ArrowUp'){
          event.preventDefault();
          optionButtons[Math.max(currentIndex - 1, 0)].focus();
        }else if(event.key === 'Home'){
          event.preventDefault();
          optionButtons[0].focus();
        }else if(event.key === 'End'){
          event.preventDefault();
          optionButtons[optionButtons.length - 1].focus();
        }else if(event.key === 'Escape'){
          event.preventDefault();
          closeDropdown(wrapper, true);
        }
      });

      menu.appendChild(button);
    });

    select.parentNode.insertBefore(wrapper, select);
    wrapper.appendChild(select);
    wrapper.appendChild(trigger);
    wrapper.appendChild(menu);

    trigger.addEventListener('click', function(){
      const willOpen = !wrapper.classList.contains('is-open');

      closeAll(wrapper);
      wrapper.classList.toggle('is-open', willOpen);
      trigger.setAttribute('aria-expanded', String(willOpen));

      if(willOpen){
        openDropdown = wrapper;

        const selectedButton = menu.querySelector(
          '.custom-select-option[aria-selected="true"]'
        );
        const firstButton = menu.querySelector('.custom-select-option');

        window.requestAnimationFrame(function(){
          (selectedButton || firstButton)?.focus();
        });
      }else{
        openDropdown = null;
      }
    });

    trigger.addEventListener('keydown', function(event){
      if(
        event.key === 'ArrowDown' ||
        event.key === 'ArrowUp' ||
        event.key === 'Enter' ||
        event.key === ' '
      ){
        event.preventDefault();

        if(!wrapper.classList.contains('is-open')){
          closeAll(wrapper);
          wrapper.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
          openDropdown = wrapper;
        }

        const optionButtons = Array.from(
          menu.querySelectorAll('.custom-select-option')
        );
        const selectedIndex = Math.max(select.selectedIndex, 0);
        optionButtons[selectedIndex]?.focus();
      }else if(event.key === 'Escape'){
        closeDropdown(wrapper, false);
      }
    });

    select.addEventListener('change', syncTrigger);
    syncTrigger();
  });

  document.addEventListener('pointerdown', function(event){
    if(
      openDropdown &&
      !openDropdown.contains(event.target)
    ){
      closeDropdown(openDropdown, false);
    }
  });

  document.addEventListener('keydown', function(event){
    if(event.key === 'Escape' && openDropdown){
      closeDropdown(openDropdown, true);
    }
  });

  window.addEventListener('resize', function(){
    if(openDropdown) closeDropdown(openDropdown, false);
  });
})();

// Mobile menu backdrop for off-canvas sidebar
(function(){
  const toggle = document.querySelector('[data-menu-toggle]');
  const panel = document.querySelector('[data-mobile-menu]');

  if(!toggle || !panel) return;
  if(document.querySelector('.mobile-menu-backdrop')) return;

  const backdrop = document.createElement('button');
  backdrop.type = 'button';
  backdrop.className = 'mobile-menu-backdrop';
  backdrop.setAttribute('aria-label', toggle.dataset.closeLabel || 'Close menu');
  backdrop.setAttribute('tabindex', '-1');
  document.body.appendChild(backdrop);

  backdrop.addEventListener('click', function(){
    if(toggle.getAttribute('aria-expanded') === 'true'){
      toggle.click();
    }
  });
})();

// Mobile Services flyout beside the sidebar
(function(){
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const desktopDropdown = document.querySelector(
    '.desktop-nav .nav-dropdown .dropdown-menu'
  );

  if(!mobileMenu || !menuToggle || !desktopDropdown) return;
  if(document.querySelector('[data-mobile-services-panel]')) return;

  const mobileLinks = Array.from(
    mobileMenu.querySelectorAll(':scope > a')
  );

  const trigger = mobileLinks.find(function(link){
    const text = link.textContent.trim().toLowerCase();
    return text === 'services' || text === 'خدماتنا';
  });

  if(!trigger) return;

  const isRTL = document.documentElement.dir === 'rtl' ||
    document.body.dir === 'rtl';

  const originalLabel = trigger.textContent.trim();
  const allServicesLabel = isRTL ? 'كل الخدمات' : 'All Services';
  const panelLabel = isRTL ? 'الخدمات' : 'Services';

  trigger.dataset.mobileServicesTrigger = '';
  trigger.setAttribute('aria-haspopup', 'true');
  trigger.setAttribute('aria-expanded', 'false');
  trigger.setAttribute('role', 'button');

  trigger.textContent = '';

  const label = document.createElement('span');
  label.className = 'mobile-services-trigger-label';
  label.textContent = originalLabel;

  const arrow = document.createElement('span');
  arrow.className = 'mobile-services-trigger-arrow';
  arrow.setAttribute('aria-hidden', 'true');

  trigger.appendChild(label);
  trigger.appendChild(arrow);

  const servicesPanel = document.createElement('aside');
  servicesPanel.className = 'mobile-services-panel';
  servicesPanel.dataset.mobileServicesPanel = '';
  servicesPanel.hidden = true;
  servicesPanel.setAttribute('aria-hidden', 'true');
  servicesPanel.setAttribute('aria-label', panelLabel);

  const title = document.createElement('div');
  title.className = 'mobile-services-panel-title';
  title.textContent = panelLabel;
  servicesPanel.appendChild(title);

  const linksWrap = document.createElement('nav');
  linksWrap.className = 'mobile-services-links';
  linksWrap.setAttribute('aria-label', panelLabel);

  const allServicesLink = document.createElement('a');
  allServicesLink.href = trigger.getAttribute('href');
  allServicesLink.textContent = allServicesLabel;
  allServicesLink.className = 'mobile-services-link mobile-services-link-all';
  linksWrap.appendChild(allServicesLink);

  Array.from(desktopDropdown.querySelectorAll('a')).forEach(function(link){
    const clone = link.cloneNode(true);
    clone.classList.add('mobile-services-link');
    linksWrap.appendChild(clone);
  });

  servicesPanel.appendChild(linksWrap);
  document.body.appendChild(servicesPanel);

  let closeTimer = 0;

  const positionFlyout = function(){
    const triggerRect = trigger.getBoundingClientRect();
    const viewportHeight = window.innerHeight ||
      document.documentElement.clientHeight;
    const minimumTop = 54;
    const maximumTop = Math.max(
      minimumTop,
      viewportHeight - 180
    );
    const top = Math.min(
      Math.max(triggerRect.top - 5, minimumTop),
      maximumTop
    );

    servicesPanel.style.setProperty(
      '--mobile-services-panel-top',
      `${Math.round(top)}px`
    );
  };

  const setFlyout = function(open, immediate){
    window.clearTimeout(closeTimer);

    trigger.classList.toggle('is-services-open', open);
    trigger.setAttribute('aria-expanded', String(open));
    servicesPanel.setAttribute('aria-hidden', String(!open));

    if(open){
      positionFlyout();
      servicesPanel.hidden = false;

      window.requestAnimationFrame(function(){
        window.requestAnimationFrame(function(){
          if(trigger.getAttribute('aria-expanded') === 'true'){
            servicesPanel.classList.add('is-open');
          }
        });
      });

      return;
    }

    servicesPanel.classList.remove('is-open');

    const finishClose = function(){
      if(trigger.getAttribute('aria-expanded') === 'false'){
        servicesPanel.hidden = true;
      }
    };

    const reduceMotion = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if(immediate || reduceMotion){
      finishClose();
    }else{
      closeTimer = window.setTimeout(finishClose, 330);
    }
  };

  trigger.addEventListener('click', function(event){
    event.preventDefault();
    event.stopPropagation();

    setFlyout(
      trigger.getAttribute('aria-expanded') !== 'true'
    );
  });

  servicesPanel.addEventListener('click', function(event){
    const link = event.target.closest('a');

    if(link){
      setFlyout(false, true);

      if(menuToggle.getAttribute('aria-expanded') === 'true'){
        menuToggle.click();
      }
    }
  });

  mobileMenu.addEventListener('click', function(event){
    const link = event.target.closest('a');

    if(link && link !== trigger){
      setFlyout(false, true);
    }
  });

  menuToggle.addEventListener('click', function(){
    if(menuToggle.getAttribute('aria-expanded') !== 'true'){
      setFlyout(false, true);
    }
  });

  document.addEventListener('click', function(event){
    if(
      trigger.getAttribute('aria-expanded') === 'true' &&
      !trigger.contains(event.target) &&
      !servicesPanel.contains(event.target)
    ){
      setFlyout(false);
    }
  });

  document.addEventListener('keydown', function(event){
    if(event.key === 'Escape'){
      setFlyout(false);
    }
  });

  window.addEventListener('resize', function(){
    if(window.innerWidth > 980){
      setFlyout(false, true);
      return;
    }

    if(trigger.getAttribute('aria-expanded') === 'true'){
      positionFlyout();
    }
  });

  window.addEventListener('orientationchange', function(){
    setFlyout(false, true);
  });

  setFlyout(false, true);
})();

// Automatic partners logo marquee
(function(){
  const marquees = Array.from(
    document.querySelectorAll('[data-partners-marquee]')
  );

  if(!marquees.length) return;

  const setupMarquee = function(marquee){
    const track = marquee.querySelector('[data-partners-track]');
    const sourceGroup = track &&
      track.querySelector('[data-partners-group]');

    if(!track || !sourceGroup) return;

    const rebuild = function(){
      Array.from(
        track.querySelectorAll('[data-partners-clone]')
      ).forEach(function(clone){
        clone.remove();
      });

      const gap = parseFloat(
        getComputedStyle(track).columnGap ||
        getComputedStyle(track).gap ||
        '0'
      ) || 0;

      const sourceWidth = sourceGroup.getBoundingClientRect().width;
      if(!sourceWidth) return;

      const loopDistance = sourceWidth + gap;
      marquee.style.setProperty(
        '--partners-loop-distance',
        `${loopDistance}px`
      );

      /*
       * Keep enough complete groups in the track to cover more than
       * two viewport widths at all times. That removes every visible
       * start, end, blank gap, or reset point on wide and small screens.
       */
      const requiredWidth = Math.max(
        marquee.clientWidth * 2.5,
        loopDistance * 3
      );

      let currentWidth = loopDistance;
      let cloneIndex = 0;

      while(currentWidth < requiredWidth){
        const clone = sourceGroup.cloneNode(true);
        clone.dataset.partnersClone = String(cloneIndex++);
        clone.setAttribute('aria-hidden', 'true');

        clone.querySelectorAll(
          'a, button, input, select, textarea'
        ).forEach(function(control){
          control.setAttribute('tabindex', '-1');
        });

        track.appendChild(clone);
        currentWidth += loopDistance;
      }
    };

    let resizeFrame = 0;
    const requestRebuild = function(){
      window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(rebuild);
    };

    window.addEventListener('resize', requestRebuild);
    window.addEventListener('orientationchange', requestRebuild);
    window.addEventListener('pageshow', requestRebuild);

    if(document.fonts && document.fonts.ready){
      document.fonts.ready.then(requestRebuild);
    }

    requestRebuild();
  };

  marquees.forEach(setupMarquee);
})();

// Unified mobile-only card carousels
(function(){
  const mobileQuery = window.matchMedia('(max-width: 640px)');
  const reduceMotionQuery = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  );
  const longDotsThreshold = 12;
  const rtlDotsModelCache = new WeakMap();

  const candidateSelectors = [
    '.project-grid',
    '.card-grid',
    '.services-grid',
    '.process-grid',
    '.case-sections',
    '.gallery-grid',
    '.checklist',
    '.logo-grid'
  ];

  const excludedAncestors = [
    '.partners-marquee',
    '.partners-marquees-stack',
    '.site-footer',
    '.contact-grid',
    '.mobile-panel',
    '.dropdown-menu',
    '.overview-table',
    '.filters-segmented-control',
    '.about-partners-grid'
  ].join(',');

  const states = new Map();
  const isRTL = function(){
    return document.documentElement.dir === 'rtl' ||
      document.body.dir === 'rtl';
  };

  const directItems = function(track){
    return Array.from(track.children).filter(function(item){
      return item.nodeType === 1 &&
        !item.matches(
          '.mobile-card-carousel-arrow,' +
          '.mobile-card-carousel-dots,' +
          '.mobile-card-carousel-status'
        );
    });
  };

  const visibleItems = function(state){
    return state.items.filter(function(item){
      if(item.hidden) return false;
      if(item.classList.contains('is-hidden')) return false;
      if(item.classList.contains('hidden-by-load')) return false;
      return window.getComputedStyle(item).display !== 'none';
    });
  };

  const makeArrow = function(type, label){
    const button = document.createElement('button');
    button.type = 'button';
    button.className =
      'mobile-card-carousel-arrow mobile-card-carousel-arrow--' + type;
    button.setAttribute('aria-label', label);

    const pointsRight = isRTL()
      ? type === 'prev'
      : type === 'next';

    button.innerHTML = pointsRight
      ? '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"></path></svg>'
      : '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m15 5-7 7 7 7"></path></svg>';

    return button;
  };

  const makeDotsArrow = function(direction, label){
    const button = document.createElement('button');
    button.type = 'button';
    button.className =
      'mobile-card-carousel-dots-arrow ' +
      'mobile-card-carousel-dots-arrow--' + direction;
    button.setAttribute('aria-label', label);
    button.innerHTML = direction === 'right'
      ? '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"></path></svg>'
      : '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m15 5-7 7 7 7"></path></svg>';
    button.hidden = true;
    return button;
  };

  const setFocusableState = function(item, active){
    if(active){
      item.removeAttribute('inert');
      item.setAttribute('aria-hidden', 'false');
    }else{
      item.setAttribute('inert', '');
      item.setAttribute('aria-hidden', 'true');
    }
  };

  const updateHeight = function(state){
    if(
      !mobileQuery.matches ||
      !state.visible.length ||
      state.measuring
    ) return;

    /*
     * Measure every card at its natural content height first, then reserve
     * one stable height for the carousel. The temporary measuring state is
     * important: measuring already-stretched cards would feed the fixed
     * height back into itself and create the oversized cards seen before.
     */
    state.measuring = true;
    state.shell.classList.add('is-measuring');
    state.shell.style.removeProperty('--mobile-carousel-fixed-height');
    state.viewport.style.removeProperty('height');

    /* Force the natural-height measuring styles to take effect now. */
    state.viewport.offsetHeight;

    const height = state.visible.reduce(function(maxHeight, item){
      return Math.max(
        maxHeight,
        Math.ceil(item.getBoundingClientRect().height),
        Math.ceil(item.scrollHeight)
      );
    }, 0);

    state.shell.classList.remove('is-measuring');

    if(height > 0){
      /*
       * Reserve a small vertical safety area around the fixed-height card.
       * This keeps rounded borders and the subtle press interaction fully
       * visible without changing the section height while sliding.
       */
      const verticalBreathingRoom = 12;
      const stableHeight = Math.ceil(height + verticalBreathingRoom);
      const value = stableHeight + 'px';
      state.fixedHeight = stableHeight;
      state.lastViewportWidth = Math.round(
        state.viewport.getBoundingClientRect().width
      );
      state.shell.style.setProperty(
        '--mobile-carousel-fixed-height',
        value
      );
      state.viewport.style.height = value;
    }

    state.measuring = false;
  };

  const updateStatus = function(state){
    if(!state.visible.length){
      state.status.textContent = '';
      return;
    }

    state.status.textContent = isRTL()
      ? 'البطاقة ' + (state.index + 1) + ' من ' + state.visible.length
      : 'Card ' + (state.index + 1) + ' of ' + state.visible.length;
  };

  const getDotsMaxScroll = function(dots){
    return Math.max(0, dots.scrollWidth - dots.clientWidth);
  };

  const dotsAreRTL = function(dots){
    return window.getComputedStyle(dots).direction === 'rtl';
  };

  const getDotsRTLModel = function(dots){
    if(rtlDotsModelCache.has(dots)){
      return rtlDotsModelCache.get(dots);
    }

    const initial = dots.scrollLeft;
    dots.scrollLeft = 1;
    const model = dots.scrollLeft === 0 ? 'negative' : 'positive';
    dots.scrollLeft = initial;
    rtlDotsModelCache.set(dots, model);
    return model;
  };

  const getDotsVisualPosition = function(dots){
    const max = getDotsMaxScroll(dots);
    if(!dotsAreRTL(dots)) return dots.scrollLeft;

    const model = getDotsRTLModel(dots);
    return model === 'negative'
      ? Math.abs(dots.scrollLeft)
      : Math.max(0, max - dots.scrollLeft);
  };

  const scrollDotsToVisualPosition = function(dots, position, immediate){
    const max = getDotsMaxScroll(dots);
    const clamped = Math.max(0, Math.min(max, position));
    const behavior = immediate || reduceMotionQuery.matches
      ? 'auto'
      : 'smooth';

    if(!dotsAreRTL(dots)){
      dots.scrollTo({ left:clamped, behavior:behavior });
      return;
    }

    const model = getDotsRTLModel(dots);
    const left = model === 'negative' ? -clamped : max - clamped;
    dots.scrollTo({ left:left, behavior:behavior });
  };

  const updateDotsArrowState = function(state){
    if(!state.dotsShell.classList.contains('is-long')) return;

    const max = getDotsMaxScroll(state.dots);
    const position = getDotsVisualPosition(state.dots);
    const atStart = position <= 2;
    const atEnd = position >= max - 2;

    if(dotsAreRTL(state.dots)){
      state.dotsLeft.disabled = atEnd;
      state.dotsRight.disabled = atStart;
    }else{
      state.dotsLeft.disabled = atStart;
      state.dotsRight.disabled = atEnd;
    }

    state.dotsLeft.setAttribute(
      'aria-disabled',
      String(state.dotsLeft.disabled)
    );
    state.dotsRight.setAttribute(
      'aria-disabled',
      String(state.dotsRight.disabled)
    );
  };

  const keepActiveDotVisible = function(state, immediate){
    const activeDot = state.dots.children[state.index];
    if(!activeDot) return;

    const railRect = state.dots.getBoundingClientRect();
    const dotRect = activeDot.getBoundingClientRect();
    const edgePadding = 8;
    const fullyVisible =
      dotRect.left >= railRect.left + edgePadding &&
      dotRect.right <= railRect.right - edgePadding;

    if(fullyVisible) return;

    const max = getDotsMaxScroll(state.dots);
    const last = Math.max(1, state.visible.length - 1);
    const target = max * (state.index / last);
    scrollDotsToVisualPosition(state.dots, target, immediate);
  };

  const updateDotsNavigation = function(state, immediate){
    const isCandidate = state.visible.length > longDotsThreshold;

    state.dotsShell.classList.toggle('is-long', isCandidate);
    state.dotsLeft.hidden = !isCandidate;
    state.dotsRight.hidden = !isCandidate;

    const hasOverflow = isCandidate && getDotsMaxScroll(state.dots) > 2;
    if(!hasOverflow){
      state.dotsShell.classList.remove('is-long');
      state.dotsLeft.hidden = true;
      state.dotsRight.hidden = true;
      scrollDotsToVisualPosition(state.dots, 0, true);
      return;
    }

    keepActiveDotVisible(state, immediate);
    updateDotsArrowState(state);
  };

  const moveDotsRail = function(state, physicalDirection){
    const max = getDotsMaxScroll(state.dots);
    if(max <= 0) return;

    const step = Math.max(88, Math.round(state.dots.clientWidth * .72));
    const position = getDotsVisualPosition(state.dots);
    const rtl = dotsAreRTL(state.dots);
    const delta = rtl
      ? (physicalDirection === 'left' ? step : -step)
      : (physicalDirection === 'left' ? -step : step);

    scrollDotsToVisualPosition(state.dots, position + delta, false);
  };

  const updateControls = function(state, immediate){
    const last = Math.max(0, state.visible.length - 1);
    const atStart = state.index <= 0;
    const atEnd = state.index >= last;

    state.prev.disabled = atStart;
    state.next.disabled = atEnd;
    state.prev.setAttribute('aria-disabled', String(atStart));
    state.next.setAttribute('aria-disabled', String(atEnd));

    Array.from(state.dots.children).forEach(function(dot, dotIndex){
      const active = dotIndex === state.index;
      dot.classList.toggle('is-active', active);
      dot.setAttribute('aria-current', active ? 'true' : 'false');
      dot.tabIndex = active ? 0 : -1;
    });

    state.items.forEach(function(item){
      setFocusableState(item, state.visible[state.index] === item);
    });

    updateStatus(state);
    updateDotsNavigation(state, immediate);
  };

  const renderDots = function(state){
    state.dots.textContent = '';
    state.dots.scrollLeft = 0;

    state.visible.forEach(function(item, dotIndex){
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'mobile-card-carousel-dot';
      dot.setAttribute(
        'aria-label',
        isRTL()
          ? 'انتقل إلى البطاقة ' + (dotIndex + 1)
          : 'Go to card ' + (dotIndex + 1)
      );
      dot.addEventListener('click', function(){
        moveTo(state, dotIndex, false);
      });
      state.dots.appendChild(dot);
    });
  };

  const moveTo = function(state, nextIndex, immediate){
    if(!state.visible.length) return;

    state.index = Math.max(
      0,
      Math.min(state.visible.length - 1, nextIndex)
    );

    const first = state.visible[0];
    const active = state.visible[state.index];
    const signedOffset = active.offsetLeft - first.offsetLeft;
    const translation = -signedOffset;
    const skipMotion = immediate || reduceMotionQuery.matches;

    if(skipMotion){
      const previousTransition = state.track.style.transition;
      state.track.style.transition = 'none';
      state.track.style.transform =
        'translate3d(' + translation + 'px,0,0)';
      state.track.offsetHeight;
      state.track.style.transition = previousTransition;
    }else{
      state.track.style.transform =
        'translate3d(' + translation + 'px,0,0)';
    }

    updateControls(state, skipMotion);
    if(!state.fixedHeight){
      window.requestAnimationFrame(function(){
        updateHeight(state);
      });
    }
  };

  const refresh = function(state, immediate){
    const previousActive = state.visible[state.index] || null;
    state.fixedHeight = 0;
    state.shell.style.removeProperty('--mobile-carousel-fixed-height');
    state.viewport.style.removeProperty('height');
    state.items = directItems(state.track);
    state.items.forEach(function(item){
      if(!item.classList.contains('mobile-card-carousel-item')){
        item.classList.add('mobile-card-carousel-item');
      }
    });
    state.visible = visibleItems(state);

    if(previousActive && state.visible.includes(previousActive)){
      state.index = state.visible.indexOf(previousActive);
    }else{
      state.index = Math.max(
        0,
        Math.min(state.index, state.visible.length - 1)
      );
    }

    renderDots(state);
    moveTo(state, state.index, immediate);
  };

  const scheduleRefresh = function(state, immediate){
    window.cancelAnimationFrame(state.refreshFrame);
    state.refreshFrame = window.requestAnimationFrame(function(){
      refresh(state, immediate);
    });
  };

  const build = function(track){
    if(states.has(track)) return;
    if(track.closest(excludedAncestors)) return;
    if(track.closest('[data-mobile-card-carousel]')) return;

    const initialItems = directItems(track);
    if(initialItems.length < 2) return;

    const parent = track.parentNode;
    if(!parent) return;

    const placeholder = document.createComment(
      'mobile-card-carousel-placeholder'
    );
    const shell = document.createElement('div');
    const stage = document.createElement('div');
    const viewport = document.createElement('div');
    const dotsShell = document.createElement('div');
    const dots = document.createElement('div');
    const status = document.createElement('div');

    shell.className = 'mobile-card-carousel';
    shell.dataset.mobileCardCarousel = '';
    stage.className = 'mobile-card-carousel-stage';
    viewport.className = 'mobile-card-carousel-viewport';
    viewport.tabIndex = 0;
    viewport.setAttribute('role', 'region');
    viewport.setAttribute(
      'aria-roledescription',
      isRTL() ? 'عارض بطاقات' : 'card carousel'
    );
    dotsShell.className = 'mobile-card-carousel-dots-shell';
    dots.className = 'mobile-card-carousel-dots';
    dots.setAttribute('role', 'group');
    dots.setAttribute(
      'aria-label',
      isRTL() ? 'التنقل بين البطاقات' : 'Carousel navigation'
    );
    status.className = 'mobile-card-carousel-status';
    status.setAttribute('aria-live', 'polite');
    status.setAttribute('aria-atomic', 'true');

    const prev = makeArrow(
      'prev',
      isRTL() ? 'البطاقة السابقة' : 'Previous card'
    );
    const next = makeArrow(
      'next',
      isRTL() ? 'البطاقة التالية' : 'Next card'
    );
    const dotsLeft = makeDotsArrow(
      'left',
      isRTL()
        ? 'تمرير نقاط التنقل لليسار'
        : 'Scroll carousel dots left'
    );
    const dotsRight = makeDotsArrow(
      'right',
      isRTL()
        ? 'تمرير نقاط التنقل لليمين'
        : 'Scroll carousel dots right'
    );

    parent.insertBefore(placeholder, track);
    parent.insertBefore(shell, track);
    viewport.appendChild(track);
    stage.appendChild(prev);
    stage.appendChild(viewport);
    stage.appendChild(next);
    shell.appendChild(stage);
    dotsShell.appendChild(dotsLeft);
    dotsShell.appendChild(dots);
    dotsShell.appendChild(dotsRight);
    shell.appendChild(dotsShell);
    shell.appendChild(status);

    track.classList.add('mobile-card-carousel-track');

    const state = {
      track:track,
      shell:shell,
      stage:stage,
      viewport:viewport,
      prev:prev,
      next:next,
      dotsShell:dotsShell,
      dots:dots,
      dotsLeft:dotsLeft,
      dotsRight:dotsRight,
      status:status,
      placeholder:placeholder,
      parent:parent,
      index:0,
      items:initialItems,
      visible:[],
      refreshFrame:0,
      startX:null,
      startY:null,
      observer:null,
      resizeObserver:null,
      measuring:false,
      fixedHeight:0,
      lastViewportWidth:0,
      originalStyle:track.getAttribute('style')
    };

    states.set(track, state);

    prev.addEventListener('click', function(){
      moveTo(state, state.index - 1, false);
    });

    next.addEventListener('click', function(){
      moveTo(state, state.index + 1, false);
    });

    dotsLeft.addEventListener('click', function(){
      moveDotsRail(state, 'left');
    });

    dotsRight.addEventListener('click', function(){
      moveDotsRail(state, 'right');
    });

    dots.addEventListener('scroll', function(){
      window.requestAnimationFrame(function(){
        updateDotsArrowState(state);
      });
    }, { passive:true });

    viewport.addEventListener('keydown', function(event){
      if(event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();

      const forward = isRTL()
        ? event.key === 'ArrowLeft'
        : event.key === 'ArrowRight';

      moveTo(
        state,
        state.index + (forward ? 1 : -1),
        false
      );
    });

    viewport.addEventListener('touchstart', function(event){
      const touch = event.touches && event.touches[0];
      if(!touch) return;
      state.startX = touch.clientX;
      state.startY = touch.clientY;
    }, { passive:true });

    viewport.addEventListener('touchend', function(event){
      const touch = event.changedTouches && event.changedTouches[0];
      if(!touch || state.startX === null || state.startY === null) return;

      const deltaX = touch.clientX - state.startX;
      const deltaY = touch.clientY - state.startY;
      state.startX = null;
      state.startY = null;

      if(Math.abs(deltaX) < 42) return;
      if(Math.abs(deltaX) < Math.abs(deltaY) * 1.15) return;

      const forward = isRTL() ? deltaX > 0 : deltaX < 0;

      moveTo(
        state,
        state.index + (forward ? 1 : -1),
        false
      );
    }, { passive:true });

    state.observer = new MutationObserver(function(mutations){
      const relevant = mutations.some(function(mutation){
        /*
         * Rebuild only when cards are added/removed directly from the
         * track or when a direct card changes its visibility class.
         * Ignore text and nested content mutations such as animated
         * counter numbers, otherwise the dots are continuously rebuilt.
         */
        if(mutation.type === 'childList'){
          return mutation.target === track;
        }

        if(mutation.type === 'attributes'){
          return mutation.target.parentElement === track;
        }

        return false;
      });

      if(relevant){
        scheduleRefresh(state, true);
      }
    });

    state.observer.observe(track, {
      childList:true,
      subtree:true,
      attributes:true,
      attributeFilter:['class', 'hidden']
    });

    if('ResizeObserver' in window){
      state.resizeObserver = new ResizeObserver(function(){
        if(state.measuring) return;
        const width = Math.round(
          state.viewport.getBoundingClientRect().width
        );
        if(width && width !== state.lastViewportWidth){
          state.fixedHeight = 0;
          updateHeight(state);
          updateDotsNavigation(state, true);
        }
      });
      state.resizeObserver.observe(viewport);
    }

    track.querySelectorAll('img').forEach(function(image){
      image.addEventListener('load', function(){
        updateHeight(state);
      }, { once:true });
    });

    refresh(state, true);
  };

  const teardown = function(state){
    window.cancelAnimationFrame(state.refreshFrame);
    if(state.observer) state.observer.disconnect();
    if(state.resizeObserver) state.resizeObserver.disconnect();

    state.items.forEach(function(item){
      item.classList.remove('mobile-card-carousel-item');
      item.removeAttribute('inert');
      item.removeAttribute('aria-hidden');
    });

    state.track.classList.remove('mobile-card-carousel-track');
    state.shell.style.removeProperty('--mobile-carousel-fixed-height');
    state.viewport.style.removeProperty('height');
    if(state.originalStyle === null){
      state.track.removeAttribute('style');
    }else{
      state.track.setAttribute('style', state.originalStyle);
    }

    if(state.placeholder.parentNode){
      state.placeholder.parentNode.insertBefore(
        state.track,
        state.placeholder.nextSibling
      );
    }

    state.shell.remove();
    state.placeholder.remove();
    states.delete(state.track);
  };

  const scan = function(){
    if(!mobileQuery.matches) return;

    const candidates = new Set();
    candidateSelectors.forEach(function(selector){
      document.querySelectorAll(selector).forEach(function(track){
        candidates.add(track);
      });
    });

    candidates.forEach(build);
  };

  const syncMode = function(){
    if(mobileQuery.matches){
      scan();
      states.forEach(function(state){
        scheduleRefresh(state, true);
      });
      return;
    }

    Array.from(states.values()).forEach(teardown);
  };

  if(typeof mobileQuery.addEventListener === 'function'){
    mobileQuery.addEventListener('change', syncMode);
  }else if(typeof mobileQuery.addListener === 'function'){
    mobileQuery.addListener(syncMode);
  }

  window.addEventListener('resize', function(){
    if(!mobileQuery.matches) return;
    states.forEach(function(state){
      scheduleRefresh(state, true);
    });
  }, { passive:true });

  window.addEventListener('orientationchange', function(){
    if(!mobileQuery.matches) return;
    states.forEach(function(state){
      scheduleRefresh(state, true);
    });
  });

  window.addEventListener('load', function(){
    if(!mobileQuery.matches) return;
    states.forEach(function(state){
      scheduleRefresh(state, true);
    });
  });

  syncMode();
})();

// Mobile footer accordion menus
(function(){
  const mobileQuery = window.matchMedia('(max-width: 640px)');
  const footers = Array.from(document.querySelectorAll('.site-footer'));

  if(!footers.length) return;

  footers.forEach(function(footer, footerIndex){
    const grid = footer.querySelector('.footer-grid');
    if(!grid) return;

    const columns = Array.from(grid.children).slice(1);
    if(!columns.length) return;

    const items = [];

    columns.forEach(function(column, columnIndex){
      const heading = column.querySelector(':scope > h2');
      const trigger = heading && heading.querySelector(':scope > a');
      if(!heading || !trigger) return;

      const triggerHref = (trigger.getAttribute('href') || '').toLowerCase();
      const headingText = trigger.textContent.trim().toLowerCase();
      const isContactColumn =
        triggerHref.includes('contact') ||
        headingText === 'contact' ||
        headingText === 'التواصل';

      if(isContactColumn){
        column.classList.add('footer-static-contact');
        return;
      }

      column.classList.add('footer-accordion-item');
      trigger.classList.add('footer-accordion-trigger');

      let chevron = trigger.querySelector('.footer-accordion-chevron');
      if(!chevron){
        chevron = document.createElement('span');
        chevron.className = 'footer-accordion-chevron';
        chevron.setAttribute('aria-hidden', 'true');
        chevron.innerHTML = '<svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M4 7l6 6 6-6"></path></svg>';
        trigger.appendChild(chevron);
      }

      const originalHref = trigger.getAttribute('href');
      const originalRole = trigger.getAttribute('role');
      const originalTabIndex = trigger.getAttribute('tabindex');

      const panel = document.createElement('div');
      const panelInner = document.createElement('div');
      const panelId = 'footer-accordion-' + footerIndex + '-' + columnIndex;

      panel.className = 'footer-accordion-panel';
      panel.id = panelId;
      panel.setAttribute('aria-hidden', 'true');
      panelInner.className = 'footer-accordion-panel-inner';

      let sibling = heading.nextSibling;
      while(sibling){
        const nextSibling = sibling.nextSibling;
        panelInner.appendChild(sibling);
        sibling = nextSibling;
      }

      panel.appendChild(panelInner);
      column.appendChild(panel);

      trigger.setAttribute('aria-controls', panelId);
      trigger.setAttribute('aria-expanded', 'false');

      const item = {
        column,
        trigger,
        panel,
        originalHref,
        originalRole,
        originalTabIndex
      };
      items.push(item);

      const setOpen = function(open, immediate){
        column.classList.toggle('is-open', open);
        trigger.setAttribute('aria-expanded', String(open));
        panel.setAttribute('aria-hidden', String(!open));

        if(!mobileQuery.matches){
          panel.style.maxHeight = '';
          return;
        }

        if(open){
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }else if(immediate){
          panel.style.maxHeight = '0px';
        }else{
          panel.style.maxHeight = panel.scrollHeight + 'px';
          panel.offsetHeight;
          panel.style.maxHeight = '0px';
        }
      };

      item.setOpen = setOpen;

      trigger.addEventListener('click', function(event){
        if(!mobileQuery.matches) return;

        event.preventDefault();
        const shouldOpen = trigger.getAttribute('aria-expanded') !== 'true';

        items.forEach(function(other){
          if(other !== item && other.setOpen){
            other.setOpen(false, false);
          }
        });

        setOpen(shouldOpen, false);
      });

      trigger.addEventListener('keydown', function(event){
        if(!mobileQuery.matches) return;
        if(event.key !== 'Enter' && event.key !== ' ') return;

        event.preventDefault();
        trigger.click();
      });
    });

    const refresh = function(){
      items.forEach(function(item){
        if(!mobileQuery.matches){
          item.column.classList.remove('is-open');
          item.trigger.setAttribute('aria-expanded', 'false');
          item.panel.setAttribute('aria-hidden', 'false');
          item.panel.style.maxHeight = '';

          if(item.originalHref !== null){
            item.trigger.setAttribute('href', item.originalHref);
          }

          if(item.originalRole !== null){
            item.trigger.setAttribute('role', item.originalRole);
          }else{
            item.trigger.removeAttribute('role');
          }

          if(item.originalTabIndex !== null){
            item.trigger.setAttribute('tabindex', item.originalTabIndex);
          }else{
            item.trigger.removeAttribute('tabindex');
          }
          return;
        }

        item.trigger.removeAttribute('href');
        item.trigger.setAttribute('role', 'button');
        item.trigger.setAttribute('tabindex', '0');

        const isOpen = item.trigger.getAttribute('aria-expanded') === 'true';
        item.panel.setAttribute('aria-hidden', String(!isOpen));
        item.panel.style.maxHeight = isOpen
          ? item.panel.scrollHeight + 'px'
          : '0px';
      });
    };

    if(typeof mobileQuery.addEventListener === 'function'){
      mobileQuery.addEventListener('change', refresh);
    }else if(typeof mobileQuery.addListener === 'function'){
      mobileQuery.addListener(refresh);
    }

    window.addEventListener('resize', function(){
      if(!mobileQuery.matches) return;
      items.forEach(function(item){
        if(item.trigger.getAttribute('aria-expanded') === 'true'){
          item.panel.style.maxHeight = item.panel.scrollHeight + 'px';
        }
      });
    }, { passive:true });

    refresh();
  });
})();
