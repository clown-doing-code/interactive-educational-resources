(function () {
  "use strict";

  var RESOURCES = [
    {
      title: "Party Planner – Reported Speech",
      href: "reported-speech/index.html",
      subject: "English · Reported speech",
      level: "A2–B1",
      type: "Speaking · pairs",
      summary:
        "Two students plan a party together. Each asks about seven guests and reports back what was said, then compares notes against the model answers."
    }
  ];

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function card(r) {
    var tags = "";
    if (r.subject) tags += '<span class="tag">' + esc(r.subject) + "</span>";
    if (r.level) tags += '<span class="tag tag-alt">' + esc(r.level) + "</span>";

    return (
      '<article class="rcard">' +
      (tags ? '<p class="rtags">' + tags + "</p>" : "") +
      '<h3 class="rtitle"><a class="rstretch" href="' + esc(r.href) + '">' + esc(r.title) + "</a></h3>" +
      '<p class="rsummary">' + esc(r.summary) + "</p>" +
      (r.type ? '<p class="rmeta">' + esc(r.type) + "</p>" : "") +
      '<p class="rcta" aria-hidden="true">Open activity <span>&rarr;</span></p>' +
      "</article>"
    );
  }

  function mount() {
    var grid = document.querySelector("[data-resource-grid]");
    if (!grid) return;

    var n = RESOURCES.length;
    var counter = document.querySelector("[data-resource-count]");
    if (counter) {
      counter.textContent = n + (n === 1 ? " activity" : " activities");
    }

    grid.innerHTML = n ? RESOURCES.map(card).join("") : '<p class="muted">No activities published yet.</p>';

    var more = document.querySelector("[data-resource-more]");
    if (more) more.hidden = n === 0;
  }

  window.EduResources = { list: RESOURCES, mount: mount };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
