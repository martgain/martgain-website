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
