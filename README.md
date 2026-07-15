# ASG Static Website

This folder contains the current bilingual static website for **ASG Engineering Consulting Group**.

## Run locally

Serve this folder over HTTP, then open the site in a browser:

```bash
python -m http.server 8000
```

## Current project and partner integration

- 39 projects are published from the reviewed `المشروعات المنظمة` worksheet and matching folders in `ASG - Organized Project Data`.
- 276 supplied WebP project images are used without fabricated placeholders.
- The second supplied image is the cover for every project because every published project has at least two images.
- 34 supplied transparent partner logos are split evenly across two continuously moving rows.
- English and Arabic project content come from `/assets/js/projects-data.js`.
- Every project uses the single dynamic shell `/projects/index.html?project=<slug>&lang=<en|ar>`.
- Portfolio, service, homepage, and partner feeds are rendered by `/assets/js/projects-renderer.js` before `/assets/js/main.js` initializes existing filters, menus, carousels, and marquees.

## Source-of-truth policy

- Only the 39 workbook projects with matching supplied image folders are published.
- The other 248 workbook names are withheld because no approved image folder was supplied.
- Location, scope, year, and descriptive claims are not shown because the current source package does not confirm them.
- `CHO CAFE`, `MR. WASSEM`, and `MR. SAMIR ATTIA` remain flagged for editorial name review in the data file; their supplied images are still mapped correctly.
- Arabic project titles are editorial translations of the supplied English names. Project records are not duplicated into separate Arabic HTML pages.

See `SOURCE_DATA_MANIFEST.json` for the machine-readable integration summary.

## Important paths

- Project data: `/assets/js/projects-data.js`
- Synchronous renderer: `/assets/js/projects-renderer.js`
- Existing interaction logic: `/assets/js/main.js`
- Project images: `/assets/img/projects/<seo-slug>/`
- Partner logos: `/assets/img/logos/`
- Dynamic project page: `/projects/index.html`
- Sitemap: `/sitemap.xml`

## Content still pending approval

- Real client reviews.
- Confirmed response time.
- Leadership/team names.
- Google Maps embed or approved office image.
- Live form endpoint if WhatsApp conversion should be replaced.

Do not reintroduce the retired 71-project placeholder manifest or per-project HTML directories. Future project additions should update the reviewed source package and regenerate the JavaScript data/assets while keeping the same dynamic shell.
