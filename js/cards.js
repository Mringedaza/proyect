// cards.js → genera cards dinámicas para las fiestas

document.addEventListener("DOMContentLoaded", () => {
  const cardsContainer = document.getElementById("cardsContainer");

  const clubs = [
    { nombre: "Club Nocturno A", imagen: "./assets/images/icons/club1.png" },
    { nombre: "Fiesta Urbana", imagen: "./assets/images/icons/club2.png" },
    { nombre: "Terraza Beats", imagen: "./assets/images/icons/club3.png" },
  ];

  clubs.forEach(club => {
    const card = document.createElement("div");
    card.className = "card bg-gray-800 rounded-xl p-4 flex flex-col items-center";

    card.innerHTML = `
      <img src="${club.imagen}" alt="${club.nombre}" class="w-24 h-24 mb-4 object-cover rounded-lg">
      <h3 class="text-xl font-semibold mb-2">${club.nombre}</h3>
      <button class="bg-purple-700 hover:bg-purple-600 px-4 py-2 rounded-full">Ver más</button>
    `;

    cardsContainer.appendChild(card);
  });
});

  