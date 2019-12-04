abstract class Piece {
    matrixPosition;
    pixelPositon;
    taken: boolean;
    white: boolean;
    letter: string;
    pic: ImageData;
    movingThisPiece: boolean;
    value: number;
    constructor(x: number, y: number, isWhite: boolean, letter: string, pic) {
        this.matrixPosition = createVector(x, y);
        this.pixelPositon = createVector(x * tileSize + tileSize / 2, y * tileSize + tileSize / 2);

        this.taken = false;
        this.white = isWhite;
        this.letter = letter;
        this.pic = pic;
        this.movingThisPiece = false;
        this.value = 0;
    }

    show() {
        if (!this.taken) {
            //textSize(40);
            //strokeWeight(10);
            //if (this.white) {
            //  fill(255);
            //  stroke(0);
            //} else {
            //  fill(30);
            //  stroke(255);
            //}
            //textAlign(CENTER, CENTER);
            if (this.movingThisPiece) {
                //text(this.letter, mouseX, mouseY);
                image(this.pic, mouseX - 50, mouseY - 50, tileSize * 1.5, tileSize * 1.5);
            } else {
                //text(this.letter, this.pixelPositon.x, this.pixelPositon.y);
                image(this.pic, this.pixelPositon.x - 50, this.pixelPositon.y - 50, tileSize, tileSize);
            }
        }
    }

    move(x, y, board) {
        var attacking = board.getPieceAt(x, y);
        if (attacking != null) {
            attacking.taken = true;
        }
        this.matrixPosition = createVector(x, y);
        this.pixelPositon = createVector(x * tileSize + tileSize / 2, y * tileSize + tileSize / 2);
    }

    withinBounds(x, y) {
        if (x >= 0 && y >= 0 && x < 8 && y < 8) {
            return true;
        }
        return false;
    }

    attackingAllies(x, y, board) {
        var attacking = board.getPieceAt(x, y);
        if (attacking != null) {
            if (attacking.white == this.white ) {
                return true;
            }
        }
        return false;
    }

    moveTroughPieces(x, y, board) {
        var stepDirectionX = x - this.matrixPosition.x;
        if (stepDirectionX > 0) {
            stepDirectionX = 1;
        } else if (stepDirectionX < 0) {
            stepDirectionX = -1;
        }
        var stepDirectionY = y - this.matrixPosition.y;
        if (stepDirectionY > 0) {
            stepDirectionY = 1;
        } else if (stepDirectionY < 0) {
            stepDirectionY = -1;
        }
        var tempPos = createVector(this.matrixPosition.x, this.matrixPosition.y);
        tempPos.x += stepDirectionX;
        tempPos.y += stepDirectionY;
        while (tempPos.x != x || tempPos.y != y) {
            if (!this.withinBounds(tempPos.x, tempPos.y)) {
                return false;
            }
            if (board.pieceAt(tempPos.x, tempPos.y)) {
                return true;
            }
            tempPos.x += stepDirectionX;
            tempPos.y += stepDirectionY;
        }
        return false;
    }

    generateNewBoards(currentBoard: Board){
        var boards = [];
        var moves = this.generateMoves(currentBoard);
        for (var i = 0; i < moves.length; i++) {
            boards[i] = currentBoard.clone();
            boards[i].move(this.matrixPosition, moves[i]);
        }
        return boards;
    }

    abstract generateMoves(board: Board): moves;

}

class King extends Piece {
    constructor(x: Number, y: Number, isWhite: boolean) {
        super(x, y, isWhite, "K");
        if (isWhite) {
            this.pic = images[0];
        } else {
            this.pic = images[6];
        }
        this.value = 99;
    }

    canMove(x, y, board) {
        if (!this.withinBounds(x, y)) {
            return false;
        }
        if (this.attackingAllies(x, y, board)) {
            return false;
        }
        if (abs(x - this.matrixPosition.x) <= 1 && abs(y - this.matrixPosition.y) <= 1) {
            return true;
        }
    }

    generateMoves(board: Board) {
        var moves = [];
        for (var i = -1; i < 2; i++) {
            for (var j = -1; j < 2; j++) {
                var x = this.matrixPosition.x + i;
                var y = this.matrixPosition.y + j;
                if (this.withinBounds(x, y)) {
                    if (!this.attackingAllies(x, y, board)) {
                        moves.push(createVector(x, y));
                    }
                }
            }
        }
        // console.log(moves);
        return moves;
    }

    clone(){
        var cloneKing = new King(this.matrixPosition.x, this.matrixPosition.y, this.white);
        cloneKing.taken = this.taken;
        return cloneKing;
    }

}

class Queen extends Piece {
    constructor(x, y, isWhite) {
        super(x, y, isWhite, "Q");
        if (isWhite) {
            this.pic = images[1];
        } else {
            this.pic = images[7];
        }
        this.value = 9;
    }

    canMove(x, y, board) {
        if (!this.withinBounds(x, y)) {
            return false;
        }
        if (this.attackingAllies(x, y, board)) {
            return false;
        }
        if (x == this.matrixPosition.x || y == this.matrixPosition.y) {
            if (this.moveTroughPieces(x, y, board)) {
                return false;
            }
            return true;
        }
        if (abs(x - this.matrixPosition.x) == abs(y - this.matrixPosition.y)) {
            if (this.moveTroughPieces(x, y, board)) {
                return false;
            }
            return true;
        }
        return false;
    }

    generateMoves(board) {
        var moves = [];
        // Horizontal
        for (var i = 0; i < 8; i++) {
            var x: number = i;
            var y: number = this.matrixPosition.y;
            if (x != this.matrixPosition.x) {
                if (!this.attackingAllies(x, y, board)) {
                    if (!this.moveTroughPieces(x, y, board)) {
                        moves.push(createVector(x, y));
                    }
                }
            }
        }
        // Vertikal
        for (var i: number = 0; i < 8; i++) {
            x = this.matrixPosition.x;
            y = i;
            if (y != this.matrixPosition.y) {
                if (!this.attackingAllies(x, y, board)) {
                    if (!this.moveTroughPieces(x, y, board)) {
                        moves.push(createVector(x, y));
                    }
                }
            }
        }
        // Diagonal
        for (var i: number = 0; i < 8; i++) {
            x = i;
            y = this.matrixPosition.y - (this.matrixPosition.x - 1);
            if (i != this.matrixPosition.x) {
                if (this.withinBounds(x, y)) {
                    if (!this.attackingAllies(x, y, board)) {
                        if (!this.moveTroughPieces(x, y, board)) {
                            moves.push(createVector(x, y));
                        }
                    }
                }

            }
        }

        for (var i = 0; i < 8; i++) {
            x = this.matrixPosition.x - (this.matrixPosition.y - i);
            y = i;
            if (i != this.matrixPosition.y) {
                if (this.withinBounds(x, y)) {
                    if (!this.attackingAllies(x, y, board)) {
                        if (!this.moveTroughPieces(x, y, board)) {
                            moves.push(createVector(x, y));
                        }
                    }
                }
            }
        }
        return moves;
    }

    clone(){
        var cloneQueen = new Queen(this.matrixPosition.x, this.matrixPosition.y, this.white);
        cloneQueen.taken = this.taken;
        return cloneQueen;
    }

}

class Rook extends Piece {
    constructor(x: number, y: number, isWhite: boolean) {
        super(x, y, isWhite, "R");
        if (isWhite) {
            this.pic = images[4];
        } else {
            this.pic = images[10];
        }
        this.value = 5;
    }

    canMove(x: number, y: number, board: Board) {
        if (!this.withinBounds(x, y)) {
            return false;
        }
        if (this.attackingAllies(x, y, board)) {
            return false;
        }
        if (x == this.matrixPosition.x || y == this.matrixPosition.y) {
            if (this.moveTroughPieces(x, y, board)) {
                return false;
            }
            return true;
        }
        return false;
    }

    generateMoves(board: Board) {
        var moves = [];
        for (var i = 0; i < 8; i++) {
            var x: number = i;
            var y: number = this.matrixPosition.y;
            if (i != this.matrixPosition.x) {
                if (!this.attackingAllies(x, y, board)) {
                    if (!this.moveTroughPieces(x, y, board)) {
                        moves.push(createVector(x, y));
                    }
                }
            }
        }

        for (var i = 0; i < 8; i++) {
            x = this.matrixPosition.x;
            y = i;
            if (i != this.matrixPosition.y) {
                if (!this.attackingAllies(x, y, board)) {
                    if (!this.moveTroughPieces(x, y, board)) {
                        moves.push(createVector(x, y));
                    }
                }
            }
        }
        return moves;
    }

    clone(){
        var cloneRook = new Rook(this.matrixPosition.x, this.matrixPosition.y, this.white);
        cloneRook.taken = this.taken;
        return cloneRook;
    }

}

class Bishop extends Piece {
    constructor(x: number, y: number, isWhite: boolean) {
        super(x, y, isWhite, "B");
        if (isWhite) {
            this.pic = images[2];
        } else {
            this.pic = images[8];
        }
        this.value = 3;
    }

    canMove(x: number, y: number, board: Board) {
        if (!this.withinBounds(x, y)) {
            return false;
        }
        if (this.attackingAllies(x, y, board)) {
            return false;
        }
        if (abs(x - this.matrixPosition.x) == abs(y - this.matrixPosition.y)) {
            if (this.moveTroughPieces(x, y, board)) {
                return false;
            }
            return true;
        }
        return false;
    }

    generateMoves(board: Board) {
        var moves = [];
        for (var i = 0; i < 8; i++) {
            var x = i;
            var y = this.matrixPosition.y - (this.matrixPosition.x - i);
            if (i != this.matrixPosition.x) {
                if (this.withinBounds(x, y)) {
                    if (!this.attackingAllies(x, y, board)) {
                        if (!this.moveTroughPieces(x, y, board)) {
                            moves.push(createVector(x, y));
                        }
                    }
                }
            }
        }

        for (var i = 0; i < 8; i++) {
            var x = this.matrixPosition.x - (this.matrixPosition.y - i);
            var y = i;
            if (i != this.matrixPosition.y) {
                if (this.withinBounds(x, y)) {
                    if (!this.attackingAllies(x, y, board)) {
                        if (!this.moveTroughPieces(x, y, board)) {
                            moves.push(createVector(x, y));
                        }
                    }
                }
            }
        }
        return moves;
    }

    clone(){
        var cloneBishop = new Bishop(this.matrixPosition.x, this.matrixPosition.y, this.white);
        cloneBishop.taken = this.taken;
        return cloneBishop;
    }

}

class Knigth extends Piece {
    constructor(x: number, y: number, isWhite: boolean) {
        super(x, y, isWhite, "Kn");
        if (isWhite) {
            this.pic = images[3];
        } else {
            this.pic = images[9];
        }
        this.value = 3;
    }

    canMove(x: number, y: number, board: Board) {
        if (!this.withinBounds(x, y)) {
            return false;
        }
        if (this.attackingAllies(x, y, board)) {
            return false;
        }
        if (abs(x - this.matrixPosition.x) == 1 && abs(y - this.matrixPosition.y) == 2 ||
            abs(x - this.matrixPosition.x) == 2 && abs(y - this.matrixPosition.y) == 1) {
            return true;
        }
        return false;
    }

    generateMoves(board: Board) {
        var moves = [];
        for (var i = -2; i < 3; i += 4) {
            for (var j = -1; j < 2; j += 2) {
                var x = this.matrixPosition.x + i;
                var y = this.matrixPosition.y + j;
                if (this.withinBounds(x, y)) {
                    if (!this.attackingAllies(x, y, board)) {
                        moves.push(createVector(x, y));
                    }
                }
            }
        }

        for (var i = -1; i < 2; i += 2) {
            for (var j = -2; j < 3; j += 4) {
                var x = this.matrixPosition.x + i;
                var y = this.matrixPosition.y + j;
                if (this.withinBounds(x, y)) {
                    if (!this.attackingAllies(x, y, board)) {
                        moves.push(createVector(x, y));
                    }
                }
            }
        }
        return moves;
    }

    clone(){
        var cloneKnight = new Knigth(this.matrixPosition.x, this.matrixPosition.y, this.white);
        cloneKnight.taken = this.taken;
        return cloneKnight;
    }

}

class Pawn extends Piece {
    firstTurn: boolean;
    constructor(x: number, y: number, isWhite: boolean) {
        super(x, y, isWhite, "p");
        this.firstTurn = true;
        if (isWhite) {
            this.pic = images[5];
        } else {
            this.pic = images[11];
        }
        this.value = 1;
    }

    canMove(x: number, y: number, board: Board) {
        if (!this.withinBounds(x, y)) {
            return false;
        }
        if (this.attackingAllies(x, y, board)) {
            return false;
        }
        var attacking = board.pieceAt(x, y);
        if (attacking) {
            if (abs(x - this.matrixPosition.x) == abs(y - this.matrixPosition.y) &&
                ((this.white && (y - this.matrixPosition.y) == -1) || (!this.white && (y - this.matrixPosition.y) == 1))) {
                this.firstTurn = false;
                return true;
            } else {
                return false
            }
        }
        if (x - this.matrixPosition.x != 0) {
            return false;
        }
        if (this.white) {
            if (y - this.matrixPosition.y == -1) {
                return true;
            }
            if (this.firstTurn && y - this.matrixPosition.y == -2) {
                if (this.moveTroughPieces(x, y, board)) {
                    return false;
                }
                this.firstTurn = false;
                return true;
            }
        }
        if (!this.white) {
            if (y - this.matrixPosition.y == 1) {
                return true;
            }
            if (this.firstTurn && y - this.matrixPosition.y == 2) {
                if (this.moveTroughPieces(x, y, board)) {
                    return false;
                }
                this.firstTurn = false;
                return true;
            }
        }
        return false;
    }

    generateMoves(board: Board) {
        var moves = [];
        var x: number;
        var y: number;
        for (var i = -1; i < 2; i += 2) {
            x = this.matrixPosition.x + i;
            if (this.white) {
                y = this.matrixPosition.y - 1;
            } else {
                y = this.matrixPosition.y + 1;
            }
            var attacking = board.pieceAt(x, y);
            if (attacking) {
                if (!this.attackingAllies(x, y, board)) {
                    moves.push(createVector(x, y));
                }
            }
        }

        x = this.matrixPosition.x;
        if (this.white) {
            y = this.matrixPosition.y - 1;
        }else {
            y = this.matrixPosition.y + 1;
        }
        if (this.withinBounds(x,y) && !board.pieceAt(x,y)) {
            moves.push(createVector(x,y));
        }

        if (this.firstTurn) {
            x = this.matrixPosition.x;
            if (this.white) {
                y = this.matrixPosition.y - 2;
            }else {
                y = this.matrixPosition.y + 2;
            }
            if (this.withinBounds(x,y) && !board.pieceAt(x,y)) {
                if (!this.moveTroughPieces(x,y,board)) {
                    moves.push(createVector(x,y));
                }
            }
        }
        return moves;
    }

    clone(){
        var clonePawn = new Pawn(this.matrixPosition.x, this.matrixPosition.y, this.white);
        clonePawn.taken = this.taken;
        clonePawn.firstTurn = this.firstTurn;
        return clonePawn;
    }

}
