const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Configurações do jogo
const cellSize = 40; // Tamanho de cada bloco
const mapWidth = canvas.width / cellSize;
const mapHeight = canvas.height / cellSize;

// Jogador
const player = {
  x: 1,
  y: 1,
  color: "black", // Boné preto
  hasCar: false,
  itemsCollected: 0,
};

// Itens
const items = [
  { x: 5, y: 5, collected: false },
  { x: 10, y: 7, collected: false },
  { x: 3, y: 12, collected: false },
];

// Ponto final (o carro)
const car = { x: 15, y: 12 };

// Mapa do labirinto
const map = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

// Desenha o mapa
function drawMap() {
  for (let y = 0; y < mapHeight; y++) {
    for (let x = 0; x < mapWidth; x++) {
      ctx.fillStyle = map[y][x] === 1 ? "#8B4513" : "#ADFF2F"; // Paredes e grama
      ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}

// Desenha o jogador
function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x * cellSize, player.y * cellSize, cellSize, cellSize);
}

// Desenha os itens
function drawItems() {
  items.forEach((item) => {
    if (!item.collected) {
      ctx.fillStyle = "blue";
      ctx.fillRect(
        item.x * cellSize + 10,
        item.y * cellSize + 10,
        cellSize - 20,
        cellSize - 20
      );
    }
  });
}

// Desenha o carro
function drawCar() {
  ctx.fillStyle = "red";
  ctx.fillRect(car.x * cellSize, car.y * cellSize, cellSize, cellSize);
}

// Atualiza a tela
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMap();
  drawItems();
  drawCar();
  drawPlayer();
}

// Movimento do jogador
document.addEventListener("keydown", (e) => {
  let newX = player.x;
  let newY = player.y;

  if (e.key === "ArrowUp") newY--;
  if (e.key === "ArrowDown") newY++;
  if (e.key === "ArrowLeft") newX--;
  if (e.key === "ArrowRight") newX++;

  if (map[newY][newX] === 0) {
    player.x = newX;
    player.y = newY;

    // Verifica se pegou um item
    items.forEach((item) => {
      if (item.x === player.x && item.y === player.y && !item.collected) {
        item.collected = true;
        player.itemsCollected++;
      }
    });

    // Verifica vitória
    if (
      player.x === car.x &&
      player.y === car.y &&
      player.itemsCollected === items.length
    ) {
      player.hasCar = true;
      alert("Parabéns! Você lavou o carro e venceu o jogo!");
      window.location.reload();
    }
  }

  update();
});

// Inicializa o jogo
update();