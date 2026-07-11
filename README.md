# ASG Static Website Build

This folder contains a complete static HTML/CSS/vanilla JavaScript website for **ASG Engineering Consulting Group**.

## How to run locally

Open `index.html` directly in a browser, or serve the folder locally:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## What was built

- English pages: Home, Portfolio, Project Case Study Template, 10 project sample pages, Services Hub, 8 service pages, About, Contact, Reviews, FAQ, 404.
- Arabic core pages: Home, Portfolio, Services, About, Contact.
- Reusable CSS system: `/assets/css/style.css`.
- Vanilla JS: `/assets/js/main.js` for mobile menu, portfolio filters, load-more behavior, and static form notice.
- Placeholder image system: `/assets/img/placeholders/`.
- Project image folders: `/assets/img/projects/<project-slug>/`.
- SEO files: `sitemap.xml`, `robots.txt`, metadata, Open Graph, hreflang, and JSON-LD.

## Where to add project images

For each project, add images here:

```text
/assets/img/projects/project-slug/cover.webp
/assets/img/projects/project-slug/gallery/gallery-01.webp
/assets/img/projects/project-slug/renders/render-01.webp
/assets/img/projects/project-slug/drawings-bim/bim-01.png
```

Every project folder includes a `README.txt` with the confirmed source folder name, category, location, and scope.

## How to replace placeholders

Search in HTML for `assets/img/placeholders/` and replace the `src` with the real approved image path. Portfolio cards also include `data-real-image` markers for the intended future image path.

Use the image specs from `ASG_Image_Size_Specs.xlsx`:

- Homepage Hero Desktop: 2400×1350 to 2560×1440, minimum 1920×1080.
- Homepage Hero Mobile: 1080×1350 to 1200×1600, minimum 900×1200.
- Portfolio Card: 1600×1200 preferred, minimum 1200×900.
- Case Study Hero: 2400×1350 to 2560×1440, minimum 1920×1080.
- Gallery: 1800×1200 to 2400×1350, minimum 1400×900.
- Partner Logos: 600×300 source preferred.
- Open Graph: 1200×630.

## How to add more project pages

1. Copy any folder from `/projects/<sample-project>/`.
2. Rename it using the project slug from `/assets/img/projects/`.
3. Replace title, overview table, scope, location, and image paths only with confirmed project data.
4. Link the portfolio card to the new page.
5. Add the page to `sitemap.xml`.

## Content still missing

- Real project cover images and galleries.
- Approved partner logos.
- Real client reviews.
- Confirmed response time.
- Leadership/team names if ASG wants them on About.
- Google Maps embed or approved office image.
- Live form endpoint for the contact form.
- Final confirmed challenge/solution details per case study.

## Source-of-truth notes

The build uses confirmed data from the uploaded package only: company name, WhatsApp, email, address, stats, service names, project folder names, category, location, and scope. No fake reviews, fake claims, fake project outcomes, fake client names, or unsupported statistics were added.


## QA Fix Pass — 2026-07-09
- Fixed the mobile header not closing by forcing `[hidden]` and `.mobile-panel[hidden]` to `display:none!important`.
- Rebuilt the menu script to close on toggle, menu link click, outside click, Escape key, and desktop resize.
- Rebuilt Portfolio grids to show all confirmed project records from `SOURCE_DATA_MANIFEST.json` instead of one card.
- Generated project pages for every confirmed project in the manifest using placeholder-safe case-study content.
- Rechecked internal links, asset paths, H1 count, meta descriptions, Arabic RTL pages, and form labels.


## Language switching
Main English pages have matching Arabic HTML pages under `/ar/` for Home, Portfolio, Services, About, Reviews, and Contact. The header language button links to the equivalent page in the other language.

## Latest update — Arabic service pages and language switch QA

This version adds Arabic HTML pages for all internal service pages:

- `/ar/services/architectural-design/index.html`
- `/ar/services/interior-design/index.html`
- `/ar/services/bim-services/index.html`
- `/ar/services/mep-engineering/index.html`
- `/ar/services/structural-engineering/index.html`
- `/ar/services/landscape-urban-design/index.html`
- `/ar/services/infrastructure/index.html`
- `/ar/services/irrigation-systems/index.html`

Language switch behavior:

- English service page → matching Arabic service page.
- Arabic service page → matching English service page.
- The switch opens in the same browser tab/window.
- WhatsApp remains an external conversion link and opens in a new tab.

Hover/contrast fixes:

- Button, dropdown, mobile menu, text link, filter, and CTA hover states were audited.
- CSS hex colors remain limited to the approved palette: `#000000`, `#2e3f5b`, `#ffffff`.

See `SERVICE_ARABIC_LANGSWITCH_HOVER_QA.md` for the QA summary.

## Latest visual refinement update
- Reverted the last typography weight increase for paragraphs and header navigation.
- Reduced the vertical white area around the homepage hero section.
- Added animated statistics counters when the stats strip enters the viewport.
- Aligned service-card internal rows so titles, descriptions, and links feel consistent without changing the card system.
- Added spacing between the footer brand/title block and the footer paragraph.

See `DESIGN_MOTION_REFINEMENT_QA.md` for the QA summary.

## Clean merged version note

This ZIP has been cleaned after iterative edits. Temporary QA files and patch logs were removed from the root folder. Future edits should be applied directly to the website files and summarized in `CHANGELOG.md` only.
