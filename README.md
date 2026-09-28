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
assets/css/theme.css       Design tokens, base styles, skip link
assets/css/hub.css         Landing page layout
assets/js/resources.js     Resource list + card renderer (defines window.EduResources)
```

`theme.css` is shared by every page. Page-specific CSS lives in that page's own `<style>`
block, so an activity folder stays portable — copy it out and it still works, as long as it
keeps its `../assets/css/theme.css` reference.

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

## Colour

The site is deliberately **monochrome**: black on white, with a small set of neutral greys.
There is no theme switcher and no dark mode. Two reasons:

- Activities get projected, photocopied and printed. Greyscale survives a washed-out
  projector and a black-and-white photocopier, and it means a single sheet of rules covers
  every medium.
- Colour is an unreliable signal in a classroom anyway — colour-blind learners, bad
  screens, a bad printer. If meaning only exists in a hue, it is gone.

Tokens live on `:root` in `theme.css`. Override only what you need:

| Token | Role |
| --- | --- |
| `--bg` `--card` `--line` `--soft` | Surfaces, rules and separators |
| `--text` `--muted` `--acc` `--acc-ink` | Text and accent |
| `--yb --yi` / `--nb --ni` / `--mb --mi` | yes / no / maybe: fill and ink |
| `--bw` | Border width |
| `--radius` `--radius-sm` `--radius-xs` | Corner radii — currently all 0 |
| `--shell` `--pad` | Centred content width and side gutters |
| `--font` | Type stack |

### The fill ladder: never let colour carry meaning

Because there is no hue to lean on, a three-way choice has to be distinguishable by fill
alone. `reported-speech/index.html` sets the pattern with the yes/no/maybe tokens, and the
same three tokens drive the segmented buttons and the answer badges:

| State | Fill | Extra |
| --- | --- | --- |
| yes | `--yb` solid black | ink `--yi` white |
| no | `--nb` white | ink `--ni` black, plus a border |
| maybe | `--mb` light grey | ink `--mi` black, plus a border |

A border is what makes the white "no" state visible on a white card. **Always ship a text
label alongside the fill** — the fill ranks the options, the word names them. That is what
keeps the activity usable in greyscale, and it is the accessibility rule for the site.

## Conventions worth keeping

- Activity state is plain JS objects rendered via `innerHTML`; there is no framework, and no
  build step of any kind.
- Type is Trebuchet MS / Segoe UI / system-ui at an 18px base on a 1.6 line height, sized for
  classroom projectors.
- Spacing is fluid `clamp()`, so there are no breakpoint-specific padding values to maintain.
- Controls meet a 40px minimum target, focus is always visible, and `prefers-reduced-motion`
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
