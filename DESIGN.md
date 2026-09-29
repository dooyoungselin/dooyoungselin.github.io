# Dooyoung & Selin · Blue Drawing

## Direction

A personal paper invitation: white space, cobalt ink, small imperfect hearts, and the couple as the visual focus. Cute through rounded letterforms and drawing details; calm through consistent grouping. The user selected Blue Drawing and supplied handwritten PNG crops for the cover lettering. Preserve their original aspect ratios and the supplied reference's character.

## Typography

| Role | Family | Size / leading | Treatment |
| --- | --- | --- | --- |
| English cover title, names, date, venue | Supplied transparent PNG crops | Responsive, natural aspect ratio | Keep matching visually hidden text for accessible reading |
| Other English text | Delius | Per component role | Regular, natural rounded strokes; no faux bold or italic |
| Korean section title | Gowun Dodum | 24–28px / 1.45 | Regular; create hierarchy with space and scale |
| Invitation prose | Gowun Dodum | 16px / 1.85 | Centered short paragraphs, keep Korean words together |
| Form control / button | Gowun Dodum | 16px / 1.5 | Same treatment in RSVP and guestbook |
| Supporting detail | Gowun Dodum | 13–14px / 1.6 | Readable contrast; never compress important addresses/dates |

Outside the cover crops, Delius remains for English and Gowun Dodum for Korean reading and input. Use `font-synthesis: none`. System sans fallbacks keep text visible if fonts fail.

Font research: [Delius](https://github.com/google/fonts/tree/main/ofl/delius) and [Gowun Dodum](https://github.com/google/fonts/tree/main/ofl/gowundodum) remain the selected font pair for text outside the cover crops.

## Color and composition

- Paper and all page/section surroundings `#ffffff`; cobalt `#11199f`; reading ink `#253052`; secondary text `#626779`. The user requested removing grey/tinted background bands.
- Use semantic CSS variables for reusable colors, font roles, spaces, radii, and durations.
- Spacing steps: 4, 8, 12, 16, 24, 32, 48, 64, 80px. Related information is close; sections have larger breathing room.
- Invitation column: maximum 480px; gutter 24px on phones, up to 40px on wider screens. Desktop surrounds the column with the same white background. The cover frame sits closer to the viewport edges than the body gutter.
- Hero: budget one stable small-viewport height, including safe-area-aware outer top and bottom whitespace of about 24px. Keep the headline clear of the music control; let the portrait shrink at its natural aspect ratio so names, date, venue, and cue fit when possible. Very short screens may grow to keep reading clear. No scroll lock.
- Main reading order: couple → invitation → photographs → date/location → RSVP → guestbook.
- The hero frame uses the user's supplied transparent PNG `invitation-frame-v1.png`. Preserve the source bytes and corner-heart shapes while fitting the surrounding lines to the viewport. Avoid repetitive dashboard cards, decorative gradients, large shadow panels, and unrelated themes.
- Controls: one cobalt primary and one outlined secondary style; consistent 10px radius; 48px preferred target, 44px minimum. Visible focus and labels.

## Portrait and movement

Use the user-provided transparent portrait at `assets/couple-user-cutout-v2.png`, proportionally reduced to a 1400px maximum dimension for the web. Keep the original photograph untouched; do not regenerate, retouch, reshape, or add a new mask. A subtle CSS shadow may supply the cut-paper depth.

Prioritize matching the head centers and foot baseline of the illustration and photograph. Cartoon anatomy cannot match every point of the photograph without distortion; keep natural proportions and use optical alignment rather than warping faces or bodies. Shift the portrait stage 8% right to balance the dress's visual weight, while keeping the sprinkles centered on the hero. The photo remains at a uniform 1 CSS scale with zero image offset; keep the scale isotropic.

Once images are ready, hold the drawing around 1.4 seconds and dissolve to the photographic cutout around 0.9 seconds. Clicking or tapping the portrait, or focusing it and pressing Enter or Space, toggles between illustration and photo; manual input cancels any pending automatic transition. A brief cobalt/light-blue burst of small lines, dots and hearts may appear around the portrait's outer sides and bottom corners on each actual switch, without covering faces. Keep all text stable. With reduced motion, start with a static photograph and no particles; explicit toggles remain available and switch instantly without particles. A failed image keeps the drawing visible. The portrait itself is the public toggle, with no separate replay button. The music control is a 44px accessible button with a diagonal slash while stopped and a note while audio is actually audible. It must not autoplay or claim playback when muted, silent, paused, or missing a source. The hidden `#background-music` element intentionally has no source until an approved track is selected; wire it by adding that track's `src` or a `<source src="…">` child. With no source, activating the button only shows a brief preparation notice.

## Mobile navigation and photographs

- Mobile navigation is a sequence of independent viewport-height scenes. Each major scene starts at the top, uses `min-height: 100svh`, and stops at its own start with native mandatory snapping. Keep content top-aligned with 24–32px top padding so scenes do not acquire large centered gaps. Long forms and expanded transport details may grow beyond one viewport; never clip their content. Do not intercept wheel/touch gestures. Suspend snapping during text/select input, modal viewing, and reduced-motion preferences.
- Place the scroll cue in a small separate row below the cover frame, away from its bottom line and corner hearts.
- Show all 30 photographs in 10 horizontal album slides with three photographs per slide and manifest reading order. Keep the gallery to one vertical scene with a shared title, page count, 44px previous/next controls, and a short swipe hint. Use native horizontal scrolling and snapping; vertical swipes continue to the next section. Vary image widths and placement to create an asymmetrical composition. Preserve each original image at its natural aspect ratio: no cover fitting, clipped frames, focal-point crops, or rounded clipping. Scale the whole composition to fit small mobile screens. A landscape lead gets its own full-width row. Individual photos open the existing viewer.
- The viewer uses the available dynamic viewport height. Its close X, counter and previous/next controls stay visible while the image fits the remaining space. Account for safe areas, short landscape screens and focus restoration.

## Directions

- Keep the event date, time, and hall in a short centered summary, followed by a `#location` map scene and a separate `#transport` scene. On mobile, each starts as its own viewport-height screen.
- Use the supplied `venue-map-v4.png` (1086×1448), with restrained cobalt line art, pale roads, regular rounded type, and no marker rays or shading. Keep it lazy-loaded and uncropped at its natural aspect ratio; do not substitute map tiles. On phones, fit the title, full image, short caption, and equal Kakao Map and Naver Map links in one small-viewport scene.
- Put the venue address and explicit copy control in the following `#transport` scene, with content near its top and a small-viewport minimum height. Keep the shuttle times visible: Daejeon Station departures are on the hour and venue departures are at half past; boarding place and first/last departures are pending. Show subway, bus, taxi/car, and parking as native collapsed disclosures with cobalt line icons. Keep 16px detail copy and allow very short screens or expanded details to grow naturally beyond the starting viewport.
- Explain that the map is a location guide and ask guests to confirm the route in a map app. Preserve native scrolling and never hide overflow.
- The address copy control reports success only after the clipboard promise resolves. On unsupported or failed copy, say `주소를 길게 눌러 복사해 주세요.` and leave focus in place.

## Applied research and boundaries

The [Design Standards guidance](https://github.com/rampstackco/claude-skills/blob/main/skills/design-standards/SKILL.md) informs reusable tokens, control consistency, contrast, and responsive review. [Impeccable](https://github.com/pbakaus/impeccable) typeset/layout/polish guidance informs typography roles, grouping, reading order, and a bounded visual finishing pass. These documents were read; their installer, binary launcher, and slash-command runtime were not executed.

TypeUI Atlas/Cream are reference checks only. MengTo's video/HTML prompt-extraction workflows do not apply without those source workflows. Product Design was not found in this session's installed capabilities or plugin-directory search. Full findings: `artifacts/design-skills-research.md`.

## Current delivery scope

The selected invitation is served from the repository root. The gallery contains 30 optimized photos with panel grids and a modal viewer. RSVP and guestbook are clearly marked input previews; Google Sheets persistence and the approved audio source remain pending. The music control is implemented but stays off and reports that music is being prepared until a source is added to `#background-music`. Never label a preview submit as saved. Local research and development copies remain under ignored `artifacts/`.

## Link sharing

Use the approved dedicated 2:1 PNG `share-kakao-v1.png` (1774×887) for Open Graph and large-image social cards. It contains the illustrated couple's upper bodies, arched blue names, and the blue heart-frame style. It is a separately generated sharing illustration approved by the user, not a replacement or edit of their real photographs. Keep faces and names clear of the crop edges. Version the image filename when replacing it; Kakao may retain cached metadata for already shared URLs.
