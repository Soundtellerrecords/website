(function () {
  const L = window.LABEL;
  const $ = (s) => document.querySelector(s);
  const fill = (attr, text) =>
    document.querySelectorAll(`[${attr}]`).forEach((el) => (el.textContent = text));

  document.title = L.name;
  fill("data-name", L.name);
  fill("data-tagline", L.tagline);
  fill("data-about", L.about);
  $("#year").textContent = new Date().getFullYear();

  const email = $("#email-link");
  email.href = `mailto:${L.email}`;
  email.textContent = L.email;

  const initials = (n) => n.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  $("#artists-grid").innerHTML = L.artists
    .map(
      (a, i) => `
      <article class="card artist">
        <div class="art" style="--h:${(i * 67) % 360}">
          ${a.image ? `<img src="${a.image}" alt="${a.name}" data-initials="${initials(a.name)}">` : `<span>${initials(a.name)}</span>`}
        </div>
        <h3>${a.name}</h3>
        <p>${a.genre}</p>
      </article>`
    )
    .join("");

  document.querySelectorAll("#artists-grid img").forEach((img) =>
    img.addEventListener("error", () => {
      const span = document.createElement("span");
      span.textContent = img.dataset.initials;
      img.replaceWith(span);
    })
  );

  $("#releases-grid").innerHTML = L.releases
    .map(
      (r, i) => `
      <a class="card release" href="${r.link}" target="_blank" rel="noopener">
        <div class="art vinyl" style="--h:${(i * 97 + 200) % 360}"><span></span></div>
        <h3>${r.title}</h3>
        <p>${r.artist} &middot; ${r.year}</p>
      </a>`
    )
    .join("");

  $("#socials").innerHTML = L.socials
    .map((s) => `<a href="${s.url}" target="_blank" rel="noopener">${s.label}</a>`)
    .join("");
})();
