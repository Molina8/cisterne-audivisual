# Cisterne Audiovisual — Portfolio

Static, single-page portfolio. No build step, no framework.

## Run
Open `index.html` in a browser. Or serve locally:
```
python -m http.server 8080
```

## Structure
```
cisterne-audiovisual/
├── index.html
├── projects.html
├── style.css
└── assets/
    ├── videos/
    │   ├── reel.mp4          # unused hero archive (kept on disk)
    │   ├── horizontal/granada-2026-jaleo.mp4  # current hero loop
    │   ├── vertical/
    │   └── horizontal/
    └── photos/
        ├── ego-barco/
        ├── bangalore-lorca/
        └── …                 # one folder per session
```

Web copies are H.264, max 1080p, so they fit GitHub Pages (100 MB per file). Originals from the transfers are not in the repo.

## To replace placeholders
1. **Hero reel**: the home hero uses `assets/videos/horizontal/granada-2026-jaleo.mp4` (and its `.jpg` poster). `reel.mp4` stays in the repo unused.
2. **Work videos**: add an mp4 plus a jpg poster under `assets/videos/vertical/` or `horizontal/`, then a slide in `projects.html` and a card in `index.html`. File names stay lowercase, without spaces or accents.
3. **Photos**: add JPEGs under `assets/photos/<session>/` and a `.photo-card` in `index.html`.
4. **About**: edit the `.about__text` paragraph.
5. **Contact**: update `mailto:`, IG and phone.

## Specs
- Background `#000`, text `#fff`, meta `#999`, rule `#444`.
- Inter Thin (100) from Google Fonts, with `system-ui` fallback.
- CSS native, no framework. One `:root` token block.
- Lazy images, autoplay-muted hero video.
- No framework. `projects.html` uses a few lines of vanilla JS to show one project from `?project=`.
- Targets Lighthouse Performance ≥ 95.