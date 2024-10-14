const celulas = document.querySelectorAll(".celula");
let vezDoSonic = true; // variável para controlar de quem é a vez
let jogoAtivo = true; // variável para controlar se o jogo está ativo

// Cominações que levam à vitória
const combinacoesVencedoras = [
  [0, 1, 2], // Linha de cima
  [3, 4, 5], // Linha do meio
  [6, 7, 8], // Linha de baixo
  [0, 3, 6], // Coluna da esquerda
  [1, 4, 7], // Coluna do meio
  [2, 5, 8], // Coluna da direita
  [0, 4, 8], // Diagonal principal
  [2, 4, 6], // Diagonal secundária
];

// Adicionando evento de clique em cada célula
celulas.forEach((celula) => {
  celula.addEventListener("click", () => {
    if (
      !celula.classList.contains("sonic") &&
      !celula.classList.contains("shadow") &&
      jogoAtivo
    ) {
      celula.classList.add(vezDoSonic ? "sonic" : "shadow");
      checarVencedor();
      checarEmpate();
      vezDoSonic = !vezDoSonic;
    }
  });
});

// Função para verificar o vencedor
function checarVencedor() {
  combinacoesVencedoras.forEach((combinacao) => {
    const [a, b, c] = combinacao;
    if (
      celulas[a].classList.contains("sonic") &&
      celulas[b].classList.contains("sonic") &&
      celulas[c].classList.contains("sonic")
    ) {
      jogoAtivo = false;
      setTimeout(() => alert("Sonic venceu!"), 100);
    } else if (
      celulas[a].classList.contains("shadow") &&
      celulas[b].classList.contains("shadow") &&
      celulas[c].classList.contains("shadow")
    ) {
      jogoAtivo = false;
      setTimeout(() => alert("Shadow venceu!"), 100);
    }
  });
}

// Função para reiniciar o jogo
function reiniciarJogo() {
  celulas.forEach((celula) => {
    celula.classList.remove("sonic", "shadow");
  });
  vezDoSonic = true;
  jogoAtivo = true; // Reativa o jogo
}

// Função para checar empate
function checarEmpate() {
  const todasPreenchidas = Array.from(celulas).every(
    (celula) =>
      celula.classList.contains("sonic") || celula.classList.contains("shadow")
  );
  if (todasPreenchidas && jogoAtivo) {
    setTimeout(() => {
      alert("Empate! Vamos jogar de novo!");
      reiniciarJogo();
    }, 100);
  }
}

document.getElementById("reiniciar").addEventListener("click", reiniciarJogo);
