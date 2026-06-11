(function () {
  "use strict";

  var toggle = document.getElementById("theme-toggle");

  function getTheme() {
    var stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    if (toggle) {
      toggle.setAttribute(
        "aria-label",
        "Switch to " + (theme === "dark" ? "light" : "dark") + " mode"
      );
    }
  }

  if (toggle) {
    setTheme(getTheme());

    toggle.addEventListener("click", function () {
      var next = getTheme() === "dark" ? "light" : "dark";
      localStorage.setItem("theme", next);
      setTheme(next);
    });
  }

  var fadeElements = document.querySelectorAll(".fade-in");

  if (fadeElements.length && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    fadeElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    fadeElements.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
})();
