document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("apps-container");

  try {
    const res = await fetch("apps.json");
    const data = await res.json(); // now 'data' is your array of apps

    data.forEach(app => {
      const card = document.createElement("div");
      card.classList.add("item");
      card.innerHTML = `
        <div class="card-img" style="background-image:url('${app.img}')"></div>
        <h3>${app.name}</h3>
      `;
      card.addEventListener("click", () => {
        window.open(app.url, "_blank");
      });
      container.appendChild(card);
    });
  } catch (err) {
    console.error("Failed to load apps:", err);
  }
});

// Search filter
function searchApps(q) {
  const items = document.querySelectorAll("#apps-container .item");
  items.forEach(item => {
    const title = item.querySelector("h3").innerText.toLowerCase();
    item.style.display = title.includes(q.toLowerCase()) ? "flex" : "none";
  });
}
