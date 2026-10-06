# Phoenix Services Incorporated — Website

This is a complete, static, deployable website for Phoenix Services Incorporated,
audited against the company's internal credibility/compliance guidelines.

## What's in this repo

```
pheonix-Services/
├── index.html                    Home
├── about.html                    About Phoenix
├── what-we-do.html               What We Do
├── projects.html                 Projects (pipeline overview)
├── project-margibi-solar.html    40 MW Margibi Solar Power Project (flagship detail)
├── partnerships.html             Partnerships
├── leadership.html               Leadership
├── investors.html                Investors & Partners
├── news.html                     News & Developments
├── contact.html                  Contact
├── css/style.css                 Shared design system (colors, type, layout, components)
├── js/main.js                    Shared behavior (mobile nav toggle, footer year)
├── content-source/                Internal reference material (not part of the live site)
└── README.md                     This file
```

Every page is plain HTML/CSS/JS with no build step and no external dependencies
except two Google Fonts (Fraunces, IBM Plex Sans/Mono), loaded via `@import` in
`style.css`. It can be opened directly in a browser or deployed to any static host.

## Deploying

**Any static host works as-is** — push this repo, or drag-and-drop its contents
(everything *except* `content-source/` and this README) onto:

- **Netlify / Vercel / Cloudflare Pages** — connect this git repo, or drag the folder into their dashboard.
- **GitHub Pages** — enable Pages on this repo's default branch, serving from the root.
- **A traditional web host** — upload via FTP/SFTP to the public web root.

No environment variables, no server, no database. If you want a contact form with
actual email delivery (rather than the current `mailto:` links), that will need a
small serverless function or a form service (e.g. Formspree) — the current build
intentionally keeps things dependency-free.

## Content governance — read before publishing further

The `content-source/` folder contains internal reference material this site was
built against. **It must never be published as a live page:**

- **`11-website-content-guidelines.md`** is Phoenix's internal credibility/compliance
  reference, not customer-facing content. It is included here for editorial reference
  only — no page links to it, and it must not be given a public route.

## One open item before this goes live

This is flagged in the compliance guidelines and is **intentionally left
unresolved** in this build, pending authorization:

- **Zanet Energy partnership** (`partnerships.html`) is described under a softened
  heading ("Regional Technical Partnership") with the relationship caveated in body
  text. Confirm the disclosure has been formally authorized before publishing this
  section as final — see `content-source/11-website-content-guidelines.md`, §5.

Do not strip the conditional/hedged language around this item until the
underlying relationship has actually been confirmed and cleared for
publication.

The leadership page is no longer an open item — all four executive profiles
(CEO, Technical Manager, Finance Manager, Operations Manager) have been
added as of October 2026.

## Editorial rules baked into this build

- Hedging language ("proposed," "under development," "preliminary") is used
  consistently for the 40 MW project across every page that mentions it — do not
  strip this language when editing.
- The News page publishes only verified facts, not placeholder/suggested events.
  Add new entries only once they've actually occurred.
- No stock or third-party project photography is used anywhere on the site — all
  visuals are original abstract illustrations, so nothing on the site can be mistaken
  for an existing plant or facility that doesn't yet exist.
