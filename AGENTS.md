# Wedding project

- Be candid, challenge assumptions, and ask when a material requirement is unclear.
- Follow the selected Blue Drawing direction and the role-based rules in `DESIGN.md` for invitation UI changes.
- Keep the user's original photographs intact. Cutouts use a clipping mask over the original photograph; do not regenerate, retouch, reshape, or replace people.
- Gallery photographs must remain fully visible at their original aspect ratio. Vary their display size and placement; do not crop them to fill a grid cell.
- Keep factual event information confirmed: 2027-02-13 Saturday 13:30, 씨엘드레브 르자르뎅홀, Daejeon.
- Use Astra for planning, design, management, and review; Luna xhigh for scoped implementation; Sol medium for complex cross-file debugging and integration (increase effort when needed).
- Verify changed layouts at mobile and desktop sizes. Report preview-only features honestly; never show stored-success states without verified persistence.
- The user can revise these project design preferences at any time.

## Harness efficiency

- Delegate only useful, bounded work; use at most 2 workers and avoid duplicate investigations.
- Start workers with `fork_turns: none` and a short task naming owned files, acceptance criteria, and relevant constraints.
- Workers report changed files, checks, and blockers concisely; parent reviews the diff without repeating exploration.
- Check `git status` and use scoped `rg`; avoid bulk source/document dumps and historical transcripts.
- Consult `DESIGN.md` only for UI changes. Current code and project guidance are authoritative; verify old memories against current code, and require every recorded source SHA256 to match before reusing extracts.
- Write distinct temporary outputs under `/private/tmp`; use ponytail for coding, markitdown-local only for exact PDF/Office text needs, and Playwright for repeated UI automation.
- Avoid reinstalling duplicates; do not claim measured savings without measurements.
