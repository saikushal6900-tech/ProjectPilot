# ProjectPilot — Figma Editable Import Package

This package contains 13 editable SVG compositions: a brand and component sheet, six desktop screens, five mobile screens, and a prototype flow map. Desktop layouts are 1600 px wide; mobile layouts are 390 × 844 px.

## Import into Figma

1. Unzip this package.
2. Create or open a Figma Design file where you have edit access.
3. Drag an SVG onto the canvas. Repeat for each screen or flow map; each SVG is a separate composition.
4. Select an imported SVG and ungroup it when you want to work on its individual vector elements. Keep it grouped when moving or scaling the whole composition.
5. Use `13_Prototype_Flow.svg` as the interaction reference, then connect the relevant screens in Figma’s Prototype tab.
6. Save the imported file in Figma. To create a local native copy, use Figma’s **File → Save local copy** after importing.

Figma converts imported SVGs into editable vector layers. The source SVGs contain text elements, but check how Figma imports them before editing wording; if a text element arrives as outlined vector shapes, replace it with a Figma text layer. This package is an SVG import bundle rather than a native `.fig` file. The included screens are static layouts, so prototype links must be connected in Figma.

## Included compositions

- `01_Brand_and_Components.svg` — brand identity, color palette, typography, reusable components
- `02_Web_Dashboard.svg` — desktop overview
- `03_Web_Project_Details.svg` — project overview and milestones
- `04_Web_Kanban.svg` — four-column task board
- `05_Web_Calendar.svg` — monthly calendar and upcoming deadlines
- `06_Web_AI_Assistant.svg` — AI project assistant
- `07_Web_Reports.svg` — productivity and project health analytics
- `08_Mobile_Home.svg` — mobile home
- `09_Mobile_Projects.svg` — mobile project listing
- `10_Mobile_Tasks.svg` — mobile task list
- `11_Mobile_Calendar.svg` — mobile calendar
- `12_Mobile_Profile.svg` — mobile profile and preferences
- `13_Prototype_Flow.svg` — prototype flow and interaction notes

## Verification

The archive opens without ZIP errors. All 13 SVG files parse as valid XML/SVG. Each composition uses vector shapes and SVG text, with no embedded raster images or external asset links. Typography prefers Inter, with Manrope or Arial as fallbacks.
