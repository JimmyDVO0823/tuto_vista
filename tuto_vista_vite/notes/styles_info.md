# Style Guide: "The Academic Editorial"

This document centralizes the styling tokens and principles used in the project to maintain consistency across all components.

## 🎨 Core Color Palette

| Name | Hex | Tailwind Token | Usage |
| :--- | :--- | :--- | :--- |
| **Academic Blue** | `#002045` | `primary` | Branding, Headers, Main text |
| **Academic Gold** | `#CEAE42` | `academic-gold` | CTAs, Achievements, Active states |
| **Mini Gray** | `#F2F4F6` | `mini-gray` | Secondary surfaces, Dividers, Sidebars |
| **Surface Base** | `#f7f9fb` | `bg-surface` | Main page backgrounds |
| **Container Low** | `#f2f4f6` | `bg-surface-container-low` | Layout sections (e.g., Sidebar) |
| **Container Lowest** | `#ffffff` | `bg-surface-container-lowest` | Primary content cards |

---

## ✍️ Typography

- **Headlines & Display**: `Manrope` (Geometric precision, authoritative feel).
    - Classes: `font-headline`, `font-display`.
- **Body & UI**: `Inter` (Exceptional legibility).
    - Classes: `font-body`, `font-inter`.

---

## 📐 Design Principles

### 1. Intentional Asymmetry
Avoid rigid 50/50 grids. Use asymmetrical layouts (e.g., 60/40 or 8/4 grid columns) to force focus and create a professional publication feel.

### 2. The "No-Line" Rule
**Prohibited**: 1px solid borders for sectioning.
**Method**: Define boundaries through background color shifts (e.g., a `surface-container-low` sidebar against a `surface` main area).

### 3. Tonal Layering
Depth is achieved through stacking colors, not heavy shadows.
- **Base Level**: `surface`
- **Second Level**: `surface-container-low`
- **Third Level (Cards)**: `surface-container-lowest`

### 4. Signature Gradient
Used for primary buttons and high-impact CTAs.
- **Gradient**: `Linear-Gradient(135deg, #002045 0%, #1a365d 100%)`
- **Utility**: `.signature-gradient` (defined in `index.css`)

---

## ✨ Component Specifics

- **Buttons**: `rounded-md` (0.75rem). Use `academic-gold` for "Book Now" or "Complete Lesson".
- **Cards**: `rounded-lg` (1rem). No borders. `2rem` internal padding.
- **Shadows**: Use sparingly. Blur: `40px`, Opacity: `4%`, Color: Tint of `on-surface` (#191c1e).
