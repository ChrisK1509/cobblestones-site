# Cobble Stones WSMBA — website

Static site, no build step. Live at https://cobblestones.org.uk via GitHub Pages (branch `main`, root).
Edit → commit → push, and the site updates in about a minute.

## Files
- `index.html` — home page
- `shop.html`, `media.html`, `bylaws.html`, `members.html`, `president.html` — sub-pages (currently "Coming Soon")
- `assets/css/site.css` — all styles (mobile rules at the bottom)
- `assets/js/site.js` — menu, contact popup, copy buttons, scroll-reveal, crest tilt
- `assets/img/` — optimised images (hero/section backgrounds in two sizes, crests, value photos, icons, favicon, share image)
- `assets/fonts/` — Cinzel and Raleway (latin subsets, self-hosted)
- `CNAME` — custom domain for GitHub Pages (managed by GitHub; do not delete)

## Editing the calendar
In `index.html`, each event is one `.ev` block between `<!-- EVENTS:START -->` and `<!-- EVENTS:END -->`.
Copy a block, change the day, month, title, meta line and the tag (`evtag`, `evtag evtag-social`, or `evtag evtag-charity`).

## Placeholders still to fill
- Contact phone number (`index.html`, two places: the `tel:` link and the Copy button's `data-copy`)
- Footer Facebook / Instagram / Privacy links (`href="#"`)
- Calendar events (sample data)
- Sub-page content
