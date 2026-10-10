# Simple Plot Map

A basic PWA I made for my parents so they can have polygons on a map alongside their position when they're out and about. I don't ask questions, I just make the thing.

No UI framework cuz I got lazy, secrets get baked in, don't care, it's made to fulfill exactly one purpose and nothing more. Kinda bad code because I rushed it in an afternoon and didn't need it to be extensible.

Plots can be defined in `public/plots-*.json`, with default selectors in `src/default-plots.json`.

Build with `bun run build`, deploy `dist/` to a static file server.
