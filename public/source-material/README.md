# Source Material

Drop project images, engineering notebook scans, and build photos here.

## Folder Structure

```
source-material/
  fpv-competition-drone/       ← FPV drone build photos, notebook scans
  robotic-wrist-module/        ← Wrist module CAD screenshots, prototypes
  cad-portfolio/               ← Fusion 360 / Onshape renders
  3d-print-experiments/        ← Print photos, iteration shots
  arduino-projects/            ← Circuit photos, telemetry screenshots
  engineering-notebooks/       ← Scanned notebook pages (any project)
```

## Supported Formats
- Images: `.jpg`, `.jpeg`, `.png`, `.webp`
- Documents: `.pdf` (for notebook scans)

## Naming Convention
`[project-slug]-[description]-[number].jpg`
Example: `fpv-competition-drone-build-01.jpg`

## How to use in the site
Add the path to any project's `images` array in `lib/projects.ts`:
```ts
images: [
  '/source-material/fpv-competition-drone/build-01.jpg',
  '/source-material/fpv-competition-drone/notebook-01.jpg',
],
```
