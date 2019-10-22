var board;
var moving = false;

var titleSize = 100;

function setup() {
  createCanvas(800, 800);
  board = new Board;
}

function draw() {
  background(100);
  showGrid();
  board.show();
}

function showGrid() {
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      if ((i + j) % 2 == 1) {
        fill(0);
      } else {
        fill(240);
      }
      noStroke();
      rect(i * titleSize, j * titleSize, titleSize, titleSize);
    }
  }
}

function mousePressed() {
  var x = floor(mouseX / titleSize);
  var y = floor(mouseY / titleSize);
  if (!board.isDone()) {
    if (!moving) {
      movingPiece = board.getPieceAt(x, y);
      if (movingPiece != null) {
        movingPiece.movingThisPiece = true;
      } else {
        return;
      }
    } else {
      if (movingPiece.canMove(x, y, board)) {
        movingPiece.move(x, y, board);
      }
      movingPiece.movingThisPiece = false;
    }
    moving = !moving;
  }
}
