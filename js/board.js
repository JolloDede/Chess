import { King, Rook, Knigth, Bishop, Queen, Pawn } from 'piece';
export class Board {
    constructor() {
        this.scoreWhite = 0;
        this.scoreBlack = 0;
        this.whitePieces = [];
        this.blackPieces = [];
        this.setupPieces();
    }
    setupPieces() {
        this.whitePieces.push(new King(4, 7, true));
        this.whitePieces.push(new Rook(0, 7, true));
        this.whitePieces.push(new Rook(7, 7, true));
        this.whitePieces.push(new Knigth(1, 7, true));
        this.whitePieces.push(new Knigth(6, 7, true));
        this.whitePieces.push(new Bishop(2, 7, true));
        this.whitePieces.push(new Bishop(5, 7, true));
        this.whitePieces.push(new Queen(3, 7, true));
        for (var i = 0; i < 8; i++) {
            this.whitePieces.push(new Pawn(i, 6, true));
        }
        this.blackPieces.push(new King(4, 0, false));
        this.blackPieces.push(new Rook(0, 0, false));
        this.blackPieces.push(new Rook(7, 0, false));
        this.blackPieces.push(new Knigth(1, 0, false));
        this.blackPieces.push(new Knigth(6, 0, false));
        this.blackPieces.push(new Bishop(2, 0, false));
        this.blackPieces.push(new Bishop(5, 0, false));
        this.blackPieces.push(new Queen(3, 0, false));
        for (var i = 0; i < 8; i++) {
            this.blackPieces.push(new Pawn(i, 1, false));
        }
    }
    show() {
        for (var i = 0; i < this.whitePieces.length; i++) {
            this.whitePieces[i].show();
        }
        for (var i = 0; i < this.blackPieces.length; i++) {
            this.blackPieces[i].show();
        }
    }
    pieceAt(x, y) {
        for (var i = 0; i < this.whitePieces.length; i++) {
            if (this.whitePieces[i].matrixPosition.x == x && this.whitePieces[i].matrixPosition.y == y) {
                if (!this.whitePieces[i].taken) {
                    return true;
                }
            }
        }
        for (var i = 0; i < this.blackPieces.length; i++) {
            if (this.blackPieces[i].matrixPosition.x == x && this.blackPieces[i].matrixPosition.y == y) {
                if (!this.blackPieces[i].taken) {
                    return true;
                }
            }
        }
        return false;
    }
    getPieceAt(x, y) {
        for (var i = 0; i < this.whitePieces.length; i++) {
            if (!this.whitePieces[i].taken && this.whitePieces[i].matrixPosition.x == x && this.whitePieces[i].matrixPosition.y == y) {
                return this.whitePieces[i];
            }
        }
        for (var i = 0; i < this.blackPieces.length; i++) {
            if (!this.blackPieces[i].taken && this.blackPieces[i].matrixPosition.x == x && this.blackPieces[i].matrixPosition.y == y) {
                return this.blackPieces[i];
            }
        }
        return null;
    }
    isDone() {
        return this.whitePieces[0].taken || this.blackPieces[0].taken;
    }
    setScore() {
        this.scoreWhite = 0;
        for (var i = 0; i < this.whitePieces.length; i++) {
            if (this.whitePieces[i].taken) {
                this.scoreBlack += this.whitePieces[i].value;
            }
        }
        this.scoreBlack = 0;
        for (var i = 0; i < this.blackPieces.length; i++) {
            if (this.blackPieces[i].taken) {
                this.scoreWhite += this.blackPieces[i].value;
            }
        }
        this.showScore();
    }
    showScore() {
        document.getElementById("scoreWhite").innerText = str(this.scoreWhite);
        document.getElementById("scoreBlack").innerText = str(this.scoreBlack);
    }
    movePiece(from, to) {
        var piece = this.getPieceAt(from.x, from.y);
        if (piece == null) {
            console.log(from.x + " " + from.y);
            for (var i = 0; i < this.blackPieces.length; i++) {
                console.log(this.blackPieces[i].matrixPosition.x + " " + this.blackPieces[i].matrixPosition.y);
                this.getPieceAt(from.x, from.y);
            }
        }
        if (piece.canMove(to.x, to.y, this)) {
            piece.move(to.x, to.y, this);
        }
    }
    clone() {
        var clone = new Board();
        var i;
        for (i = 0; i < this.whitePieces.length; i++) {
            clone.whitePieces[i].matrixPosition.x = this.whitePieces[i].matrixPosition.x;
            clone.whitePieces[i].matrixPosition.y = this.whitePieces[i].matrixPosition.y;
            clone.whitePieces[i].taken = this.whitePieces[i].taken;
        }
        for (i = 0; i < this.blackPieces.length; i++) {
            clone.blackPieces[i].matrixPosition.x = this.blackPieces[i].matrixPosition.x;
            clone.blackPieces[i].matrixPosition.y = this.blackPieces[i].matrixPosition.y;
            clone.blackPieces[i].taken = this.blackPieces[i].taken;
        }
        return clone;
    }
    adjustBoards(dest) {
        for (let i = 0; i < this.blackPieces.length; i++) {
            if ((this.blackPieces[i].matrixPosition.x != dest.blackPieces[i].matrixPosition.x) || (this.blackPieces[i].matrixPosition.y != dest.blackPieces[i].matrixPosition.y)) {
                this.movePiece(this.blackPieces[i].matrixPosition, dest.blackPieces[i].matrixPosition);
            }
        }
    }
    kingUnderAttack(king) {
        let pieces;
        let moves = [];
        if (king.white) {
            pieces = this.blackPieces;
        }
        else {
            pieces = this.whitePieces;
        }
        for (let i = 0; i < pieces.length; i++) {
            moves = pieces[i].generateMoves(this);
            for (let i = 0; i < moves.length; i++) {
                moves[i].x;
                if (king.matrixPosition.x == moves[i].x && king.matrixPosition.y == moves[i].y) {
                    return true;
                }
            }
        }
        return false;
    }
}
