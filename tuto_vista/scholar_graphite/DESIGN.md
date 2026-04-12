# Design System Specification: The Academic Editorial

## 1. Overview & Creative North Star
**Creative North Star: "The Modern Scholar"**
This design system moves away from the "learning management system" trope of cluttered dashboards and rigid grids. Instead, it adopts an **Editorial Academic** aesthetic. It treats digital tutoring like a premium, high-end publication: authoritative, spacious, and intellectually stimulating.

To break the "template" look, we employ **Intentional Asymmetry**. Large `display-lg` headings should often be paired with significant negative space to their right, forcing the eye to focus on the content. Overlapping elements—such as a `surface-container-lowest` card slightly breaking the boundary of a `primary-container` hero section—create a sense of physical layering and depth that feels bespoke rather than generated.

---

## 2. Colors & Surface Architecture
The palette is rooted in tradition but executed with modern "tonal depth." We use the contrast between the deep `primary` (#002045) and the bright `surface` (#f7f9fb) to create a sense of prestige.

### The "No-Line" Rule
**Explicit Instruction:** Prohibit the use of 1px solid borders for sectioning or containment. Boundaries must be defined solely through background color shifts. For example, a sidebar should be `surface-container-low`, sitting directly against a `surface` main content area. This creates a "soft" interface that reduces visual noise and cognitive load.

### Surface Hierarchy & Nesting
Treat the UI as a series of stacked sheets of fine paper.
*   **Base:** `surface` (#f7f9fb)
*   **Layout Sections:** `surface-container-low` (#f2f4f6)
*   **Primary Content Cards:** `surface-container-lowest` (#ffffff)
*   **Interactive Widgets:** `surface-container-high` (#e6e8ea)

### The "Glass & Gradient" Rule
To elevate the experience, use **Glassmorphism** for floating elements (like navigation bars or hovering study timers). Use `surface` colors at 80% opacity with a `24px` backdrop-blur. 

**Signature Texture:** Use a subtle linear gradient for primary CTAs:
`Linear-Gradient(135deg, primary (#002045) 0%, primary-container (#1a365d) 100%)`. This adds a "soul" to the buttons that flat hex codes cannot replicate.

---

## 3. Typography
We utilize a dual-typeface system to balance authority with utility.

*   **Display & Headlines (Manrope):** Chosen for its geometric precision and modern "tech-academic" feel. 
    *   `display-lg` (3.5rem): Use for high-impact landing moments.
    *   `headline-md` (1.75rem): Use for dashboard section headers.
*   **Body & UI (Inter):** Chosen for its exceptional legibility at small sizes.
    *   `body-md` (0.875rem): The workhorse for all student/tutor communication.
    *   `label-md` (0.75rem, All Caps, Tracking: 0.05em): Use for metadata and overlines to provide an "archival" feel.

---

## 4. Elevation & Depth
Hierarchy is achieved through **Tonal Layering**, not structural lines.

*   **The Layering Principle:** Depth is "stacked." Place a `surface-container-lowest` card on a `surface-container-low` background. This creates a natural "lift" without the need for shadows.
*   **Ambient Shadows:** When a card must float (e.g., a student's active session card), use a shadow with a blur of `40px`, an offset of `y: 8px`, and an opacity of `4%`. The shadow color must be a tint of the `on-surface` color (#191c1e), not pure black.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility in forms, use `outline-variant` at 20% opacity. **Forbid 100% opaque borders.**

---

## 5. Components

### Buttons
*   **Primary:** Uses the "Signature Gradient." Shape: `rounded-md` (0.75rem). Text: `title-sm` (Inter, Bold).
*   **Secondary (CTA):** Uses `tertiary-container` (Soft Gold). This is reserved exclusively for "Book Now" or "Complete Lesson" actions.
*   **Tertiary:** Ghost style. No background; uses `primary` text.

### Cards & Dashboard Widgets
*   **Style:** No borders. Background: `surface-container-lowest`. Corner Radius: `lg` (1rem).
*   **Spacing:** Use `2rem` (xl) internal padding to maintain the "Editorial" feel.
*   **Anti-Pattern:** Do not use divider lines within cards. Separate content blocks using `1.5rem` of vertical whitespace.

### Academic Data Tables
*   **Header:** `surface-container-high` background, no bottom border.
*   **Rows:** Alternate between `surface` and `surface-container-low`.
*   **Interaction:** On hover, shift the row background to `secondary-fixed-dim` at 20% opacity.

### Calendar Elements
*   **Current Day:** `primary-container` with `on-primary-container` text.
*   **Available Slot:** A subtle "Ghost Border" using `outline-variant` (20%) and a `tertiary` (Gold) dot indicator.

---

## 6. Do’s and Don’ts

### Do
*   **Do** use asymmetrical layouts. A 60/40 split for dashboard widgets is more sophisticated than a 50/50 split.
*   **Do** prioritize whitespace. If a section feels "tight," double the padding.
*   **Do** use `tertiary` (Gold) sparingly. It is a "reward" color for achievement and primary actions.

### Don't
*   **Don't** use 1px dividers to separate list items. Use a `0.5rem` gap and a subtle background shift.
*   **Don't** use "Drop Shadows" that are dark and heavy. If the shadow is noticeable at first glance, it is too strong.
*   **Don't** use standard "Success Green." Use the specified `tertiary` or `secondary` palette to keep the academic tone professional.

---

## 7. Token Reference Summary
| Token | Value | Usage |
| :--- | :--- | :--- |
| **Primary** | #002045 | Main branding, Headers, Dark backgrounds |
| **Tertiary Container**| #cba72f | Accent/Gold for CTAs and Achievements |
| **Surface** | #f7f9fb | Main application background |
| **Surface Lowest** | #ffffff | Elevated Card backgrounds |
| **Radius-lg** | 1rem | Main Container rounding |
| **Radius-md** | 0.75rem | Buttons and Input fields |