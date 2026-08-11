/*
  Admin page logic.

  This is a STATIC site — there is no server or database to save to.
  So this page keeps your edits in an in-memory `state` object, mirrors
  it to the browser's localStorage as a draft (so a refresh doesn't lose
  your work), and lets you download/copy a ready-to-replace js/config.js
  file. To actually publish changes, you still replace js/config.js in
  the project and push to GitHub — that's true of any static site.

  Icon names below must match the ICONS object in js/main.js.
*/

const DRAFT_KEY = "portfolio_admin_draft_v1";
const ICON_OPTIONS = [
  "instagram", "twitter", "linkedin", "github", "email",
  "youtube", "tiktok", "facebook", "pinterest", "substack", "medium", "link"
];

let state = null;
let statusTimer = null;

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function loadInitialState() {
  const draft = localStorage.getItem(DRAFT_KEY);
  if (draft) {
    try {
      const parsed = JSON.parse(draft);
      // Fill in any keys added to config.js since this draft was saved.
      if (!parsed.admin) parsed.admin = deepClone(CONFIG.admin);
      if (!parsed.links) parsed.links = deepClone(CONFIG.links);
      if (parsed.person && parsed.person.email === undefined) parsed.person.email = CONFIG.person.email;
      return { data: parsed, fromDraft: true };
    } catch (e) {
      // fall through to file defaults if the draft is corrupted
    }
  }
  return { data: deepClone(CONFIG), fromDraft: false };
}

function el(tag, opts = {}) {
  const node = document.createElement(tag);
  if (opts.className) node.className = opts.className;
  if (opts.text !== undefined) node.textContent = opts.text;
  if (opts.attrs) Object.entries(opts.attrs).forEach(([k, v]) => node.setAttribute(k, v));
  return node;
}

function setStatus(msg) {
  const status = document.getElementById("admin-status");
  status.textContent = msg;
  clearTimeout(statusTimer);
  statusTimer = setTimeout(() => { status.textContent = ""; }, 2500);
}

/* ---------- persistence ---------- */

function saveDraft() {
  localStorage.setItem(DRAFT_KEY, JSON.stringify(state));
  updatePreview();
}

function updatePreview() {
  document.getElementById("preview-textarea").value = generateConfigText(state);
}

/* ---------- static field bindings ---------- */

function bindText(id, getPath, onInput) {
  const input = document.getElementById(id);
  input.value = getPath();
  input.addEventListener("input", () => {
    onInput(input.value);
    saveDraft();
  });
}

function bindStaticFields() {
  bindText("site-title", () => state.site.title, v => state.site.title = v);
  bindText("site-description", () => state.site.description, v => state.site.description = v);
  bindText("site-favicon", () => state.site.favicon, v => state.site.favicon = v);

  bindText("person-name", () => state.person.name, v => state.person.name = v);
  bindText("person-tagline", () => state.person.tagline, v => state.person.tagline = v);
  bindText("person-bio", () => state.person.bio, v => state.person.bio = v);
  bindText("person-avatar", () => state.person.avatar, v => state.person.avatar = v);
  bindText("person-email", () => state.person.email, v => state.person.email = v);

  bindText("writing-view-all-url", () => state.links.writingViewAll, v => state.links.writingViewAll = v);
  bindText("art-view-all-url", () => state.links.artViewAll, v => state.links.artViewAll = v);

  bindText("mind-title", () => state.mindfulness.title, v => state.mindfulness.title = v);
  bindText("mind-image", () => state.mindfulness.image, v => state.mindfulness.image = v);
  bindText("mind-description", () => state.mindfulness.description, v => state.mindfulness.description = v);
  bindText("mind-url", () => state.mindfulness.url, v => state.mindfulness.url = v);
}

/* ---------- socials ---------- */

function renderSocials() {
  const container = document.getElementById("socials-list");
  container.innerHTML = "";

  if (!state.socials.length) {
    container.appendChild(el("p", { className: "admin-empty", text: "No social links yet." }));
  }

  state.socials.forEach((social, i) => {
    const card = el("div", { className: "admin-card" });

    const header = el("div", { className: "admin-card-header" });
    header.appendChild(el("span", { text: `Social ${i + 1}` }));
    const removeBtn = el("button", { className: "btn-danger btn-small", text: "Remove", attrs: { type: "button" } });
    removeBtn.addEventListener("click", () => {
      state.socials.splice(i, 1);
      renderSocials();
      saveDraft();
    });
    header.appendChild(removeBtn);
    card.appendChild(header);

    const nameField = el("div", { className: "admin-field" });
    nameField.appendChild(el("label", { text: "Label" }));
    const nameInput = el("input", { attrs: { type: "text", value: social.name } });
    nameInput.addEventListener("input", () => { social.name = nameInput.value; saveDraft(); });
    nameField.appendChild(nameInput);
    card.appendChild(nameField);

    const iconField = el("div", { className: "admin-field" });
    iconField.appendChild(el("label", { text: "Icon" }));
    const iconSelect = el("select");
    ICON_OPTIONS.forEach(opt => {
      const optionEl = el("option", { text: opt, attrs: { value: opt } });
      if (opt === social.icon) optionEl.setAttribute("selected", "selected");
      iconSelect.appendChild(optionEl);
    });
    iconSelect.addEventListener("change", () => { social.icon = iconSelect.value; saveDraft(); });
    iconField.appendChild(iconSelect);
    card.appendChild(iconField);

    const urlField = el("div", { className: "admin-field" });
    urlField.appendChild(el("label", { text: "URL" }));
    const urlInput = el("input", { attrs: { type: "text", value: social.url } });
    urlInput.addEventListener("input", () => { social.url = urlInput.value; saveDraft(); });
    urlField.appendChild(urlInput);
    card.appendChild(urlField);

    container.appendChild(card);
  });
}

/* ---------- writing ---------- */

function renderWriting() {
  const container = document.getElementById("writing-list");
  container.innerHTML = "";

  if (!state.writing.length) {
    container.appendChild(el("p", { className: "admin-empty", text: "No writing posts yet." }));
  }

  state.writing.forEach((post, i) => {
    const card = el("div", { className: "admin-card" });

    const header = el("div", { className: "admin-card-header" });
    header.appendChild(el("span", { text: `Post ${i + 1}` }));
    const removeBtn = el("button", { className: "btn-danger btn-small", text: "Remove", attrs: { type: "button" } });
    removeBtn.addEventListener("click", () => {
      state.writing.splice(i, 1);
      renderWriting();
      saveDraft();
    });
    header.appendChild(removeBtn);
    card.appendChild(header);

    const titleField = el("div", { className: "admin-field" });
    titleField.appendChild(el("label", { text: "Title" }));
    const titleInput = el("input", { attrs: { type: "text", value: post.title } });
    titleInput.addEventListener("input", () => { post.title = titleInput.value; saveDraft(); });
    titleField.appendChild(titleInput);
    card.appendChild(titleField);

    const dateField = el("div", { className: "admin-field" });
    dateField.appendChild(el("label", { text: "Date" }));
    const dateInput = el("input", { attrs: { type: "date", value: post.date } });
    dateInput.addEventListener("input", () => { post.date = dateInput.value; saveDraft(); });
    dateField.appendChild(dateInput);
    card.appendChild(dateField);

    const excerptField = el("div", { className: "admin-field" });
    excerptField.appendChild(el("label", { text: "Excerpt" }));
    const excerptInput = el("textarea");
    excerptInput.value = post.excerpt;
    excerptInput.addEventListener("input", () => { post.excerpt = excerptInput.value; saveDraft(); });
    excerptField.appendChild(excerptInput);
    card.appendChild(excerptField);

    const urlField = el("div", { className: "admin-field" });
    urlField.appendChild(el("label", { text: "Link to full piece" }));
    const urlInput = el("input", { attrs: { type: "text", value: post.url } });
    urlInput.addEventListener("input", () => { post.url = urlInput.value; saveDraft(); });
    urlField.appendChild(urlInput);
    card.appendChild(urlField);

    const externalLabel = el("label", { className: "admin-checkbox" });
    const externalInput = el("input", { attrs: { type: "checkbox" } });
    externalInput.checked = !!post.external;
    externalInput.addEventListener("change", () => { post.external = externalInput.checked; saveDraft(); });
    externalLabel.appendChild(externalInput);
    externalLabel.appendChild(document.createTextNode("Opens in a new tab"));
    card.appendChild(externalLabel);

    container.appendChild(card);
  });
}

/* ---------- art ---------- */

function renderArt() {
  const container = document.getElementById("art-list");
  container.innerHTML = "";

  if (!state.art.length) {
    container.appendChild(el("p", { className: "admin-empty", text: "No art pieces yet." }));
  }

  state.art.forEach((piece, i) => {
    const card = el("div", { className: "admin-card" });

    const header = el("div", { className: "admin-card-header" });
    header.appendChild(el("span", { text: `Piece ${i + 1}` }));
    const removeBtn = el("button", { className: "btn-danger btn-small", text: "Remove", attrs: { type: "button" } });
    removeBtn.addEventListener("click", () => {
      state.art.splice(i, 1);
      renderArt();
      saveDraft();
    });
    header.appendChild(removeBtn);
    card.appendChild(header);

    const titleField = el("div", { className: "admin-field" });
    titleField.appendChild(el("label", { text: "Title" }));
    const titleInput = el("input", { attrs: { type: "text", value: piece.title } });
    titleInput.addEventListener("input", () => { piece.title = titleInput.value; saveDraft(); });
    titleField.appendChild(titleInput);
    card.appendChild(titleField);

    const imageField = el("div", { className: "admin-field" });
    imageField.appendChild(el("label", { text: "Image path" }));
    const imageInput = el("input", { attrs: { type: "text", value: piece.image, placeholder: "images/art1.jpg" } });
    imageInput.addEventListener("input", () => { piece.image = imageInput.value; saveDraft(); });
    imageField.appendChild(imageInput);
    card.appendChild(imageField);

    const priceField = el("div", { className: "admin-field" });
    priceField.appendChild(el("label", { text: "Price" }));
    const priceInput = el("input", { attrs: { type: "text", value: piece.price, placeholder: "$120" } });
    priceInput.addEventListener("input", () => { piece.price = priceInput.value; saveDraft(); });
    priceField.appendChild(priceInput);
    card.appendChild(priceField);

    const descField = el("div", { className: "admin-field" });
    descField.appendChild(el("label", { text: "Description" }));
    const descInput = el("textarea");
    descInput.value = piece.description;
    descInput.addEventListener("input", () => { piece.description = descInput.value; saveDraft(); });
    descField.appendChild(descInput);
    card.appendChild(descField);

    const buyField = el("div", { className: "admin-field" });
    buyField.appendChild(el("label", { text: "Buy link (Etsy, Gumroad, Ko-fi, etc.)" }));
    const buyInput = el("input", { attrs: { type: "text", value: piece.buyUrl } });
    buyInput.addEventListener("input", () => { piece.buyUrl = buyInput.value; saveDraft(); });
    buyField.appendChild(buyInput);
    card.appendChild(buyField);

    const soldLabel = el("label", { className: "admin-checkbox" });
    const soldInput = el("input", { attrs: { type: "checkbox" } });
    soldInput.checked = !!piece.sold;
    soldInput.addEventListener("change", () => { piece.sold = soldInput.checked; saveDraft(); });
    soldLabel.appendChild(soldInput);
    soldLabel.appendChild(document.createTextNode("Sold (shows a \"Sold\" badge instead of the Buy button)"));
    card.appendChild(soldLabel);

    container.appendChild(card);
  });
}

/* ---------- mindfulness details ---------- */

function renderDetails() {
  const container = document.getElementById("mind-details-list");
  container.innerHTML = "";

  state.mindfulness.details.forEach((detail, i) => {
    const row = el("div", { className: "admin-field" });
    row.style.display = "flex";
    row.style.gap = "0.5rem";
    row.style.alignItems = "center";

    const input = el("input", { attrs: { type: "text", value: detail } });
    input.style.flex = "1";
    input.addEventListener("input", () => { state.mindfulness.details[i] = input.value; saveDraft(); });
    row.appendChild(input);

    const removeBtn = el("button", { className: "btn-danger btn-small", text: "Remove", attrs: { type: "button" } });
    removeBtn.addEventListener("click", () => {
      state.mindfulness.details.splice(i, 1);
      renderDetails();
      saveDraft();
    });
    row.appendChild(removeBtn);

    container.appendChild(row);
  });
}

/* ---------- config.js text generation ---------- */

function j(value) {
  return JSON.stringify(value);
}

function generateConfigText(s) {
  const socialsText = s.socials.map(soc =>
    `    { name: ${j(soc.name)}, icon: ${j(soc.icon)}, url: ${j(soc.url)} }`
  ).join(",\n");

  const writingText = s.writing.map(w =>
`    {
      title: ${j(w.title)},
      date: ${j(w.date)},
      excerpt: ${j(w.excerpt)},
      url: ${j(w.url)},
      external: ${!!w.external}
    }`
  ).join(",\n");

  const artText = s.art.map(a =>
`    {
      title: ${j(a.title)},
      image: ${j(a.image)},
      price: ${j(a.price)},
      description: ${j(a.description)},
      buyUrl: ${j(a.buyUrl)},
      sold: ${!!a.sold}
    }`
  ).join(",\n");

  const detailsText = s.mindfulness.details.map(d => `      ${j(d)}`).join(",\n");

  return `/*
  ===========================================================
  SITE CONFIG — edit everything here. No HTML/CSS knowledge needed.
  ===========================================================
  This is the ONLY file you need to touch to customize the content
  of the site. Save your changes and refresh the page (or push to
  GitHub) to see them live.

  (Generated by admin.html — it's still just a plain JavaScript file,
  so you can keep editing it by hand too.)
*/

const CONFIG = {

  // ---------- Site-wide ----------
  site: {
    title: ${j(s.site.title)},
    description: ${j(s.site.description)},
    // Path to a favicon image (optional). Leave as "" to skip.
    favicon: ${j(s.site.favicon)}
  },

  // ---------- Admin access ----------
  // Password protection for admin.html. This is a static site with no
  // server, so this is a basic deterrent against casual visitors, not
  // real security — the hash below is public in this file, and anyone
  // determined could brute-force it offline. Don't reuse a sensitive
  // password here.
  //
  // Change your password from the Security section in admin.html, then
  // download/copy config.js and redeploy.
  admin: {
    passwordHash: ${j(s.admin.passwordHash)}
  },

  // ---------- About / Hero ----------
  person: {
    name: ${j(s.person.name)},
    tagline: ${j(s.person.tagline)},
    bio: ${j(s.person.bio)},
    // Path to a profile photo. Put your image in the /images folder
    // and reference it like "images/profile.jpg". Leave "" for a
    // placeholder initial instead of a photo.
    avatar: ${j(s.person.avatar)},
    // Shown in the footer as "Contact me at ...", right above the
    // social icons. Click-to-copy, not a mailto link.
    email: ${j(s.person.email)}
  },

  // ---------- Socials ----------
  // "icon" can be any of: instagram, twitter, linkedin, github, email,
  // youtube, tiktok, facebook, pinterest, substack, medium, or "link" (generic).
  socials: [
${socialsText}
  ],

  // ---------- Section links ----------
  // Where the "View all →" links on the homepage's Writing and Art
  // sections point to. Default to this site's own writing.html/art.html
  // pages, but you can point either one anywhere else instead — e.g. an
  // external blog or shop — and it'll open in a new tab automatically.
  links: {
    writingViewAll: ${j(s.links.writingViewAll)},
    artViewAll: ${j(s.links.artViewAll)}
  },

  // ---------- Writing ----------
  // Shown as a preview (first 3) on the home page, and in full on writing.html.
  // "url" can be an external link (e.g. Substack post, Medium, PDF) or
  // a local file path. "external" set to true opens it in a new tab.
  writing: [
${writingText}
  ],

  // ---------- Art ----------
  // "image" should point to a file in /images (e.g. "images/art1.jpg").
  // "buyUrl" can link to Etsy, Gumroad, Ko-fi, Shopify, or anywhere you
  // sell. Set "sold" to true to show a "Sold" badge instead of a Buy button.
  art: [
${artText}
  ],

  // ---------- Mindfulness Circle ----------
  mindfulness: {
    title: ${j(s.mindfulness.title)},
    image: ${j(s.mindfulness.image)},
    description: ${j(s.mindfulness.description)},
    details: [
${detailsText}
    ],
    url: ${j(s.mindfulness.url)}
  }

};
`;
}

/* ---------- actions ---------- */

function downloadConfig() {
  const text = generateConfigText(state);
  const blob = new Blob([text], { type: "text/javascript" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "config.js";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  setStatus("Downloaded config.js");
}

async function copyConfig() {
  const text = generateConfigText(state);
  try {
    await navigator.clipboard.writeText(text);
    setStatus("Copied to clipboard");
  } catch (e) {
    const ta = document.getElementById("preview-textarea");
    ta.select();
    document.execCommand("copy");
    setStatus("Copied to clipboard");
  }
}

function resetToFileDefaults() {
  if (!confirm("Discard your local draft and reload the content currently in js/config.js?")) return;
  localStorage.removeItem(DRAFT_KEY);
  state = deepClone(CONFIG);
  document.getElementById("draft-banner").style.display = "none";
  renderAll();
  saveDraft();
  setStatus("Reset to file defaults");
}

/* ---------- init ---------- */

function renderAll() {
  bindStaticFields();
  renderSocials();
  renderWriting();
  renderArt();
  renderDetails();
  updatePreview();
}

document.addEventListener("DOMContentLoaded", () => {
  const initial = loadInitialState();
  state = initial.data;

  if (initial.fromDraft) {
    document.getElementById("draft-banner").style.display = "block";
  }

  document.getElementById("discard-draft-link").addEventListener("click", (e) => {
    e.preventDefault();
    resetToFileDefaults();
  });

  document.getElementById("add-social").addEventListener("click", () => {
    state.socials.push({ name: "New Link", icon: "link", url: "https://" });
    renderSocials();
    saveDraft();
  });

  document.getElementById("add-writing").addEventListener("click", () => {
    state.writing.unshift({ title: "New Post", date: new Date().toISOString().slice(0, 10), excerpt: "", url: "#", external: true });
    renderWriting();
    saveDraft();
  });

  document.getElementById("add-art").addEventListener("click", () => {
    state.art.unshift({ title: "New Piece", image: "", price: "", description: "", buyUrl: "", sold: false });
    renderArt();
    saveDraft();
  });

  document.getElementById("add-detail").addEventListener("click", () => {
    state.mindfulness.details.push("New detail");
    renderDetails();
    saveDraft();
  });

  document.getElementById("update-password-btn").addEventListener("click", async () => {
    const pwInput = document.getElementById("new-password");
    const confirmInput = document.getElementById("confirm-password");
    const statusEl = document.getElementById("password-status");
    const pw = pwInput.value;

    if (pw.length < 6) {
      statusEl.textContent = "Password must be at least 6 characters.";
      return;
    }
    if (pw !== confirmInput.value) {
      statusEl.textContent = "Passwords don't match.";
      return;
    }

    state.admin.passwordHash = await sha256Hex(pw);
    pwInput.value = "";
    confirmInput.value = "";
    statusEl.textContent = "";
    saveDraft();
    setStatus("Password updated — download config.js to save it");
  });

  document.getElementById("download-btn").addEventListener("click", downloadConfig);
  document.getElementById("copy-btn").addEventListener("click", copyConfig);
  document.getElementById("reset-btn").addEventListener("click", resetToFileDefaults);

  renderAll();
});
