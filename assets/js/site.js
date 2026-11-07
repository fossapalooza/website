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
  // The button and the topics section both get the is-paused class.
  var topics = document.querySelector(".topics");
  var button = document.querySelector(".topics-pause");
  if (!topics || !button) return;
  var key = "fossapalooza-topics-paused";
  var paused = false;
  try { paused = localStorage.getItem(key) === "1"; } catch (e) {}
  function show() {
    topics.classList.toggle("is-paused", paused);
    button.classList.toggle("is-paused", paused);
  }
  show();
  button.hidden = false;
  button.addEventListener("click", function () {
    paused = !paused;
    show();
    try { localStorage.setItem(key, paused ? "1" : "0"); } catch (e) {}
  });
