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

## Mobile responsive stabilization
- Fixed horizontal overflow across the website at small screen widths.
- Rebalanced the mobile header, WhatsApp action, logo, and menu button.
- Improved mobile typography, spacing, section padding, cards, statistics, forms, CTA sections, portfolio controls, and footer sizing.
- Forced grid and flex children to shrink correctly instead of expanding the page width.
- Made long project paths, footer links, contact details, and code text wrap safely.
- Changed partner logo placeholders to one column on mobile to prevent min-content overflow.
- Set mobile form controls to a readable 16px size to prevent unwanted browser zoom.
- Preserved desktop layouts, counter animation, portfolio filtering, footer motion, WhatsApp behavior, and all existing content.
- No new QA files were added to the website root.

## Mobile menu button and opening motion
- Changed the mobile menu button to the main navy color on hover, keyboard focus, and while the menu is open.
- Kept the menu icon visible in white while the navy state is active.
- Added a smooth staged opening: the menu panel opens first, then navigation links enter with a short stagger.
- English/LTR links enter from the right; Arabic/RTL links enter from the opposite direction.
- Added a smooth close transition before the panel is hidden.
- Preserved click-outside closing, Escape closing, link-click closing, and desktop reset behavior.
- Added reduced-motion support.
- Updated CSS and JavaScript only; no page content or layout structure changed.

## Arabic mobile menu structure fixed
- Removed the eight individual service-page links from the Arabic main mobile menu.
- Arabic mobile navigation now matches the English top-level structure:
  Home, Portfolio, Services, About, Reviews, Contact, language switch, and WhatsApp.
- Kept the Services hub link available; service inner pages remain accessible from the Services page.
- Added Arabic open/close accessibility labels to the mobile menu button.
- Stabilized RTL alignment and sizing for Arabic mobile-menu links and header actions.
- Preserved the navy button state, staged opening animation, Escape closing, outside-click closing, and link-click closing.
- English pages, desktop navigation, service pages, and page content were not changed.

## Footer links dim-to-bright interaction
- Reduced footer text-link brightness in the normal state while keeping every link clearly readable.
- Footer links brighten to full white on hover and keyboard focus.
- Preserved footer scroll motion, staggered entrance, animated underline, dimensions, and layout.
- Footer buttons and headings were not changed.

## Footer spotlight hover interaction
- Restored the footer to full brightness in its normal state.
- When the pointer enters the footer, footer elements dim slightly.
- Only the exact item under the pointer or keyboard focus remains fully bright.
- Applied the interaction only to mouse/trackpad devices to avoid sticky hover behavior on touch screens.
- Preserved footer scroll reveal, staggered link entrance, animated underline, dimensions, layout, and content.
- CSS only; no HTML or JavaScript changes.

## Footer spotlight links corrected
- Extended the footer spotlight interaction to all footer text links.
- When the pointer enters the footer, every text link now dims with the rest of the footer.
- Only the exact hovered or keyboard-focused link returns to full white.
- Used link color instead of overriding opacity so the existing staggered entrance animation remains intact.
- Preserved footer height, padding, scroll reveal, underline motion, layout, and mobile behavior.
- CSS only; no HTML or JavaScript changes.

## Footer service subpage link zoom
- Added a subtle zoom-in effect to footer service/subpage links only.
- Applied only to the service links column, not main-page links, contact links, or the Start a Project button.
- Preserved the footer spotlight interaction, animated underline, and staggered entrance motion.
- English zoom origin starts from the left; Arabic/RTL starts from the right.
- Added reduced-motion support.
- CSS only; no HTML or JavaScript changes.

## Footer all-elements hover zoom
- Extended the subtle zoom-in interaction to every footer element: brand, headings, descriptive text, service links, main-page links, contact links, CTA button, address, and footer-bottom text.
- Kept link entrance transforms compatible by combining the zoom with `translateX(0)`.
- Kept the CTA button lift and added a light scale without changing its colors or dimensions.
- English/LTR zoom origin starts from the left; Arabic/RTL starts from the right.
- Preserved the footer spotlight interaction, animated underline, scroll reveal, staggered entrance, layout, height, padding, and touch behavior.
- Added reduced-motion support.
- CSS only; no HTML or JavaScript changes.

## Footer zoom priority fixed
- Fixed the CSS specificity conflict that prevented footer zoom from appearing.
- Footer links now zoom immediately and visibly on hover/focus with no stagger delay.
- Preserved the spotlight effect, animated underline, staggered entrance, scroll reveal, dimensions, and RTL behavior.
- CSS only; no HTML or JavaScript changes.

## Footer heading navigation links
- Converted the Services footer heading into a link to the Services page.
- Converted the Explore footer heading into a link to the Home page.
- Converted the Contact footer heading into a link to the Contact page.
- Applied equivalent links to Arabic footer headings and Arabic destinations.
- Calculated relative paths separately for every page depth.
- Preserved footer typography, spotlight, zoom, scroll reveal, and layout.
- Added visible keyboard focus styling.

## Footer Explore smooth scroll to top
- Changed the Explore footer heading from a Home-page link into a smooth scroll-to-top control.
- Applied the same behavior to the Arabic footer heading `روابط`.
- Kept Services and Contact footer heading links unchanged.
- Added reduced-motion support.
- Preserved footer spotlight, zoom, underline, scroll reveal, dimensions, and layout.

## Footer brand smooth scroll to top
- Converted the footer ASG logo and company name into a smooth scroll-to-top control.
- Applied the same behavior to all English and Arabic pages.
- Reused the existing `[data-scroll-top]` JavaScript behavior.
- Preserved the brand appearance, spotlight, zoom, footer reveal, layout, and dimensions.
- Added keyboard focus styling and Arabic accessibility labels.

## Footer cursor flashlight
- Added a soft radial flashlight that follows the mouse pointer anywhere inside the footer.
- The light position updates with requestAnimationFrame for smooth performance.
- The light fades in on pointer entry and fades out on pointer leave.
- Applied only to mouse/trackpad devices; touch layouts remain unchanged.
- Preserved the existing footer spotlight, zoom, underline, scroll reveal, scroll-to-top controls, dimensions, and layout.
- Updated CSS and JavaScript only.

## Footer flashlight softened
- Reduced the flashlight size and brightness for a subtler appearance.
- Lowered the white and navy glow intensity.
- Added interpolated pointer tracking for smoother, less abrupt movement.
- Increased fade timing slightly for a softer entrance and exit.
- Preserved footer spotlight, zoom, underline, scroll reveal, scroll-to-top behavior, dimensions, and mobile behavior.

## Services dropdown shadow refined
- Increased the Services dropdown shadow slightly for clearer separation from page content.
- Added a soft two-layer shadow using neutral black and a very subtle navy tint.
- Added a smooth shadow transition during dropdown opening.
- Preserved dropdown dimensions, border, staged link animation, underline motion, navigation layout, and mobile menu.
- CSS only; no HTML or JavaScript changes.

## Services dropdown link zoom
- Added a subtle zoom-in effect to individual Services dropdown links on hover and keyboard focus.
- Preserved the staged link entrance animation, underline motion, dropdown shadow, dimensions, and layout.
- Removed hover delay so the zoom responds immediately.
- English zoom origin starts from the left; Arabic/RTL starts from the right.
- Added reduced-motion support.
- CSS only; no HTML or JavaScript changes.

## Header scroll-direction reveal
- Header hides upward while the user continues scrolling down.
- Header reappears automatically after scrolling stops.
- Header appears immediately on upward scrolling.
- Header remains visible at the top of the page, while the mobile menu is open, and during hover or keyboard interaction.
- Preserved sticky positioning, header height, Services dropdown, mobile navigation, RTL behavior, and page layout.
- Added reduced-motion support.
- Updated CSS and JavaScript only.

## Header scroll reveal corrected and browser-tested
- Replaced the previous scroll handler that could leave the header permanently hidden.
- Scroll down hides the header while scrolling continues.
- Scroll up reveals the header immediately from any page position.
- Stopping scroll reveals the header automatically after 150ms.
- The stop timer now runs directly from scroll events instead of depending on animation-frame timing.
- Header stays visible at the top, while the mobile menu is open, while Services is active, and during keyboard focus.
- Added reduced-motion support and preserved layout height.

## Header fixed viewport reveal
- Replaced sticky header behavior with a true fixed viewport header.
- Added dynamic body top spacing based on the measured navigation height.
- Moved the header controller to the start of `main.js`.
- Scrolling down hides the header.
- Scrolling up shows the header immediately from any page position.
- Stopping scroll shows the header automatically after 135ms.
- Added wheel and touch-direction detection alongside normal scroll detection.
- Header remains visible at the top, while menus are active, on hover, and during keyboard focus.
- Preserved Services dropdown, mobile menu, Arabic RTL behavior, header dimensions, and page layout.

## Header hidden while footer is active
- Added a footer-aware guard to the fixed header controller.
- When the footer enters the viewport during downward scrolling, the header remains hidden.
- Stopping inside the footer no longer reveals the header.
- The browser `scrollend` event no longer reveals the header inside the footer.
- The header returns immediately only after the user scrolls upward.
- Scrolling downward again inside the footer hides it again.
- Preserved all existing header behavior outside the footer, including fixed positioning, mobile-menu protection, Services-menu protection, wheel/touch support, and reduced-motion support.
- Updated JavaScript only.

## Header motion smoothed
- Slowed the header reveal/hide transition slightly for a calmer movement.
- Replaced the previous easing with a softer `cubic-bezier(.22,1,.36,1)`.
- Reduced the hidden offset and softened the opacity transition.
- Increased the stop-reveal delay from 135ms to 175ms to reduce abrupt movement.
- Preserved footer guard behavior, fixed positioning, scroll direction logic, mobile menu protection, and Services dropdown protection.

## Header Start a Project linked to WhatsApp
- Changed the Start a Project button in the site header to open ASG WhatsApp directly.
- Used WhatsApp number `+20 10 00336679`.
- English pages use the prefilled message: `Hi ASG, I would like to discuss a project.`
- Arabic pages use the prefilled message: `مرحبًا ASG، أود مناقشة مشروع.`
- Applied to header buttons only, including mobile-header/menu copies where present.
- Other Start a Project buttons outside the header were not changed.
- No CSS or JavaScript behavior was changed.

## Footer social icon buttons
- Added social icon buttons for Behance, YouTube, LinkedIn, Instagram, Pinterest, Facebook, and X.
- Added them below the company summary in every English and Arabic footer.
- Used inline SVG icons with no external icon library or extra asset files.
- All social links open in a new tab with secure `rel` attributes.
- Added accessible labels, keyboard focus, footer spotlight integration, hover lift, zoom, and reduced-motion support.

## Footer cursor flashlight removed
- Removed the cursor-following flashlight effect from the footer completely.
- Removed both its CSS radial-gradient overlay and JavaScript pointer tracking.
- Preserved the footer spotlight interaction, link zoom, animated underline, social icons, scroll reveal, and scroll-to-top behavior.
- Footer layout, dimensions, mobile behavior, and content were not changed.

## Counter card hover and viewport reveal
- Added a subtle background-only hover state to the white counter cards.
- Hover changes the card background to a slightly darker neutral tone without moving the card or changing its text.
- Added a light staggered entrance from the right when the counter section enters the viewport.
- The entrance is triggered by IntersectionObserver when the user reaches the section, not by page-load timing.
- Preserved the existing number-counting animation.
- Added reduced-motion support.
- Updated CSS and JavaScript only.

## Counter reveal repeats on every viewport visit
- Changed the counter-card entrance from a one-time reveal to a repeatable viewport animation.
- The cards animate after refresh when the user reaches the section.
- The reveal resets only after the section is almost fully outside the viewport.
- Returning to the section while scrolling up or down triggers the entrance again.
- Preserved the stagger timing, background-only hover, and existing number-counting behavior.
- Updated JavaScript only.

## Counter numbers synchronized with card motion
- Integrated the number counter and card entrance into one viewport controller.
- Every time the statistics section enters the viewport, each card enters from the right and its number counts from zero at the same staggered delay.
- When the section is almost fully outside the viewport, card and number states reset invisibly.
- The complete card-and-number animation repeats after refresh and whenever the user returns to the section by scrolling up or down.
- Removed the previous one-time number observer to prevent duplicate or conflicting animations.
- Preserved the final confirmed statistics, background-only hover, card layout, RTL pages, and reduced-motion behavior.
- Updated JavaScript only.

## Dark feature cards elevated hover
- Added an elevated hover effect to the three dark feature cards on the Home page.
- Cards move upward by 7px and scale subtly to 1.025.
- Added a stronger but controlled shadow, slightly brighter border, and light background lift.
- Kept the grid dimensions and card layout unchanged.
- Applied only to mouse/trackpad hover and keyboard focus; touch layouts remain stable.
- Added reduced-motion support.
- CSS only; no HTML or JavaScript changes.

## Fixed scroll-to-top button
- Added a circular scroll-to-top button at the bottom-left of every page.
- The button appears after the user scrolls beyond 420px.
- Clicking it smoothly returns the user to the top.
- Added Arabic and English accessibility labels.
- Preserved the floating WhatsApp button and existing footer scroll-to-top controls.

## Scroll-to-top button appears after Main Hero
- Replaced the fixed 420px visibility threshold with the actual Main Hero boundary.
- The bottom-left scroll-to-top button now appears as soon as the Main Hero has fully passed beneath the fixed header.
- The button hides again when the user scrolls back into the Main Hero.
- The state is calculated correctly after refresh, page restore, resize, and hero-size changes.
- Pages without a detectable hero retain the previous 420px fallback.
- Preserved button position, styling, smooth scrolling, Arabic labels, mobile sizing, and WhatsApp spacing.

## Scroll-to-top button initialization fixed
- Fixed the button not appearing because `main.js` was loaded before the button existed in the DOM.
- Moved the button before the `main.js` script in every English and Arabic page.
- Added a DOMContentLoaded fallback so initialization remains reliable if page markup order changes later.
- The button appears immediately after the Main Hero is passed and hides again when the user returns to the hero.
- Preserved the bottom-left position, styling, mobile sizing, smooth scroll, and accessibility labels.

## Contact map section removed
- Removed the Map / office location section from the English Contact page.
- Removed the equivalent map / office location section from the Arabic Contact page.
- Removed the placeholder image and explanatory text with the section.
- Preserved the contact form, WhatsApp block, footer, scroll-to-top button, spacing, and responsive layout.

## Contact page social buttons
- Added the seven confirmed ASG social-media icon links below the WhatsApp card on the English Contact page.
- Added the equivalent icon block below the WhatsApp card on the Arabic Contact page.
- Reused the same confirmed links and inline SVG logos already used in the footer.
- Kept the social block restricted to Contact pages only.
- Added responsive stacking, keyboard focus, subtle hover lift, and zoom.
- Preserved the contact form, WhatsApp card, footer icons, scroll-to-top button, and mobile layout.

## Custom form dropdowns matching Services menu
- Replaced the browser-default form select presentation with accessible custom dropdowns.
- Applied to Project Type and Required Service selects inside all contact/project forms.
- Added the same visual language as the header Services dropdown: rounded white panel, soft shadow, staged option entrance, underline-free hover, and subtle zoom.
- Kept the original native select in the DOM so submitted values and form behavior remain intact.
- Added keyboard navigation, Escape handling, outside-click closing, Arabic RTL motion, mobile scrolling, and reduced-motion support.
- Updated CSS and JavaScript only.

## Form dropdowns matched to Services dropdown
- Refined the custom form dropdowns to visually match the header Services dropdown.
- The white panel now uses the same radius, border, two-stage shadow, opening transform, and timing.
- The panel opens first, followed by staggered option entrance from the page direction.
- Replaced the blue selected background with navy text and an animated underline, matching the Services links.
- Added the same subtle 1.045 hover zoom used in the header dropdown.
- Preserved native select values, form submission, keyboard navigation, RTL behavior, mobile scrolling, and reduced-motion support.

## Footer address linked to Google Maps
- Converted `City Light Tower, Tanta, Egypt` in every footer into a Google Maps location search link.
- Opens in a new tab using secure `noopener noreferrer`.
- Preserved the current footer appearance, spotlight, zoom, underline, and RTL behavior.
- Applied only to the footer address.

## Footer Google Maps address updated
- Updated every footer location link to search Google Maps for:
  `Al CORNISH, طنطا (قسم 2)، مركز طنطا، محافظة الغربية 31521`
- Preserved the visible footer address text and all existing footer styling and interactions.

## Footer Google Maps query refined
- Updated every footer location link to search Google Maps for:
  `ASG - Engineering Consulting Group, Al CORNISH, طنطا (قسم 2)، مركز طنطا، محافظة الغربية 31521`
- Preserved the visible footer address text and all current footer styling and interactions.

## Partners section moved after Main Hero
- Moved the Partners / Trust Proof section directly after the Main Hero on the English Home page.
- Removed it from its previous lower position so no duplicate remains.
- Preserved the section content, logo placeholders, layout, responsive behavior, and styling.
- The Arabic Home page was not changed because it does not currently contain an equivalent partners section.

## Arabic partners section parity
- Added the Arabic Partners / Trust Proof section directly after the Arabic Main Hero.
- Matched the English section structure, classes, six logo placeholders, layout, spacing, and responsive behavior.
- Added Arabic copy while preserving the same placeholder asset labels.
- Kept the English Home page unchanged.

## Full Arabic parity and RTL audit
- Synchronized all English/Arabic counterpart page structures.
- Added the missing Arabic Why ASG dark-card section to Home.
- Matched Arabic Services and About section order/classes to English.
- Matched all Arabic service-detail Why ASG and FAQ structures.
- Completed the Arabic Contact form with Required Service, autocomplete fields, follow-up note, and correct mirrored RTL order.
- Added a complete Arabic FAQ page, matching English header/footer, language pairing, hreflang, footer links, and sitemap entry.
- Preserved all global header, footer, counters, dropdowns, social links, location link, scroll-to-top, and WhatsApp behavior.
- Separated the Arabic fixed WhatsApp and scroll-to-top controls to prevent overlap.

## Arabic parity browser QA completed
- Tested all 15 Arabic pages in Chromium at desktop and mobile viewport sizes.
- Completed 30 page-load/layout checks with RTL, required components, social icons, location link, WhatsApp, scroll-to-top, and horizontal-overflow validation.
- Tested Home partners order, Why ASG cards, Services dropdown, repeated counters, and fixed-button separation.
- Tested the Arabic Contact form order, two custom selects, dropdown animation, and seven social links.
- Tested RTL portfolio filters and arrow labels.
- Tested the new Arabic FAQ page, form, selects, language pairing, and heading.
- Tested the Arabic mobile menu and fixed controls.
- Validated header hide-on-down and show-on-up behavior separately in Chromium to avoid synthetic-scroll timing interference.

## Mobile off-canvas sidebar menu
- Replaced the expanding mobile panel with an off-canvas sidebar.
- Arabic sidebars enter from the right; English sidebars enter from the left.
- Added a light page backdrop below the fixed header.
- Added a smooth side-slide transition and staggered fade-in for navigation links.
- Kept the existing header close icon, outside-click close, Escape close, link close, and body scroll lock.
- Added responsive widths and reduced-motion support.
- Preserved all desktop navigation, Services dropdown, RTL behavior, WhatsApp, and header scroll logic.

## Mobile sidebar viewport containment fixed
- Fixed the sidebar appearing only as a thin strip below the mobile header.
- The root cause was the sidebar being inside a transformed fixed header, which confined its fixed positioning to the header box.
- The mobile panel is now moved to `body` before menu initialization.
- Updated outside-click handling so clicks inside the detached sidebar do not close it accidentally.
- Raised the sidebar/backdrop layers above page controls while keeping the header visible above them.
- Preserved Arabic right-side entry, English left-side entry, staggered link fade-in, Escape close, backdrop close, link close, and body scroll lock.

## Compact mobile sidebar width
- Reduced the off-canvas sidebar from near-full-screen width to a compact navigation panel.
- Standard mobile width is now 72vw with a 280px maximum.
- Small mobile width is 76vw with a 260px maximum.
- Very narrow screens use a protected 220–250px range.
- Preserved full-height scrolling, Arabic right-side entry, English left-side entry, backdrop, staggered link fade-in, and all close behaviors.

## Smaller and higher mobile sidebar
- Reduced the standard sidebar width to 60vw with a 230px maximum.
- Reduced small-mobile width to 64vw with a 220px maximum.
- Very narrow screens now use a compact 190–210px range.
- Raised the sidebar 8–10px closer to the fixed header.
- Reduced internal padding to keep the compact width balanced.
- Preserved Arabic right-side entry, English left-side entry, backdrop, staggered link fade-in, and all close behaviors.

## Refined mobile menu page blur
- Replaced the flat gray overlay with a real 9px backdrop blur and light desaturation.
- Extended the backdrop across the full viewport while keeping the header and sidebar sharp.
- Added a cleaner translucent white sidebar surface with rounded outer corners and balanced shadow.
- Softened floating WhatsApp and scroll-to-top controls while the menu is open so they do not compete visually.
- Preserved sidebar size, RTL/LTR entry direction, staggered link animation, and all close behaviors.

## Natural mobile menu overlay
- Removed the page blur, glass effect, desaturation, and reflective appearance.
- Replaced them with a simple semi-transparent dark overlay.
- Changed the sidebar to a solid white surface with a restrained shadow.
- Kept the page visible and natural behind the menu.
- Preserved sidebar size, Arabic/English entry direction, staggered link fade-in, and all close behaviors.

## Mobile Services side flyout
- Converted the mobile Services link into an expandable trigger with an adjacent directional arrow.
- English opens the Services flyout in the empty space to the right of the left sidebar.
- Arabic opens the flyout in the empty space to the left of the right RTL sidebar.
- The flyout aligns vertically with the Services row and adapts to the remaining viewport width.
- Added All Services / كل الخدمات followed by the existing eight service links cloned from the desktop Services dropdown.
- Added staged fade-in for service links, outside-click close, Escape close, resize handling, and automatic main-menu close after selecting a service.
- Preserved the compact sidebar, natural overlay, RTL directions, and existing mobile menu animation.

## Services trigger arrow only
- Removed the special background, color, padding, and open-state highlighting from the mobile Services row.
- Kept the Services row visually identical to all other sidebar links.
- Positioned only the directional arrow at the far end of the row.
- Preserved the Services flyout behavior and the subtle arrow movement.

## Footer reveal on viewport entry
- Dimmed the footer content before it enters the viewport.
- The footer returns smoothly to full brightness and opacity as soon as the user reaches it.
- The effect applies to the footer content only and does not change footer height, layout, links, hover zoom, spotlight behavior, social buttons, or scrolling.
- Added IntersectionObserver with a scroll/resize fallback and reduced-motion support.

## Footer reveal timing refined
- Delayed the footer reveal until a more noticeable portion of the footer enters the viewport.
- Increased the reveal threshold from 6% to 16%.
- Added a subtle 160ms delay before the footer returns to full brightness.
- Increased the transition duration from 720ms to 920ms so the motion is clearly visible but remains smooth.
- Kept the dimming response immediate when the footer leaves the viewport.

## Footer reveal aligned to mobile reference stage
- Replaced the generic intersection percentage with a precise viewport-position trigger.
- The footer now remains dimmed until its top reaches 14% from the top of the viewport, matching the supplied mobile reference stage.
- Removed the 160ms reveal delay so the transition begins immediately at that exact point.
- Preserved the visible 920ms brightness/opacity transition.
- The footer dims again when scrolling upward past the trigger line.

## Automatic partners logo marquee
- Rebuilt the Home partners section so the heading and description sit above the logos.
- Converted the six logo placeholders into one horizontal automatic carousel similar to a news ticker.
- Added seamless duplication for continuous movement.
- English and Arabic use opposite movement directions to respect LTR/RTL.
- Added pause on hover and keyboard focus.
- Kept all logo cards side by side on mobile instead of stacking vertically.
- Added responsive card sizing, subtle hover lift, edge fades, and reduced-motion horizontal scrolling.


## Double partners marquee
- Split the partner logos into two separate automatic marquee rows.
- The two rows move in opposite directions for a more dynamic ticker effect.
- Preserved responsive behavior, hover pause, and RTL/LTR direction handling.


## True infinite partners marquee
- Rebuilt both logo rows as genuine seamless infinite marquees.
- Each row now creates enough repeated groups to cover more than two viewport widths.
- Animation distance is calculated from the exact source-group width and gap.
- Removed visible beginnings, endings, empty spaces, and reset jumps on wide and mobile screens.
- Preserved opposite movement directions, RTL/LTR behavior, pause on hover/focus, and reduced-motion fallback.

## Partners marquee continuous motion
- Removed all hover and focus pause behavior from both infinite logo rows.
- Both ticker rows now keep moving continuously at all times.
- Preserved the individual logo-card hover lift, zoom, border, and shadow effects while the ticker remains in motion.
- Preserved the two opposite directions, RTL/LTR logic, responsive sizing, and seamless infinite loop.

## Unified mobile-only card carousels
- Replaced the previous Home-only project carousel with one reusable mobile-only carousel system.
- Converted project, service, feature, counter, process, case-study, gallery, checklist, and logo card groups across all pages into one-card-at-a-time mobile carousels.
- Added blue circular previous/next controls with white arrows on both sides.
- Added clickable navigation dots below every carousel.
- Added touch swipe, keyboard arrow control, adaptive carousel height, RTL/LTR arrow direction, and accessible status text.
- Added live refresh for filtered project cards and dynamically hidden cards.
- Excluded forms, footer content, navigation, overview tables, and the existing automatic partner-logo marquees.
- Desktop markup and layouts remain unchanged; the wrappers are created only at 640px and below and are fully removed when returning to desktop width.

## Mobile carousel stability repair
- Fixed oversized carousel tracks caused by `width:max-content` combined with percentage-width cards.
- Removed automatic `scrollIntoView` calls that could jump the page during initialization.
- Added mobile-only width containment and broader JavaScript compatibility.
- Preserved desktop layouts and all existing mobile arrows, dots, swipe, RTL, and filtering behavior.

## Mobile carousel runtime repair
- Repaired the universal mobile carousel track sizing so each card uses the real viewport width instead of an expanding max-content width.
- Removed automatic dot `scrollIntoView` behavior that could move the page during initialization.
- Restricted the carousel MutationObserver to direct card changes only, preventing animated counters and nested text changes from rebuilding navigation dots continuously.
- Added conditional card-class initialization to stop refresh loops and detached-dot click failures.
- Preserved mobile arrows, dots, swipe, filters, RTL, menu behavior, and unchanged desktop grids.

## Counter section restored from mobile carousel
- Removed `.stats-grid` from the unified mobile carousel candidates.
- Restored the previous compact two-column counter grid on phone screens only.
- Preserved the counter number animation and viewport reveal motion.
- Kept all other mobile card groups as carousels with arrows and dots.
- Desktop styles and layouts remain unchanged.

## Mobile counter three-column square grid
- Changed the mobile counter layout to three columns and two rows.
- Reduced each card to a compact square shape.
- Kept the counter animation and all desktop styles unchanged.

## Mobile counter rectangles in three columns
- Restored rectangular counter cards on mobile while keeping the 3-column × 2-row order.
- Removed the 1:1 aspect ratio and reduced card height.
- Desktop counter layout remains unchanged.

## Mobile carousel arrow spacing refinement
- Increased the mobile carousel side gutters so the blue arrows sit clearly away from the card edges.
- Kept the arrow-only style, primary blue color, dots, swipe behavior, RTL/LTR logic, and desktop layouts unchanged.

## Mobile footer accordion menus
- Converted Services, Explore/Links, and Contact footer columns into click-to-open accordion menus on mobile only.
- Kept the brand, company description, and social icons visible above the accordion menus.
- Added a lightweight directional indicator and smooth open/close motion.
- Only one footer menu stays open at a time for a cleaner mobile layout.
- Preserved original heading-link navigation on desktop and all existing footer interactions.

## Mobile footer headings converted to accordion-only triggers
- Removed the footer heading destinations while the mobile layout is active.
- The heading word itself now opens and closes its list instead of navigating to another page.
- Restored each original heading link automatically when the viewport returns to desktop.
- Added a compact downward arrow directly beside each heading; it turns upward when opened.
- Prevented the legacy Explore scroll-to-top action from conflicting with the mobile accordion.
- Added Enter and Space keyboard activation for accessibility.

## Visible mobile footer accordion arrows
- Replaced the small pseudo-element chevrons with explicit inline SVG arrows.
- Each mobile footer heading now shows a clear white downward arrow at the end of the row.
- The arrow rotates upward when its accordion panel opens.
- Desktop footer headings remain unchanged.

## Mobile footer Contact restored as static content
- Removed the Contact / التواصل column from the mobile footer accordion system.
- Contact details now remain permanently visible on mobile, exactly as a normal footer column.
- Removed the Contact accordion arrow and open/close behavior.
- Services and Explore remain mobile accordions.
- Desktop footer behavior and links remain unchanged.

## Project asset folders organized
- Added structured image folders for all 71 projects from the supplied ASG handoff package.
- Each project now has cover, gallery, renders, drawings/BIM, source-documents, and notes folders.
- Added per-project metadata and exact website paths.
- Added a central Markdown and JSON project asset index.
- Existing pages, layouts, scripts, and desktop/mobile behavior were not changed.

## Placement-based image folders — any filename
- Replaced generic project asset folders with exact website-placement folders.
- Each project now has separate folders for its card image, page hero, four gallery positions, and optional social-share image.
- Added clear Arabic/English instructions inside every slot folder.
- Removed fixed filename requirements; any image filename is accepted.
- Added global site image slots for Home hero images, six partner logos, eight service-page hero images, and the default social-share image.
- Did not alter HTML, CSS, JavaScript, layout, or website behavior.

## All project folders organized by project name
- Added `assets/img/PROJECT_IMAGES_BY_NAME/`.
- Created one readable named folder for every project in the source data.
- Total projects: 71.
- Grouped projects under their original category folders.
- Added seven clear image-placement folders inside every project.
- Any common image filename is accepted; no required image naming convention.
- Preserved existing technical slug folders and site paths to avoid breaking the website.

## Arabic project image folders
- Replaced the user-facing English project upload tree with a fully Arabic folder tree.
- Added Arabic category names, Arabic project names, and Arabic image-placement folder names for all 71 projects.
- Added the original source title and technical slug inside every project folder for verification.
- Kept technical website image paths and project page URLs unchanged.


## Mobile carousel border and touch refinement
- Fixed clipped top borders by adding protected viewport breathing space.
- Added a very subtle mobile press/hover lift and zoom interaction.
- Preserved the stable carousel height and desktop layout.
