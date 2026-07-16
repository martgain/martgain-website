/* Shared project and partner renderer. Must load before main.js. */
(function(){
  'use strict';

  const content = window.ASG_CONTENT_DATA;
  const script = document.currentScript;
  if(!content || !script) return;

  const siteRoot = new URL('../../', script.src);
  const projectsBySlug = new Map(content.projects.map(project => [project.slug, project]));
  const currentPath = window.location.pathname.replace(/\\/g, '/').toLowerCase();

  const copy = {
    en: {
      all: 'All',
      viewProject: 'View project',
      imageAltSuffix: 'cover image',
      projectOverview: 'Project overview',
      category: 'Portfolio category',
      evidenceEyebrow: 'Confirmed project data',
      evidenceTitle: 'Published from the reviewed ASG delivery',
      evidenceBody: 'The project name, portfolio category, and imagery come from the supplied organized project folder. Location, year, and service scope are intentionally omitted until confirmed.',
      gallery: 'Project gallery',
      galleryIntro: 'Approved project images from the supplied ASG folder.',
      image: 'Image',
      related: 'Related projects',
      startEyebrow: 'Start the conversation',
      startTitle: 'Discuss a similar project',
      startBody: 'Share your project type, location, and required scope with ASG.',
      start: 'Start a Project',
      whatsapp: 'WhatsApp',
      missingTitle: 'Project not found',
      missingBody: 'Choose a verified project from the ASG portfolio.',
      back: 'Back to Portfolio'
    },
    ar: {
      all: 'الكل',
      viewProject: 'عرض المشروع',
      imageAltSuffix: 'صورة الغلاف',
      projectOverview: 'نظرة عامة على المشروع',
      category: 'تصنيف البورتفوليو',
      verified: 'مجلد وصور موثقة',
      evidenceEyebrow: 'بيانات مشروع مؤكدة',
      evidenceTitle: 'منشور من تسليم ASG المنظّم والمراجَع',
      evidenceBody: 'اسم المشروع وتصنيف البورتفوليو والصور مأخوذة من مجلد المشروع المنظّم المرسل. تم إخفاء الموقع والسنة ونطاق الخدمات لحين تأكيدها.',
      gallery: 'معرض المشروع',
      galleryIntro: 'صور المشروع المعتمدة من مجلد ASG المرسل.',
      image: 'صورة',
      related: 'مشاريع ذات صلة',
      startEyebrow: 'ابدأ المحادثة',
      startTitle: 'ناقش مشروعًا مشابهًا',
      startBody: 'شارك نوع المشروع والموقع ونطاق العمل المطلوب مع ASG.',
      start: 'ابدأ مشروعك',
      whatsapp: 'واتساب',
      missingTitle: 'المشروع غير موجود',
      missingBody: 'اختر مشروعًا موثقًا من بورتفوليو ASG.',
      back: 'العودة إلى البورتفوليو'
    }
  };

  function pageLanguage(){
    return document.documentElement.lang.toLowerCase().startsWith('ar') ? 'ar' : 'en';
  }

  function absoluteUrl(path){
    return new URL(path, siteRoot).href;
  }

  function projectUrl(project, lang){
    const url = new URL('projects/index.html', siteRoot);
    url.searchParams.set('project', project.slug);
    if(lang === 'ar') url.searchParams.set('lang', 'ar');
    return url.href;
  }

  function escapeHtml(value){
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function cardMarkup(project, lang){
    const title = project.title[lang];
    const category = project.categoryLabel[lang];
    const cover = project.images[project.coverIndex];
    const filters = [...new Set([...project.filters, project.categoryKey])].join(' ');
    return `<article class="project-card" data-filter="${escapeHtml(filters)}" data-project-card>
      <div class="project-media"><img alt="${escapeHtml(title)} ${escapeHtml(copy[lang].imageAltSuffix)}" height="${cover.height}" loading="lazy" src="${escapeHtml(absoluteUrl(cover.src))}" width="${cover.width}"></div>
      <div class="project-body"><span class="eyebrow">${escapeHtml(category)}</span><h3>${escapeHtml(title)}</h3><p>${escapeHtml(category)}</p><a class="text-link" href="${escapeHtml(projectUrl(project, lang))}">${escapeHtml(copy[lang].viewProject)}</a></div>
    </article>`;
  }

  function serviceProjects(){
    let filter = null;
    if(currentPath.includes('/architectural-design/')) filter = 'architecture';
    else if(currentPath.includes('/interior-design/')) filter = 'interior';
    else if(currentPath.includes('/landscape-urban-design/')) filter = 'landscape';
    const source = filter ? content.projects.filter(project => project.filters.includes(filter)) : content.projects;
    return source.slice(0, 6);
  }

  function feedProjects(feed){
    if(feed === 'portfolio') return content.projects;
    if(feed === 'featured'){
      const featured = [
        'al-azizia-hotel',
        'dorret-al-haramen',
        'garwal-restaurant',
        'mr-fahd-al-sebety',
        'mr-mohamed-al-khayal',
        'sunset-park'
      ];
      return featured.map(slug => projectsBySlug.get(slug)).filter(Boolean);
    }
    return serviceProjects();
  }

  function renderProjectFeeds(){
    const lang = pageLanguage();
    document.querySelectorAll('[data-projects-feed]').forEach(grid => {
      const projects = feedProjects(grid.dataset.projectsFeed || 'related');
      grid.innerHTML = projects.map(project => cardMarkup(project, lang)).join('');
    });
  }

  function renderFilters(){
    const lang = pageLanguage();
    document.querySelectorAll('[data-project-filter-list]').forEach(toolbar => {
      const buttons = [
        {key: 'all', label: copy[lang].all},
        ...content.categories.map(category => ({key: category.key, label: category.label[lang]}))
      ];
      toolbar.innerHTML = buttons.map((button, index) =>
        `<button aria-pressed="${index === 0 ? 'true' : 'false'}" class="filter-btn" data-filter-btn="${escapeHtml(button.key)}" type="button">${escapeHtml(button.label)}</button>`
      ).join('');
    });
  }

  function renderPartners(){
    document.querySelectorAll('[data-partners-marquee]').forEach((marquee, rowIndex) => {
      const group = marquee.querySelector('[data-partners-group]');
      if(!group) return;
      const split = Math.ceil(content.partners.length / 2);
      const partners = rowIndex % 2 === 0 ? content.partners.slice(0, split) : content.partners.slice(split);
      const lang = pageLanguage();
      group.innerHTML = partners.map(partner =>
        `<div class="partners-logo-card"><img alt="${escapeHtml(partner.alt[lang])}" class="partners-logo-image" decoding="async" height="150" loading="lazy" src="${escapeHtml(absoluteUrl(partner.src))}" width="150"></div>`
      ).join('');
    });
  }

  function updateMeta(project, lang){
    const title = project.title[lang];
    const category = project.categoryLabel[lang];
    const description = lang === 'ar'
      ? `${title} — ${category}. ${project.images.length} صورة موثقة من بورتفوليو ASG المنظّم.`
      : `${title} — ${category}. ${project.images.length} verified images from the organized ASG portfolio.`;
    const canonical = `https://asg-llc-eg.com/projects/?project=${encodeURIComponent(project.slug)}`;
    const alternateAr = `${canonical}&lang=ar`;
    const coverUrl = `https://asg-llc-eg.com/${project.images[project.coverIndex].src}`;

    document.title = `${title} | ASG Project`;
    const descriptionMeta = document.querySelector('meta[name="description"]');
    if(descriptionMeta) descriptionMeta.content = description;
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if(canonicalLink) canonicalLink.href = canonical;
    document.querySelectorAll('link[rel="alternate"]').forEach(link => link.remove());
    [['en', canonical], ['ar', alternateAr], ['x-default', canonical]].forEach(([hreflang, href]) => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = hreflang;
      link.href = href;
      document.head.appendChild(link);
    });
    const metaValues = {
      'meta[property="og:title"]': `${title} | ASG Project`,
      'meta[property="og:description"]': description,
      'meta[property="og:url"]': lang === 'ar' ? alternateAr : canonical,
      'meta[property="og:image"]': coverUrl
    };
    Object.entries(metaValues).forEach(([selector, value]) => {
      const meta = document.querySelector(selector);
      if(meta) meta.content = value;
    });
    const twitterValues = {
      'twitter:title': `${title} | ASG Project`,
      'twitter:description': description,
      'twitter:image': coverUrl
    };
    Object.entries(twitterValues).forEach(([name, value]) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if(!meta){
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = value;
    });
    const robots = document.querySelector('meta[name="robots"][data-project-robots]');
    if(robots) robots.remove();

    let schema = document.querySelector('[data-project-schema]');
    if(!schema){
      schema = document.createElement('script');
      schema.type = 'application/ld+json';
      schema.dataset.projectSchema = '';
      document.head.appendChild(schema);
    }
    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: title,
      genre: category,
      image: project.images.map(image => `https://asg-llc-eg.com/${image.src}`),
      url: lang === 'ar' ? alternateAr : canonical,
      creator: {'@type': 'Organization', name: 'ASG Engineering Consulting Group'}
    });
  }

  const shellArabic = {
    'Home': 'الرئيسية',
    'Portfolio': 'أعمالنا',
    'Services': 'خدماتنا',
    'Architectural Design': 'التصميم المعماري',
    'Interior Design': 'التصميم الداخلي',
    'BIM Services': 'خدمات BIM',
    'MEP Engineering': 'الهندسة الكهروميكانيكية MEP',
    'Structural Engineering': 'الهندسة الإنشائية',
    'Landscape & Urban Design': 'اللاندسكيب والتخطيط الحضري',
    'Infrastructure': 'البنية التحتية',
    'Irrigation Systems': 'أنظمة الري',
    'About': 'عن ASG',
    'Reviews': 'آراء العملاء',
    'Contact': 'تواصل',
    'Start a Project': 'ابدأ مشروعك',
    'Chat on WhatsApp': 'تواصل عبر واتساب',
    'Explore': 'روابط',
    'FAQ': 'الأسئلة الشائعة'
  };

  function translateShell(lang){
    const candidates = document.querySelectorAll('header a, header button, footer a, footer h2');
    candidates.forEach(node => {
      if(node.children.length) return;
      const text = node.textContent.trim();
      if(!node.dataset.projectShellEn) node.dataset.projectShellEn = text;
      const english = node.dataset.projectShellEn;
      if(lang === 'ar' && shellArabic[english]) node.textContent = shellArabic[english];
      else if(lang === 'en') node.textContent = english;
    });
  }

  function setProjectLanguageLinks(project, lang){
    const nextLang = lang === 'ar' ? 'en' : 'ar';
    document.querySelectorAll('[data-lang-switch]').forEach(link => {
      link.href = projectUrl(project, nextLang);
      link.hreflang = nextLang;
      link.textContent = nextLang === 'ar' ? 'العربية' : 'English';
      link.setAttribute('aria-label', nextLang === 'ar' ? 'عرض المشروع بالعربية' : 'View project in English');
    });
  }

  function galleryMarkup(project, lang){
    return project.images.map((image, index) =>
      `<figure class="gallery-item"><img alt="${escapeHtml(image.alt[lang])}" height="${image.height}" loading="lazy" src="${escapeHtml(absoluteUrl(image.src))}" width="${image.width}"><figcaption>${escapeHtml(copy[lang].image)} ${index + 1} / ${project.images.length}</figcaption></figure>`
    ).join('');
  }

  function renderMissingProject(main, lang){
    const portfolioUrl = new URL(lang === 'ar' ? 'ar/portfolio/index.html' : 'portfolio/index.html', siteRoot).href;
    main.innerHTML = `<section class="page-hero"><div class="container"><span class="eyebrow">ASG</span><h1>${escapeHtml(copy[lang].missingTitle)}</h1><p>${escapeHtml(copy[lang].missingBody)}</p><a class="btn" href="${escapeHtml(portfolioUrl)}">${escapeHtml(copy[lang].back)}</a></div></section>`;
    document.title = `${copy[lang].missingTitle} | ASG`;
    let robots = document.querySelector('meta[name="robots"][data-project-robots]');
    if(!robots){
      robots = document.createElement('meta');
      robots.name = 'robots';
      robots.dataset.projectRobots = '';
      document.head.appendChild(robots);
    }
    robots.content = 'noindex,follow';
  }

  function renderProjectPage(){
    const main = document.querySelector('[data-project-page]');
    if(!main) return;
    const params = new URLSearchParams(window.location.search);
    const lang = params.get('lang') === 'ar' ? 'ar' : 'en';
    const project = projectsBySlug.get(params.get('project') || '');

    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
    translateShell(lang);

    if(!project){
      renderMissingProject(main, lang);
      return;
    }

    const title = project.title[lang];
    const category = project.categoryLabel[lang];
    const cover = project.images[project.coverIndex];
    const related = content.projects.filter(candidate => candidate.categoryKey === project.categoryKey && candidate.slug !== project.slug).slice(0, 3);
    const contactUrl = new URL(lang === 'ar' ? 'ar/contact/index.html' : 'contact/index.html', siteRoot).href;
    const whatsappText = lang === 'ar' ? 'مرحبًا ASG، أود مناقشة مشروع.' : 'Hi ASG, I would like to discuss a project.';
    const whatsappUrl = `https://wa.me/201000336679?text=${encodeURIComponent(whatsappText)}`;

    updateMeta(project, lang);
    setProjectLanguageLinks(project, lang);
    main.innerHTML = `
      <section class="case-hero"><figure class="case-visual"><img alt="${escapeHtml(cover.alt[lang])}" fetchpriority="high" height="${cover.height}" src="${escapeHtml(absoluteUrl(cover.src))}" width="${cover.width}"></figure><div class="case-hero-copy"><span class="eyebrow">${escapeHtml(category)}</span><h1>${escapeHtml(title)}</h1><p>${escapeHtml(category)}</p></div></section>
      <section class="section"><div class="container narrow"><h2>${escapeHtml(copy[lang].projectOverview)}</h2><div class="overview-table"><div>${escapeHtml(copy[lang].category)}</div><div>${escapeHtml(category)}</div></div></div></section>
      <section class="section"><div class="container section-head"><span class="eyebrow">${escapeHtml(copy[lang].gallery)}</span><h2>${escapeHtml(title)}</h2><p>${escapeHtml(copy[lang].galleryIntro)}</p></div><div class="container gallery-grid">${galleryMarkup(project, lang)}</div></section>
      <section class="section section-soft"><div class="container section-head"><h2>${escapeHtml(copy[lang].related)}</h2></div><div class="container"><div class="project-grid" data-project-grid>${related.map(candidate => cardMarkup(candidate, lang)).join('')}</div></div></section>
      <section class="section cta-band"><div class="container split"><div><span class="eyebrow">${escapeHtml(copy[lang].startEyebrow)}</span><h2>${escapeHtml(copy[lang].startTitle)}</h2><p>${escapeHtml(copy[lang].startBody)}</p></div><div class="cta-actions"><a class="btn btn-invert" href="${escapeHtml(contactUrl)}">${escapeHtml(copy[lang].start)}</a><a class="btn btn-ghost-dark" href="${escapeHtml(whatsappUrl)}" rel="noopener" target="_blank">${escapeHtml(copy[lang].whatsapp)}</a></div></div></section>`;
  }

  renderFilters();
  renderProjectFeeds();
  renderPartners();
  renderProjectPage();
})();
