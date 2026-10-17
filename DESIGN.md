# Dooyoung & Selin · Burgundy Ribbon

## Direction

The user selected a new Burgundy Ribbon reference on 2026-10-12, superseding the earlier Blue Drawing cover. White paper, fine burgundy drawings, the original large ribbon cover, flowing script names, and black couple line art define the cover. On 2026-10-16 the user selected restrained Valentine-inspired hand drawings for the content, then clarified that the original large cover ribbon must remain. Preserve the original photographs and the existing drawing-to-photo interaction.

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
- Hero reading order: ribbon bow → WEDDING → names → couple → date → scroll cue. The cover venue line is omitted at the user’s request; venue details remain in the event/location sections.
- Keep the original large cover ribbon from `assets/ribbon-frame.png` unchanged at its 1054:1492 aspect ratio, including its flowing sides. The user explicitly retained this cover ribbon on 2026-10-16.
- Preserve generous inner space around the lettering and full couple silhouette. Short screens may grow naturally to keep text readable. No scroll lock.
- Main reading order (updated 2026-10-16): couple → invitation/signature → standalone photo 1 → February 2027 calendar → family introduction → gallery → film → venue/location → guestbook. Use the full original aspect ratio for standalone photo 1; keep it in the 27-photo gallery too. Highlight Saturday February 13 in burgundy on a Sunday-first calendar. Family copy supplied by the user: 김병억 · 주난지의 아들 김두영 / 최정권 · 유영실의 딸 최세린, each as a complete horizontal line (parents, relationship, then the couple’s name), with the two lines stacked. Separate this block from the larger calendar with generous space and a fine top rule; no vertical divider. The calendar uses the available column width up to 432px and 44px date rows. Show a live D-day below the calendar, calculated by Asia/Seoul calendar date, including D-day on the wedding date and D+N afterward.
- Controls use a burgundy primary and outlined secondary style, consistent 10px radius, 48px preferred target and 44px minimum. Preserve visible focus and labels.

## Portrait and movement

Use the latest user-supplied standalone couple drawing (2026-10-16), `assets/couple-illustration-v3.png`, unchanged from `신랑 신부 일러스트 컷아웃.png`. Display its full proportions with object-fit: contain, replacing the earlier crop from the full invitation artwork. Compensate for transparent source margins with uniform 1.1 scale, -5% horizontal and 5% vertical offset around center bottom, to retain the previous drawing’s visual size and position.

Use the user-provided transparent portrait at `assets/couple-user-cutout-v2.png`, proportionally reduced to a 1400px maximum dimension for the web. Keep the original photograph untouched; do not regenerate, retouch, reshape, or add a new mask. A subtle CSS shadow may supply the cut-paper depth.

Prioritize matching the head centers and foot baseline of the illustration and photograph. Cartoon anatomy cannot match every point of the photograph without distortion; keep natural proportions and use optical alignment rather than warping faces or bodies. Shift the portrait stage 8% right to balance the dress's visual weight, while keeping the sprinkles centered on the hero. The photo remains at a uniform 1 CSS scale with zero image offset; keep the scale isotropic.

Start with the illustration and never switch automatically. Clicking or tapping the portrait, or focusing it and pressing Enter or Space, toggles between illustration and photo with the existing 0.9-second dissolve. A brief burgundy/rose burst of small lines, dots and hearts may appear around the portrait's outer sides and bottom corners on each actual switch, without covering faces. Keep all text stable. With reduced motion, also start with the illustration; explicit toggles switch instantly without particles. Changing the motion preference must not change the selected portrait. A failed image keeps the drawing visible. The portrait itself is the public toggle, with no separate replay button. The music control is a 44px accessible button with a diagonal slash while stopped and a note while audio is actually audible. It must not autoplay or claim playback when muted, silent, paused, or missing a source. The hidden `#background-music` element intentionally has no source until an approved track is selected; wire it by adding that track's `src` or a `<source src="…">` child. With no source, activating the button only shows a brief preparation notice.

## Mobile navigation and photographs

Gallery sources updated 2026-10-16: numbered files 4.jpg–30.jpg in the user’s Desktop/사진/보정 folder map to gallery positions 1–27 (source number minus 3), in numeric order. Use proportional WebP copies named retouched-01 through retouched-27, without altering source photographs. The separate featured photo remains selected-01.webp.

- Mobile content follows natural height with about 32px above and below each reading section. The gallery is one continuous grid; do not snap at individual rows or intercept wheel/touch gestures.
- Place the scroll cue in a small separate row below the cover frame.
- Keep all 27 photographs in manifest order in a three-column grid, with one gallery heading and one hint. Initially show only the first 9 (3 rows); a centered 더보기 button expands all remaining photos once, then disappears and moves keyboard focus to the first revealed thumbnail without scrolling. The photo viewer can still navigate all 27. The user selected square thumbnails on 2026-10-12, superseding the earlier uncropped-thumbnail rule. Keep equal column widths and compact gaps; use top-aligned CSS object-fit: cover to keep faces visible in square thumbnails, without modifying source images. Tapping a thumbnail opens the entire original photo with object-fit: contain in the existing viewer.
- Keep the gallery static while scrolling; do not stack, rotate, or unfold photographs. Preserve the three-column layout and tap-to-enlarge viewer.
- The viewer uses the available dynamic viewport height. Its close X, counter and previous/next controls stay visible while the image fits the remaining space. Account for safe areas, short landscape screens and focus restoration.

## Directions

- Keep the event date, time, and hall in a short centered summary, followed by a separate `#location` map scene.
- Use a simple location diagram with live Gowun Dodum labels, burgundy line icons, and pale rose roads, matching the invitation palette. The earlier blue raster map is superseded. Keep the shuttle schedule above the diagram and equal Kakao Map and Naver Map links below it. Preserve readable text on small phones by letting the section grow naturally. The enlargement view must use the same typography and colors.
- Put the venue address and explicit copy control in the following `#transport` scene, with content near its top and a small-viewport minimum height. Keep the shuttle times visible: Daejeon Station departures are on the hour and venue departures are at half past; boarding place and first/last departures are pending. Show subway, bus, taxi/car, and parking as native collapsed disclosures with burgundy line icons. Keep 16px detail copy and allow very short screens or expanded details to grow naturally.
- Explain that the map is a location guide and ask guests to confirm the route in a map app. Preserve native scrolling and never hide overflow.
- The address copy control reports success only after the clipboard promise resolves. On unsupported or failed copy, say `주소를 길게 눌러 복사해 주세요.` and leave focus in place.

## Applied research and boundaries

The [Design Standards guidance](https://github.com/rampstackco/claude-skills/blob/main/skills/design-standards/SKILL.md) informs reusable tokens, control consistency, contrast, and responsive review. [Impeccable](https://github.com/pbakaus/impeccable) typeset/layout/polish guidance informs typography roles, grouping, reading order, and a bounded visual finishing pass. These documents were read; their installer, binary launcher, and slash-command runtime were not executed.

TypeUI Atlas/Cream are reference checks only. MengTo's video/HTML prompt-extraction workflows do not apply without those source workflows. Product Design was not found in this session's installed capabilities or plugin-directory search. Full findings: `artifacts/design-skills-research.md`.

## Current delivery scope

The selected invitation is served from the repository root. The gallery contains 27 optimized photos in a three-column grid (9 shown initially, then expanded with 더보기) and a modal viewer. RSVP has been removed at the user’s request. The guestbook is clearly marked as an input preview; Google Sheets persistence and the approved audio source remain pending. The music control is implemented but stays off and reports that music is being prepared until a source is added to `#background-music`. Never label a preview submit as saved. Local research and development copies remain under ignored `artifacts/`.

## Link sharing

Use the approved dedicated 2:1 PNG `share-kakao-v1.png` (1774×887) for Open Graph and large-image social cards. It currently retains the earlier blue illustration and heart-frame style; the cover restyle does not replace this separately approved sharing asset. It is a separately generated sharing illustration approved by the user, not a replacement or edit of their real photographs. Keep faces and names clear of the crop edges. Version the image filename when replacing it; Kakao may retain cached metadata for already shared URLs.

## Film album

Below the main gallery, display f1–f8 in order as a horizontal film strip with the supplied ribbon-wrapped film canister PNG on the left. Preserve full photo proportions inside black frames with sprocket holes. Keep only 6px between photographs, sizing each frame to its original aspect ratio at a shared height. Use native touch swiping, free mouse dragging and keyboard arrows, without navigation buttons, snapping or autoplay. Tapping opens the shared viewer within the eight-photo film album. Use assets/film-canister.png unchanged from the user’s supplied PNG, preserving its transparent background and proportions. Use the compact sizing requested on 2026-10-16: film photo heights 100px on mobile and 115px on desktop, with the canister and frame scaled together. Match the canister’s visible height to the film strip and overlap the strip behind its right edge so the photos appear to emerge from it.

## Selective hand-drawn accents

On 2026-10-16 the user replaced the bordered envelope treatment with open white stationery inspired by the supplied Valentine drawing reference. Retain the original large cover ribbon. Add only two fine-line burgundy motifs below it: small interlocking wedding rings with a diamond near the invitation signature, using the user’s latest supplied `버건디 겹친 결혼반지 아이콘.png` unchanged at `assets/wedding-rings-v2.png` inside a 56×48px contain box (2026-10-16) and a tied heart above the closing note. Remove folded side edges, the print label and date stamp, and the closing envelope flap/seal. Keep the film-roll label understated in the burgundy palette. Do not add every reference motif or place decoration over photographs. Preserve photos, film dragging, typography and factual event information; use decorative SVGs with empty alternatives and no extra animation.

## Motion and reading rhythm

On 2026-10-16 the user requested animation and spacing inspired by https://openthedays.com/templates/open-the-letter/preview. Adapt its gentle text entrances and generous reading pauses to the existing white/burgundy invitation. Keep the large ribbon and exact portrait calibration; use a brief opacity-only cover entrance, without a blocking envelope intro. Reveal selected content blocks once with a small upward movement and fade (~0.85 seconds), leaving gallery thumbnails static. Keep natural scrolling, default/no-JavaScript visibility, immediate visibility on keyboard focus, and reduced-motion bypass. Space the signature, featured photo, calendar, family introduction and gallery deliberately with 40–80px pauses; retain compact film sizing and map/transport viewport behavior.

## Gallery expansion control

The user selected the [Fancy border button](https://codepen.io/electerious/pen/qPjbGm) reference on 2026-10-16. Apply its overlapping horizontal/vertical rectangular lines only to the gallery 더보기 button, using thin burgundy strokes and a restrained 6px offset. Collapse the decorative line frames on hover/focus/press while preserving the core boundary, clear keyboard focus, 48px target, reduced-motion behavior and existing expansion logic. Other controls retain their established styling.
