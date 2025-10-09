let teamData = {};
let currentTab = "developers";

// Load data
async function loadTeam() {
  const res = await fetch("/team");
  teamData = await res.json();
  renderTeam("developers"); // show developers by default

  // Attach tab click listeners AFTER data is loaded
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      currentTab = btn.dataset.tab;
      switchTab(currentTab);
    });
  });
}

// Switch with animation
function switchTab(tab) {
  const container = document.getElementById("team-list");
  container.classList.add("hide");

  setTimeout(() => {
    renderTeam(tab);
    container.classList.remove("hide");
  }, 400); // matches CSS transition
}

// Render team members
function renderTeam(tab) {
  const container = document.getElementById("team-list");
  container.innerHTML = "";

  if (!teamData[tab]) return;

  teamData[tab].forEach(member => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${member.avatar}" alt="${member.name}">
      <div class="info">
        <div class="name">${member.name} <span class="role">@${member.role}</span></div>
        <div class="bio">${member.bio}</div>
        <div class="links">
          ${member.links.github ? `<a href="${member.links.github}" target="_blank">🐙</a>` : ""}
          ${member.links.email ? `<a href="mailto:${member.links.email}">✉️</a>` : ""}
          ${member.links.website ? `<a href="${member.links.website}" target="_blank">🌐</a>` : ""}
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// Theme toggle
document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("light");
  const isLight = document.body.classList.contains("light");
  document.getElementById("theme-toggle").textContent = isLight ? "☀️" : "🌙";
});

// Top bar buttons

loadTeam();
