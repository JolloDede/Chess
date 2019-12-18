var Board = /** @class */ (function () {
    function Board() {
        this.scoreWhite = 0;
        this.scoreBlack = 0;
        this.whitePieces = [];
        this.blackPieces = [];
        this.setupPieces();
    }
    Board.prototype.setupPieces = function () {
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
    };
    Board.prototype.show = function () {
        for (var i = 0; i < this.whitePieces.length; i++) {
            this.whitePieces[i].show();
        }
        for (var i = 0; i < this.blackPieces.length; i++) {
            this.blackPieces[i].show();
        }
    };
    Board.prototype.pieceAt = function (x, y) {
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
    };
    Board.prototype.getPieceAt = function (x, y) {
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
    };
    Board.prototype.isDone = function () {
        return this.whitePieces[0].taken || this.blackPieces[0].taken;
    };
    Board.prototype.setScore = function () {
        this.scoreWhite = 0;
        for (var i = 0; i < this.whitePieces.length; i++) {
            if (this.whitePieces[i].taken) {
                this.scoreWhite += this.whitePieces[i].value;
            }
        }
        this.scoreBlack = 0;
        for (var i = 0; i < this.blackPieces.length; i++) {
            if (this.blackPieces[i].taken) {
                this.scoreBlack += this.blackPieces[i].value;
            }
        }
    };
    Board.prototype.movePiece = function (from, to) {
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
    };
    Board.prototype.clone = function () {
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
    };
    Board.prototype.adjustBoards = function (dest) {
        for (var i = 0; i < this.blackPieces.length; i++) {
            if ((this.blackPieces[i].matrixPosition.x != dest.blackPieces[i].matrixPosition.x) || (this.blackPieces[i].matrixPosition.y != dest.blackPieces[i].matrixPosition.y)) {
                this.movePiece(this.blackPieces[i].matrixPosition, dest.blackPieces[i].matrixPosition);
            }
        }
    };
    return Board;
}());
