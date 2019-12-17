var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Piece = /** @class */ (function () {
    function Piece(x, y, isWhite, letter, pic) {
        this.matrixPosition = createVector(x, y);
        this.pixelPositon = createVector(x * tileSize + tileSize / 2, y * tileSize + tileSize / 2);
        this.taken = false;
        this.white = isWhite;
        this.letter = letter;
        this.pic = pic;
        this.movingThisPiece = false;
        this.value = 0;
    }
    Piece.prototype.show = function () {
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
            }
            else {
                //text(this.letter, this.pixelPositon.x, this.pixelPositon.y);
                image(this.pic, this.pixelPositon.x - 50, this.pixelPositon.y - 50, tileSize, tileSize);
            }
        }
    };
    Piece.prototype.move = function (x, y, board) {
        var attacking = board.getPieceAt(x, y);
        if (attacking != null) {
            attacking.taken = true;
        }
        this.matrixPosition = createVector(x, y);
        this.pixelPositon = createVector(x * tileSize + tileSize / 2, y * tileSize + tileSize / 2);
    };
    Piece.prototype.withinBounds = function (x, y) {
        if (x >= 0 && y >= 0 && x < 8 && y < 8) {
            return true;
        }
        return false;
    };
    Piece.prototype.attackingAllies = function (x, y, board) {
        var attacking = board.getPieceAt(x, y);
        if (attacking != null) {
            if (attacking.white == this.white) {
                return true;
            }
        }
        return false;
    };
    Piece.prototype.moveTroughPieces = function (x, y, board) {
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
    };
    Piece.prototype.generateNewBoards = function (currentBoard) {
        var boards;
        var moves = this.generateMoves(currentBoard);
        for (var i = 0; i < moves.length; i++) {
            boards[i] = currentBoard.clone();
            boards[i].movePiece(this.matrixPosition, moves[i]);
        }
        return boards;
    };
    return Piece;
}());
var King = /** @class */ (function (_super) {
    __extends(King, _super);
    function King(x, y, isWhite) {
        var _this = _super.call(this, x, y, isWhite, "K", null) || this;
        if (isWhite) {
            _this.pic = images[0];
        }
        else {
            _this.pic = images[6];
        }
        _this.value = 99;
        return _this;
    }
    King.prototype.canMove = function (x, y, board) {
        if (!this.withinBounds(x, y)) {
            return false;
        }
        if (this.attackingAllies(x, y, board)) {
            return false;
        }
        if (abs(x - this.matrixPosition.x) <= 1 && abs(y - this.matrixPosition.y) <= 1) {
            return true;
        }
    };
    King.prototype.generateMoves = function (board) {
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
    };
    King.prototype.clone = function () {
        var cloneKing = new King(this.matrixPosition.x, this.matrixPosition.y, this.white);
        cloneKing.taken = this.taken;
        return cloneKing;
    };
    return King;
}(Piece));
var Queen = /** @class */ (function (_super) {
    __extends(Queen, _super);
    function Queen(x, y, isWhite) {
        var _this = _super.call(this, x, y, isWhite, "Q", null) || this;
        if (isWhite) {
            _this.pic = images[1];
        }
        else {
            _this.pic = images[7];
        }
        _this.value = 9;
        return _this;
    }
    Queen.prototype.canMove = function (x, y, board) {
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
    };
    Queen.prototype.generateMoves = function (board) {
        var moves = [];
        if (this.taken) {
            return moves;
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
    };
    Queen.prototype.clone = function () {
        var cloneQueen = new Queen(this.matrixPosition.x, this.matrixPosition.y, this.white);
        cloneQueen.taken = this.taken;
        return cloneQueen;
    };
    return Queen;
}(Piece));
var Rook = /** @class */ (function (_super) {
    __extends(Rook, _super);
    function Rook(x, y, isWhite) {
        var _this = _super.call(this, x, y, isWhite, "R", null) || this;
        if (isWhite) {
            _this.pic = images[4];
        }
        else {
            _this.pic = images[10];
        }
        _this.value = 5;
        return _this;
    }
    Rook.prototype.canMove = function (x, y, board) {
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
    };
    Rook.prototype.generateMoves = function (board) {
        var moves = [];
        if (this.taken) {
            return moves;
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
    };
    Rook.prototype.clone = function () {
        var cloneRook = new Rook(this.matrixPosition.x, this.matrixPosition.y, this.white);
        cloneRook.taken = this.taken;
        return cloneRook;
    };
    return Rook;
}(Piece));
var Bishop = /** @class */ (function (_super) {
    __extends(Bishop, _super);
    function Bishop(x, y, isWhite) {
        var _this = _super.call(this, x, y, isWhite, "B", null) || this;
        if (isWhite) {
            _this.pic = images[2];
        }
        else {
            _this.pic = images[8];
        }
        _this.value = 3;
        return _this;
    }
    Bishop.prototype.canMove = function (x, y, board) {
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
    };
    Bishop.prototype.generateMoves = function (board) {
        var moves = [];
        if (this.taken) {
            return moves;
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
    };
    Bishop.prototype.clone = function () {
        var cloneBishop = new Bishop(this.matrixPosition.x, this.matrixPosition.y, this.white);
        cloneBishop.taken = this.taken;
        return cloneBishop;
    };
    return Bishop;
}(Piece));
var Knigth = /** @class */ (function (_super) {
    __extends(Knigth, _super);
    function Knigth(x, y, isWhite) {
        var _this = _super.call(this, x, y, isWhite, "Kn", null) || this;
        if (isWhite) {
            _this.pic = images[3];
        }
        else {
            _this.pic = images[9];
        }
        _this.value = 3;
        return _this;
    }
    Knigth.prototype.canMove = function (x, y, board) {
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
    };
    Knigth.prototype.generateMoves = function (board) {
        var moves = [];
        if (this.taken) {
            return moves;
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
    };
    Knigth.prototype.clone = function () {
        var cloneKnight = new Knigth(this.matrixPosition.x, this.matrixPosition.y, this.white);
        cloneKnight.taken = this.taken;
        return cloneKnight;
    };
    return Knigth;
}(Piece));
var Pawn = /** @class */ (function (_super) {
    __extends(Pawn, _super);
    function Pawn(x, y, isWhite) {
        var _this = _super.call(this, x, y, isWhite, "p", null) || this;
        _this.firstTurn = true;
        if (isWhite) {
            _this.pic = images[5];
        }
        else {
            _this.pic = images[11];
        }
        _this.value = 1;
        return _this;
    }
    Pawn.prototype.canMove = function (x, y, board) {
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
    };
    Pawn.prototype.generateMoves = function (board) {
        var moves = [];
        var x;
        var y;
        if (this.taken) {
            return moves;
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
    };
    Pawn.prototype.clone = function () {
        var clonePawn = new Pawn(this.matrixPosition.x, this.matrixPosition.y, this.white);
        clonePawn.taken = this.taken;
        clonePawn.firstTurn = this.firstTurn;
        return clonePawn;
    };
    return Pawn;
}(Piece));
