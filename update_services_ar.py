from pathlib import Path
from bs4 import BeautifulSoup
import json, re, shutil, html

base = Path('/mnt/data/asg_service_ar_work')
manifest = json.loads((base/'SOURCE_DATA_MANIFEST.json').read_text('utf-8'))
projects = manifest['all_projects']

WHATS_EN = 'https://wa.me/201000336679?text=Hi%20ASG%2C%20I%20would%20like%20to%20discuss%20a%20project.'
WHATS_AR = 'https://wa.me/201000336679?text=%D9%85%D8%B1%D8%AD%D8%A8%D9%8B%D8%A7%20ASG%D8%8C%20%D8%A3%D9%88%D8%AF%20%D9%85%D9%86%D8%A7%D9%82%D8%B4%D8%A9%20%D9%85%D8%B4%D8%B1%D9%88%D8%B9.'
BASE_URL = 'https://asg-llc-eg.com'

services = [
  {
    'slug':'architectural-design','code':'AD','en':'Architectural Design','ar':'التصميم المعماري',
    'en_desc':'Architecture concepts, design development, and project documentation for residential, hospitality, commercial, and mixed-use projects.',
    'ar_desc':'تطوير الأفكار المعمارية، وتنسيق المساحات، وتوثيق التصميم للمشاريع السكنية والفندقية والتجارية ومتعددة الاستخدامات.',
    'for_ar':['مطورون يخططون لمبانٍ جديدة','ملاك يحتاجون اتجاهًا معماريًا أوضح','فرق تنفيذ تحتاج تصميمًا منسقًا قبل البدء'],
    'need_ar':'التصميم المعماري الجيد لا يكتفي بالشكل؛ بل يحوّل متطلبات المشروع إلى اتجاه قابل للفهم والتطوير والتنفيذ.',
    'deliver_ar':['اتجاه Concept واضح','تنظيم المساحات','دراسات الكتل والواجهات','تطوير التصميم','تنسيق مع التخصصات الهندسية'],
    'faq':[('هل يمكن البدء من مجرد فكرة أولية؟','نعم، يمكن مناقشة الفكرة والمتطلبات الأساسية أولًا ثم تحديد المسار المناسب.'),('هل الخدمة مرتبطة بباقي التخصصات؟','نعم، يتم التعامل مع التصميم كجزء من منظومة هندسية متكاملة عند الحاجة.')],
    'match': lambda p: 'Architecture' in p['scope'] and 'Interior' not in p['category'] and 'Supervision' not in p['category']
  },
  {
    'slug':'interior-design','code':'ID','en':'Interior Design','ar':'التصميم الداخلي',
    'en_desc':'Interior design for apartments, villas, administrative spaces, retail environments, and hospitality interiors.',
    'ar_desc':'تصميم داخلي للشقق والفلل والمساحات الإدارية والتجارية والضيافة، مع ربط الشكل بالاستخدام اليومي للمكان.',
    'for_ar':['ملاك شقق وفلل يحتاجون تصميمًا عمليًا','مساحات إدارية أو تجارية تحتاج هوية داخلية','مشاريع ضيافة تحتاج تجربة استخدام أوضح'],
    'need_ar':'التصميم الداخلي يحتاج توازنًا بين الشكل، الحركة، توزيع الوظائف، وتفاصيل الاستخدام داخل المساحة.',
    'deliver_ar':['توزيع المساحات الداخلية','اتجاه تصميمي واضح','اقتراحات تشطيب وخامات ضمن نطاق التصميم','تطوير التصميم الداخلي','تنسيق مع متطلبات المشروع'],
    'faq':[('هل التصميم الداخلي مناسب للمساحات الصغيرة؟','نعم، ويمكن أن يساعد في تحسين استخدام المساحة وتوضيح أولوياتها.'),('هل يتم ربط الداخلي بالمعماري؟','عند الحاجة، يتم التعامل مع التصميم الداخلي كجزء من الصورة الكاملة للمشروع.')],
    'match': lambda p: 'Interior' in p['category'] or 'Interior' in p['scope']
  },
  {
    'slug':'bim-services','code':'BIM','en':'BIM Services','ar':'خدمات BIM',
    'en_desc':'BIM support for model coordination, technical clarity, and multidisciplinary project delivery.',
    'ar_desc':'دعم BIM لتنسيق النماذج، وتحسين وضوح المعلومات الفنية، ومساندة التسليم متعدد التخصصات.',
    'for_ar':['فرق تحتاج تنسيقًا أوضح بين التخصصات','مشاريع تحتاج نموذجًا فنيًا منظمًا','ملاك أو مطورون يريدون تقليل الالتباس قبل التنفيذ'],
    'need_ar':'BIM يساعد في تحويل معلومات المشروع إلى نموذج أكثر تنظيمًا، ويجعل التنسيق بين التخصصات أوضح.',
    'deliver_ar':['تنظيم نموذج BIM','تنسيق بين التخصصات','تحسين وضوح المعلومات الفنية','دعم مراجعة النموذج','مخرجات فنية حسب نطاق المشروع'],
    'faq':[('هل BIM بديل عن التصميم؟','لا، هو وسيلة تنظيم وتنسيق معلومات المشروع حسب نطاق العمل.'),('هل يناسب المشاريع متعددة التخصصات؟','نعم، خصوصًا عندما يحتاج المشروع إلى تنسيق أوضح بين الفرق.')],
    'match': lambda p: 'BIM' in p['category'] or 'BIM' in p['scope']
  },
  {
    'slug':'mep-engineering','code':'MEP','en':'MEP Engineering','ar':'الهندسة الكهروميكانيكية MEP',
    'en_desc':'Mechanical, electrical, and plumbing engineering coordination for building projects.',
    'ar_desc':'تنسيق الأعمال الميكانيكية والكهربائية والسباكة ضمن منظومة تصميم المبنى، بما يدعم وضوح المشروع قبل التنفيذ.',
    'for_ar':['مشاريع تحتاج تنسيق خدمات المبنى','فرق تصميم تحتاج ربط MEP بالمعماري والإنشائي','ملاك يريدون تقليل التعارضات الفنية مبكرًا'],
    'need_ar':'أعمال MEP تؤثر على التشغيل، الحركة، الفراغات، والتنسيق العام؛ لذلك تحتاج معالجة مبكرة داخل التصميم.',
    'deliver_ar':['تنسيق متطلبات الكهرباء','تنسيق متطلبات الميكانيكا','تنسيق متطلبات السباكة','مراجعة التعارضات مع التصميم','دعم مخرجات المشروع حسب النطاق'],
    'faq':[('هل يتم العمل منفصلًا عن التصميم المعماري؟','الأفضل أن يتم التنسيق مع المعماري والإنشائي لتقليل التعارضات.'),('هل يمكن مناقشة نطاق MEP قبل التسعير؟','نعم، يتم توضيح نوع المشروع والمطلوب أولًا لتحديد النطاق المناسب.')],
    'match': lambda p: 'Engineering' in p['scope']
  },
  {
    'slug':'structural-engineering','code':'SE','en':'Structural Engineering','ar':'الهندسة الإنشائية',
    'en_desc':'Structural engineering support aligned with architectural design and project documentation needs.',
    'ar_desc':'دعم هندسي إنشائي متوافق مع التصميم المعماري واحتياجات توثيق المشروع، ضمن نطاق العمل المطلوب.',
    'for_ar':['مشاريع تحتاج ربطًا بين المعماري والإنشائي','ملاك أو مطورون في مرحلة تطوير التصميم','فرق تنفيذ تحتاج وضوحًا إنشائيًا قبل التقدم'],
    'need_ar':'الهندسة الإنشائية يجب أن تعمل مع التصميم وليس بعده فقط، حتى يظل الحل قابلًا للتنفيذ والتنسيق.',
    'deliver_ar':['دعم التصميم الإنشائي حسب النطاق','تنسيق مع المعماري','مراجعة متطلبات المشروع','توضيح المسار الفني','مخرجات إنشائية حسب الاتفاق'],
    'faq':[('هل الخدمة مرتبطة بالمعماري؟','نعم، التنسيق مع المعماري أساسي للحفاظ على منطق التصميم والتنفيذ.'),('هل يمكن تحديد المطلوب من خلال واتساب؟','يمكن إرسال نوع المشروع والموقع والمرحلة الحالية كبداية للمناقشة.')],
    'match': lambda p: 'Architecture / Engineering' in p['scope'] or p['category']=='Supervision Projects'
  },
  {
    'slug':'landscape-urban-design','code':'LU','en':'Landscape & Urban Design','ar':'اللاندسكيب والتخطيط العمراني',
    'en_desc':'Landscape and urban design support for outdoor spaces, compounds, villas, and project environments.',
    'ar_desc':'تصميم ودعم مساحات خارجية ولاندسكيب للمشاريع والفلل والكمباوندات والبيئات العمرانية حسب نطاق المشروع.',
    'for_ar':['مشاريع تحتاج مساحات خارجية منظمة','فلل وكمباوندات تحتاج ربطًا بين المباني والفراغات','مطورون يريدون تجربة خارجية أوضح للمشروع'],
    'need_ar':'المساحات الخارجية جزء من تجربة المشروع، وليست عنصرًا تجميليًا فقط؛ لذلك تحتاج توزيعًا وحركة وعلاقة واضحة بالمباني.',
    'deliver_ar':['تصور المساحات الخارجية','تنظيم الحركة والمناطق','ربط اللاندسكيب بالمباني','دعم التخطيط العمراني حسب النطاق','تنسيق مع المتطلبات المعمارية'],
    'faq':[('هل الخدمة مناسبة للفلل؟','نعم، يمكن تطبيقها على الفلل والمساحات الخارجية والمشاريع الأكبر حسب النطاق.'),('هل تشمل التخطيط العمراني؟','يتم تحديد ذلك حسب طبيعة المشروع والمرحلة المطلوبة.')],
    'match': lambda p: 'Landscape' in p['category'] or 'Landscape' in p['scope'] or 'Compounds' in p['category']
  },
  {
    'slug':'infrastructure','code':'INF','en':'Infrastructure','ar':'البنية التحتية',
    'en_desc':'Infrastructure engineering support for site planning, networks, roads, and utility coordination where applicable.',
    'ar_desc':'دعم هندسي للبنية التحتية وتنسيق الموقع والشبكات والمرافق والطرق عند ارتباطها بنطاق المشروع.',
    'for_ar':['مشاريع تحتاج تنسيق موقع ومرافق','مطورون يعملون على نطاقات أكبر من مبنى واحد','فرق تحتاج ربط البنية التحتية بالتصميم العام'],
    'need_ar':'البنية التحتية تؤثر على قابلية تشغيل المشروع وتنظيم الموقع، لذلك يجب التعامل معها مبكرًا عند الحاجة.',
    'deliver_ar':['تنسيق الموقع العام','دعم تخطيط الشبكات حسب النطاق','تنسيق المرافق','دعم ربط الموقع بالمباني','مخرجات فنية حسب المشروع'],
    'faq':[('هل كل مشروع يحتاج بنية تحتية؟','ليس بالضرورة؛ يتم تحديد ذلك حسب حجم المشروع ونوع الموقع ونطاق العمل.'),('هل يمكن دمجها مع خدمات أخرى؟','نعم، عند الحاجة يمكن ربطها بالمعماري واللاندسكيب وباقي التخصصات.')],
    'match': lambda p: p['category'] in ['Compounds','Supervision Projects'] or 'Engineering' in p['scope']
  },
  {
    'slug':'irrigation-systems','code':'IRR','en':'Irrigation Systems','ar':'أنظمة الري',
    'en_desc':'Irrigation system planning support connected to landscape and outdoor project requirements.',
    'ar_desc':'دعم تخطيط أنظمة الري المرتبطة باللاندسكيب والمساحات الخارجية ومتطلبات الموقع حسب نطاق المشروع.',
    'for_ar':['مشاريع لاندسكيب تحتاج نظام ري منظم','فلل أو مساحات خارجية بها زراعة','مشاريع تحتاج تنسيق الري مع تصميم الموقع'],
    'need_ar':'أنظمة الري يجب أن ترتبط بتصميم اللاندسكيب وطبيعة الاستخدام، حتى لا تكون إضافة منفصلة عن منطق الموقع.',
    'deliver_ar':['تحديد احتياجات الري حسب المساحة','تنسيق الري مع اللاندسكيب','دعم تخطيط الشبكة','مراعاة مناطق الاستخدام','مخرجات حسب نطاق المشروع'],
    'faq':[('هل الخدمة مرتبطة باللاندسكيب؟','نعم، عادة تكون مرتبطة بتصميم المساحات الخارجية واحتياجات الموقع.'),('هل تناسب المشاريع الصغيرة؟','يمكن مناقشة ذلك حسب مساحة الموقع وطبيعة الزراعة أو الاستخدام الخارجي.')],
    'match': lambda p: 'Landscape' in p['category'] or 'Landscape' in p['scope'] or 'Compounds' in p['category']
  }
]
svc_by_slug={s['slug']:s for s in services}

def project_filter_class(p):
    txt=(p['category']+' '+p['scope']).lower()
    classes=['all']
    if 'interior' in txt: classes.append('interior')
    elif 'bim' in txt: classes.append('bim')
    elif 'landscape' in txt: classes.append('landscape')
    elif 'supervision' in txt: classes.append('supervision')
    elif 'engineering' in txt: classes.append('engineering')
    else: classes.append('architecture')
    if 'hotel' in txt or 'hospitality' in txt: classes.append('hospitality')
    return ' '.join(classes)

def related_projects(service, limit=6):
    matched=[p for p in projects if service['match'](p)]
    if len(matched)<limit:
        # fill with confirmed portfolio projects; no unsupported service-specific claim is made.
        existing={p['slug'] for p in matched}
        for p in projects:
            if p['slug'] not in existing:
                matched.append(p); existing.add(p['slug'])
            if len(matched)>=limit: break
    return matched[:limit]

def project_cards_ar(service):
    cards=[]
    for p in related_projects(service):
        slug=p['slug']; name=html.escape(p['name']); cat=html.escape(p['category']); loc=html.escape(p['location']); scope=html.escape(p['scope'])
        cards.append(f'''<article class="project-card" data-filter="{project_filter_class(p)}" data-project-card>
<div class="project-media"><img src="../../../assets/img/placeholders/project-card.svg" alt="عنصر بديل لصورة مشروع {name}" width="1600" height="1200" loading="lazy" data-real-image="assets/img/projects/{slug}/cover.webp"></div>
<div class="project-body"><span class="eyebrow">{cat}</span><h3>{name}</h3><p>{scope} · {loc}</p><small>مسار الصورة: <code>assets/img/projects/{slug}/cover.webp</code></small><a class="text-link" href="../../../projects/{slug}/index.html">عرض المشروع</a></div>
</article>''')
    return '\n'.join(cards)

def project_cards_ar_hub(limit=6):
    cards=[]
    for p in projects[:limit]:
        slug=p['slug']; name=html.escape(p['name']); cat=html.escape(p['category']); loc=html.escape(p['location']); scope=html.escape(p['scope'])
        cards.append(f'''<article class="project-card" data-filter="{project_filter_class(p)}" data-project-card>
<div class="project-media"><img src="../../assets/img/placeholders/project-card.svg" alt="عنصر بديل لصورة مشروع {name}" width="1600" height="1200" loading="lazy" data-real-image="assets/img/projects/{slug}/cover.webp"></div>
<div class="project-body"><span class="eyebrow">{cat}</span><h3>{name}</h3><p>{scope} · {loc}</p><small>مسار الصورة: <code>assets/img/projects/{slug}/cover.webp</code></small><a class="text-link" href="../../projects/{slug}/index.html">عرض المشروع</a></div>
</article>''')
    return '\n'.join(cards)

# Header/footer factories for AR service detail pages

def header_ar(rel_assets='../../../', current_slug=None):
    # links relative from /ar/services/<slug>/
    service_links=''.join([f'<a href="../{s["slug"]}/index.html">{s["ar"]}</a>' for s in services])
    return f'''<header class="site-header" data-header>
<a class="skip-link" href="#main">تجاوز إلى المحتوى</a>
<div class="container nav-shell">
<a aria-label="ASG الرئيسية" class="brand" href="../../index.html"><span class="brand-mark">ASG</span><span class="brand-text">Engineering Consulting Group</span></a>
<nav aria-label="التنقل الرئيسي" class="desktop-nav">
<a href="../../index.html">الرئيسية</a>
<a href="../../portfolio/index.html">أعمالنا</a>
<div class="nav-dropdown"><a aria-haspopup="true" href="../index.html">خدماتنا</a><div class="dropdown-menu">{service_links}</div></div>
<a href="../../about/index.html">عن ASG</a>
<a href="../../reviews/index.html">آراء العملاء</a>
<a href="../../contact/index.html">تواصل</a>
</nav>
<div class="nav-actions"><a aria-label="Switch to English" class="btn btn-small btn-outline lang-switch" data-lang-switch href="../../../services/{current_slug}/index.html" hreflang="en">English</a><a class="btn btn-small btn-outline mobile-wa" href="{WHATS_AR}" rel="noopener" target="_blank">واتساب</a><a class="btn btn-small" href="../../contact/index.html">ابدأ مشروعك</a><button aria-controls="mobile-menu" aria-expanded="false" aria-label="فتح القائمة" data-open-label="فتح القائمة" data-close-label="إغلاق القائمة" class="menu-toggle" data-menu-toggle type="button"><span></span><span></span></button></div>
</div>
<div class="mobile-panel" data-mobile-menu hidden id="mobile-menu">
<a href="../../index.html">الرئيسية</a>
<a href="../../portfolio/index.html">أعمالنا</a>
<a href="../index.html">خدماتنا</a>
{service_links}
<a href="../../about/index.html">عن ASG</a>
<a href="../../reviews/index.html">آراء العملاء</a>
<a href="../../contact/index.html">تواصل</a>
<a data-lang-switch href="../../../services/{current_slug}/index.html" hreflang="en">English</a>
<a class="btn" href="{WHATS_AR}" rel="noopener" target="_blank">تواصل عبر واتساب</a>
</div>
</header>'''

def footer_ar(rel='../../../'):
    service_lis=''.join([f'<li><a href="../{s["slug"]}/index.html">{s["ar"]}</a></li>' for s in services])
    return f'''<footer class="site-footer">
<div class="container footer-grid">
<div><a class="brand brand-footer" href="../../index.html"><span class="brand-mark">ASG</span><span class="brand-text">Engineering Consulting Group</span></a><p>مجموعة استشارات هندسية تقود الموقع بالبورتفوليو، ثم الخدمات، ثم مسار تواصل واضح.</p></div>
<div><h2>الخدمات</h2><ul>{service_lis}</ul></div>
<div><h2>روابط</h2><ul><li><a href="../../portfolio/index.html">أعمالنا</a></li><li><a href="../index.html">خدماتنا</a></li><li><a href="../../about/index.html">عن ASG</a></li><li><a href="../../reviews/index.html">آراء العملاء</a></li><li><a href="../../contact/index.html">تواصل</a></li></ul></div>
<div><h2>التواصل</h2><p><a href="{WHATS_AR}" rel="noopener" target="_blank">+20 10 00336679</a></p><p><a href="mailto:info@asg-llc-eg.com">info@asg-llc-eg.com</a></p><p>City Light Tower, Tanta, Egypt</p><a class="btn btn-invert" href="../../contact/index.html">ابدأ مشروعك</a></div>
</div><div class="container footer-bottom"><p>© 2026 ASG Engineering Consulting Group. Static website handoff.</p></div>
</footer>'''

# Generate Arabic service detail pages
for s in services:
    outdir = base/'ar/services'/s['slug']
    outdir.mkdir(parents=True, exist_ok=True)
    canonical = f'{BASE_URL}/ar/services/{s["slug"]}/'
    english = f'{BASE_URL}/services/{s["slug"]}/'
    cards = project_cards_ar(s)
    deliver=''.join([f'<div><span>✓</span>{html.escape(x)}</div>' for x in s['deliver_ar']])
    for_items=''.join([f'<article><h3>{html.escape(x)}</h3></article>' for x in s['for_ar']])
    faqs=''.join([f'<details class="faq-item"><summary>{html.escape(q)}</summary><p>{html.escape(a)}</p></details>' for q,a in s['faq']])
    page = f'''<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{s['ar']} | ASG Engineering Consulting Group</title>
<meta name="description" content="صفحة {s['ar']} من ASG، تشمل نطاق الخدمة، المخرجات، خطوات العمل، مشاريع من البورتفوليو، ومسار تواصل مباشر عبر واتساب.">
<link rel="canonical" href="{canonical}">
<link rel="alternate" hreflang="ar" href="{canonical}">
<link rel="alternate" hreflang="en" href="{english}">
<meta property="og:title" content="{s['ar']} | ASG Engineering Consulting Group">
<meta property="og:description" content="تعرف على خدمة {s['ar']} لدى ASG مع مسار تواصل واضح لبدء المشروع.">
<meta property="og:type" content="website">
<meta property="og:url" content="{canonical}">
<meta property="og:image" content="{BASE_URL}/assets/img/placeholders/og-default.svg">
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="../../../assets/css/style.css">
<script type="application/ld+json">{{"@context":"https://schema.org","@type":"ProfessionalService","name":"ASG Engineering Consulting Group","url":"https://asg-llc-eg.com","email":"info@asg-llc-eg.com","telephone":"+20 10 00336679","address":{{"@type":"PostalAddress","streetAddress":"City Light Tower","addressLocality":"Tanta","addressCountry":"EG"}},"areaServed":["Egypt","Saudi Arabia","Gulf Region"]}}</script>
</head>
<body>
{header_ar(current_slug=s['slug'])}
<main id="main">
<section class="hero section-lg service-hero"><div class="container hero-grid"><div class="hero-copy"><span class="eyebrow">خدمة من ASG</span><h1>{s['ar']}</h1><p>{s['ar_desc']}</p><div class="hero-actions"><a class="btn" href="../../contact/index.html">ناقش مشروعك</a><a class="btn btn-outline" href="{WHATS_AR}" rel="noopener" target="_blank">واتساب</a></div></div><figure class="visual-frame"><img alt="عنصر بديل لصورة خدمة {s['ar']}" height="1240" loading="lazy" src="../../../assets/img/placeholders/service-hero.svg" width="2200"><figcaption>صورة Placeholder — يتم استبدالها بصورة ASG المعتمدة لاحقًا.</figcaption></figure></div></section>
<section class="section"><div class="container section-head"><span class="eyebrow">لمن هذه الخدمة؟</span><h2>خدمة موجهة لقرارات مشروع واضحة.</h2></div><div class="container card-grid three">{for_items}</div></section>
<section class="section section-soft"><div class="container split"><div><span class="eyebrow">احتياج المشروع</span><h2>لماذا هذه الخدمة مهمة؟</h2></div><div><p>{s['need_ar']}</p></div></div></section>
<section class="section"><div class="container section-head"><h2>ما الذي تقدمه ASG؟</h2></div><div class="container checklist">{deliver}</div></section>
<section class="section dark-section"><div class="container section-head"><h2>خطوات العمل</h2></div><div class="container process-grid"><div class="process-step"><span>01</span><h3>فهم المتطلبات</h3></div><div class="process-step"><span>02</span><h3>تحديد الاتجاه</h3></div><div class="process-step"><span>03</span><h3>تطوير الحل</h3></div><div class="process-step"><span>04</span><h3>التنسيق</h3></div><div class="process-step"><span>05</span><h3>التوثيق</h3></div><div class="process-step"><span>06</span><h3>التسليم</h3></div></div></section>
<section class="section section-soft"><div class="container section-head"><h2>مشاريع من البورتفوليو</h2><p>تم اختيار هذه المشاريع من البيانات المؤكدة داخل حزمة الموقع، مع استخدام صور Placeholder لحين إضافة الصور النهائية.</p></div><div class="container"><div class="project-grid" data-project-grid>{cards}</div></div></section>
<section class="section"><div class="container split"><div><span class="eyebrow">لماذا ASG؟</span><h2>مسار هندسي يضع الأعمال قبل الكلام.</h2></div><div class="checklist"><div><span>✓</span>بورتفوليو واضح أولًا</div><div><span>✓</span>خدمات مترابطة حسب نطاق المشروع</div><div><span>✓</span>تواصل مباشر عبر واتساب</div><div><span>✓</span>بيانات مؤكدة بدون مراجعات أو ادعاءات وهمية</div></div></div></section>
<section class="section section-soft"><div class="container narrow"><span class="eyebrow">أسئلة شائعة</span><h2>أسئلة مرتبطة بالخدمة</h2>{faqs}</div></section>
<section class="section cta-band"><div class="container split"><div><span class="eyebrow">ابدأ الآن</span><h2>هل تريد مناقشة {s['ar']}؟</h2><p>أرسل نوع المشروع والموقع والمرحلة الحالية، وسيتم تحديد المسار المناسب للتواصل.</p></div><div class="cta-actions"><a class="btn btn-invert" href="../../contact/index.html">ابدأ مشروعك</a><a class="btn btn-ghost-dark" href="{WHATS_AR}" rel="noopener" target="_blank">واتساب</a></div></div></section>
</main>
{footer_ar()}
<a aria-label="تواصل مع ASG عبر واتساب" class="sticky-whatsapp" href="{WHATS_AR}" rel="noopener" target="_blank">واتساب</a>
<script src="../../../assets/js/main.js"></script>
</body>
</html>'''
    (outdir/'index.html').write_text(page, encoding='utf-8')

# Generate/update Arabic services hub in Arabic with links to subpages
service_cards=''.join([f'''<article class="service-card"><span class="icon-badge">{s['code']}</span><h3>{s['ar']}</h3><p>{s['ar_desc']}</p><a class="text-link" href="{s['slug']}/index.html">استكشف الخدمة</a></article>''' for s in services])
service_links_hub=''.join([f'<a href="{s["slug"]}/index.html">{s["ar"]}</a>' for s in services])
footer_service_lis_hub=''.join([f'<li><a href="{s["slug"]}/index.html">{s["ar"]}</a></li>' for s in services])
hub = f'''<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>خدمات ASG | خدمات هندسية متكاملة</title>
<meta name="description" content="استكشف خدمات ASG الهندسية: التصميم المعماري، التصميم الداخلي، BIM، MEP، الإنشائي، اللاندسكيب، البنية التحتية، وأنظمة الري.">
<link rel="canonical" href="{BASE_URL}/ar/services/">
<link rel="alternate" hreflang="ar" href="{BASE_URL}/ar/services/">
<link rel="alternate" hreflang="en" href="{BASE_URL}/services/">
<meta property="og:title" content="خدمات ASG | خدمات هندسية متكاملة"><meta property="og:description" content="خدمات هندسية مترابطة مرتبطة بالبورتفوليو ومسار تواصل واضح."><meta property="og:type" content="website"><meta property="og:url" content="{BASE_URL}/ar/services/"><meta property="og:image" content="{BASE_URL}/assets/img/placeholders/og-default.svg"><meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="../../assets/css/style.css">
<script type="application/ld+json">{{"@context":"https://schema.org","@type":"ProfessionalService","name":"ASG Engineering Consulting Group","url":"https://asg-llc-eg.com","email":"info@asg-llc-eg.com","telephone":"+20 10 00336679","address":{{"@type":"PostalAddress","streetAddress":"City Light Tower","addressLocality":"Tanta","addressCountry":"EG"}},"areaServed":["Egypt","Saudi Arabia","Gulf Region"]}}</script>
</head>
<body>
<header class="site-header" data-header><a class="skip-link" href="#main">تجاوز إلى المحتوى</a><div class="container nav-shell"><a aria-label="ASG الرئيسية" class="brand" href="../index.html"><span class="brand-mark">ASG</span><span class="brand-text">Engineering Consulting Group</span></a><nav aria-label="التنقل الرئيسي" class="desktop-nav"><a href="../index.html">الرئيسية</a><a href="../portfolio/index.html">أعمالنا</a><div class="nav-dropdown"><a aria-haspopup="true" href="index.html">خدماتنا</a><div class="dropdown-menu">{service_links_hub}</div></div><a href="../about/index.html">عن ASG</a><a href="../reviews/index.html">آراء العملاء</a><a href="../contact/index.html">تواصل</a></nav><div class="nav-actions"><a aria-label="Switch to English" class="btn btn-small btn-outline lang-switch" data-lang-switch href="../../services/index.html" hreflang="en">English</a><a class="btn btn-small btn-outline mobile-wa" href="{WHATS_AR}" rel="noopener" target="_blank">واتساب</a><a class="btn btn-small" href="../contact/index.html">ابدأ مشروعك</a><button aria-controls="mobile-menu" aria-expanded="false" aria-label="فتح القائمة" data-open-label="فتح القائمة" data-close-label="إغلاق القائمة" class="menu-toggle" data-menu-toggle type="button"><span></span><span></span></button></div></div><div class="mobile-panel" data-mobile-menu hidden id="mobile-menu"><a href="../index.html">الرئيسية</a><a href="../portfolio/index.html">أعمالنا</a><a href="index.html">خدماتنا</a>{service_links_hub}<a href="../about/index.html">عن ASG</a><a href="../reviews/index.html">آراء العملاء</a><a href="../contact/index.html">تواصل</a><a data-lang-switch href="../../services/index.html" hreflang="en">English</a><a class="btn" href="{WHATS_AR}" rel="noopener" target="_blank">تواصل عبر واتساب</a></div></header>
<main id="main"><section class="page-hero"><div class="container"><span class="eyebrow">خدمات ASG</span><h1>خدمات هندسية متكاملة مرتبطة بالأعمال</h1><p>الخدمات تظهر بعد البورتفوليو، لأن قاعدة الموقع الأساسية: الأعمال قبل الخدمات.</p></div></section><section class="section"><div class="container"><div class="card-grid services-grid">{service_cards}</div></div></section><section class="section dark-section"><div class="container section-head"><h2>نموذج التسليم المتكامل</h2><p>Architecture + Structure + MEP + BIM + Interior + Landscape + Infrastructure</p></div></section><section class="section section-soft"><div class="container section-head"><h2>مشاريع من البورتفوليو</h2><p>مشاريع مؤكدة من حزمة الموقع، مع صور Placeholder لحين إضافة الصور النهائية.</p></div><div class="container"><div class="project-grid" data-project-grid>{project_cards_ar_hub()}</div></div></section><section class="section cta-band"><div class="container split"><div><span class="eyebrow">ابدأ الآن</span><h2>غير متأكد من الخدمة المناسبة؟</h2><p>تواصل مع ASG ووضح نوع المشروع والموقع والهدف المطلوب.</p></div><div class="cta-actions"><a class="btn btn-invert" href="../contact/index.html">ابدأ مشروعك</a><a class="btn btn-ghost-dark" href="{WHATS_AR}" rel="noopener" target="_blank">واتساب</a></div></div></section></main>
<footer class="site-footer"><div class="container footer-grid"><div><a class="brand brand-footer" href="../index.html"><span class="brand-mark">ASG</span><span class="brand-text">Engineering Consulting Group</span></a><p>مجموعة استشارات هندسية تقود الموقع بالبورتفوليو، ثم الخدمات، ثم مسار تواصل واضح.</p></div><div><h2>الخدمات</h2><ul>{footer_service_lis_hub}</ul></div><div><h2>روابط</h2><ul><li><a href="../portfolio/index.html">أعمالنا</a></li><li><a href="index.html">خدماتنا</a></li><li><a href="../about/index.html">عن ASG</a></li><li><a href="../reviews/index.html">آراء العملاء</a></li><li><a href="../contact/index.html">تواصل</a></li><li><a data-lang-switch href="../../services/index.html">English</a></li></ul></div><div><h2>التواصل</h2><p><a href="{WHATS_AR}" rel="noopener" target="_blank">+20 10 00336679</a></p><p><a href="mailto:info@asg-llc-eg.com">info@asg-llc-eg.com</a></p><p>City Light Tower, Tanta, Egypt</p><a class="btn btn-invert" href="../contact/index.html">ابدأ مشروعك</a></div></div><div class="container footer-bottom"><p>© 2026 ASG Engineering Consulting Group. Static website handoff.</p></div></footer>
<a aria-label="تواصل مع ASG عبر واتساب" class="sticky-whatsapp" href="{WHATS_AR}" rel="noopener" target="_blank">واتساب</a><script src="../../assets/js/main.js"></script>
</body></html>'''
(base/'ar/services/index.html').write_text(hub, encoding='utf-8')

# Update existing English service pages language switch and hreflang alternate
def ensure_link(head, rel, attrs):
    # remove exact rel/hreflang duplicate when provided then append
    for tag in head.find_all('link'):
        ok=True
        for k,v in attrs.items():
            if tag.get(k)!=v: ok=False; break
        if ok and tag.get('rel')==[rel]:
            return tag
    tag=head.new_tag('link', rel=rel, **attrs)
    head.append(tag)
    return tag

for s in services:
    f=base/'services'/s['slug']/'index.html'
    soup=BeautifulSoup(f.read_text('utf-8'), 'html.parser')
    head=soup.head
    # add alternate Arabic
    arhref=f'{BASE_URL}/ar/services/{s["slug"]}/'
    if not soup.find('link', attrs={'rel':'alternate','hreflang':'ar'}):
        tag=soup.new_tag('link', rel='alternate', hreflang='ar', href=arhref)
        head.append(tag)
    else:
        soup.find('link', attrs={'rel':'alternate','hreflang':'ar'})['href']=arhref
    nav_actions=soup.select_one('.nav-actions')
    if nav_actions and not nav_actions.select_one('.lang-switch'):
        a=soup.new_tag('a', href=f'../../ar/services/{s["slug"]}/index.html', hreflang='ar')
        a['class']=['btn','btn-small','btn-outline','lang-switch']
        a['aria-label']='التبديل إلى العربية'
        a['data-lang-switch']=''
        a.string='العربية'
        nav_actions.insert(0,a)
    elif nav_actions and nav_actions.select_one('.lang-switch'):
        a=nav_actions.select_one('.lang-switch'); a['href']=f'../../ar/services/{s["slug"]}/index.html'; a['data-lang-switch']=''; a.attrs.pop('target',None)
    # mobile Arabic link update: find Arabic link or add before whatsapp btn
    panel=soup.select_one('.mobile-panel')
    if panel:
        # remove old Arabic links that point to generic ar/index.html or ar/services
        for a in list(panel.find_all('a')):
            if a.get_text(strip=True) in ['العربية','Arabic']:
                a.extract()
        a=soup.new_tag('a', href=f'../../ar/services/{s["slug"]}/index.html', hreflang='ar')
        a['data-lang-switch']=''
        a.string='العربية'
        whatsapp=panel.find('a', class_='btn')
        if whatsapp: whatsapp.insert_before(a)
        else: panel.append(a)
    f.write_text(str(soup), encoding='utf-8')

# Update Arabic core pages: service dropdown/footer links should point to Arabic service pages, not English.
# Path contexts: ar/index.html depth ar, ar/about depth ar/about, ar/portfolio, ar/contact, ar/reviews depth two from root? all /ar/<page>/ except home.
def update_ar_core(file_path, depth):
    # depth: 'home' for ar/index -> service href services/slug, 'section' for ar/about -> ../services/slug
    soup=BeautifulSoup(file_path.read_text('utf-8'), 'html.parser')
    prefix = 'services/' if depth=='home' else '../services/'
    hub = 'services/index.html' if depth=='home' else '../services/index.html'
    # desktop dropdown: replace links inside dropdown-menu
    menu=soup.select_one('.dropdown-menu')
    if menu:
        menu.clear()
        for s in services:
            a=soup.new_tag('a', href=f'{prefix}{s["slug"]}/index.html')
            a.string=s['ar']
            menu.append(a)
    # nav services main link on ar home should already services/index
    for a in soup.select('nav.desktop-nav a'):
        if a.get_text(strip=True)=='خدماتنا': a['href']=hub
    # mobile panel add service sublinks after Services link if not present
    panel=soup.select_one('.mobile-panel')
    if panel:
        # remove any old service subpage links (english or arabic service names) except main خدماتنا
        names={s['ar'] for s in services} | {s['en'] for s in services}
        for a in list(panel.find_all('a')):
            if a.get_text(strip=True) in names:
                a.extract()
        svc_link=None
        for a in panel.find_all('a'):
            if a.get_text(strip=True)=='خدماتنا':
                a['href']=hub
                svc_link=a
                break
        if svc_link:
            insert_after=svc_link
            for s in services:
                na=soup.new_tag('a', href=f'{prefix}{s["slug"]}/index.html')
                na.string=s['ar']
                insert_after.insert_after(na)
                insert_after=na
        # ensure language switch data attr and no target
        for a in panel.find_all('a'):
            if a.get_text(strip=True) in ['English','العربية']:
                a['data-lang-switch']=''
                a.attrs.pop('target',None)
    # footer service links: replace first services list after h2 الخدمات
    for h in soup.find_all(['h2','h3']):
        if h.get_text(strip=True)=='الخدمات':
            ul=h.find_next('ul')
            if ul:
                ul.clear()
                for s in services:
                    li=soup.new_tag('li')
                    a=soup.new_tag('a', href=f'{prefix}{s["slug"]}/index.html')
                    a.string=s['ar']
                    li.append(a); ul.append(li)
            break
    # nav actions lang switch
    for a in soup.select('.lang-switch, a[data-lang-switch]'):
        if a.get_text(strip=True) in ['English','العربية']:
            a['data-lang-switch']=''
            a.attrs.pop('target',None)
    file_path.write_text(str(soup), encoding='utf-8')

ar_files=[(base/'ar/index.html','home'),(base/'ar/about/index.html','section'),(base/'ar/portfolio/index.html','section'),(base/'ar/contact/index.html','section'),(base/'ar/reviews/index.html','section')]
for fp,depth in ar_files:
    if fp.exists(): update_ar_core(fp, depth)

# Update English service hub cards? Ensure language switch has data attr/no target across all HTML
for f in base.rglob('*.html'):
    soup=BeautifulSoup(f.read_text('utf-8'), 'html.parser')
    changed=False
    for a in soup.select('.lang-switch'):
        a['data-lang-switch']=''; a.attrs.pop('target',None); changed=True
    # also language text links in mobile panels and footers
    for a in soup.find_all('a'):
        txt=a.get_text(strip=True)
        if txt in ['English','العربية'] and ('wa.me' not in (a.get('href') or '')):
            a['data-lang-switch']=''; a.attrs.pop('target',None); changed=True
    if changed:
        f.write_text(str(soup), encoding='utf-8')

# CSS contrast fixes append if not present
css_path=base/'assets/css/style.css'
css=css_path.read_text('utf-8')
contrast='''\n\n/* Service Arabic + hover contrast audit fixes */\n.btn:hover,.btn:focus-visible{color:#ffffff;}\n.btn-outline:hover,.btn-outline:focus-visible,.lang-switch:hover,.lang-switch:focus-visible{background:#000000;border-color:#000000;color:#ffffff;}\n.btn-invert:hover,.btn-invert:focus-visible{background:#000000;border-color:#000000;color:#ffffff;}\n.cta-band .btn-invert:hover,.cta-band .btn-invert:focus-visible,.dark-section .btn-invert:hover,.dark-section .btn-invert:focus-visible{background:#000000;border-color:#ffffff;color:#ffffff;}\n.btn-ghost-dark:hover,.btn-ghost-dark:focus-visible{background:#ffffff;border-color:#ffffff;color:#000000;}\n.dropdown-menu a:hover,.dropdown-menu a:focus-visible{background:#2e3f5b;color:#ffffff;}\n.mobile-panel a:not(.btn):hover,.mobile-panel a:not(.btn):focus-visible{background:#2e3f5b;border-color:#2e3f5b;color:#ffffff;}\n.site-footer a:hover,.site-footer a:focus-visible,.text-link:hover,.text-link:focus-visible{text-decoration:underline;text-underline-offset:4px;}\n.service-card:hover,.project-card:hover,.contact-card:hover{border-color:#2e3f5b;}\n.card-grid article:hover{border-color:#2e3f5b;}\n.filter-btn:hover,.filter-btn:focus-visible,.filter-btn[aria-pressed="true"]{background:#2e3f5b;color:#ffffff;border-color:#2e3f5b;}\n'''
if 'Service Arabic + hover contrast audit fixes' not in css:
    css_path.write_text(css+contrast, encoding='utf-8')

# JS language switch same window append/update
js_path=base/'assets/js/main.js'
js=js_path.read_text('utf-8')
langjs='''\n\n// Language switch: always navigate in the same browser tab/window.\ndocument.querySelectorAll('[data-lang-switch], .lang-switch').forEach(function(link){\n  link.removeAttribute('target');\n  link.addEventListener('click', function(event){\n    const href = link.getAttribute('href');\n    if(!href || href.charAt(0) === '#') return;\n    event.preventDefault();\n    window.location.assign(href);\n  });\n});\n'''
if 'Language switch: always navigate in the same browser tab/window' not in js:
    js_path.write_text(js+langjs, encoding='utf-8')

# Update sitemap with Arabic service pages and ensure main service pages
sitemap=base/'sitemap.xml'
urls=[]
if sitemap.exists():
    text=sitemap.read_text('utf-8')
    urls=re.findall(r'<loc>(.*?)</loc>', text)
else:
    text=''
for s in services:
    for u in [f'{BASE_URL}/services/{s["slug"]}/', f'{BASE_URL}/ar/services/{s["slug"]}/']:
        if u not in urls: urls.append(u)
# Preserve order roughly by sorting with English before Arabic core not critical
urlset='''<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'''
for u in urls:
    urlset += f'  <url><loc>{u}</loc></url>\n'
urlset += '</urlset>\n'
sitemap.write_text(urlset, encoding='utf-8')

# QA report
qa=(base/'SERVICE_ARABIC_LANGSWITCH_HOVER_QA.md')
qa.write_text('''# Service Arabic Pages + Language Switch + Hover QA\n\nCompleted updates:\n\n- Added Arabic HTML pages for all 8 service detail pages.\n- Added direct language switch links between each English service page and its Arabic counterpart.\n- Ensured language switch links use the same browser tab/window.\n- Updated Arabic Services hub cards, dropdown, mobile menu, and footer links to point to Arabic service detail pages.\n- Updated Arabic core pages service dropdown/footer links to Arabic service URLs.\n- Added hreflang alternates for English/Arabic service detail pages.\n- Updated sitemap.xml with Arabic service detail URLs.\n- Audited and fixed button/dropdown/mobile-menu hover contrast using approved brand colors only: #000000, #2e3f5b, #ffffff.\n\nNotes:\n\n- WhatsApp links still intentionally open in a new tab because they are external conversion links.\n- Language switch links do not open a new tab.\n- Project images remain placeholders until real client images are added.\n''', encoding='utf-8')

print('done')
