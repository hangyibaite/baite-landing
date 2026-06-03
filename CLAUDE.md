# Content-to-Cashflow™ Landing Page — Claude Code Build Prompt

## OVERVIEW

Build a single-page landing page for the Content-to-Cashflow™ Course. Static HTML/CSS/JS (no framework). Build section by section — do NOT generate the entire file at once. After each section, pause and let me review before continuing.

The mascot image is at `./assets/mascot-hires.png` (1946×2048 PNG, transparent bg — white blob character with dark eyes). The reference screenshot for visual direction is at `./assets/reference.png`.

Host-ready for Vercel or GitHub Pages. No build step needed.

---

## DESIGN SYSTEM

### Typography
- **Font**: Inter (Google Fonts) — load weights 400, 500, 600, 700, 800, 900
- **Headings**: weight 800–900, letter-spacing: -0.03em, line-height: 0.9
- **Body/paragraphs**: weight 400–500, line-height: 1.35
- **All headings should feel massive** — use clamp() for fluid sizing, min ~2.5rem, max ~5rem+ for hero

### Colors
- Background: #08080a (near-black)
- Elevated surfaces: #111114
- Text primary: #f0ece4 (warm white)
- Text dim: #8a8680
- Orange (primary accent / CTAs): #FF6B2C
- Orange glow: #FF6B2C88
- Purple (secondary): #8B5CF6
- Grid lines: rgba(255, 255, 255, 0.04)

### Buttons (all CTAs)
- Background: #FF6B2C, color: white, font-weight: 700, border-radius: 60px
- Glowing box-shadow: 0 0 30px #FF6B2C88, 0 0 80px rgba(255,107,44,0.2)
- Hover: scale(1.03), translateY(-2px), increased glow
- All "Apply Now" and "Join Now" buttons open the same popup modal

### Modal Popup
- Overlay: rgba(0,0,0,0.75) + backdrop-filter: blur(8px)
- Box: #111114 bg, 1px border rgba(255,255,255,0.08), border-radius: 20px
- Fields: name (text) + email (email) — dark input fields with orange focus border
- Submit button: same orange glowing CTA style
- Close: × button top-right
- Form submits to nothing yet (just console.log the values + show a confirmation)

---

## SECTION 1 — HERO

### Visual Effects (hero only)
1. **Faint grid background**: draw on a `<canvas>` overlaying the hero. Grid size ~60px, line color rgba(255,255,255,0.035)
2. **Cursor-reactive ambient lights**: two large blurred divs (one orange, one purple, ~500-600px, filter: blur(120px), opacity ~0.5). They follow the cursor with different easing/lag (orange faster, purple slower). Use requestAnimationFrame, NOT CSS transitions.
3. **Grid distortion**: near the cursor position, grid lines push outward (displacement effect). Radius ~180px, strength ~22px. Recalculate on each frame using distance from cursor to each grid intersection.
4. **Vignette**: radial-gradient overlay fading edges to bg color
5. All effects are ONLY in the hero section. The rest of the page has a flat dark background.

### Content
```
Wordmark (small, uppercase, tracked-out, dim):
CONTENT-TO-CASHFLOW™ COURSE

Headline (massive):
Content-to-Cashflow™ Course (Free to Join) is the fastest way to 2x your revenue.
— "Content-to-Cashflow™ Course" portion in orange gradient text

Badge:
🚀 First 3 Weeks FREE
— small pill/badge, purple tinted bg + purple border

Subheadline:
Start an agency or coaching business and get your first client in 60 days.

CTA:
[Apply Now] → opens modal
```

### Entrance animations
Staggered fade-up (opacity 0→1, translateY 24px→0) with increasing delays: wordmark 0.2s, headline 0.4s, badge 0.5s, sub 0.6s, CTA 0.8s

---

## SECTION 2 — VSL

### Layout
- Tagline text above
- Video embed (placeholder for now)
- [Apply Now] button below video

### Scroll-responsive video sizing
The video wrapper starts at **70vw** width. As the user scrolls and the video approaches the center of the viewport, it smoothly expands to **90vw max**. As the video scrolls past center and exits the viewport, it shrinks back to 70vw. Use a scroll event listener with requestAnimationFrame. Calculate based on how close the video center is to the viewport center.

### Video placeholder
16:9 aspect ratio container. Replace later with `<iframe>`.

### Content
```
Tagline:
Give me two minutes and I guarantee this will change your business forever. (write this tagline in the same formatting as the subheading but use #ffffff for text colour 100% opacity)

[VSL PLACEHOLDER]
[Apply Now] ← below video
```

---

## SECTION 3 — PAIN

Plain text section, centered, max-width ~750px. No special effects.

### Content (use verbatim)
```
You post. People watch like crazy fans. "Amazing content brother." "Never stop making these videos." Yet your bank account still looks pretty miserable.

And honestly, after fixing 200+ funnels, I can promise you it's almost never your content. Your system that's (ahem) supposed to catch the attention and turn it into money is completely broken.

And you're just one click away from doubling your revenue without changing a single post.
```

Style the first paragraph larger (1.25–1.5rem). Use dim text color for body. "200+ funnels" and "completely broken" can be white/highlighted for emphasis.

---

## SECTION 4 — WHAT'S INSIDE (Modules + Mascot)

This is the showcase section. Two key features:

### A) Spline Embed
Section 4 mascot: Spline embed. 
URL: https://my.spline.design/untitled-TTGHjSlfsksWMskvo62XilD0/ 
Embed: <iframe src='https://my.spline.design/untitled-TTGHjSlfsksWMskvo62XilD0/' frameborder='0' width='100%' height='100%'></iframe>
The Spline scene handles cursor tracking. Just embed it centered among the module cards.

### B) Module Cards — Liquid Glass Style
6 cards arranged around the mascot (3 on each side, or a 2×3 / 3×2 grid with mascot in the center).

**Liquid glass effect for each card:**
- background: rgba(255, 255, 255, 0.03)
- backdrop-filter: blur(16px)
- border: 1px solid rgba(255, 255, 255, 0.08)
- border-radius: 20px
- Subtle inner light/shine: a pseudo-element gradient at the top edge (white 5% opacity → transparent)
- On hover: border brightens slightly, subtle scale(1.02), background goes to rgba(255,255,255,0.05)

### Section Header
```
WHAT'S INSIDE

Six modules. Every single thing you need to turn your content into a system that prints clients.
```

### Module Cards Content
```
Card 1 — The Offer Engineer
An offer people line up to pay for, then we build the ascension ladder to scale LTV above it.

Card 2 — The Inbound Engine (the big one)
Lead magnets, landing pages, VSLs, full funnels, nurture sequences, and the Skool/Whop community that warms cold leads with social proof on autopilot. The whole machine that pulls attention off-platform and turns it into booked calls.

Card 3 — The Bot Army
Manychat flows, automated DMs, and the army of little robots that run your front-end while you sleep.

Card 4 — The Detective Trackers
GA4, Meta Pixel, and the full tracking stack so you know exactly where every dollar is coming from and what to double down on.

Card 5 — The AI Machine ⭐ (Limited Edition)
The huge one. How to wire AI into every part of your business so the whole thing builds, runs, and scales itself. Most of this stack doesn't exist anywhere else yet.

Card 6 — The Closing Room
Your booking flow and call structure to convert without being weird about it.
```

Each card should have a number indicator (01, 02, etc.) in orange, the title in bold white, and description in dim text.

---

## SECTION 5 — URGENCY

Short, punchy, centered.

```
The founding cohort gets in free. Everyone else pays $497. Waitlist closes when we launch.
```

"$497" in orange. "free" in orange. Consider making this a standout banner — maybe a subtle border top/bottom or a slightly elevated bg strip.

---

## SECTION 6 — WHO THIS IS FOR

Two columns (or stacked on mobile): "This is for you if" and "This is not for you if"

### Content
```
THIS IS FOR YOU IF:
• You're already putting out content and getting views
• You have an offer, or know what you want to sell, and you want a system to actually sell it
• You're willing to put in the work
• You're going to actually use this, not collect another free thing and let it rot in your downloads folder

THIS IS NOT FOR YOU IF:
• You're looking to get rich quick without any effort
• You're not making content and don't plan to (help... why are you even here)
• You're looking for a passive-income shortcut
```

"For you" column: green checkmarks or orange accent. "Not for you" column: red ✕ marks or dimmed styling.

---

## SECTION 7 — FINAL CTA

Full-width centered section with inline form (not modal this time — the form fields are directly on the page).

```
Get in before the waitlist closes.

[Name field] [Email field] [Apply Now]
```

The inline form should be a horizontal row on desktop (fields + button side by side), stacked on mobile. Same field styling as modal. Same orange glowing CTA button.

---

## BUILD ORDER

Build these one at a time. After each, stop and let me review:

1. Hero (canvas grid + cursor lights + distortion + content + modal)
2. VSL (scroll-responsive sizing + placeholder)
3. Pain
4. What's Inside (liquid glass cards + GSAP mascot eye-tracking)
5. Urgency
6. Who This Is For
7. Final CTA + footer

---

## TECHNICAL NOTES

- Single `index.html` file with embedded `<style>` and `<script>`
- GSAP loaded from CDN (only needed for Section 4)
- All images in `./assets/` folder
- Mobile responsive (test at 375px, 768px, 1440px)
- Smooth scroll behavior
- No framework, no build tool, no npm
- All "Apply Now" buttons open the same modal popup (except Section 7 which has inline form)
