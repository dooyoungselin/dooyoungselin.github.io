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

- Paper `#fffef9`; cobalt `#11199f`; reading ink `#253052`; secondary text `#626779`.
- Use semantic CSS variables for reusable colors, font roles, spaces, radii, and durations.
- Spacing steps: 4, 8, 12, 16, 24, 32, 48, 64, 80px. Related information is close; sections have larger breathing room.
- Invitation column: maximum 480px; gutter 24px on phones, up to 40px on wider screens. Desktop surrounds the column with quiet paper-toned space.
- Hero: one small-viewport height when content fits, flexible enough to remain readable on short screens. Group headline, portrait, names, date, and venue. No scroll lock.
- Main reading order: couple → invitation → photographs → date/location → RSVP → guestbook.
- Doodle frame and hearts use a consistent 2.5px stroke. Avoid repetitive dashboard cards, decorative gradients, large shadow panels, and unrelated themes.
- Controls: one cobalt primary and one outlined secondary style; consistent 10px radius; 48px preferred target, 44px minimum. Visible focus and labels.

## Portrait and movement

Use `assets/couple-original-cutout.svg`: it embeds the original Main-derived JPEG and clips it with a hand-traced vector outline. No generated or retouched portrait is allowed. A separate cream stroke and subtle CSS shadow supply the cut-paper effect. The source photograph remains unchanged; web scaling is allowed.

Prioritize matching the head centers and foot baseline of the illustration and photograph. Cartoon anatomy cannot match every point of the photograph without distortion; keep natural proportions and use optical alignment rather than warping faces or bodies.

Once images are ready, hold the drawing around 1.4 seconds and dissolve to the photographic cutout around 0.9 seconds. Any small paper-settle motion must be subtle and interruptible. Keep all text stable. With reduced motion, use static/manual states. A failed image keeps the drawing visible.

## Applied research and boundaries

The [Design Standards guidance](https://github.com/rampstackco/claude-skills/blob/main/skills/design-standards/SKILL.md) informs reusable tokens, control consistency, contrast, and responsive review. [Impeccable](https://github.com/pbakaus/impeccable) typeset/layout/polish guidance informs typography roles, grouping, reading order, and a bounded visual finishing pass. These documents were read; their installer, binary launcher, and slash-command runtime were not executed.

TypeUI Atlas/Cream are reference checks only. MengTo's video/HTML prompt-extraction workflows do not apply without those source workflows. Product Design was not found in this session's installed capabilities or plugin-directory search. Full findings: `artifacts/design-skills-research.md`.

## Current delivery scope

The selected invitation is served from the repository root. The gallery contains 30 optimized photos with a scroll-snap strip and modal viewer. RSVP and guestbook are clearly marked input previews; Google Sheets persistence and selected audio playback remain pending. Never label a preview submit as saved. Local research and development copies remain under ignored `artifacts/`.
