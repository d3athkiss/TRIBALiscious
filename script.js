document.getElementById("searchForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const query = document.getElementById("searchInput").value.trim().toLowerCase();

  const pages = [
    // Recipes
    { name: "binaki", file: "binaki.html" },
    { name: "linupak", file: "linupak.html" },
    { name: "inubaran", file: "inubaran.html" },
    { name: "sinina", file: "sinina.html" },
    { name: "kahawa sug", file: "kahawa.html" },
    { name: "puto balanghoy", file: "puto.html" },
    { name: "tinalombo", file: "tinalombo.html" },
    { name: "ginamos", file: "ginamos.html" },
    { name: "binugsong na manok", file: "binugsong.html" },
    { name: "l'lulot na baboy", file: "lulot.html" },
    { name: "nilupak nga kamote", file: "nilupak-kamote.html" },
    { name: "inasal nga manok", file: "inasal.html" },
    { name: "sinuglaw", file: "sinuglaw.html" },
    { name: "utan bisaya", file: "utan.html" },
    { name: "wild yam", file: "wild-yam.html" },
    { name: "inaloban", file: "inaloban.html" },
    { name: "boiled taro", file: "taro.html" },
    { name: "umbrian fish soup", file: "riverfish.html" }, // matches your HTML link
    { name: "linotlot", file: "linotlot.html" },
    { name: "native chicken tinola", file: "tinola.html" },
    { name: "kamote cue", file: "kamote.html" }, // matches your HTML link

    // Site pages
    { name: "home", file: "index.html" },
   { name: "tribe", file: "index.html#tribes-section" },
    { name: "about", file: "about.html" },
    { name: "contact", file: "contact.html" },

    // Tribe sections (anchors on homepage)
    { name: "bukidnon", file: "index.html#bukidnon-tribe" },
    { name: "manobo", file: "index.html#manobo-tribe" },
    { name: "matigsalug", file: "index.html#matigsalug-tribe" },
    { name: "talaandig", file: "index.html#talaandig-tribe" },
    { name: "higaonon", file: "index.html#higaonon-tribe" },
    { name: "umayamnon", file: "index.html#umayamnon-tribe" },
    { name: "tigwahanon", file: "index.html#tigwahanon-tribe" }
  ];

  const matches = pages.filter(p => p.name.includes(query));

  if (matches.length === 1) {
    const target = matches[0].file;

    // If it's an anchor on index.html and we're already on index.html, scroll instead of reload
    if (target.startsWith("index.html#") && window.location.pathname.endsWith("index.html")) {
      const anchor = target.split("#")[1];
      const element = document.getElementById(anchor);
     if (element) {
  element.scrollIntoView({ behavior: "smooth", block: "center" });
  // optional highlight effect
  element.style.transition = "background-color 0.5s ease";
  element.style.backgroundColor = "#fff3cd"; // light yellow
  setTimeout(() => {
    element.style.backgroundColor = "";
  }, 1500);
}

    } else {
      window.location.href = target;
    }

  } else if (matches.length > 1) {
    let options = "Multiple matches found:\n";
    matches.forEach((m, i) => {
      options += `${i + 1}. ${m.name}\n`;
    });
    const choice = prompt(options + "\nEnter the number of your choice:");
    const index = parseInt(choice, 10) - 1;
    if (matches[index]) {
      window.location.href = matches[index].file;
    }
  } else {
    alert("No match found. Try another keyword!");
  }
});


// Suggestions dropdown (optional)
const sampleSuggestions = Object.keys(routes);

function showSuggestions(query) {
  suggestionsBox.innerHTML = "";
  if (!query) {
    suggestionsBox.style.display = "none";
    return;
  }

  const matches = sampleSuggestions.filter(item =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  if (matches.length === 0) {
    suggestionsBox.style.display = "none";
    return;
  }

  matches.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("suggestion-item");
    div.textContent = item;

    div.addEventListener("click", () => {
      searchInput.value = item;
      suggestionsBox.style.display = "none";
    });

    suggestionsBox.appendChild(div);
  });

  suggestionsBox.style.display = "block";
}

searchInput.addEventListener("input", e => {
  showSuggestions(e.target.value);
});

document.addEventListener("click", e => {
  if (!searchForm.contains(e.target)) {
    suggestionsBox.style.display = "none";
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");

  if (searchForm && searchInput) {
    searchForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const query = searchInput.value.trim();
      if (query) {
        // Redirect to search results page or filter content
        window.location.href = `search.html?q=${encodeURIComponent(query)}`;
      }
    });
  }
});
