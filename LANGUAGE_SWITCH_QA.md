# ASG Arabic Main Pages + Language Switch QA

## Completed
- Added Arabic Reviews page: `/ar/reviews/index.html`.
- Confirmed Arabic HTML pages exist for:
  - `/ar/index.html`
  - `/ar/portfolio/index.html`
  - `/ar/services/index.html`
  - `/ar/about/index.html`
  - `/ar/reviews/index.html`
  - `/ar/contact/index.html`
- Added a desktop language switch button in the header on the six English and six Arabic main pages.
- Added matching language switch links inside the mobile menu.
- Each switch points to the corresponding page, not only to the language homepage.
- Added Reviews link to Arabic desktop navigation, mobile navigation, and footer.
- Added `hreflang` alternates between English and Arabic pages.
- Added `/ar/reviews/` to `sitemap.xml`.
- Updated mobile menu aria labels to support Arabic open/close labels.

## QA
- Broken internal links: 0
- Main page language switch mapping: passed
- Main Arabic pages use `lang="ar"` and `dir="rtl"`: passed
- Main English pages use `lang="en"` and `dir="ltr"`: passed
- One H1 per main page: passed
- JavaScript syntax check: passed
