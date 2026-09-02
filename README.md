# Cobble Stones WSMBA — website, ready to publish

Static site. No build step, no server code, no dependencies. Upload the contents of this folder to the web root of any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, cPanel `public_html`, S3, etc.) and point the domain at it.

## Files
- `index.html` — home page (entry point)
- `shop.html`, `media.html`, `bylaws.html`, `members.html`, `president.html` — sub-pages (currently "Coming Soon" placeholders)

Every page is fully self-contained (images, fonts loader, scripts inlined), so no other files or folders are needed. All internal links are relative (`shop.html`, `index.html#about`, etc.) and work from the site root.

## Notes
- Pages load Google Fonts (Cinzel, Raleway) from fonts.googleapis.com at runtime; the site needs to be served over HTTP(S), not opened via `file://`, for best results.
- Contact popup phone number is a placeholder (`01234 567 890`) pending the real number.
- Email address used: `info@cobblestones.org.uk`.
- No form handling or backend is required.
