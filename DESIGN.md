# Dooyoung & Selin · Blue Drawing

## Direction

A personal paper invitation: white space, cobalt ink, small imperfect hearts, and the couple as the visual focus. Cute through rounded letterforms and drawing details; calm through consistent grouping. The user selected Blue Drawing and rejected the initial mixed heavy handwritten fonts. Preserve the supplied reference's character.

## Typography

| Role | Family | Size / leading | Treatment |
| --- | --- | --- | --- |
| English cover / names | Delius | 28–36px / 1.15 | Regular, natural rounded strokes; no faux bold or italic |
| Korean section title | Gowun Dodum | 24–28px / 1.45 | Regular; create hierarchy with space and scale |
| Invitation prose | Gowun Dodum | 16px / 1.85 | Centered short paragraphs, keep Korean words together |
| Form control / button | Gowun Dodum | 16px / 1.5 | Same treatment in RSVP and guestbook |
| Supporting detail | Gowun Dodum | 13–14px / 1.6 | Readable contrast; never compress important addresses/dates |

Only these two families appear in the invitation. English display type carries personality; Korean carries reading and input. Use `font-synthesis: none`. System sans fallbacks keep content visible if fonts fail. Do not reuse Kalam, Caveat, Marker Felt, Comic Sans, or assorted script treatments.

Font research: [Delius](https://github.com/google/fonts/tree/main/ofl/delius), [Gowun Dodum](https://github.com/google/fonts/tree/main/ofl/gowundodum), and [Jua](https://github.com/google/fonts/tree/main/ofl/jua). Delius + Gowun Dodum is the selected pair. Jua is a cuter/heavier alternative and does not join the production font set.

## Color and composition

- Paper and all page/section surroundings `#ffffff`; cobalt `#11199f`; reading ink `#253052`; secondary text `#626779`. The user requested removing grey/tinted background bands.
- Use semantic CSS variables for reusable colors, font roles, spaces, radii, and durations.
- Spacing steps: 4, 8, 12, 16, 24, 32, 48, 64, 80px. Related information is close; sections have larger breathing room.
- Invitation column: maximum 480px; gutter 24px on phones, up to 40px on wider screens. Desktop surrounds the column with the same white background. The cover frame sits closer to the viewport edges than the body gutter.
- Hero: one small-viewport height when content fits, flexible enough to remain readable on short screens. Group headline, portrait, names, date, and venue. No scroll lock.
- Main reading order: couple → invitation → photographs → date/location → RSVP → guestbook.
- The hero frame uses the user's supplied transparent PNG `invitation-frame-v1.png`. Preserve the source bytes and corner-heart shapes while fitting the surrounding lines to the viewport. Avoid repetitive dashboard cards, decorative gradients, large shadow panels, and unrelated themes.
- Controls: one cobalt primary and one outlined secondary style; consistent 10px radius; 48px preferred target, 44px minimum. Visible focus and labels.

## Portrait and movement

Use `assets/couple-original-cutout.svg`: it embeds the original Main-derived JPEG and clips it with a hand-traced vector outline. No generated or retouched portrait is allowed. A separate cream stroke and subtle CSS shadow supply the cut-paper effect. The source photograph remains unchanged; web scaling is allowed.

Prioritize matching the head centers and foot baseline of the illustration and photograph. Cartoon anatomy cannot match every point of the photograph without distortion; keep natural proportions and use optical alignment rather than warping faces or bodies.

Once images are ready, hold the drawing around 1.4 seconds and dissolve to the photographic cutout around 0.9 seconds. A brief cobalt/light-blue burst of small lines, dots and hearts may appear around the portrait edges once as the photo arrives, without covering faces. Keep all text stable. With reduced motion, show a static photograph and no particles. A failed image keeps the drawing visible. No public replay button. The music control is a 44px accessible button with a diagonal slash while stopped and a note while audio is actually audible. It must not autoplay or claim playback when muted, silent, paused, or missing a source. The hidden `#background-music` element intentionally has no source until an approved track is selected; wire it by adding that track's `src` or a `<source src="…">` child. With no source, activating the button only shows a brief preparation notice.

## Mobile navigation and photographs

- Mobile navigation is a vertical sequence of viewport-sized scenes, not a list of small snapping cards. Use native mandatory snapping only at the large scene starts, with normal momentum and no forced stop at every crossed scene. Do not intercept wheel/touch gestures. Long form sections may grow beyond the viewport and must remain fully readable; suspend snapping during text/select input and modal viewing. Reduced-motion preferences disable snapping.
- Place the scroll cue in a small separate row below the cover frame, away from its bottom line and corner hearts.
- Show all 30 photographs in 10 album scenes with three photographs per scene and manifest reading order. Vary image widths and placement to create an asymmetrical composition. Preserve the entire original image at its natural aspect ratio: no cover fitting, clipped frames, focal-point crops, or rounded clipping. Scale the whole composition to fit small mobile screens. A landscape lead gets its own full-width row. Individual photos open the existing viewer.
- The viewer uses the available dynamic viewport height. Its close X, counter and previous/next controls stay visible while the image fits the remaining space. Account for safe areas, short landscape screens and focus restoration.

## Directions

- Keep the event date, time, and hall in a short centered summary, followed by a separate `#location` scene.
- Use the supplied hand-drawn `venue-map-v2.png` (1254×1254) at full width and its natural aspect ratio. Keep it lazy-loaded and uncropped; do not substitute map tiles. Explain that it is a location guide and ask guests to check the route in a map app.
- Keep the venue address readable with an explicit copy control, then show equal Kakao Map and Naver Map links and uncluttered subway, bus, taxi/car, and parking rows with cobalt line icons. Treat any shuttle details confirmed by the couple as authoritative and label only details still pending.
- Let the location scene grow past the viewport when needed. Keep 16px transit copy, clear separators, mobile wrapping, and native scroll behavior; do not force a gesture or hide overflow.
- The address copy control reports success only after the clipboard promise resolves. On unsupported or failed copy, say `주소를 길게 눌러 복사해 주세요.` and leave focus in place.

## Applied research and boundaries

The [Design Standards guidance](https://github.com/rampstackco/claude-skills/blob/main/skills/design-standards/SKILL.md) informs reusable tokens, control consistency, contrast, and responsive review. [Impeccable](https://github.com/pbakaus/impeccable) typeset/layout/polish guidance informs typography roles, grouping, reading order, and a bounded visual finishing pass. These documents were read; their installer, binary launcher, and slash-command runtime were not executed.

TypeUI Atlas/Cream are reference checks only. MengTo's video/HTML prompt-extraction workflows do not apply without those source workflows. Product Design was not found in this session's installed capabilities or plugin-directory search. Full findings: `artifacts/design-skills-research.md`.

## Current delivery scope

The selected invitation is served from the repository root. The gallery contains 30 optimized photos with panel grids and a modal viewer. RSVP and guestbook are clearly marked input previews; Google Sheets persistence and the approved audio source remain pending. The music control is implemented but stays off and reports that music is being prepared until a source is added to `#background-music`. Never label a preview submit as saved. Local research and development copies remain under ignored `artifacts/`.

## Link sharing

Use the approved dedicated 2:1 PNG `share-kakao-v1.png` (1774×887) for Open Graph and large-image social cards. It contains the illustrated couple's upper bodies, arched blue names, and the blue heart-frame style. It is a separately generated sharing illustration approved by the user, not a replacement or edit of their real photographs. Keep faces and names clear of the crop edges. Version the image filename when replacing it; Kakao may retain cached metadata for already shared URLs.
