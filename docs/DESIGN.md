# Design System Specification (SIM-Sarpras)
Standardized UI Design Tokens for Google Stitch, Figma, and Client-Side Slicing

## 1. Global Attributes
* Platform: Web (Desktop-first, Responsive down to 360px mobile)
* Design Language: Clean Material Design (Enterprise Back-Office SaaS)
* Contrast Target: WCAG 2.1 AA Compliant (AAA for tabular data & body copy)
* Radii Scale: Harmonious 8px / 12px / 9999px (concentric radius ratio)
* Elevation: Soft photometric ambient shadows (zero dark uncalibrated drops)

## 2. Color Palette Tokens
| Token Name | HEX Code | CSS Variable | Semantic Role |
| :--- | :--- | :--- | :--- |
| Primary Indigo | #4F46E5 | var(--color-primary) | Primary CTAs, active sidebar state, chart focal lines |
| Primary Hover | #4338CA | var(--color-primary-hover) | Hover state for primary buttons |
| Secondary Cyan | #06B6D4 | var(--color-secondary) | Supporting charts, building location meters |
| Success Emerald | #10B981 | var(--color-success) | Asset Baik (Good condition), active status pills |
| Warning Amber | #F97316 | var(--color-warning) | Asset Dalam Perawatan (Maintenance), pending alerts |
| Danger Rose | #EF4444 | var(--color-danger) | Asset Rusak Berat (Broken), delete modals |
| Neutral Canvas | #F8FAFC | var(--color-bg-canvas) | Application workspace background (Slate 50) |
| Neutral Card | #FFFFFF | var(--color-surface-card) | White container surface for tables, charts, forms |
| Hairline Border | #E2E8F0 | var(--color-border) | Structural 1px border lines for cards and dividers |
| Title Slate | #0F172A | var(--color-text-title) | H1, H2, metric KPI values (Slate 900) |
| Body Slate | #334155 | var(--color-text-body) | Table cell data, descriptions (Slate 700) |
| Muted Slate | #64748B | var(--color-text-muted) | Form labels, helper text, placeholders (Slate 500) |
| Sidebar Navy | #0A1128 | var(--color-sidebar-bg) | Left navigation sidebar background |
| Sidebar Hover | rgba(255,255,255,0.08) | var(--color-sidebar-hover) | Background highlight on hovered navigation items |

## 3. Typography Stack
* UI Text & Headers: 'Plus Jakarta Sans', Inter, -apple-system, sans-serif
* Numerical & Codes: 'JetBrains Mono', Consolas, monospace (tabular-nums enforced)
* Scale:
  - Display Title: 24px, Bold 700, leading-snug
  - Section / Card Title: 16px, SemiBold 600, leading-normal
  - Metric Numbers: 22px, Bold 700, tabular numbers
  - Body Text: 13.5px, Regular 400, leading-relaxed
  - Table Content: 13px, Medium 500, leading-normal
  - Badge Status: 11px, Bold 700, tracking-wide

## 4. Reusable Component Rules
1. Primary Button:
   - Height: 38px
   - Background: #4F46E5, Text: #FFFFFF
   - Border: None, Radius: 8px
   - Tactile Press: active scale(0.97)
2. Secondary / Outline Button:
   - Height: 38px
   - Background: #FFFFFF, Text: #334155
   - Border: 1px solid #E2E8F0, Radius: 8px
   - Hover: Background #F1F5F9
3. Form Inputs:
   - Height: 40px
   - Border: 1px solid #E2E8F0, Radius: 8px
   - Focus: Border #4F46E5 with 3px ring rgba(79, 70, 229, 0.15)
4. Data Table:
   - Row height: 48px
   - Header: Light gray background #F8FAFC, uppercase 11.5px Slate 500
   - Last column (Actions): Min-width 130px, padding-right 24px
5. Status Badge:
   - Height: 22px, Radius: 9999px (full pill)
   - Font: 11px bold uppercase
   - Opacity: 12% background tint with full saturation text
