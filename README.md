# Interactive Educational Resources

Self-contained interactive activities for classroom use, published as static pages on
GitHub Pages: <https://clown-doing-code.github.io/interactive-educational-resources/>

There is no build step and no framework. Every page is plain HTML, CSS and JavaScript,
served exactly as committed. That is deliberate: activities must keep working on a locked-down
school network, opened from a USB stick, or shared as a single link.

## Layout

```
index.html                 Landing page / resource hub
reported-speech/           Party Planner – Reported Speech (speaking activity)
assets/css/theme.css       Design tokens for all three themes, base styles, theme switcher
assets/css/hub.css         Landing page layout
assets/js/theme.js         Theme switching + persistence (defines window.EduTheme)
assets/js/resources.js     Resource list + card renderer (defines window.EduResources)
```

`theme.css` and `theme.js` are shared by every page. Page-specific CSS lives in that page's
own `<style>` block, so an activity folder stays portable — copy it out and it still works,
as long as it keeps its two `<link>`/`<script>` references.

## Adding a resource

1. Create a folder with an `index.html`, e.g. `my-activity/index.html`. Reference the shared
   theme with `../assets/css/theme.css` and `../assets/js/theme.js`, and use the tokens below
   rather than hard-coded colours.
2. Append one entry to the array in `assets/js/resources.js`:

   ```js
   {
     title: "Party Planner – Reported Speech",
     href: "reported-speech/index.html",  // relative to the site root
     subject: "English · Reported speech",
     level: "A2–B1",                      // free text: "A2–B1", "Age 8+", "Primary"…
     type: "Speaking · pairs",             // optional
     summary: "One sentence, shown on the card."
   }
   ```

   `subject`, `level` and `type` are optional; omit any of them and the card simply drops
   that line. The card, its tags and the activity count are all generated. Link to the file
   itself rather than the folder, so the link also works over `file://`.

3. Commit, push, and open a pull request. GitHub Pages rebuilds on its own.

## Themes

Three themes, chosen with the switcher in the header and remembered in `localStorage`:

- **Light** — default.
- **Dark** — follows `prefers-color-scheme` until the visitor picks a theme explicitly.
- **Mono** — black and white only, for poor printers and washed-out projectors.

Each theme is a set of custom properties on `:root`. Override only the ones you need:

| Token | Role |
| --- | --- |
| `--bg` `--card` `--line` `--soft` | Surfaces and separators |
| `--text` `--muted` `--acc` `--acc-ink` | Text and accent |
| `--yb --yi --ys` / `--nb --ni --ns` / `--mb --mi --ms` | yes / no / maybe: soft fill, ink, strong fill |
| `--bw` | Border width — 2px normally, 3px in mono so edges survive greyscale |
| `--radius` `--radius-sm` `--radius-xs` | Corner radii — 0 in mono |
| `--font` | Type stack |

A theme is selected by `data-theme` on `<html>`. The inline script in each `<head>` sets it
from `localStorage` before first paint to avoid a flash of the wrong theme. If you add a page,
copy that script into its `<head>` — it must stay inline and must run before the stylesheet
is painted.

### Accessibility in mono

Mono themes cannot use hue to signal meaning, so each activity should give its yes/no/maybe
states a distinct **fill ladder** instead. `reported-speech/index.html` shows the pattern:
solid black for "yes", white with a thick inset ring for "no", light grey for "maybe", and
text labels everywhere. Colours were never the only cue in the first place, so all three
themes stay readable.

## Conventions worth keeping

- The activity's own state is plain JS objects rendered via `innerHTML`; there is no framework.
- Type is Trebuchet MS / Segoe UI / system-ui at an 18px base, sized for classroom projectors.
- Controls meet a 44px minimum target, focus is always visible, and `prefers-reduced-motion`
  is honoured globally in `theme.css`.
- Every page needs a skip link, a single `<h1>`, and labelled landmark regions.

## Running locally

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000/>. The pages also work when opened directly from disk
(`file://`), because the resource list is a JavaScript file rather than a `fetch`ed JSON
file — which browsers refuse to load over `file://`.

## Deployment

GitHub Pages serves `main` from the repository root. A `.nojekyll` file disables Jekyll so
files are served verbatim. All paths in this repository are relative — and they point at files
rather than folders — so the site works both locally and under the
`/interactive-educational-resources/` subpath.
