---
name: "TimeKeep"
description: "A quiet measuring instrument for focused work."
colors:
  canvas: "#f6f6f6"
  surface: "#fff"
  surface-soft: "#f5f5f5"
  ink: "#262626"
  muted: "#666666"
  line: "#e8e8e8"
  tick: "#d4d4d4"
  accent: "#303030"
  accent-hover: "#141414"
  accent-soft: "#ededed"
  accent-ink: "#303030"
  on-accent: "#fff"
  matcha-canvas: "#f4f7f3"
  matcha-surface-soft: "#f2f6f0"
  matcha-line: "#e0e8dc"
  matcha-tick: "#c4d2be"
  matcha-accent: "#42663a"
  matcha-accent-hover: "#34532d"
  matcha-accent-soft: "#e7efdf"
  matcha-accent-ink: "#3a5933"
  berry-canvas: "#faf5f6"
  berry-surface-soft: "#faf2f4"
  berry-line: "#efdee3"
  berry-tick: "#dec1c9"
  berry-accent: "#974559"
  berry-accent-hover: "#7b3446"
  berry-accent-soft: "#f5e6eb"
  berry-accent-ink: "#883e51"
  ocean-canvas: "#f2f7f7"
  ocean-surface-soft: "#edf6f5"
  ocean-line: "#dbe8e6"
  ocean-tick: "#b8cfca"
  ocean-accent: "#2d7068"
  ocean-accent-hover: "#235b54"
  ocean-accent-soft: "#e1efeb"
  ocean-accent-ink: "#28645e"
  sunset-canvas: "#fbf5f1"
  sunset-surface-soft: "#fbf2ec"
  sunset-line: "#efe1d8"
  sunset-tick: "#ddc8b9"
  sunset-accent: "#a2502c"
  sunset-accent-hover: "#843e22"
  sunset-accent-soft: "#f8e8dd"
  sunset-accent-ink: "#8b4326"
  lavender-canvas: "#f6f4fa"
  lavender-surface-soft: "#f5f1fa"
  lavender-line: "#e6dfee"
  lavender-tick: "#cfc1df"
  lavender-accent: "#745295"
  lavender-accent-hover: "#5f407e"
  lavender-accent-soft: "#eee6f6"
  lavender-accent-ink: "#654482"
  neutral-swatch: "#d5d5d5"
  matcha-swatch: "#a9c59b"
  berry-swatch: "#dfafbb"
  ocean-swatch: "#9bc6c0"
  sunset-swatch: "#e5b499"
  lavender-swatch: "#c5afd9"
  neutral-active-swatch: "#dfdfdf"
  swatch-border: "rgb(0 0 0 / 7%)"
typography:
  display:
    fontFamily: "\"IBM Plex Mono\", monospace"
    fontSize: "68px"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.04em"
  countdown:
    fontFamily: "\"IBM Plex Mono\", monospace"
    fontSize: "64px"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "-0.04em"
  duration:
    fontFamily: "\"IBM Plex Mono\", monospace"
    fontSize: "40px"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.04em"
  hundredths:
    fontFamily: "\"IBM Plex Mono\", monospace"
    fontSize: "23px"
    fontWeight: 400
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Manrope, \"Segoe UI\", sans-serif"
    fontSize: "32px"
    fontWeight: 650
    lineHeight: 1.35
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Manrope, \"Segoe UI\", sans-serif"
    fontSize: "14px"
    fontWeight: 650
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Manrope, \"Segoe UI\", sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Manrope, \"Segoe UI\", sans-serif"
    fontSize: "12px"
    fontWeight: 400
  action:
    fontFamily: "Manrope, \"Segoe UI\", sans-serif"
    fontSize: "12px"
    fontWeight: 650
  brand:
    fontFamily: "Manrope, \"Segoe UI\", sans-serif"
    fontSize: "21px"
    fontWeight: 750
    letterSpacing: "-0.04em"
rounded:
  key: "4px"
  field: "4px 4px 0 0"
  badge: "6px"
  tab: "7px"
  skip-link: "8px"
  control: "9px"
  tabs: "10px"
  brand: "11px"
  popover: "14px"
  panel: "16px"
  circle: "50%"
spacing:
  tab-shell: "5px"
  tab-gap: "6px"
  control-gap: "12px"
  workspace-gap: "22px"
  button-padding: "14px 20px"
  clock-view-padding: "26px 30px 24px"
  context-padding: "28px 24px 0"
  popover-padding: "22px"
  preset-padding: "17px 18px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    typography: "{typography.action}"
    rounded: "{rounded.control}"
    padding: "{spacing.button-padding}"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
  button-secondary:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.action}"
    rounded: "{rounded.control}"
    padding: "{spacing.button-padding}"
  button-secondary-hover:
    backgroundColor: "{colors.accent-soft}"
  duration-input:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.duration}"
    rounded: "{rounded.field}"
    padding: "0 2px 5px"
    height: "57px"
    width: "65px"
  mode-tabs:
    backgroundColor: "{colors.surface-soft}"
    rounded: "{rounded.tabs}"
    padding: "{spacing.tab-shell}"
  mode-tab:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    typography: "{typography.action}"
    rounded: "{rounded.tab}"
    padding: "10px 20px"
  mode-tab-selected:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
  state-badge:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.muted}"
    typography: "{typography.label}"
    rounded: "{rounded.badge}"
    padding: "5px 9px"
  state-badge-active:
    backgroundColor: "{colors.accent-soft}"
    textColor: "{colors.accent-ink}"
  context-panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "{spacing.context-padding}"
  preset:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "{spacing.preset-padding}"
  preset-selected:
    backgroundColor: "{colors.accent-soft}"
    textColor: "{colors.accent-ink}"
  theme-option:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.tab}"
    padding: "9px"
  timing-dial:
    textColor: "{colors.ink}"
    width: "min(360px, 100%)"
  lap-table:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    width: "100%"
---

# Design System: TimeKeep

## Overview

**Creative North Star: "A quiet measuring instrument"**

A quiet measuring instrument for focused work. TimeKeep uses a modern, soft workspace: white panels, gray surroundings, charcoal actions, clear timing numerals, and generous breathing room.

The dial holds the visual emphasis. Supporting controls and context remain compact and readable. Color is a deliberate user preference: the entire initial experience stays neutral until an explicit theme selection.

**Key Characteristics:**

- Neutral first, including appearance chooser swatches.
- Manrope interface text and IBM Plex Mono timing data.
- Soft panel corners, restrained shadows, and thin line icons.
- One timing surface with compact supporting context.

## Colors

The default palette is white, gray, and charcoal. Frontmatter records the exact source values; theme-prefixed entries are opt-in overrides.

### Primary

- **Charcoal** (`accent`): primary actions, focus outlines, stopwatch hand, and countdown progress. `accent-hover` deepens button hover; `on-accent` supplies white button text.
- **Soft active state** (`accent-soft` / `accent-ink`): running/completion badges, selected presets, and the newest lap.

### Neutral

- `canvas`, `surface`, and `surface-soft` distinguish the page, white panels, and recessed controls.
- `ink` and `muted` separate primary text from captions and instructions. `line` and `tick` support quiet dividers and dial marks.
- While Neutral is active, **all** chooser swatches use `neutral-active-swatch`, overriding each theme's preview color.

### Opt-in themes

Matcha (soft green), Berry (muted rose), Ocean (quiet teal), Sunset (warm peach), and Lavender (gentle violet) each override canvas, soft surface, divider, ticks, accent, hover, soft accent, and accent ink. White panels and the core text palette remain shared. Theme swatches become colored only after a color theme is selected.

**The Explicit Color Rule.** Keep every initial surface, state, icon, and chooser swatch grayscale. Apply color only after an explicit selection of Matcha, Berry, Ocean, Sunset, or Lavender. A saved explicit selection may be restored; an invalid or absent preference falls back to Neutral.

## Typography

**Interface:** locally hosted Manrope, with Segoe UI and sans-serif fallbacks.
**Timing:** locally hosted IBM Plex Mono Regular, with monospace fallback.

Manrope gives the interface a soft, precise character; the monospaced readings provide stable timing alignment. Most supporting text is 12px, with weight and spacing carrying hierarchy.

- **Timing display:** stopwatch 68px / 1.2; countdown 64px / 1.3. Both use 400 weight and -0.04em tracking.
- **Hundredths:** 23px, muted, -0.03em tracking; visually secondary to minutes and seconds.
- **Duration fields:** 40px / 1.2, 400 weight.
- **Headline:** 32px / 1.35, 650 weight, -0.04em tracking; balanced wrapping.
- **Panel titles:** 14px, 650 weight, -0.02em tracking. View prompts are 13px / 550; popover headings are 15px / 650.
- **Body and labels:** workspace introduction 13px / 1.7; secondary copy and actions 12px. Empty-state copy uses 1.8 line-height and a 23ch limit (32ch below 850px).
- **Brand:** 21px / 750, -0.04em tracking.

At 480px and below, the headline becomes 26px; stopwatch/countdown readings become 58px/56px and duration fields 36px. At 360px and below, the stopwatch becomes 50px and duration fields 32px. Hour-long stopwatch/countdown readings use 43px/45px on desktop and 37px/38px below 480px; the stopwatch reduces further to 31px below 360px.

**The Timing Type Rule.** Use IBM Plex Mono with tabular numerals for elapsed time, countdowns, duration values, and lap splits/totals. Use Manrope for labels, instructions, and lap numbers.

## Layout

The centered container is `min(1140px, calc(100% - 64px))`. Desktop uses a flexible clock column plus a 320px context column, separated by 22px. The clock view has 26px 30px 24px padding; context panels use 28px 24px 0. The header, workspace heading, panels, and quiet footer form a single vertical sequence.

| Media query | Implemented behavior |
| --- | --- |
| min-width 1500px | Workspace heading top padding increases to 60px. |
| max-width 1050px | Context column becomes 285px; grid gap 18px; panel inline padding 20px; primary action minimum width 177px. |
| max-width 850px | Single column; container `calc(100% - 40px)`, maximum 640px; header note/date hidden; context below clock; presets become three columns. |
| max-width 480px | 16px outer gutters; tabs fill the panel; clock view padding 23px 16px 22px; 46px main controls; stopwatch side controls become 44px icon buttons; footer wraps. |
| max-width 360px | Control gap 6px, primary minimum width 134px, smaller timing type and 51px duration fields. |

The dial is square, `min(360px, 100%)`, and scales with its SVG. Captions use a 62% maximum width, 1.65 line-height, centered balanced wrapping, and 17px top spacing to remain clear of the ticks, including the completion message at 320px. Lap lists scroll within 377px maximum height on desktop and 280px below 850px.

## Elevation & Depth

White panels sit above a pale canvas using a low, diffuse shadow. Recessed gray control groups and fine dividers provide most hierarchy. Depth stays restrained.

- **Panel:** `0 8px 32px -12px rgb(0 0 0 / 9%)`.
- **Selected tab:** `0 2px 5px rgb(0 0 0 / 5%)`.
- **Popover:** `0 12px 40px rgb(0 0 0 / 12%)`.

## Shapes

Panels use the 16px root radius. Controls and presets use 9px; tabs sit inside a 10px tray with 7px inner corners. Badges use 6px, keyboard keys 4px, and popovers 14px. Duration fields have only their upper corners rounded, with an understated bottom rule. Circular swatches and dial geometry contrast with the rounded rectangular controls. Local Lucide SVGs use round caps/joins and a 1.7 stroke; the usual sizes are 20px and 16px, with smaller control-specific variants.

## Components

- **Buttons:** primary accent with white text; secondary soft surface with ink text. Desktop minimum height 48px, padding 14px 20px, radius 9px. Primary minimum width 193px. Hover changes the surface; press moves 1px down; disabled opacity is 0.42. Transitions last 160ms. Focus uses a 2px accent outline with a 4px offset.
- **Mode tabs:** recessed soft-surface tray, 5px padding, 6px gap. Selected tabs are white with ink text and a small shadow. Roving keyboard focus, arrow/Home/End navigation, and selected semantics accompany the visible state; transitions last 150ms.
- **Duration inputs:** centered monospaced values, 65px by 57px, transparent background, bottom divider, no number spinners. Focus adds soft surface and the shared outline. Validation adds a 2px ink bottom rule plus text; no red error color.
- **State badge:** compact dot and text in a soft 6px rectangle. Ready/Paused use muted gray; Running/Complete use the active theme pair. State names remain explicit.
- **Context panels:** white, soft corners, shared panel shadow, divider above the footer. Laps replace a centered empty state with a right-aligned numeric table; newest lap uses accent ink. Headers remain sticky during scrolling.
- **Presets:** 5, 10, and 25 minute options, fine border, 17px 18px padding, 9px corners. Selection uses soft accent and a check; presets are disabled during active/finished countdown states. Mobile displays three equal columns and hides the icons.
- **Appearance and shortcuts:** native popovers, white surface, 14px corners, 22px padding. Appearance is 280px wide; shortcuts are capped at 330px and viewport width minus 32px. Theme selection uses pressed semantics and a check.
- **Timing dial:** thin outer track, 60 ticks with stronger five-second marks, centered timing data. Stopwatch has a rotating dot; countdown has a 3px progress stroke. Completion changes the status and labels, shows zero, and offers Start again. Captions retain their bounded wrap.
- **Motion:** 150ms tab transitions and 160ms button transitions, using the CSS default ease. Reduced motion removes transitions/animations and hides the stopwatch hand.

## Do's and Don'ts

### Do:

- **Do** keep Neutral as the initial theme and render every chooser swatch in gray while it is active.
- **Do** use the established CSS variables so all selected-theme states stay coherent.
- **Do** keep timing values tabular, captions centered within 62% of the dial, and focus outlines visible.
- **Do** preserve the documented stacked layout and compact controls through 320px widths.
- **Do** use the local Lucide SVG sprite and locally hosted fonts.

### Don't:

- **Don't** introduce colored statuses, error messages, or previews before explicit theme selection.
- **Don't** enlarge timing numerals beyond the implemented responsive sizes or allow captions to cross dial ticks.
- **Don't** add decorative raster imagery, strong card shadows, or competing visual emphasis.
- **Don't** convey running, completion, selection, or validation through color alone.
- **Don't** animate the dial hand when reduced motion is requested.
