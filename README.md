# Portfolio Site

A simple, dependency-free portfolio site (plain HTML/CSS/JS) with:

- **Writing** — preview on the home page, full list on `writing.html`
- **Art** — a gallery with purchase links (Etsy, Gumroad, Ko-fi, etc.)
- **Mindfulness Circle** — a showcase section describing the circle
- **Socials** — icon links to your profiles

## How to customize

Everything is controlled from **one file: `js/config.js`**.
Open it and edit the values — names, bio, social links, writing posts,
art pieces, and the mindfulness circle info. Save, refresh, done.

To change colors/fonts, edit the `:root` variables at the top of
`css/style.css`.

### Using the admin page instead of editing files by hand

Open `admin.html` in a browser (locally, or at `yoursite.com/admin.html`
once deployed) for a form-based editor covering every field below,
including adding/removing writing posts and art pieces.

Since this is a static site with no server or database, the admin page
can't save changes back to the repo by itself:

1. Edit content in the form — it auto-saves a draft to your browser's
   local storage as you type, and shows a live preview of the generated file.
2. Click **Download config.js** (or **Copy to clipboard**).
3. Replace `js/config.js` in your project with it, then commit and push
   to make the changes live.

`admin.html` isn't linked from the site's nav — it's a tool for you, not
site visitors.

### Adding images

1. Drop image files into the `images/` folder (e.g. `images/profile.jpg`, `images/art1.jpg`).
2. Reference them in `js/config.js`, e.g.:
   ```js
   avatar: "images/profile.jpg"
   ```
   ```js
   art: [
     { title: "Quiet Morning", image: "images/art1.jpg", ... }
   ]
   ```
3. If you leave an image field as `""`, a text placeholder is shown instead — nothing breaks.

### Adding/removing writing pieces

Edit the `writing` array in `js/config.js`. Each entry:

```js
{
  title: "Post Title",
  date: "2026-06-01",       // YYYY-MM-DD
  excerpt: "One-line summary.",
  url: "https://...",       // link to the full piece (external site, PDF, etc.)
  external: true            // true = opens in a new tab
}
```

The home page shows the first 3 entries; `writing.html` shows all of them, in the order listed.

### Adding/removing art pieces

Edit the `art` array in `js/config.js`. Each entry:

```js
{
  title: "Piece Title",
  image: "images/art1.jpg",
  price: "$120",
  description: "Medium, size, etc.",
  buyUrl: "https://your-shop-link",  // Etsy/Gumroad/Ko-fi/etc.
  sold: false                        // true shows a "Sold" badge instead of a Buy button
}
```

Since this is a static GitHub Pages site, actual checkout/payment happens
on whatever platform you link to via `buyUrl` (Etsy, Gumroad, Shopify,
Ko-fi, PayPal.me, etc.) — this site just links out to it.

### Mindfulness Circle section

Edit the `mindfulness` object in `js/config.js` — title, description,
a bullet list of details, an optional image, and a `url` for the
"Learn more" button. The button always shows; set `url` to wherever
you want it to point.

### Socials

Edit the `socials` array. Supported `icon` values: `instagram`,
`twitter`, `linkedin`, `github`, `email`, `youtube`, `tiktok`,
`facebook`, `pinterest`, `substack`, or `link` (generic, for anything else).

## Publishing to GitHub Pages

1. Push this folder to a GitHub repository.
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to `Deploy from a branch`.
4. Choose the branch (e.g. `main`) and folder `/ (root)`, then **Save**.
5. Your site will be live at `https://<your-username>.github.io/<repo-name>/`
   within a minute or two.

No build step, no dependencies — it's just static files.
