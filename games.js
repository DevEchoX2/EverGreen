document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("games-container");

  try {
    // Load JSON file from root
    const res = await fetch("games.json");
    const data = await res.json(); // now 'data' is your array of games

    // Loop through and build cards
    data.forEach(game => {
      const card = document.createElement("div");
      card.classList.add("item");
      card.innerHTML = `
        <div class="card-img" style="background-image:url('${game.img}')"></div>
        <h3>${game.name}</h3>
      `;
      card.addEventListener("click", () => {
        window.open(game.url, "_blank");
      });
      container.appendChild(card);
    });
  } catch (err) {
    console.error("Failed to load games:", err);
  }
});

// Search filter
function searchGames(q) {
  const items = document.querySelectorAll("#games-container .item");
  items.forEach(item => {
    const title = item.querySelector("h3").innerText.toLowerCase();
    item.style.display = title.includes(q.toLowerCase()) ? "flex" : "none";
  });
}
