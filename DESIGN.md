# Dooyoung & Selin · Burgundy Ribbon

## Direction

The user selected a new Burgundy Ribbon reference on 2026-10-12, superseding the earlier Blue Drawing cover. White paper, fine burgundy ribbon lines, a large bow, flowing script names, and black couple line art define the cover. Preserve the original photographs and the existing drawing-to-photo interaction.

## Typography

| Role | Family | Treatment |
| --- | --- | --- |
| English couple names | Dancing Script | Semibold (600) natural handwriting, above the couple; match the stronger strokes of the supplied reference |
| Cover title, date, venue | Libre Baskerville | Regular (400) sturdy serif; tracked uppercase title and lining numerals for date/time |
| Other English text | Libre Baskerville | Regular |
| Korean titles and prose | Gowun Dodum | Regular, centered prose, keep words together |
| Form control / button | Gowun Dodum | 16px / 1.5 |
| Supporting detail | Gowun Dodum | 13–14px / 1.6 |

Use `font-synthesis: none` and readable fallback fonts. Cover lettering is live text.

## Color and composition

- White paper; burgundy `#8b1026` accent; warm charcoal reading text and muted supporting text.
- Retain semantic CSS variables, spacing steps, 480px invitation column, and white desktop surroundings.
- Hero reading order: ribbon bow → SAVE THE DATE → names → couple → date and venue → scroll cue.
- Use the user-supplied transparent `assets/ribbon-frame.png` unchanged, at its original 1054:1492 aspect ratio. Size cover typography and portrait within this frame; never stretch or crop the ribbon. It replaces the approximated SVG ribbon.
- Preserve generous inner space around the lettering and full couple silhouette. Short screens may grow naturally to keep text readable. No scroll lock.
- Main reading order: couple → invitation → photographs → date/location → RSVP → guestbook.
- Controls use a burgundy primary and outlined secondary style, consistent 10px radius, 48px preferred target and 44px minimum. Preserve visible focus and labels.

## Portrait and movement

Use the user-provided transparent portrait at `assets/couple-user-cutout-v2.png`, proportionally reduced to a 1400px maximum dimension for the web. Keep the original photograph untouched; do not regenerate, retouch, reshape, or add a new mask. A subtle CSS shadow may supply the cut-paper depth.

Prioritize matching the head centers and foot baseline of the illustration and photograph. Cartoon anatomy cannot match every point of the photograph without distortion; keep natural proportions and use optical alignment rather than warping faces or bodies. Shift the portrait stage 8% right to balance the dress's visual weight, while keeping the sprinkles centered on the hero. The photo remains at a uniform 1 CSS scale with zero image offset; keep the scale isotropic.

Once images are ready, hold the drawing around 1.4 seconds and dissolve to the photographic cutout around 0.9 seconds. Clicking or tapping the portrait, or focusing it and pressing Enter or Space, toggles between illustration and photo; manual input cancels any pending automatic transition. A brief burgundy/rose burst of small lines, dots and hearts may appear around the portrait's outer sides and bottom corners on each actual switch, without covering faces. Keep all text stable. With reduced motion, start with a static photograph and no particles; explicit toggles remain available and switch instantly without particles. A failed image keeps the drawing visible. The portrait itself is the public toggle, with no separate replay button. The music control is a 44px accessible button with a diagonal slash while stopped and a note while audio is actually audible. It must not autoplay or claim playback when muted, silent, paused, or missing a source. The hidden `#background-music` element intentionally has no source until an approved track is selected; wire it by adding that track's `src` or a `<source src="…">` child. With no source, activating the button only shows a brief preparation notice.

## Mobile navigation and photographs

- Mobile content follows natural height with about 32px above and below each reading section. The gallery is one continuous grid; do not snap at individual rows or intercept wheel/touch gestures.
- Place the scroll cue in a small separate row below the cover frame.
- Show all 30 photographs in manifest order in a three-column grid (10 rows), with one gallery heading and one hint. The user selected square thumbnails on 2026-10-12, superseding the earlier uncropped-thumbnail rule. Keep equal column widths and compact gaps; use top-aligned CSS object-fit: cover to keep faces visible in square thumbnails, without modifying source images. Tapping a thumbnail opens the entire original photo with object-fit: contain in the existing viewer.
- Keep the gallery static while scrolling; do not stack, rotate, or unfold photographs. Preserve the three-column layout and tap-to-enlarge viewer.
- The viewer uses the available dynamic viewport height. Its close X, counter and previous/next controls stay visible while the image fits the remaining space. Account for safe areas, short landscape screens and focus restoration.

## Directions

- Keep the event date, time, and hall in a short centered summary, followed by a separate `#location` map scene.
- Use the supplied hand-drawn `venue-map-v4.png` (1086×1448) at its natural aspect ratio. Keep it lazy-loaded and uncropped; do not substitute map tiles. On phones, fit the title, full image, short caption, and equal Kakao Map and Naver Map links in one small-viewport scene.
- Put the venue address and explicit copy control in the following `#transport` scene, with content near its top and a small-viewport minimum height. Keep the shuttle times visible: Daejeon Station departures are on the hour and venue departures are at half past; boarding place and first/last departures are pending. Show subway, bus, taxi/car, and parking as native collapsed disclosures with burgundy line icons. Keep 16px detail copy and allow very short screens or expanded details to grow naturally.
- Explain that the map is a location guide and ask guests to confirm the route in a map app. Preserve native scrolling and never hide overflow.
- The address copy control reports success only after the clipboard promise resolves. On unsupported or failed copy, say `주소를 길게 눌러 복사해 주세요.` and leave focus in place.

## Applied research and boundaries

The [Design Standards guidance](https://github.com/rampstackco/claude-skills/blob/main/skills/design-standards/SKILL.md) informs reusable tokens, control consistency, contrast, and responsive review. [Impeccable](https://github.com/pbakaus/impeccable) typeset/layout/polish guidance informs typography roles, grouping, reading order, and a bounded visual finishing pass. These documents were read; their installer, binary launcher, and slash-command runtime were not executed.

TypeUI Atlas/Cream are reference checks only. MengTo's video/HTML prompt-extraction workflows do not apply without those source workflows. Product Design was not found in this session's installed capabilities or plugin-directory search. Full findings: `artifacts/design-skills-research.md`.

## Current delivery scope

The selected invitation is served from the repository root. The gallery contains 30 optimized photos in a continuous three-column grid and a modal viewer. RSVP and guestbook are clearly marked input previews; Google Sheets persistence and the approved audio source remain pending. The music control is implemented but stays off and reports that music is being prepared until a source is added to `#background-music`. Never label a preview submit as saved. Local research and development copies remain under ignored `artifacts/`.

## Link sharing

Use the approved dedicated 2:1 PNG `share-kakao-v1.png` (1774×887) for Open Graph and large-image social cards. It currently retains the earlier blue illustration and heart-frame style; the cover restyle does not replace this separately approved sharing asset. It is a separately generated sharing illustration approved by the user, not a replacement or edit of their real photographs. Keep faces and names clear of the crop edges. Version the image filename when replacing it; Kakao may retain cached metadata for already shared URLs.
