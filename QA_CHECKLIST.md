# ASG Static Website QA Checklist

## Completed

- [x] Inspected uploaded execution package files.
- [x] Confirmed `ASG_Complete_Website_Restructure.md` was referenced but not present; build continued using available handoff, wireframes, image specs, content gaps log, and project README files.
- [x] Created complete static folder structure.
- [x] Built responsive English Home page.
- [x] Built responsive English Portfolio page with filters and load more.
- [x] Built project case study template.
- [x] Built 10 sample project pages using available project folder names only.
- [x] Built Services Hub and 8 individual service pages.
- [x] Built About, Contact, Reviews, FAQ, and 404 pages.
- [x] Built Arabic core pages with `dir="rtl"` and mirrored layout rules.
- [x] Added sticky WhatsApp CTA on all pages.
- [x] Added mobile header with visible WhatsApp button.
- [x] Added placeholder image system and marked real image paths.
- [x] Added form labels and a static front-end-ready contact form.
- [x] Kept Reviews page as empty-state; no fake testimonials.
- [x] Added unique titles and meta descriptions.
- [x] Added Open Graph tags.
- [x] Added JSON-LD ProfessionalService schema.
- [x] Added hreflang links for English/Arabic core pages.
- [x] Added `sitemap.xml` and `robots.txt`.
- [x] Checked internal links and asset references by script.

## Still requires client/content input

- [ ] Add real project images.
- [ ] Add approved partner logos.
- [ ] Add real reviews if available.
- [ ] Add confirmed case study challenge/solution text.
- [ ] Connect contact form to a real endpoint.
- [ ] Add Google Maps embed if approved.
- [ ] Replace placeholders before final public launch.


# QA Re-test Pass — 2026-07-09

## Fixed
- Mobile menu initial state is hidden.
- Mobile menu opens from the toggle button.
- Mobile menu closes from the toggle button.
- Mobile menu closes when a menu link is clicked.
- Mobile menu closes with Escape.
- Mobile menu closes when clicking outside the header.
- Mobile menu is forced closed on desktop resize.
- Portfolio grid now uses all confirmed project records from the manifest.
- Missing project pages were generated from confirmed folder data only.

## Still TODO before live launch
- Replace all placeholder images with approved project images.
- Connect the contact form to a real endpoint.
- Add real reviews only after client approval.
- Replace placeholder map with approved map embed or office image.


## Language switch QA
- Added Arabic HTML page for Reviews at `/ar/reviews/index.html`.
- Added desktop and mobile language switch buttons on Home, Portfolio, Services, About, Reviews, and Contact.
- Each language button links to the corresponding page, not only to the language homepage.
- Added Arabic Reviews link to Arabic navigation and footer.
