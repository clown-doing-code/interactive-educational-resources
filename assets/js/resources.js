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
    },
    {
      soon: true,
      status: "Coming soon",
      title: "The Perfect Lesson Plan Generator™",
      subject: "Everything · Planning",
      level: "Any",
      type: "Being marketed as a time-saver",
      summary:
        "It generates a lesson plan. It is not the lesson plan you wanted. But it is a lesson plan, it follows the required template, and it has your name on it.",
      cta: "Still arguing with it"
    },
    {
      soon: true,
      status: "Coming soon",
      title: "Homework Excuse Bingo",
      subject: "Survival skills",
      level: "Any",
      type: "Printable · 9 cards",
      summary:
        "“The dog ate it.” “My printer broke.” “I left it at my other house.” Nine printable cards, one free square, and a very small prize for full marks.",
      cta: "Ask me again next week"
    }
  ];

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function card(r) {
    var tags = "";
    if (r.soon && r.status) tags += '<span class="tag tag-soon">' + esc(r.status) + "</span>";
    if (r.subject) tags += '<span class="tag">' + esc(r.subject) + "</span>";
    if (r.level) tags += '<span class="tag tag-alt">' + esc(r.level) + "</span>";

    // a placeholder has no page to link to, so the title is plain text
    var title = r.soon
      ? '<h3 class="rtitle">' + esc(r.title) + "</h3>"
      : '<h3 class="rtitle"><a class="rstretch" href="' + esc(r.href) + '">' + esc(r.title) + "</a></h3>";

    var cta = r.soon
      ? '<p class="rcta" aria-hidden="true">' + esc(r.cta || "Coming soon") + "</p>"
      : '<p class="rcta" aria-hidden="true">Open activity <span>&rarr;</span></p>';

    return (
      '<article class="rcard' + (r.soon ? " is-soon" : "") + '"' + (r.soon ? ' aria-disabled="true"' : "") + ">" +
      (tags ? '<p class="rtags">' + tags + "</p>" : "") +
      title +
      '<p class="rsummary">' + esc(r.summary) + "</p>" +
      (r.type ? '<p class="rmeta">' + esc(r.type) + "</p>" : "") +
      cta +
      "</article>"
    );
  }

  // The sticky header would otherwise cover the anchor targets it jumps to.
  // Its height depends on how the nav labels wrap, so measure it rather than
  // hardcoding a value per breakpoint.
  function syncHeadHeight() {
    var head = document.querySelector(".site-head");
    if (!head) return;
    var set = function () {
      document.documentElement.style.setProperty(
        "--head-h",
        Math.ceil(head.getBoundingClientRect().height) + "px"
      );
    };
    set();
    if (window.ResizeObserver) {
      new window.ResizeObserver(set).observe(head);
    } else {
      window.addEventListener("resize", set);
    }
  }

  function mount() {
    syncHeadHeight();

    var grid = document.querySelector("[data-resource-grid]");
    if (!grid) return;

    var n = RESOURCES.length;
    var live = RESOURCES.filter(function (r) {
      return !r.soon;
    }).length;

    var counter = document.querySelector("[data-resource-count]");
    if (counter) {
      // don't count placeholders as published activities
      var text = live + (live === 1 ? " activity" : " activities");
      if (n > live) text += " · " + (n - live) + " coming soon";
      counter.textContent = text;
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
