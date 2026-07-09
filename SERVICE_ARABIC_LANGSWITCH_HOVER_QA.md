# Service Arabic Pages + Language Switch + Hover QA

Completed updates:

- Added Arabic HTML pages for all 8 service detail pages.
- Added direct language switch links between each English service page and its Arabic counterpart.
- Ensured language switch links use the same browser tab/window.
- Updated Arabic Services hub cards, dropdown, mobile menu, and footer links to point to Arabic service detail pages.
- Updated Arabic core pages service dropdown/footer links to Arabic service URLs.
- Added hreflang alternates for English/Arabic service detail pages.
- Updated sitemap.xml with Arabic service detail URLs.
- Audited and fixed button/dropdown/mobile-menu hover contrast using approved brand colors only: #000000, #2e3f5b, #ffffff.

Notes:

- WhatsApp links still intentionally open in a new tab because they are external conversion links.
- Language switch links do not open a new tab.
- Project images remain placeholders until real client images are added.

Static QA results:

- HTML pages scanned: 102
- Broken internal links: 0
- Missing Arabic service detail pages: 0
- H1 check: 1 H1 on every HTML page
- Meta description check: present on every HTML page
- Arabic `lang="ar" dir="rtl"` check: passed
- Language switch `target` check: no language switch opens in a new tab
- JavaScript syntax check: passed using `node --check assets/js/main.js`
- Approved hex colors in CSS: #000000, #2e3f5b, #ffffff only
- Contrast pairs used for hover states:
  - White on black: 21.00:1
  - White on navy: 10.62:1
  - Black on white: 21.00:1

Browser note:

- A headless Chromium runtime was attempted for interaction testing, but this sandbox blocks local `file://` and `127.0.0.1` navigation with `ERR_BLOCKED_BY_ADMINISTRATOR`. Static link, syntax, and structure QA were completed successfully instead.
