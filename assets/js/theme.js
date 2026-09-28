(function () {
  "use strict";

  var KEY = "edu-theme";
  var ICON = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true" focusable="false"';
  var THEMES = [
    {
      value: "light",
      label: "Light",
      icon: "<svg " + ICON + '><circle cx="12" cy="12" r="4.2"/><path d="M12 2.4v2.4M12 19.2v2.4M2.4 12h2.4M19.2 12h2.4M5.2 5.2l1.7 1.7M17.1 17.1l1.7 1.7M18.8 5.2l-1.7 1.7M6.9 17.1l-1.7 1.7"/></svg>'
    },
    {
      value: "dark",
      label: "Dark",
      icon: '<svg ' + ICON + ' stroke-linejoin="round"><path d="M20.4 14.7A8.7 8.7 0 1 1 9.3 3.6a6.9 6.9 0 0 0 11.1 11.1z"/></svg>'
    },
    {
      value: "mono",
      label: "Mono",
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="8.6"/><path d="M12 3.4a8.6 8.6 0 0 1 0 17.2z" fill="currentColor" stroke="none"/></svg>'
    }
  ];

  function isTheme(v) {
    return THEMES.some(function (t) {
      return t.value === v;
    });
  }

  function system() {
    return typeof matchMedia === "function" && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function read() {
    try {
      var v = localStorage.getItem(KEY);
      if (isTheme(v)) return v;
    } catch (e) {}
    return system();
  }

  function get() {
    return document.documentElement.getAttribute("data-theme") || read();
  }

  function set(value) {
    if (!isTheme(value)) value = system();
    document.documentElement.setAttribute("data-theme", value);
    try {
      localStorage.setItem(KEY, value);
    } catch (e) {}
    sync(value);
  }

  function sync(value) {
    var inputs = document.querySelectorAll('.tswitch input[name="theme"]');
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].checked = inputs[i].value === value;
    }
  }

  var uid = 0;

  function build(host) {
    var labelId = "tsw-label-" + ++uid;
    var html = '<span class="tswitch-label" id="' + labelId + '">Theme</span>';
    html += '<div class="tswitch-track">';
    for (var i = 0; i < THEMES.length; i++) {
      var t = THEMES[i];
      html +=
        '<label class="topt">' +
        '<input class="vh" type="radio" name="theme" value="' + t.value + '">' +
        '<span class="tbtn">' + t.icon + '<span class="sr">' + t.label + "</span></span>" +
        "</label>";
    }
    host.classList.add("tswitch");
    host.setAttribute("role", "group");
    host.setAttribute("aria-labelledby", labelId);
    host.innerHTML = html;

    var current = get();
    host.addEventListener("change", function (e) {
      if (e.target && e.target.name === "theme") set(e.target.value);
    });
    sync(current);
  }

  function mount() {
    var hosts = document.querySelectorAll("[data-theme-switch]");
    for (var i = 0; i < hosts.length; i++) build(hosts[i]);
  }

  window.EduTheme = { get: get, set: set, themes: THEMES };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
