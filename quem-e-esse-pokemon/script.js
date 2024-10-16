let currentPokemon = "";
let options = [];
let score = 0;
let loading = false;

// Função para habilitar/desabilitar os botões e o loading
function toggleLoading() {
  loading = !loading;
  document.getElementById("loading").classList.toggle("show", loading);
  document.getElementById("pokemon-image").classList.toggle("hidden", loading);
}

// Função para habilitar os botões
function enableButtons() {
  document
    .querySelectorAll(".option")
    .forEach((opcao) => (opcao.disabled = false));

  document.getElementById("reset-game").disabled = false;
}

// Função para desabilitar os botões
function disableButtons() {
  document
    .querySelectorAll(".option")
    .forEach((opcao) => (opcao.disabled = true));

  document.getElementById("reset-game").disabled = true;
}

// Função para gerar as 3 opções
async function generateOptions(correctName) {
  await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=898`)
    .then((response) => response.json())
    .then((data) => {
      const names = data.results.map((pokemon) => pokemon.name);
      const incorrectOptions = names.filter((name) => name !== correctName);
      options = [
        correctName,
        incorrectOptions[Math.floor(Math.random() * incorrectOptions.length)],
        incorrectOptions[Math.floor(Math.random() * incorrectOptions.length)],
      ];

      options.sort(() => Math.random() - 0.5);

      document.getElementById("option1").textContent = options[0];
      document.getElementById("option2").textContent = options[1];
      document.getElementById("option3").textContent = options[2];

      toggleLoading();
      enableButtons();
    });
}

// Função para buscar um Pokémon aleatório e suas opções
async function searchRandomPokemon() {
  toggleLoading();
  disableButtons();
  const randomId = Math.floor(Math.random() * 898) + 1;

  await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("pokemon-image").src =
        data.sprites.other["official-artwork"].front_default;
      currentPokemon = data.name;

      generateOptions(data.name);
    });
}

// Função para reiniciar o jogo
function resetGame() {
  score = 0;
  document.getElementById("score").textContent = `Placar: ${score}`;
  document.getElementById("result").textContent = "";
  searchRandomPokemon();
}

document.getElementById("reset-game").addEventListener("click", resetGame);

// Função para verificar a escolha
document.querySelectorAll(".option").forEach((opcao) => {
  opcao.addEventListener("click", function () {
    if (this.textContent === currentPokemon) {
      score++;
      document.getElementById("score").textContent = `Placar: ${score}`;
      document.getElementById("result").textContent = "Você acertou! 🎉";

      setTimeout(() => {
        document.getElementById("result").textContent = "";
      }, 1000);

      searchRandomPokemon();
    } else {
      document.getElementById("score").textContent = `Placar: ${score}`;
      document.getElementById(
        "result"
      ).textContent = `Errou! O nome certo era ${currentPokemon}.`;
      disableButtons();
      setTimeout(() => {
        resetGame();
      }, 500);
    }
  });
});

// Inicializa o jogo
searchRandomPokemon();
