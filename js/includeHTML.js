document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[data-include]").forEach(async function (element) {
    var file = element.getAttribute("data-include");
    var root = element.getAttribute("data-root") || "";

    try {
      var response = await fetch(file);
      if (!response.ok) {
        throw new Error("Could not load " + file + ": " + response.status);
      }

      element.innerHTML = await response.text();
      element.querySelectorAll("a[href]").forEach(function (link) {
        var href = link.getAttribute("href");
        if (href && !href.startsWith("#") && !/^(?:[a-z][a-z\d+.-]*:|\/\/|\/)/i.test(href)) {
          link.setAttribute("href", root + href);
        }
      });
    } catch (error) {
      console.error("Failed to include HTML:", error);
    }
  });
});