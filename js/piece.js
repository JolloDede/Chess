export class Piece {
    constructor(x, y, isWhite, letter, pic) {
        this.matrixPosition = createVector(x, y);
        this.pixelPositon = createVector(x * Piece.tileSize + Piece.tileSize / 2, y * Piece.tileSize + Piece.tileSize / 2);
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
                image(this.pic, mouseX - 50, mouseY - 50, Piece.tileSize * 1.5, Piece.tileSize * 1.5);
            }
            else {
                //text(this.letter, this.pixelPositon.x, this.pixelPositon.y);
                image(this.pic, this.pixelPositon.x - 50, this.pixelPositon.y - 50, Piece.tileSize, Piece.tileSize);
            }
        }
    }
    move(x, y, board) {
        var attacking = board.getPieceAt(x, y);
        if (attacking != null) {
            attacking.taken = true;
        }
        this.matrixPosition = createVector(x, y);
        this.pixelPositon = createVector(x * Piece.tileSize + Piece.tileSize / 2, y * Piece.tileSize + Piece.tileSize / 2);
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
            if (attacking.white == this.white) {
                return true;
            }
        }
        return false;
    }
    moveTroughPieces(x, y, board) {
        var stepDirectionX = x - this.matrixPosition.x;
        if (stepDirectionX > 0) {
            stepDirectionX = 1;
        }
        else if (stepDirectionX < 0) {
            stepDirectionX = -1;
        }
        var stepDirectionY = y - this.matrixPosition.y;
        if (stepDirectionY > 0) {
            stepDirectionY = 1;
        }
        else if (stepDirectionY < 0) {
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
    setNewLocation(x, y) {
        this.matrixPosition = createVector(x, y);
        this.pixelPositon = createVector(x * Piece.tileSize + Piece.tileSize / 2, y * Piece.tileSize + Piece.tileSize / 2);
    }
}
export class King extends Piece {
    constructor(x, y, isWhite) {
        super(x, y, isWhite, "K", null);
        this.firstTurn = true;
        this.gotAttacked = false;
        if (isWhite) {
            this.pic = King.images[0];
        }
        else {
            this.pic = King.images[6];
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
        if (this.moveTroughPieces(x, y, board)) {
            return false;
        }
        if (abs(x - this.matrixPosition.x) <= 1 && abs(y - this.matrixPosition.y) <= 1) {
            this.firstTurn = false;
            return true;
        }
        // if (this.firstTurn && !this.gotAttacked &&
        //     (abs(x - this.matrixPosition.x) == 2 || abs(x - this.matrixPosition.x) == -2)
        //     && abs(y - this.matrixPosition.y) == 0) {
        //     return true;
        // }
        if (this.firstTurn && !this.gotAttacked && abs(x - this.matrixPosition.x) == 2 && abs(y - this.matrixPosition.y) == 0) {
            return this.rochade(x, this.white, board);
        }
        if (this.firstTurn && !this.gotAttacked && abs(x - this.matrixPosition.x) == -2 && abs(y - this.matrixPosition.y) == 0) {
            return this.rochade(x, this.white, board);
        }
    }
    generateMoves(board) {
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
        return moves;
    }
    clone() {
        var cloneKing = new King(this.matrixPosition.x, this.matrixPosition.y, this.white);
        cloneKing.taken = this.taken;
        return cloneKing;
    }
    rochade(kingX, white, board) {
        if (white) {
            for (let i = 0; i < board.whitePieces.length; i++) {
                if (board.whitePieces[i] instanceof Rook) {
                    if (abs(kingX - board.whitePieces[i].matrixPosition.x) <= 2) {
                        if (board.whitePieces[i].firstTurn) {
                            if (kingX > this.matrixPosition.x) {
                                board.whitePieces[i].setNewLocation(this.matrixPosition.x + 1, this.matrixPosition.y);
                            }
                            else {
                                board.whitePieces[i].setNewLocation(this.matrixPosition.x - 1, this.matrixPosition.y);
                            }
                            return true;
                        }
                    }
                }
            }
        }
        else {
            for (let i = 0; i < board.blackPieces.length; i++) {
                if (board.blackPieces[i] instanceof Rook) {
                    if (abs(kingX - board.blackPieces[i].matrixPosition.x) <= 2) {
                        if (board.blackPieces[i].firstTurn) {
                            if (kingX > this.matrixPosition.x) {
                                board.blackPieces[i].setNewLocation(this.matrixPosition.x + 1, this.matrixPosition.y);
                            }
                            else {
                                board.blackPieces[i].setNewLocation(this.matrixPosition.x - 1, this.matrixPosition.y);
                            }
                            return true;
                        }
                    }
                }
            }
        }
    }
}
export class Queen extends Piece {
    constructor(x, y, isWhite) {
        super(x, y, isWhite, "Q", null);
        if (isWhite) {
            this.pic = Queen.images[1];
        }
        else {
            this.pic = Queen.images[7];
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
        if (this.taken) {
            return [];
        }
        // Horizontal
        for (var i = 0; i < 8; i++) {
            var x = i;
            var y = this.matrixPosition.y;
            if (x != this.matrixPosition.x) {
                if (!this.attackingAllies(x, y, board)) {
                    if (!this.moveTroughPieces(x, y, board)) {
                        moves.push(createVector(x, y));
                    }
                }
            }
        }
        // Vertikal
        for (var i = 0; i < 8; i++) {
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
        for (var i = 0; i < 8; i++) {
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
    clone() {
        var cloneQueen = new Queen(this.matrixPosition.x, this.matrixPosition.y, this.white);
        cloneQueen.taken = this.taken;
        return cloneQueen;
    }
}
export class Rook extends Piece {
    constructor(x, y, isWhite) {
        super(x, y, isWhite, "R", null);
        this.firstTurn = true;
        if (isWhite) {
            this.pic = Rook.images[4];
        }
        else {
            this.pic = Rook.images[10];
        }
        this.value = 5;
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
            this.firstTurn = false;
            return true;
        }
        return false;
    }
    generateMoves(board) {
        var moves = [];
        if (this.taken) {
            return [];
        }
        for (var i = 0; i < 8; i++) {
            var x = i;
            var y = this.matrixPosition.y;
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
    clone() {
        var cloneRook = new Rook(this.matrixPosition.x, this.matrixPosition.y, this.white);
        cloneRook.taken = this.taken;
        return cloneRook;
    }
}
export class Bishop extends Piece {
    constructor(x, y, isWhite) {
        super(x, y, isWhite, "B", null);
        if (isWhite) {
            this.pic = Bishop.images[2];
        }
        else {
            this.pic = Bishop.images[8];
        }
        this.value = 3;
    }
    canMove(x, y, board) {
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
    generateMoves(board) {
        var moves = [];
        if (this.taken) {
            return [];
        }
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
    clone() {
        var cloneBishop = new Bishop(this.matrixPosition.x, this.matrixPosition.y, this.white);
        cloneBishop.taken = this.taken;
        return cloneBishop;
    }
}
export class Knigth extends Piece {
    constructor(x, y, isWhite) {
        super(x, y, isWhite, "Kn", null);
        if (isWhite) {
            this.pic = Knigth.images[3];
        }
        else {
            this.pic = Knigth.images[9];
        }
        this.value = 3;
    }
    canMove(x, y, board) {
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
    generateMoves(board) {
        var moves = [];
        if (this.taken) {
            return [];
        }
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
    clone() {
        var cloneKnight = new Knigth(this.matrixPosition.x, this.matrixPosition.y, this.white);
        cloneKnight.taken = this.taken;
        return cloneKnight;
    }
}
export class Pawn extends Piece {
    constructor(x, y, isWhite) {
        super(x, y, isWhite, "p", null);
        this.firstTurn = true;
        if (isWhite) {
            this.pic = Pawn.images[5];
        }
        else {
            this.pic = Pawn.images[11];
        }
        this.value = 1;
    }
    canMove(x, y, board) {
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
            }
            else {
                return false;
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
    generateMoves(board) {
        var moves = [];
        var x;
        var y;
        if (this.taken) {
            return [];
        }
        for (var i = -1; i < 2; i += 2) {
            x = this.matrixPosition.x + i;
            if (this.white) {
                y = this.matrixPosition.y - 1;
            }
            else {
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
        }
        else {
            y = this.matrixPosition.y + 1;
        }
        if (this.withinBounds(x, y) && !board.pieceAt(x, y)) {
            moves.push(createVector(x, y));
        }
        if (this.firstTurn) {
            x = this.matrixPosition.x;
            if (this.white) {
                y = this.matrixPosition.y - 2;
            }
            else {
                y = this.matrixPosition.y + 2;
            }
            if (this.withinBounds(x, y) && !board.pieceAt(x, y)) {
                if (!this.moveTroughPieces(x, y, board)) {
                    moves.push(createVector(x, y));
                }
            }
        }
        return moves;
    }
    clone() {
        var clonePawn = new Pawn(this.matrixPosition.x, this.matrixPosition.y, this.white);
        clonePawn.taken = this.taken;
        clonePawn.firstTurn = this.firstTurn;
        return clonePawn;
    }
}
