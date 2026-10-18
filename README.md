# FOSSapalooza website

A one-page [Hugo](https://gohugo.io) site for FOSSapalooza, an open source rock festival in Brussels on 29 January 2027, the day before FOSDEM. The design is mockup 11, "Purple haze".

Every push to `main` builds the site on GitHub and copies it to DreamHost.

## What's in here

| Path | What it is |
|---|---|
| `data/site.yaml` | **All the text on the page**: dates, venue, ticket prices, CFP details, links. Edit this file. |
| `layouts/home.html` | The page template |
| `assets/css/main.css` | The styles |
| `static/fonts/` | Archivo and JetBrains Mono, both open source under the SIL Open Font License 1.1 (licences included). They're self-hosted, so the page makes no requests to Google or any other third party. |
| `static/images/` | Logos, favicon, and `og.png` (the image shown when the link is shared) |
| `static/images/organizers/` | Put co-organizer logos here |
| `.github/workflows/deploy.yml` | Builds the site and copies it to DreamHost on every push to `main` |
| `deploy.sh` | The same deploy, run from your own computer |

## Edit and preview on your computer

1. Install Hugo **extended**, version 0.155.3 or newer ([installation guide](https://gohugo.io/installation/)). On a Mac with Homebrew: `brew install hugo`.
2. In this folder, run `hugo server`, then open http://localhost:1313. The page reloads as you save changes.
3. Edit `data/site.yaml`. Anything in `[BRACKETS]` is a placeholder still to fill in:
   - CFP deadline, notification date, track names, talk formats, and the Pretalx link (`cfp.url`)
   - The pretix ticket link (`tickets.url`). Once it's set, the "Get tickets" buttons go there.
   - The contact email and code of conduct link (`contact`)
   - The schedule rows (replace these once talks are accepted)
4. **Co-organizer logos:** put each file in `static/images/organizers/`, for example `owasp.svg`. Then set `logo: images/organizers/owasp.svg` for that organizer in `data/site.yaml`. You can also set `url` to make the logo a link.
5. **Domain:** once the domain is decided, set `baseURL` in `hugo.toml`, for example `https://fossapalooza.eu/`.
6. **Share image:** `static/images/og.png` is a fixed picture showing the date and city. If either changes, replace it.

## Accessibility and standards

The site targets **WCAG 2.2 level AA**, the current W3C standard. Meeting 2.2 AA also covers WCAG 2.1 AA.

The built page was checked on 18 October 2026:

| Check | Result |
|---|---|
| axe-core 4.14 automated scan (WCAG 2.0, 2.1 and 2.2 A/AA rules plus best practices) at 1440, 1024, 768, 390 and 320px | 0 violations |
| Text contrast against the pixels actually behind it, at nine widths from 1440 to 320px (including text over the colour blobs) | All text meets 4.5:1, or 3:1 for large text |
| W3C Nu HTML validator | No errors |
| Keyboard: skip link, tab order, visible focus on every link and button | Pass. Focus is a gold ring, and a dark ring on the gold CFP card. |
| Reflow at 320px (no sideways scrolling) | Pass |
| Text spacing override (WCAG 1.4.12) | Nothing clipped or overlapping |
| Target size (WCAG 2.5.8) | Every link and button is at least about 42px tall |
| Structure | `lang="en"`, page title, one `h1`, ordered `h2` and `h3`, header/nav/main/footer landmarks, alt text on images, zoom not blocked |
| Motion | Smooth scrolling is turned off for people who set "reduce motion" |
| Third-party requests, cookies, trackers | None. The page loads only its own files. |
| Fonts | Only Archivo (400, 600, 800, 900) and JetBrains Mono (500) load. Both are OFL 1.1 with no Reserved Font Name, so the subset files can be shipped as they are. |

**Keeping it accessible as you edit**

- **Organizer logos:** each logo's alt text is the organizer's name, taken from `name` in `data/site.yaml`. Keep the names accurate.
- **Contact email:** set a real address in `data/site.yaml`. Until then the "Contact us" button links back to the Sponsors section, so the HTML stays valid.
- **Code of conduct:** replace `coc_url: "#"` with the real page. A link that goes nowhere is a barrier.
- **Hero blobs:** don't move text on top of the gold blob. White on gold is only 1.75:1, which is why that blob is hidden between about 760 and 1060px wide.
- **New colour pairs:** if you add one, check it at https://webaim.org/resources/contrastchecker/ (4.5:1 for normal text).
- **Re-checking:** after bigger changes, run the free axe DevTools or WAVE browser extension on the page, and paste the address into https://validator.w3.org/nu/.
- **Screen readers:** these checks don't replace a real screen-reader pass. Try VoiceOver (Mac) or NVDA (Windows) once before launch.

**European Accessibility Act (EAA):** Directive (EU) 2019/882 covers e-commerce services provided to consumers after 28 June 2025. Microenterprises providing services (fewer than 10 people, and no more than €2 million turnover or balance sheet) are excluded. Ticket checkout runs on pretix, so pretix's accessibility matters as well as this page's. [Directive (EU) 2019/882, the European Accessibility Act](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX%3A32019L0882)
