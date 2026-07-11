# ASG Website Changelog

## Current merged version
This package contains the latest applied website edits in one clean folder structure.

## Included latest updates
- Arabic core pages and Arabic service inner pages.
- Header language switch between matching English/Arabic pages.
- Footer cleanup: smaller footer CTA and no language links inside footer.
- Hero spacing refinement.
- Animated counters on stats section.
- Service cards text alignment refinement.
- Footer paragraph spacing refinement.
- Portfolio filter redesigned as centered navy pill rail.
- Portfolio filter arrows added inside the rail.
- Filter rail movement controlled by arrow hover/focus.
- Filter options only activate filtering and do not move the rail.
- Hover effect kept on arrows only.
- Internal links verified after cleanup.

## Clean package policy
Old QA and temporary patch files were removed from the root folder.
Future edits should be merged directly into the site files and summarized here only.

## Removed process section
- Removed the full `Process / A clear project path` section from all pages where it appeared.
- Removed the six process cards: Brief, Concept, Design Development, Coordination, Documentation, Delivery.
- Kept the rest of the layout, footer, portfolio filter behavior, language switch, and page structure unchanged.

## Removed all process-grid sections
- Removed every full section containing the six-step process grid across the website.
- This includes Home, Services Hub, About, and English service inner pages where the grid appeared.
- Kept the rest of the content and layout unchanged.

## Header navigation hover motion
- Added a subtle hover/focus motion to the primary desktop header links.
- Links move up slightly with a light zoom-in effect.
- Added an underline animation under each main navigation word.
- Scoped the effect to primary header links only, without changing dropdown links, buttons, mobile menu, or page layout.

## Header underline direction refinement
- Adjusted the header underline animation to grow from the start of each word.
- English/LTR pages animate from the left.
- Arabic/RTL pages animate from the right.
- No layout, navigation, or JavaScript behavior was changed.

## Arabic portfolio filter rail fix
- Fixed RTL behavior for the Arabic portfolio filter rail.
- Normalized horizontal scrolling while preserving Arabic labels and visual direction.
- Left/right arrows now behave consistently in Arabic and English.
- Filter options still only activate filtering and do not move the rail.
- No other page layout or component behavior was changed.

## Arabic portfolio filter true RTL start
- Fixed the Arabic portfolio filter so its visual start is the right side.
- Arabic rail now opens from the right, matching RTL reading direction.
- In Arabic, the right arrow returns to the start and the left arrow moves to the final options.
- English behavior remains unchanged.
- Filter options still only activate filtering and do not move the rail.
- No unrelated layout, content, or page structure was changed.

## Arabic portfolio filter arrows corrected
- Corrected the Arabic portfolio filter arrows.
- The left visible arrow now moves the rail to the left/final options.
- The right visible arrow now returns the rail to the right/start.
- Arabic visual start remains on the right.
- English behavior remains unchanged.
- Filter options still only activate filtering and do not move the rail.

## Sticky WhatsApp hover motion
- Added a subtle hover/focus motion to the floating WhatsApp button.
- The button moves up slightly with a very light zoom.
- Background and text colors remain unchanged.
- No other buttons, links, layout, or JavaScript behavior was changed.

## Sticky WhatsApp circular icon button
- Replaced the floating WhatsApp button text with an inline WhatsApp icon.
- Changed the floating WhatsApp button into a circle.
- Kept the same WhatsApp links and accessibility labels.
- Preserved the hover motion without changing the button background color.
- No other layout, navigation, or JavaScript behavior was changed.

## Sticky WhatsApp always-on wave
- Added a continuous wave/ripple effect outside the floating WhatsApp circle.
- The wave runs without hover.
- Button background, icon color, link, position, and hover motion remain unchanged.
- Implemented with CSS only; no JavaScript changes.

## Sticky WhatsApp wave enhancement
- Made the floating WhatsApp wave clearer and more noticeable.
- Increased ring visibility with a controlled border and subtle shadow.
- Kept the wave slow and soft to avoid visual annoyance.
- Button background, icon, position, link, and hover behavior remain unchanged.
- CSS only; no JavaScript changes.

## Services dropdown motion refinement
- Added a smooth open animation to the Services dropdown.
- Dropdown links now enter from the right when the menu opens.
- Removed the previous background hover treatment for dropdown links.
- Dropdown link hover now shows an underline only, without zoom-in.
- Arabic underline direction respects RTL start from the right.
- No JavaScript, page content, portfolio filter, WhatsApp button, or layout behavior was changed.

## Services dropdown staged motion refinement
- Adjusted the Services dropdown so the panel opens first.
- Service links now animate after the panel opens.
- English/LTR links enter from right to left.
- Arabic/RTL links enter in the opposite direction, from left to right.
- Dropdown link hover remains underline-only with no zoom and no background change.
- No JavaScript, content, layout, portfolio filter, or WhatsApp behavior was changed.

## Contact form copy added inside CTA section
- Kept the original Contact page form in place.
- Added a second compact copy of the form inside the CTA section.
- Compact copy layout:
  - Name beside Phone / WhatsApp.
  - Project Type beside Required Service.
  - Email beside Location.
  - Message remains full-width.
- Applied to English and Arabic contact pages.
- No unrelated navigation, portfolio filter, WhatsApp button, dropdown, or JavaScript behavior was changed.

## Compact CTA form moved to main pages
- Removed the compact CTA form copy from English and Arabic Contact pages.
- Kept the original Contact page form in place.
- Added the compact form CTA to the other main pages:
  - English: Home, Portfolio, Services, About, Reviews, FAQ.
  - Arabic: Home, Portfolio, Services, About, Reviews.
- Compact form layout remains:
  - Name beside Phone / WhatsApp.
  - Project Type beside Required Service.
  - Email beside Location.
  - Message remains full-width.
- No unrelated navigation, portfolio filter, WhatsApp button, dropdown, or JavaScript behavior was changed.

## Main page CTA changed to mini full contact block
- Updated the CTA form on main pages to use the full Contact-style block:
  - Form on one side.
  - WhatsApp-first contact card beside it.
- Kept the block smaller and tighter than the Contact page version.
- Removed the wider two-column compact form layout from the CTA sections.
- Contact pages remain without the CTA copy and keep their original form.
- No unrelated navigation, portfolio filter, WhatsApp floating button, dropdown, or JavaScript behavior was changed.

## Main page CTA form made wider and labeled
- Updated the mini CTA form on main pages to be wider and shorter.
- Form fields now use a two-column layout on desktop.
- Added visible field labels and placeholders so Name, Phone / WhatsApp, Email, Location, and Message are clear.
- Message remains full-width.
- Contact pages remain unchanged with their original form only.
- No unrelated navigation, portfolio filter, WhatsApp floating button, dropdown, or JavaScript behavior was changed.

## CTA form placed beside CTA copy
- Reworked main page CTA sections into one shared section containing:
  - CTA heading, text, and buttons on one side.
  - The form alone on the other side.
- Removed the WhatsApp-first card from main page CTA sections.
- Kept the form wide and labeled with a two-column desktop layout.
- Contact pages remain unchanged with their original Contact form only.
- No unrelated navigation, portfolio filter, WhatsApp floating button, dropdown, or JavaScript behavior was changed.

## CTA contact link path QA fix
- Corrected CTA Start a Project link paths on root home pages after the side-form CTA update.
- Rechecked internal links after the fix.

## CTA side form layout balanced
- Reduced the side CTA form width from the previous wider layout.
- Anchored the form to the far right on English/LTR pages.
- Increased the text column width so the CTA heading and paragraph read more naturally.
- Kept the form beside the copy inside the same CTA section.
- CSS only; no HTML, JavaScript, navigation, portfolio filter, dropdown, or WhatsApp behavior was changed.

## CTA WhatsApp hover shadow removed
- Removed the hover shadow/glow from WhatsApp buttons inside CTA sections.
- Kept the button background, border, text, and movement behavior unchanged.
- Scoped the change to CTA WhatsApp buttons only.
- CSS only; no HTML or JavaScript changes.

## CTA WhatsApp border shadow cleaned
- Removed the persistent shadow/glow around the WhatsApp CTA button border.
- This applies to the normal state and interaction states.
- Kept the border itself, background, text, and movement behavior unchanged.
- CSS only; no HTML or JavaScript changes.

## Pill button hover lift motion
- Added a subtle upward hover/focus motion to pill-style buttons.
- Applied to standard `.btn` buttons and language switch buttons.
- Kept colors, backgrounds, borders, links, and layout unchanged.
- Motion is reduced on active press and disabled for users with reduced-motion preference.
- CSS only; no HTML or JavaScript changes.

## Main CTA form placeholders removed
- Removed text placeholders from input and message fields in the main-page CTA forms.
- Kept the visible field labels above each input.
- Kept select dropdown default options visible for usability.
- Contact pages remain unchanged.
- No CSS, JavaScript, navigation, portfolio filter, dropdown, or WhatsApp behavior was changed.

## Footer scroll reveal and link motion
- Added a scroll-linked upward reveal to footer content as the user scrolls down.
- Kept the original footer height, padding, and layout dimensions unchanged.
- Footer links enter with a short stagger after the footer begins revealing.
- Added underline-only hover/focus motion to footer text links, matching the Services dropdown.
- English/LTR links enter from the right; Arabic/RTL links enter from the opposite direction.
- Added reduced-motion support.
- Updated CSS and JavaScript only; no HTML content or page structure changed.

## Footer link underline removed
- Removed the underline hover/focus effect from footer links.
- Kept the footer scroll-linked upward reveal unchanged.
- Kept the staggered footer link entrance motion unchanged.
- Kept link colors, layout, footer dimensions, and JavaScript behavior unchanged.
- CSS only.

## Footer hover underline restored
- Removed the fixed browser-style underline from footer links.
- Restored the animated underline that appears only on hover or keyboard focus.
- Kept the footer scroll reveal and staggered link entrance motion unchanged.
- Kept footer height, padding, layout, colors, and JavaScript behavior unchanged.
- CSS only.

## Counter cards white interior
- Changed the inside of all counter/stat cards to white.
- Kept the surrounding stats section background black.
- Changed counter numbers and labels to the main navy color `#2e3f5b`.
- Kept card dimensions, spacing, counter animation, and page structure unchanged.
- CSS only; no HTML or JavaScript changes.
