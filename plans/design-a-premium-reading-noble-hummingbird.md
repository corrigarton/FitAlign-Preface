# Plan: FitAlign Premium Reading Experience

## Context

The user wants an immersive, premium reading experience web app for a wellness book about breath, posture, and healing. The goal is an Apple product page / luxury digital magazine feel — not an ebook or LMS. The content comes from `src/imports/Lesson_1_csv.csv`, which has 4 original sections (columns) × 9 beats (rows). We'll reorganize into 8 narrative sections for better pacing and reader digestion.

---

## Aesthetic Commitment

**Stance: Archival Editorial, Dark Ground**
Going against the obvious wellness-brand choice (light/airy/off-white). A deep, warm-dark ground makes the content feel more intimate and cinematic — closer to a premium magazine read at night or a museum catalog. This is the less-common, more distinctive choice.

**Fonts (Google Fonts):**
- Display headings: `DM Serif Display` — classical weight, editorial authority
- Body/reading text: `Lora` — screen-optimized serif, inviting for slow reading
- UI labels/navigation: `DM Sans` — clean modern companion, same family as display

**Color tokens (dark ground):**
```
--background: #0e0d0c        (near-black warm)
--foreground: #f0ebe2        (warm cream)
--card: #191816              (lifted surface)
--primary: #c8a97e           (warm bronze — used sparingly)
--muted: #1e1c1a
--muted-foreground: #8a8070
--border: rgba(240,235,226,0.08)  (hairline)
--radius: 2px                (sharp, editorial)
```

---

## Content Reorganization: 4 → 8 Sections

| # | Section Title | Source | Layout Personality |
|---|---|---|---|
| 1 | **Cover** | — | Full-screen centered, breath animation |
| 2 | **A Dream** | S1:B1–2 | Left-aligned quote + large numeral accent |
| 3 | **Do Less** | S1:B3–5 | One phrase massive, rest flows below |
| 4 | **The Miracle of Being Alive** | S2:B1–3 | Two-column staggered entry |
| 5 | **Extraordinary** | S2:B4–7 | Timeline-esque, staggered reveal |
| 6 | **Beyond the Mirror** | S3:B1–3 | Heavy image overlay, text emerges from dark |
| 7 | **A New Medicine** | S3:B4–9 | Questions as large typographic prompts |
| 8 | **The Journey** | S4:B1–8 | Intimate small scale; ends with personal humanizing note |

---

## Scroll Mechanics: Sticky Background

Each section uses the CSS sticky technique:

```jsx
<section className="relative">
  {/* Background sticks to viewport while content scrolls over it */}
  <div className="sticky top-0 h-screen -mb-[100vh] overflow-hidden">
    <img ... />  {/* or gradient */}
    <div className="absolute inset-0 bg-black/50" />  {/* overlay */}
    <SectionIntro />  {/* chapter label, fades out */}
  </div>

  {/* Content scrolls over the fixed background */}
  <div className="relative z-10">
    {beats.map(beat => <BeatCard ... />)}
  </div>
</section>
```

Each beat card has `min-height: 100vh` with generous padding so content breathes and doesn't rush. Text appears via `motion` `whileInView` with subtle fade-up.

---

## Progress Indicator

Fixed to top of screen — a hairline bar (`h-[2px]`) that fills from left to right as the user scrolls. Above it, 8 tiny dots (one per section) that glow gold when that section is active. Section title label appears near the active dot. Uses `useScrollProgress` via a `useEffect` + `scrollY` listener.

---

## Section Backgrounds (Unsplash)

| Section | Image URL |
|---|---|
| Cover | Pure dark gradient, no image |
| A Dream | `photo-1506126613408` (meditation) |
| Do Less | `photo-1448375240586` (forest light rays) |
| Miracle | `photo-1600618528240` (woman on dock) |
| Extraordinary | `photo-1545389336` (woman in forest) |
| Mirror | `photo-1518708909080` (body/chest, heavy overlay) |
| New Medicine | `photo-1724001637941` (dark ocean) |
| Journey | `photo-1602594748821` (silhouette at sunset) |

---

## Key Delight Moments

1. **Cover**: Slow-pulsing breath circle animation (CSS keyframes, ~4s ease-in-out inhale/exhale cycle)
2. **"Do Less"**: One phrase ("Do less.") renders at ~18vw, rest of text at normal reading size — jarring scale shift surprises the reader
3. **"Extraordinary"**: Transformation stories appear as staggered cards with a thin gold left-border accent line — feels like evidence in a case study
4. **"A New Medicine"**: Each question renders alone on the screen, large italic serif, one at a time as you scroll — meditative, contemplative pacing
5. **"The Journey"**: Typography scale drops to intimate (almost letter-size), creating a tonal shift. The final beat about wing foiling at 70 gets a lighthearted small-caps treatment
6. **Section transitions**: Each section's background has a unique gradient overlay (cool → warm → deep blue → amber glow → etc.) so the visual temperature of the experience shifts across the lesson

---

## Files to Modify

| File | Changes |
|---|---|
| `src/app/App.tsx` | Complete rewrite — all sections, progress bar, scroll logic, motion |
| `src/styles/fonts.css` | Add Google Fonts imports for DM Serif Display, Lora, DM Sans |
| `src/styles/theme.css` | Update `:root` tokens to dark palette; preserve `.dark` block and `@theme inline` |

No new files needed. All logic lives in `App.tsx` using React state and native scroll events.

---

## Implementation Notes

- Use `motion/react` for `whileInView` text entrance animations (fade + translateY)
- Use native `scroll` event listener (not framer scroll hooks) for progress bar
- `IntersectionObserver` to track active section for dot indicator
- All section data defined as a typed array at the top of `App.tsx` for easy editing
- Mobile-first: content max-width `prose-lg` (~65ch), generous vertical padding; on desktop, some sections get two-column layout
- Hide scrollbar via `scrollbar-none` Tailwind class on root
- Font size on body: 18px base (bumped from 16px) to encourage slow reading

---

## Verification

1. Scroll from top to bottom — confirm sticky background effect works throughout
2. Check progress bar updates smoothly; dots highlight correct section
3. Verify `whileInView` animations trigger on all beats across all sections
4. Test on narrow viewport (375px) — confirm single-column, readable, no overflow
5. Check contrast: cream text on dark overlaid backgrounds — all body text should pass AA
