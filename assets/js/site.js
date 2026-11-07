/* FOSSapalooza: sticky header and the pause button for the topic tapes.
   The page still works without this file: the small logo stays in the header
   and the topics show as a still list. */
(function () {
  "use strict";

  // Sticky header: once the big hero logo scrolls out of view, the bar turns solid
  // and shows the small logo (styles in main.css under "Header bar").
  var bar = document.getElementById("site-bar");
  var heroLogo = document.querySelector(".hero-logo");
  if (bar && heroLogo && "IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      bar.classList.toggle("is-stuck", !entries[0].isIntersecting);
    }).observe(heroLogo);
  }

  // Pause button for the moving topic tapes. The choice is remembered on this device.
  var topics = document.querySelector(".topics");
  var button = topics && topics.querySelector(".topics-pause");
  if (!button) return;
  var key = "fossapalooza-topics-paused";
  var paused = false;
  try { paused = localStorage.getItem(key) === "1"; } catch (e) {}
  topics.classList.toggle("is-paused", paused);
  button.hidden = false;
  button.addEventListener("click", function () {
    paused = !paused;
    topics.classList.toggle("is-paused", paused);
    try { localStorage.setItem(key, paused ? "1" : "0"); } catch (e) {}
  });
})();
