const platforms = [
  { name: "Python", url: "tutorials/python.html" },
  { name: "JavaScript", url: "tutorials/javascript.html" },
  { name: "Java", url: "tutorials/java.html" },
  { name: "C", url: "tutorials/c.html" },
  { name: "C++", url: "tutorials/cpp.html" },
  { name: "C#", url: "tutorials/csharp.html" }
];

const container = document.getElementById("platforms-container");
const searchInput = document.getElementById("search");
const languageSwitcher = document.getElementById("language-switcher");

function renderPlatforms(filter = "") {
  container.innerHTML = "";
  platforms
    .filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
    .forEach(platform => {
      const div = document.createElement("div");
      div.className = "platform";
      div.textContent = platform.name;
      div.onclick = () => window.location.href = platform.url;
      container.appendChild(div);
    });
}

renderPlatforms();

searchInput.addEventListener("input", e => {
  renderPlatforms(e.target.value);
});

// Language switcher
languageSwitcher.addEventListener("change", async e => {
  const lang = e.target.value;
  const res = await fetch(`lang/${lang}.json`);
  const data = await res.json();
  searchInput.placeholder = data.search;
  document.querySelector("footer p").textContent = data.footer;
});
