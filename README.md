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
├── style.css
└── assets/
    ├── videos/
    │   ├── placeholder.mp4   # hero reel + 4 work thumbs
    │   └── placeholder.jpg   # poster fallback
    └── photos/
        ├── session-01/
        ├── session-02/
        ├── session-03/
        ├── session-04/
        └── session-05/
```

## To replace placeholders
1. **Hero reel**: drop your reel into `assets/videos/` and update `<source src>` in `index.html`.
2. **Work videos**: replace `Project One`…`Project Four` titles, categories and poster JPGs.
3. **Photos**: drop 6–10 JPEGs per session folder, then edit the `.photo-card` blocks.
4. **About**: edit the `.about__text` paragraph.
5. **Contact**: update `mailto:`, IG and Vimeo URLs.

## Specs
- Background `#000`, text `#fff`, meta `#999`, rule `#444`.
- Inter Thin (100) from Google Fonts, with `system-ui` fallback.
- CSS native, no framework. One `:root` token block.
- Lazy images, autoplay-muted hero video.
- No JS runtime, no Tailwind.
- Targets Lighthouse Performance ≥ 95.