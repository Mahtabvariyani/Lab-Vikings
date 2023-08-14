const gameTextElement = document.getElementById("gameText");
const optionsElement = document.getElementById("options");

const player = {
  name: prompt("Enter your Viking name:"),
  health: 100,
  gold: 50,
  hasShip: false
};

const gameStates = {
  VILLAGE: "village",
  FOREST: "forest",
  SEA: "sea",
  END: "end"
};

let currentState = gameStates.VILLAGE;

function displayStatus() {
  gameTextElement.innerHTML = `
    Name: ${player.name}<br>
    Health: ${player.health}<br>
    Gold: ${player.gold}
  `;
}

function updateOptions(option1Text, option2Text, option3Text) {
  optionsElement.innerHTML = `
    <button id="option1">${option1Text}</button>
    <button id="option2">${option2Text}</button>
    <button id="option3">${option3Text}</button>
  `;
}

function handleVillage() {
  gameTextElement.textContent = "You are in a Viking village.";
  updateOptions("Visit the blacksmith", "Go to the forest", "Set sail on the sea");

  document.getElementById("option1").addEventListener("click", () => {
    gameTextElement.textContent = "You visit the blacksmith.";
    player.gold -= 10;
    displayStatus();
  });

  document.getElementById("option2").addEventListener("click", () => {
    currentState = gameStates.FOREST;
    playGame();
  });

  document.getElementById("option3").addEventListener("click", () => {
    if (player.hasShip) {
      currentState = gameStates.SEA;
      playGame();
    } else {
      gameTextElement.textContent = "You don't have a ship to sail on the sea.";
    }
  });
}

function handleForest() {
  gameTextElement.textContent = "You are in a dark forest.";
  updateOptions("Explore deeper", "Return to the village", "");

  document.getElementById("option1").addEventListener("click", () => {
    gameTextElement.textContent = "You encounter a wild animal!";
    const damage = Math.floor(Math.random() * 20) + 10;
    player.health -= damage;
    displayStatus();
  });

  document.getElementById("option2").addEventListener("click", () => {
    currentState = gameStates.VILLAGE;
    playGame();
  });
}

function handleSea() {
  gameTextElement.textContent = "You set sail on the open sea.";
  updateOptions("Explore the distant island", "Return to the village", "");

  document.getElementById("option1").addEventListener("click", () => {
    gameTextElement.textContent = "You found a hidden treasure!";
    player.gold += 50;
    displayStatus();
  });

  document.getElementById("option2").addEventListener("click", () => {
    currentState = gameStates.VILLAGE;
    playGame();
  });
}

function playGame() {
  displayStatus();

  switch (currentState) {
    case gameStates.VILLAGE:
      handleVillage();
      break;
    case gameStates.FOREST:
      handleForest();
      break;
    case gameStates.SEA:
      handleSea();
      break;
    default:
      gameTextElement.textContent = "Invalid game state.";
      currentState = gameStates.END;
  }

  if (player.health <= 0) {
    gameTextElement.textContent = "You have fallen in battle. Game over.";
    currentState = gameStates.END;
  }
}

playGame();
