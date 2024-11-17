document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("urlForm");
  const longUrlInput = document.getElementById("longUrl");
  const shortenedUrlsContainer = document.getElementById("shortenedUrls");
  const clearUrlsButton = document.getElementById("clearUrls");

  const baseUrl = "http://short.ly/";
  let urlMappings = JSON.parse(localStorage.getItem("urlMappings")) || {};

  const renderShortenedUrls = () => {
    shortenedUrlsContainer.innerHTML = "";

    const hasUrls = Object.keys(urlMappings).length > 0;
    clearUrlsButton.style.display = hasUrls ? "block" : "none";

    Object.keys(urlMappings).forEach((shortUrl) => {
      const div = document.createElement("div");
      div.classList.add("short-url");
      div.innerHTML = `
        <strong>${shortUrl}</strong>: <a href="${urlMappings[shortUrl]}" target="_blank">${urlMappings[shortUrl]}</a>
      `;
      shortenedUrlsContainer.appendChild(div);
    });
  };

  const generateShortUrl = () => {
    return baseUrl + Math.random().toString(36).substring(2, 8);
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const longUrl = longUrlInput.value;

    if (longUrl) {
      const shortUrl = generateShortUrl();
      urlMappings[shortUrl] = longUrl;
      localStorage.setItem("urlMappings", JSON.stringify(urlMappings));
      renderShortenedUrls();

      longUrlInput.value = "";
    }
  });

  clearUrlsButton.addEventListener("click", () => {
    urlMappings = {};
    localStorage.removeItem("urlMappings");
    renderShortenedUrls();
  });

  renderShortenedUrls();
});
