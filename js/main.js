/*
  Renders CONFIG (see config.js) into the page.
  You shouldn't need to edit this file to customize content —
  edit js/config.js instead.
*/

// Simple inline icon set so the site has zero external dependencies.
const ICONS = {
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
  twitter: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 2H22l-7.6 8.7L23 22h-6.9l-5.4-6.6L4.5 22H1.4l8.1-9.3L1 2h7.1l4.9 6.1L18.9 2zm-1.2 18h1.9L7.4 3.9H5.4L17.7 20z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.9 3.9 6 2.5 6S0 4.9 0 3.5 1.1 1 2.5 1s2.48 1.1 2.48 2.5zM.4 8.2h4.2V23H.4V8.2zM8.3 8.2h4v2h.06c.56-1 1.93-2.06 3.98-2.06 4.26 0 5.05 2.6 5.05 6V23h-4.2v-6.8c0-1.62-.03-3.7-2.26-3.7-2.27 0-2.62 1.77-2.62 3.6V23H8.3V8.2z"/></svg>',
  github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.6.5.5 5.6.5 12c0 5.1 3.3 9.4 7.9 11 .6.1.8-.3.8-.6v-2.1c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.6 7.9-5.9 7.9-11C23.5 5.6 18.4.5 12 .5z"/></svg>',
  email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>',
  youtube: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2s-.2-1.6-.9-2.3c-.9-.9-1.9-.9-2.4-1C16.9 2.6 12 2.6 12 2.6h0s-4.9 0-8.2.3c-.5.1-1.5.1-2.4 1-.7.7-.9 2.3-.9 2.3S0 8.1 0 10v2c0 1.9.2 3.8.2 3.8s.2 1.6.9 2.3c.9.9 2.1.9 2.6 1 1.9.2 8.3.3 8.3.3s4.9 0 8.2-.3c.5-.1 1.5-.1 2.4-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.8v-2c0-1.9-.2-3.8-.2-3.8zM9.5 14.5v-6l6 3-6 3z"/></svg>',
  tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 2h-3.2v13.7a3 3 0 1 1-2.1-2.9V9.5a6.2 6.2 0 1 0 5.3 6.1V8.4a7.7 7.7 0 0 0 4.4 1.4V6.5a4.4 4.4 0 0 1-4.4-4.5z"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 22v-9h3l.5-3.5h-3.5V7.3c0-1 .3-1.7 1.8-1.7h1.9V2.2C16.9 2.1 15.7 2 14.3 2c-3 0-5 1.8-5 5.1v2.4H6v3.5h3.3v9h4.2z"/></svg>',
  pinterest: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12c0 4.2 2.6 7.8 6.3 9.3-.1-.8-.2-2 0-2.9l1.4-6s-.4-.7-.4-1.8c0-1.7 1-2.9 2.2-2.9 1 0 1.5.8 1.5 1.7 0 1-.7 2.6-1 4-.3 1.2.6 2.2 1.8 2.2 2.1 0 3.7-2.2 3.7-5.5 0-2.9-2.1-4.9-5-4.9-3.4 0-5.5 2.6-5.5 5.2 0 1 .4 2.1.9 2.7.1.1.1.2.1.3l-.4 1.5c-.1.2-.2.3-.4.2-1.4-.7-2.3-2.7-2.3-4.4 0-3.6 2.6-6.9 7.5-6.9 3.9 0 7 2.8 7 6.5 0 3.9-2.4 7-5.9 7-1.1 0-2.2-.6-2.6-1.3l-.7 2.7c-.3 1-1 2.3-1.5 3.1 1.1.3 2.3.5 3.6.5 5.5 0 10-4.5 10-10S17.5 2 12 2z"/></svg>',
  substack: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 4h18v3H3V4zm0 5h18v2H3V9zm0 4h18v2H3v-2zm0 4 9 4 9-4v-2l-9 4-9-4v2z"/></svg>',
  medium: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.38-2.88-3.38-6.42s1.51-6.42 3.38-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>',
  link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.5.4l2-2a5 5 0 0 0-7-7l-1.2 1.1"/><path d="M14 11a5 5 0 0 0-7.5-.4l-2 2a5 5 0 0 0 7 7l1.1-1.1"/></svg>'
};

function fmtDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

function el(tag, opts = {}) {
  const node = document.createElement(tag);
  if (opts.className) node.className = opts.className;
  if (opts.html !== undefined) node.innerHTML = opts.html;
  if (opts.text !== undefined) node.textContent = opts.text;
  if (opts.attrs) Object.entries(opts.attrs).forEach(([k, v]) => node.setAttribute(k, v));
  return node;
}

function placeholderBlock(label) {
  const div = el("div", { className: "placeholder-img" });
  div.textContent = label || "Image";
  return div;
}

function renderSiteMeta() {
  if (CONFIG.site.title) document.title = CONFIG.site.title;
  const desc = document.querySelector('meta[name="description"]');
  if (desc && CONFIG.site.description) desc.setAttribute("content", CONFIG.site.description);
  if (CONFIG.site.favicon) {
    const link = document.createElement("link");
    link.rel = "icon";
    link.href = CONFIG.site.favicon;
    document.head.appendChild(link);
  }
}

function renderNavBrand() {
  document.querySelectorAll("[data-nav-brand]").forEach(n => n.textContent = CONFIG.person.name);
}

function renderHero() {
  const hero = document.getElementById("hero");
  if (!hero) return;

  const avatarWrap = el("div", { className: "avatar" });
  if (CONFIG.person.avatar) {
    const img = el("img", { attrs: { src: CONFIG.person.avatar, alt: CONFIG.person.name } });
    avatarWrap.appendChild(img);
  } else {
    avatarWrap.textContent = (CONFIG.person.name || "?").trim().charAt(0).toUpperCase();
  }

  hero.appendChild(avatarWrap);
  hero.appendChild(el("h1", { text: CONFIG.person.name }));
  hero.appendChild(el("p", { className: "tagline", text: CONFIG.person.tagline }));
  hero.appendChild(el("p", { className: "bio", text: CONFIG.person.bio }));
}

function renderSocials() {
  const containers = document.querySelectorAll("[data-socials]");
  if (!containers.length) return;

  containers.forEach(container => {
    (CONFIG.socials || []).forEach(social => {
      const a = el("a", {
        className: "social-link",
        attrs: { href: social.url, target: "_blank", rel: "noopener noreferrer", "aria-label": social.name, title: social.name }
      });
      const iconSvg = ICONS[social.icon] || ICONS.link;
      a.innerHTML = iconSvg;
      container.appendChild(a);
    });
  });
}

async function copyEmailToClipboard(email, prefixSpan, emailSpan) {
  try {
    await navigator.clipboard.writeText(email);
  } catch (e) {
    const textarea = document.createElement("textarea");
    textarea.value = email;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }

  prefixSpan.style.display = "none";
  emailSpan.textContent = "Copied!";
  emailSpan.classList.add("copied");
  setTimeout(() => {
    prefixSpan.style.display = "";
    emailSpan.textContent = email;
    emailSpan.classList.remove("copied");
  }, 1500);
}

function renderContact() {
  const containers = document.querySelectorAll("[data-contact]");
  if (!containers.length) return;

  const email = CONFIG.person && CONFIG.person.email;
  if (!email) return;

  containers.forEach(container => {
    container.innerHTML = "";
    const prefixSpan = el("span", { text: "Contact me at " });
    const emailSpan = el("span", {
      className: "contact-email",
      text: email,
      attrs: { tabindex: "0", role: "button", title: "Click to copy" }
    });
    emailSpan.addEventListener("click", () => copyEmailToClipboard(email, prefixSpan, emailSpan));
    emailSpan.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        copyEmailToClipboard(email, prefixSpan, emailSpan);
      }
    });
    container.appendChild(prefixSpan);
    container.appendChild(emailSpan);
  });
}

function writingCard(item) {
  const card = el("a", {
    className: "writing-card",
    attrs: {
      href: item.url,
      target: item.external ? "_blank" : "_self",
      rel: item.external ? "noopener noreferrer" : ""
    }
  });
  card.appendChild(el("span", { className: "writing-date", text: fmtDate(item.date) }));
  card.appendChild(el("h3", { text: item.title }));
  card.appendChild(el("p", { text: item.excerpt }));
  card.appendChild(el("span", { className: "read-more", text: "Read →" }));
  return card;
}

function renderWritingPreview() {
  const container = document.getElementById("writing-preview");
  if (!container) return;
  const items = (CONFIG.writing || []).slice(0, 3);
  items.forEach(item => container.appendChild(writingCard(item)));
}

function renderWritingFull() {
  const container = document.getElementById("writing-full");
  if (!container) return;
  (CONFIG.writing || []).forEach(item => container.appendChild(writingCard(item)));
}

function artCard(item) {
  const card = el("div", { className: "art-card" });

  const imgWrap = el("div", { className: "art-img-wrap" });
  if (item.image) {
    imgWrap.appendChild(el("img", { attrs: { src: item.image, alt: item.title } }));
  } else {
    imgWrap.appendChild(placeholderBlock(item.title));
  }
  if (item.sold) {
    imgWrap.appendChild(el("span", { className: "sold-badge", text: "Sold" }));
  }
  card.appendChild(imgWrap);

  const body = el("div", { className: "art-body" });
  const titleRow = el("div", { className: "art-title-row" });
  titleRow.appendChild(el("h3", { text: item.title }));
  titleRow.appendChild(el("span", { className: "art-price", text: item.price || "" }));
  body.appendChild(titleRow);
  body.appendChild(el("p", { text: item.description || "" }));

  if (item.sold) {
    body.appendChild(el("span", { className: "btn btn-disabled", text: "Sold" }));
  } else if (item.buyUrl) {
    body.appendChild(el("a", {
      className: "btn btn-primary",
      text: "Purchase",
      attrs: { href: item.buyUrl, target: "_blank", rel: "noopener noreferrer" }
    }));
  }

  card.appendChild(body);
  return card;
}

function isExternalUrl(url) {
  return /^([a-z][a-z0-9+.-]*:)?\/\//i.test(url) || /^mailto:|^tel:/i.test(url);
}

function renderSectionLinks() {
  if (!CONFIG.links) return;

  const writingLink = document.getElementById("writing-view-all");
  if (writingLink && CONFIG.links.writingViewAll) {
    writingLink.href = CONFIG.links.writingViewAll;
    if (isExternalUrl(CONFIG.links.writingViewAll)) {
      writingLink.target = "_blank";
      writingLink.rel = "noopener noreferrer";
    }
  }

  const artLink = document.getElementById("art-view-all");
  if (artLink && CONFIG.links.artViewAll) {
    artLink.href = CONFIG.links.artViewAll;
    if (isExternalUrl(CONFIG.links.artViewAll)) {
      artLink.target = "_blank";
      artLink.rel = "noopener noreferrer";
    }
  }
}

function renderArtPreview() {
  const container = document.getElementById("art-preview");
  if (!container) return;
  const items = (CONFIG.art || []).slice(0, 3);
  items.forEach(item => container.appendChild(artCard(item)));
}

function renderArtFull() {
  const container = document.getElementById("art-full");
  if (!container) return;
  (CONFIG.art || []).forEach(item => container.appendChild(artCard(item)));
}

function renderMindfulness() {
  const container = document.getElementById("mindfulness");
  if (!container) return;
  const m = CONFIG.mindfulness;

  const imgWrap = el("div", { className: "mindfulness-img-wrap" });
  if (m.image) {
    imgWrap.appendChild(el("img", { attrs: { src: m.image, alt: m.title } }));
  } else {
    imgWrap.appendChild(placeholderBlock(m.title));
  }

  const body = el("div", { className: "mindfulness-body" });
  body.appendChild(el("h3", { text: m.title }));
  body.appendChild(el("p", { text: m.description }));

  body.appendChild(el("a", {
    className: "btn btn-primary",
    text: "Register Now!",
    attrs: { href: m.url || "#", target: "_blank", rel: "noopener noreferrer" }
  }));

  if (m.details && m.details.length) {
    const ul = el("ul", { className: "mindfulness-details" });
    m.details.forEach(d => ul.appendChild(el("li", { text: d })));
    body.appendChild(ul);
  }

  container.appendChild(imgWrap);
  container.appendChild(body);
}

function setFooterYear() {
  document.querySelectorAll("[data-year]").forEach(n => n.textContent = new Date().getFullYear());
}

document.addEventListener("DOMContentLoaded", () => {
  renderSiteMeta();
  renderNavBrand();
  renderHero();
  renderContact();
  renderSocials();
  renderSectionLinks();
  renderWritingPreview();
  renderWritingFull();
  renderArtPreview();
  renderArtFull();
  renderMindfulness();
  setFooterYear();
});
