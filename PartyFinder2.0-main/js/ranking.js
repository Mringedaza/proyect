// ranking.js → genera lista de ranking dinámico

document.addEventListener("DOMContentLoaded", () => {
    const rankingContainer = document.getElementById("ranking");
  
    const ranking = [
      "Club Eclipse",
      "La Cúpula",
      "BeatRoom",
      "Night Legends",
      "Electro Zone"
    ];
  
    ranking.forEach(club => {
      const item = document.createElement("p");
      item.textContent = `🎶 ${club}`;
      rankingContainer.appendChild(item);
    });
  });
  