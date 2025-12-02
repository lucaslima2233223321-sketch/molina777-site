// Ano no rodapé
document.getElementById("year").textContent = new Date().getFullYear();

// Jackpot DEMO (valor subindo aos poucos, só para visual)
let jackpot = 250000;
const jackpotElement = document.getElementById("jackpotValue");

function formatMoneyBRL(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
}

function updateJackpot() {
  jackpot += Math.floor(Math.random() * 55) + 5;
  if (jackpotElement) {
    jackpotElement.textContent = formatMoneyBRL(jackpot);
  }
}

setInterval(updateJackpot, 1800);

// ===== JOGOS DEMO =====
// Campo "url" controla para onde o botão Jogar (demo) vai
const games = [
  {
    name: "Tiger Slots",
    category: "slots",
    tag: "Tigre",
    thumb: "url('img/tiger-slots.png')",
    url: "https://slotbetpix.io/games/ver/PGSOFT/126?CampaignID=447215678&CreativeID=447215654&kwai_click_id=vfPFnEPvSIU2jtkoPLyUakOgVE-TbIwh4cK8NFzDtU64DdOX9IzycvWNjCqBeLC5-WTn6zW5l5Q0LddaelI3LLu61q-qt2m9coe02D3JNXrYLoEntbAWVzxRNOa7TKPV&cname=%5BSlotPix%5D+-+%5BCostCap%5D+-++%5BMLH%5D+-+%5BJhenyfer-Mistura2%5D+-+%5B1.3.6%5D&setname=dup_dup_dup_dup_dup_dup_Conjunto+CostCap&adname=dup_dup_dup_jhenyfer+09+tigre.mp4&siteid=1005&lg=pt&sys=__OS__&idfa=__IDFA__&os_name=__OS__&gps_adid=__GAID1__&ip_address=177.194.120.148&user_agent=Mozilla%2F5.0+%28iPhone%3B+CPU+iPhone+OS+18_5+like+Mac+OS+X%29+AppleWebKit%2F605.1.15+%28KHTML%2C+like+Gecko%29+Mobile%2F15E148&device_name=__MODEL__&xgo=340999ff&adSETID=447215637&click_id=vfPFnEPvSIU2jtkoPLyUakOgVE-TbIwh4cK8NFzDtU64DdOX9IzycvWNjCqBeLC5-WTn6zW5l5Q0LddaelI3LLu61q-qt2m9coe02D3JNXrYLoEntbAWVzxRNOa7TKPV&pixel_id=287871191439327",
  },
  {
    name: "Golden Lion",
    category: "slots",
    tag: "Leão",
    thumb: "url('img/golden-lion.png')",
    url: "#", // ainda sem link real
  },
  {
    name: "Dragon Fire",
    category: "slots",
    tag: "Dragão",
    thumb: "url('img/dragon-fire.png')",
    url: "#",
  },
  {
    name: "Lucky Fish",
    category: "other",
    tag: "Peixe",
    thumb: "url('img/lucky-fish.png')",
    url: "#",
  },
  {
    name: "Roleta Royale",
    category: "roulette",
    tag: "Roleta",
    thumb: "url('img/roleta-royale.png')",
    url: "#",
  },
  {
    name: "Lightning Roulette",
    category: "roulette",
    tag: "Ao vivo",
    thumb: "url('img/lightning-roulette.png')",
    url: "#",
  },
  {
    name: "Poker Room",
    category: "cards",
    tag: "Poker",
    thumb: "url('img/poker-room.png')",
    url: "#",
  },
  {
    name: "Blackjack Elite",
    category: "cards",
    tag: "Blackjack",
    thumb: "url('img/blackjack-elite.png')",
    url: "#",
  },
];

const gamesGrid = document.getElementById("gamesGrid");

function renderGames(filterCategory = "all") {
  if (!gamesGrid) return;
  gamesGrid.innerHTML = "";

  const filteredGames =
    filterCategory === "all"
      ? games
      : games.filter((game) => game.category === filterCategory);

  filteredGames.forEach((game) => {
    const card = document.createElement("article");
    card.className = "game-card";

    card.innerHTML = `
      <div class="game-thumb" style="background-image: ${game.thumb};"></div>
      <div class="game-info">
        <div class="game-name">${game.name}</div>
        <div class="game-category">${labelCategory(game.category)}</div>
        <div class="game-actions">
          <button class="game-play-btn">Jogar (demo)</button>
          <span class="game-tag">${game.tag}</span>
        </div>
      </div>
    `;

    const playBtn = card.querySelector(".game-play-btn");

    playBtn.addEventListener("click", (e) => {
      e.stopPropagation();

      // Se tiver URL configurada e diferente de "#", abre o jogo em nova aba
      if (game.url && game.url !== "#") {
        window.open(game.url, "_blank");
      } else {
        alert(
          `Este é um botão DEMO.\nAinda não temos um link configurado para o jogo "${game.name}".`
        );
      }
    });

    gamesGrid.appendChild(card);
  });
}

function labelCategory(category) {
  switch (category) {
    case "slots":
      return "Slots";
    case "cards":
      return "Jogos de Cartas";
    case "roulette":
      return "Roleta";
    case "other":
      return "Outros Jogos";
    default:
      return "Jogo";
  }
}

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const category = btn.getAttribute("data-category");
    renderGames(category);
  });
});

// Primeira renderização
renderGames();