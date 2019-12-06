var board;
var moving = false;
var images = [];
// let ctx;
var RandAI;
var MinAI;
var tileSize = 100;
function setup() {
    createCanvas(800, 800);
    for (var i = 1; i < 10; i++) {
        images.push(loadImage("assets/2000px-Chess_Pieces_Sprite_0" + i + ".png"));
    }
    for (var i = 10; i < 13; i++) {
        images.push(loadImage("assets/2000px-Chess_Pieces_Sprite_" + i + ".png"));
    }
    board = new Board;
}
function draw() {
    if (!board.isDone) {
        background(0);
    }
    else {
        background(100);
        showGrid();
        board.show();
        RandAI = new RandomAI(board);
        MinAI = new MinimaxAI(board);
    }
}
function showGrid() {
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            if ((i + j) % 2 == 1) {
                fill(0);
            }
            else {
                fill(240);
            }
            noStroke();
            rect(i * tileSize, j * tileSize, tileSize, tileSize);
        }
    }
}
var movingPiece;
function mousePressed(event) {
    var x = floor(mouseX / tileSize);
    var y = floor(mouseY / tileSize);
    if (!board.isDone()) {
        if (!moving) {
            movingPiece = board.getPieceAt(x, y);
            if (movingPiece != null) {
                movingPiece.movingThisPiece = true;
                // moving piece show moves
                console.log(movingPiece.generateMoves(board));
            }
            else {
                return;
            }
        }
        else {
            if (movingPiece.canMove(x, y, board)) {
                movingPiece.move(x, y, board);
                console.log(MinAI.getBoardAbsoluteValue(this.board.blackPieces, this.board.whitePieces));
                // var boards = MinAI.createNewBoardsWithMoves();
                // for (var i = 0; i < boards.length; i++) {
                //     console.log(i+1 + ": " + MinAI.getBoardAbsoluteValue(boards[i].blackPieces, boards[i].whitePieces));
                // }
                MinAI.makeMove();
                RandAI.makeMove();
            }
            movingPiece.movingThisPiece = false;
        }
        moving = !moving;
    }
}
