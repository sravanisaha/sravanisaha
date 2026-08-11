/*
  Lock screen for admin.html.

  This is a static site — there's no server to check a password against,
  so this only hashes the entered password (SHA-256) and compares it to
  CONFIG.admin.passwordHash from js/config.js. That stops casual visitors,
  but the check itself is visible to anyone who views source, so treat it
  as a deterrent, not real security.

  Unlocking is remembered for the current browser tab session only
  (sessionStorage) — closing the tab locks it again.
*/

const ADMIN_UNLOCK_KEY = "portfolio_admin_unlocked";

async function sha256Hex(text) {
  const bytes = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, "0")).join("");
}

function unlockAdmin() {
  document.body.classList.remove("admin-locked");
  document.getElementById("admin-lock-overlay").style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("admin-lock-form");
  const input = document.getElementById("admin-lock-password");
  const errorEl = document.getElementById("admin-lock-error");
  const submitBtn = form.querySelector("button");

  if (sessionStorage.getItem(ADMIN_UNLOCK_KEY) === "1") {
    unlockAdmin();
    return;
  }

  if (!window.crypto || !window.crypto.subtle) {
    errorEl.textContent = "Password check needs a secure context. Open this page via your published https:// site, or a local server (e.g. \"python3 -m http.server\") — not by double-clicking the file.";
    submitBtn.disabled = true;
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const hash = await sha256Hex(input.value);
    if (hash === CONFIG.admin.passwordHash) {
      sessionStorage.setItem(ADMIN_UNLOCK_KEY, "1");
      errorEl.textContent = "";
      unlockAdmin();
    } else {
      errorEl.textContent = "Incorrect password.";
      input.value = "";
      input.focus();
    }
  });
});
