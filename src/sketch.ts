// var createVector = createVector();
// var createCanvas = createCanvas();
// var loadImage = loadImage();
// var background = background();
// var fill = fill();
// var noStroke = noStroke();
// var rect = rect();
// var floor = floor();
// var abs = abs();
// var image = image();
// var e = window.event;
//
// var posX = e.clientX;
// var posY = e.clientY;
//
interface Vektor{
    x: number
    y: number;
}

// here to Setup ends
// <reference path="../node_modules/@types/p5/index.d.ts" />

var board: Board;
var moving = false;
var images = [];
// let ctx;
var AI: RandomAI;
var testAI: MinimaxAI;

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
    } else {
        background(100);
        showGrid();
        board.show();
        AI = new RandomAI(board);
        testAI = new MinimaxAI(board);
    }
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
            rect(i * tileSize, j * tileSize, tileSize, tileSize);
        }
    }
}

function mousePressed(event?: object): void {
    let x = floor(mouseX / tileSize);
    let y = floor(mouseY / tileSize);
    let movingPiece: Piece;
    if (!board.isDone()) {
        if (!moving) {
            movingPiece = board.getPieceAt(x, y);
            if (movingPiece != null) {
                movingPiece.movingThisPiece = true;
                // moving piece show moves
                console.log(movingPiece.generateMoves(board));
            } else {
                return;
            }
        } else {
            if (movingPiece.canMove(x, y, board)) {
                movingPiece.move(x, y, board);
                console.log(testAI.getBoardAbsoluteValue(this.board.blackPieces, this.board.whitePieces));
                // var boards = testAI.createNewBoardsWithMoves();
                // for (var i = 0; i < boards.length; i++) {
                //     console.log(i+1 + ": " + testAI.getBoardAbsoluteValue(boards[i].blackPieces, boards[i].whitePieces));
                // }
                testAI.makeMove();
                AI.makeMove();
            }
            movingPiece.movingThisPiece = false;
        }
        moving = !moving;
    }
}
