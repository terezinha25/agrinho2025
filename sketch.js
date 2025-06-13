let isCity = false; // Determina se o jogador está na cidade ou no campo
let player; // Representa o jogador
let seedCount = 0; // Contador de sementes
let toolCount = 0; // Contador de ferramentas
let gameWon = false; // Variável para verificar se o jogador venceu o jogo

function setup() {
  createCanvas(800, 600);
  player = new Player();  // Cria o jogador
}

function draw() {
  background(240);

  // Desenha o ambiente dependendo de qual estado estamos
  if (isCity) {
    drawCity();
  } else {
    drawFarm();
  }

  // Desenha o jogador
  player.update();
  player.display();

  // Exibe as contagens de itens
  fill(255);
  textSize(16);
  text("Sementes: " + seedCount, 10, height - 30);
  text("Ferramentas: " + toolCount, 10, height - 50);

  // Verifica se o jogador venceu o jogo
  if (gameWon) {
    fill(0, 255, 0);
    textSize(32);
    text("Você venceu o jogo!", width / 2 - 150, height / 2);
  }
}

function keyPressed() {
  if (key === 'C' || key === 'c') {
    // Alterna entre cidade e campo
    isCity = !isCity;
  }
}

function drawFarm() {
  // Desenha o campo com cores vivas
  fill(85, 170, 85); // Cor do campo (verde vibrante)
  rect(0, height / 2, width, height / 2); // Solo

  // Árvores no campo com cores diferentes
  fill(139, 69, 19); // Troncos das árvores
  rect(100, height / 2 - 50, 20, 50);
  fill(0, 255, 0); // Folhas das árvores
  ellipse(110, height / 2 - 70, 60, 60);

  fill(139, 69, 19); // Tronco de outra árvore
  rect(200, height / 2 - 60, 20, 60);
  fill(255, 140, 0); // Folhas de árvore laranja
  ellipse(210, height / 2 - 90, 60, 60);

  // Interação com sementes: Quando o jogador passa sobre uma árvore, coleta uma semente
  if (player.x > 80 && player.x < 120 && player.y > height / 2 - 100 && player.y < height / 2 - 50) {
    if (mouseIsPressed && seedCount < 5) {
      seedCount++;
    }
  }
}

function drawCity() {
  // Desenha a cidade com um visual vibrante
  fill(180, 180, 255); // Cor das ruas (azul claro)
  rect(0, height / 2, width, height / 2); // Rua da cidade

  // Prédios na cidade com cores brilhantes
  fill(255, 223, 0); // Cor do prédio 1 (amarelo)
  rect(150, height / 2 - 200, 80, 200); // Prédio 1
  fill(255, 0, 0); // Cor do prédio 2 (vermelho)
  rect(300, height / 2 - 150, 100, 150); // Prédio 2
  fill(0, 255, 255); // Cor do prédio 3 (ciano)
  rect(500, height / 2 - 180, 70, 180); // Prédio 3

  // Interação com ferramentas: Quando o jogador passa sobre um prédio, coleta uma ferramenta
  if (player.x > 140 && player.x < 220 && player.y > height / 2 - 180 && player.y < height / 2 - 100) {
    if (mouseIsPressed && toolCount < 5) {
      toolCount++;
    }
  }
}

class Player {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.size = 30;
    this.speed = 5;
  }

  update() {
    // Movimenta o jogador com as teclas direcionais
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.speed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.speed;
    }
    if (keyIsDown(UP_ARROW)) {
      this.y -= this.speed;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.y += this.speed;
    }

    // Evitar que o jogador saia da tela
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }

  display() {
    fill(255, 0, 0); // Cor do jogador (vermelho)
    ellipse(this.x, this.y, this.size, this.size);
  }
}
