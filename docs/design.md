---
version: alpha
name: GDP Tracker Design System
description: Dark editorial-industrial design system for the GDP Project Tracker ops board, extracted from the graysondp.com (GDP2027) site build — ink canvas, bone type, heat accent, hairline borders.

colors:
  # canvas — the ink ramp
  surface: "#333333"                 # ink — page canvas
  surface-2: "#3D3D3D"               # ink-2 — panels, board columns, modals
  surface-3: "#474747"               # ink-3 — cards, inputs on panels
  surface-hover: "#525252"           # ink-4 — hover lift (derived ramp grade)
  # hairlines
  hairline: "rgba(242,240,236,0.14)"
  hairline-subtle: "rgba(242,240,236,0.07)"
  hairline-strong: "rgba(242,240,236,0.26)"
  # type on ink — the bone ramp
  on-surface: "#F2F0EC"              # bone — primary text (11.1:1)
  on-surface-dim: "#A9A6A1"          # bone-2 — secondary text (5.2:1)
  on-surface-faint: "#6E6C69"        # bone-3 — DECORATIVE ONLY (2.4:1, fails text AA)
  # brand
  primary: "#E86E34"                 # heat — indicators, focus, large display (4.1:1 non-text)
  primary-deep: "#C4551F"            # heat-2 — hover fills, large elements
  primary-bright: "#F49B6E"          # heat-hi — derived: heat lifted for small text (5.9:1)
  ember: "#B24A19"                   # CTA fills, filled alert chips (bone text 4.8:1)
  ember-deep: "#8A340D"
  rust: "#7A2E0A"                    # deepest CTA hover (bone text 8.3:1)
  neutral: "#939598"                 # sun — brand gray (4.2:1 non-text)
  sky: "#D0E1E9"                     # settled / on-track / paid-cool (9.4:1)
  paper: "#F7F6F4"                   # terminal / filed (ink text 11.7:1)
  amber: "#F0A03C"                   # review / at-risk (GDP2027 amber env accent; 5.9:1)
  on-primary: "#F2F0EC"              # bone text on ember/rust fills
  # pipeline status — dot/edge = base color; text = AA variant
  status-lead: "#939598"             # sun dot (4.2:1 UI)
  status-lead-text: "#A9A6A1"        # bone-2 (5.2:1)
  status-progress: "#E86E34"         # heat dot (4.1:1 UI)
  status-progress-text: "#F49B6E"    # heat-hi (5.9:1)
  status-review: "#F0A03C"           # amber (5.9:1)
  status-review-text: "#F0A03C"
  status-complete: "#D0E1E9"         # sky (9.4:1)
  status-complete-text: "#D0E1E9"
  status-billed: "#F7F6F4"           # paper — FILLED chip
  status-billed-text: "#333333"      # ink on paper (11.7:1)
  # job health
  health-on-track: "#D0E1E9"
  health-at-risk: "#F0A03C"
  health-waiting: "#B24A19"          # ember — FILLED chip with bone text (4.8:1)
  health-waiting-text: "#F2F0EC"
  health-ready-to-bill: "#F7F6F4"
  # invoice states
  invoice-draft: "#A9A6A1"
  invoice-sent: "#F49B6E"
  invoice-paid: "#F7F6F4"            # paper — FILLED chip, ink text
  invoice-overdue: "#B24A19"         # ember — FILLED chip, bone text
  invoice-overdue-text: "#F2F0EC"
  # semantic aliases
  success: "#D0E1E9"
  warning: "#F0A03C"
  error: "#B24A19"
  info: "#939598"
  # owners
  owner-jon: "#E86E34"
  owner-jon-text: "#F49B6E"
  owner-joy: "#D0E1E9"
  owner-joy-text: "#D0E1E9"
  # translucent status fills (chip/badge backgrounds on ink)
  fill-lead: "rgba(147,149,152,0.14)"
  fill-progress: "rgba(232,110,52,0.14)"
  fill-review: "rgba(240,160,60,0.14)"
  fill-complete: "rgba(208,225,233,0.12)"
  # backdrop
  backdrop: "rgba(51,51,51,0.92)"

typography:
  display-xl:
    fontFamily: Nunito
    fontSize: clamp(2.1rem, 4.6vw, 4.6rem)
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: -0.04em
  display:
    fontFamily: Nunito
    fontSize: 1.6rem
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: -0.03em
  heading:
    fontFamily: Nunito
    fontSize: 1.15rem
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.02em
  body:
    fontFamily: Nunito
    fontSize: 0.9rem
    fontWeight: 400
    lineHeight: 1.55
  body-strong:
    fontFamily: Nunito
    fontSize: 0.9rem
    fontWeight: 600
    lineHeight: 1.45
  label:
    fontFamily: Nunito
    fontSize: 0.68rem
    fontWeight: 800
    lineHeight: 1
    letterSpacing: 0.12em
  caption:
    fontFamily: Nunito
    fontSize: 0.78rem
    fontWeight: 500
    lineHeight: 1.4
  numeric:
    fontFamily: Nunito
    fontSize: 0.95rem
    fontWeight: 700
    lineHeight: 1.2
    fontFeature: "tnum"

rounded:
  sharp: 2px        # inputs, focus rings, timeline bars, table rules
  sm: 3px           # buttons
  md: 4px           # cards, board columns, panels — the workhorse
  lg: 6px           # modals, large raised surfaces
  xl: 8px           # oversized media-style surfaces
  pill: 999px       # chips, badges, filter pills, avatars — ONLY these

spacing:
  micro: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: "clamp(16px, 3vw, 32px)"
  column-min: 240px
  container-max: 1680px

components:
  board-column:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.on-surface-dim}"
    rounded: "{rounded.md}"
    padding: 8px
  board-column-header:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 8px
  swimlane-header:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 10px
  job-card:
    backgroundColor: "{colors.surface-3}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 12px
  job-card-hover:
    backgroundColor: "{colors.surface-hover}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 12px
  status-badge-lead:
    backgroundColor: "{colors.fill-lead}"
    textColor: "{colors.status-lead-text}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: 3px 10px
  status-badge-in-progress:
    backgroundColor: "{colors.fill-progress}"
    textColor: "{colors.status-progress-text}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: 3px 10px
  status-badge-review:
    backgroundColor: "{colors.fill-review}"
    textColor: "{colors.status-review-text}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: 3px 10px
  status-badge-complete:
    backgroundColor: "{colors.fill-complete}"
    textColor: "{colors.status-complete-text}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: 3px 10px
  status-badge-billed:
    backgroundColor: "{colors.status-billed}"
    textColor: "{colors.status-billed-text}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: 3px 10px
  health-badge-on-track:
    backgroundColor: "{colors.fill-complete}"
    textColor: "{colors.health-on-track}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: 3px 10px
  health-badge-at-risk:
    backgroundColor: "{colors.fill-review}"
    textColor: "{colors.health-at-risk}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: 3px 10px
  health-badge-waiting:
    backgroundColor: "{colors.health-waiting}"
    textColor: "{colors.health-waiting-text}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: 3px 10px
  health-badge-ready-to-bill:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.health-ready-to-bill}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: 3px 10px
  button-primary:
    backgroundColor: "{colors.ember}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: 10px 18px
  button-primary-hover:
    backgroundColor: "{colors.rust}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: 10px 18px
  button-secondary:
    backgroundColor: "{colors.surface-3}"
    textColor: "{colors.on-surface-dim}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: 9px 16px
  button-ghost:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-dim}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: 6px 10px
  input:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body}"
    rounded: "{rounded.sharp}"
    padding: 9px 12px
  input-focus:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body}"
    rounded: "{rounded.sharp}"
    padding: 9px 12px
  nav-tab:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-dim}"
    typography: "{typography.label}"
    rounded: "{rounded.sharp}"
    padding: 12px 18px
  nav-tab-active:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label}"
    rounded: "{rounded.sharp}"
    padding: 12px 18px
  kpi-card:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 14px 20px
  filter-chip:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.on-surface-dim}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: 5px 12px
  filter-chip-active:
    backgroundColor: "{colors.fill-progress}"
    textColor: "{colors.status-progress-text}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: 5px 12px
  avatar-jon:
    backgroundColor: "{colors.fill-progress}"
    textColor: "{colors.owner-jon-text}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    size: 22px
  avatar-joy:
    backgroundColor: "{colors.fill-complete}"
    textColor: "{colors.owner-joy-text}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    size: 22px
  modal:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: 24px
  modal-backdrop:
    backgroundColor: "{colors.backdrop}"
  drawer:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sharp}"
    padding: 24px
  table-header:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-dim}"
    typography: "{typography.label}"
    padding: 8px 12px
  table-row:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-dim}"
    typography: "{typography.body}"
    padding: 9px 12px
  fab:
    backgroundColor: "{colors.ember}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.pill}"
    size: 52px
  sync-queue-bar:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.amber}"
    typography: "{typography.numeric}"
    rounded: "{rounded.xl}"
    padding: 8px 20px
  empty-state:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-dim}"
    typography: "{typography.caption}"
    padding: 48px 16px

# GDP Tracker Design System

## Overview

This is the design system for the **GDP Project Tracker** — the internal operations board for Grayson Design Partners, a two-person studio (Jon + Joy) that lives in this tool daily from both phone and desktop. Every token is extracted from the live graysondp.com (GDP2027) build: a near-black **ink** canvas, **bone** type, the orange **heat** accent, and hairline borders that do the structural work shadows do elsewhere. The character is editorial and industrial — like the studio's reports and brand work — not a playful SaaS dashboard. The board is the product: dense, calm, scannable at a glance on a phone, precise on a big screen. Two anti-patterns govern everything: no generic bootstrap-blue, and no rounded-bubble UI — this tool should look like it was designed by the same hand that designed the studio's own site, because it was.

## Colors

The palette is the GDP2027 palette, verbatim: a three-step **ink ramp** (`#333333` / `#3D3D3D` / `#474747`, plus a derived hover grade `#525252`) for canvas, panels, and cards; a three-step **bone ramp** (`#F2F0EC` / `#A9A6A1` / `#6E6C69`) for primary, secondary, and decorative text; and the brand set — **heat** `#E86E34` with its deep end (`#C4551F`, **ember** `#B24A19`, `#8A340D`, **rust** `#7A2E0A`), **sun** `#939598`, **sky** `#D0E1E9`, **paper** `#F7F6F4`, and **amber** `#F0A03C` (lifted from the GDP2027 amber environment). Heat is the only accent — it means "interactive" and "active" everywhere in the product. The accent works as a three-grade system: **heat** for indicators, dots, focus rings, and large display type (4.1:1 on ink — passes the 3:1 non-text threshold, never small text); **heat-hi** `#F49B6E`, a derived grade of heat lifted for small text (5.9:1, AA); and **ember** for filled CTAs and alert chips (bone text on ember is 4.8:1, AA). The pipeline statuses read as a temperature arc: Lead is neutral sun-gray, work **heats up** through In Progress and Review, **cools** to sky when Complete, and settles to **paper** when Billed — filed away, ink on paper. Status text pairs a colored dot (carries the hue, 3:1+ as a UI component) with an AA-safe text variant. WCAG AA ratios on the ink canvas: bone 11.1:1, bone-2 5.2:1, heat-hi 5.9:1, amber 5.9:1, sky 9.4:1, ink-on-paper 11.7:1 — every meaningful text token passes 4.5:1. **bone-3 is decorative only** (2.4:1); the marketing site can afford a whisper, a daily ops tool cannot.

## Typography

One family: **Nunito**, with 'Helvetica Neue' as the fallback — exactly the GDP2027 type system, where display, text, and label roles are all the same family distinguished by weight, size, and tracking (the tracker drops the old JetBrains Mono entirely; the site's "mono" is really Nunito 700 uppercase with tracking, and that is the tracker's label role too). Display roles (800 weight, tight −0.03em to −0.04em tracking) are reserved for the board's few big moments — modal titles and swimlane names. The **label** role is the system's signature: 800 weight, 0.68rem, uppercase, +0.12em tracking, in bone-2 — used for column names, KPI names, form labels, badges, and buttons, exactly as the site uses it for tags and chrome. Body is 0.9rem Nunito 400; card titles add 600 weight. Numbers — job #s, hours, money — use the **numeric** role: 700 weight with tabular figures (`tnum`) so columns of figures align. The full GDP2027 fluid marketing scale (`clamp()` from 0.78rem to 13.2rem) remains the brand reference for large-format surfaces; a dense ops tool sits at the small, fixed end of that scale, which is why the applied tokens here are px/rem-stable for predictable phone rendering.

## Layout

Density is the point — this is a working board, not a landing page. The spacing ramp is 4 / 8 / 16 / 24 / 40 / 64px with a fluid gutter of `clamp(16px, 3vw, 32px)`; the marketing site's larger steps (96–200px) are deliberately not used. The app caps at a 1680px container so a wide board stays composed instead of stretching. The board itself is a five-column grid (`Lead → In Progress → Review → Complete → Billed`), each column a minimum of 240px; **mobile-first means the columns scroll horizontally as a unit** with the gutter scrolling along — a phone shows one-and-a-half columns and sways left, never a vertically stacked pretend-board. Swimlanes repeat the five-column grid once per client under a sticky-feeling client header; the flat "All Clients" view collapses to a single band. Cards sit inside columns with 8px rhythm; job rows in the Projects tab run on the same 8px rhythm inside client sections. Filter and toolbars wrap, never crowd — on a phone the toolbar scrolls or wraps and inputs jump to 16px so iOS doesn't zoom on focus.

## Elevation & Depth

Structure comes from **hairlines, not shadows** — the GDP2027 strategy. `hairline` (14% bone) separates cards, columns, rows, and form controls; `hairline-subtle` (7%) for internal dividers; `hairline-strong` (26%) for hover emphasis. Depth is primarily the ink ramp: canvas → panel (`#3D3D3D`) → card (`#474747`), three flat steps that read as layers without a single shadow. Shadows are reserved for things that genuinely float above the board — the modal, the detail drawer, the move menu, the FAB — which also get the ink-wash backdrop (`rgba(51,51,51,0.92)` + backdrop blur) exactly as the site's contact modal does. Cards never cast shadows; hover lifts them 2px with a heat hairline instead, the same move the site's own cards make.

## Shapes

Sharp and industrial: **2–4px is the working radius** for inputs, buttons, cards, columns, and panels — the board should feel machined, not cushioned. Modals and large raised surfaces go to 6px, oversized frames 8px. The **pill (999px) is earned, not default**: status badges, health chips, filter pills, avatars, and tags take the pill — the exact components that are pills on graysondp.com — while everything structural stays near-square. Filled chips are meaningful: **Billed** fills with paper (ink text), **Waiting** and **Overdue** fill with ember (bone text) — filled means settled or blocked, outline means in flight. Everything else is outline + tinted fill at 12–14% alpha.

## Components

**Board columns** are `#3D3D3D` panels with a hairline edge, a header of status dot + label-role title + count + column-add button, and an 8px card stack that drops into a dashed sun-mark placeholder when empty. **Job cards** are `#474747`, 4px radius, 12px padding: job # in the label role, 600-weight title (two-line clamp), dim client line, then a footer of owner avatar, health dot, and due chip; hover heats the border; the move control (⇄) opens a five-status popover that writes through the action queue. **Status badges** follow the dot + AA-text pattern as pills in the label role. **Buttons**: primary fills ember with bone label-role text (hover deepens to rust), secondary is an ink-3 hairline chip, ghost is bare. **Inputs** are ink-2, 2px radius, hairline edge, heat focus ring. **Nav tabs** are quiet bone-2 labels that go bone with a 2px heat underline when active. **Modals** are ink-2, 6px, floating on the blurred ink wash. **Avatars** are pills: Jon in heat, Joy in sky. All components take their values from the token layer only — the point of the system is that nothing downstream hardcodes a color.

## Do's and Don'ts

**Do:**
- Set every color, radius, and spacing from the tokens in this file — the token layer is the only place hex values live.
- Use hairlines for structure; reserve shadows (and the blurred ink backdrop) for floating layers only.
- Keep meaningful small text AA on ink: bone or bone-2; when text must read as heat-colored, use heat-hi (5.9:1), never heat.
- Use the label role (800, uppercase, +0.12em) for column names, KPI names, badges, and buttons — it is the system's voice of authority.
- Follow the temperature arc when adding states: work heats up, delivery cools, money settles to paper.
- Make filled chips mean something: filled = settled or blocked (Billed, Waiting, Overdue); outline = in flight.

**Don't:**
- Never introduce a color outside this palette — especially no bootstrap-blue, no green "success," no purple.
- No rounded-bubble UI: cards, panels, and columns stay 2–8px; the pill is only for chips, badges, and avatars.
- No grey-dashboard chaos: one accent family (heat), one neutral ramp (ink/bone), hairline structure — depth by ramp, not by noise.
- Never use bone-3 for meaningful text (2.4:1) or heat/ember as small text on ink — the derived AA grades exist for exactly this.
- No drop shadows on inline cards, columns, or rows; borders carry the structure.
- Don't drift from the documented status mapping when adding new states — extend the arc, don't break it.