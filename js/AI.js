var MyNode = /** @class */ (function () {
    function MyNode(value) {
        this.value = value;
        this.childNodes = [];
    }
    MyNode.prototype.addSubNode = function (value) {
        this.childNodes.push(value);
    };
    return MyNode;
}());
var RandomAI = /** @class */ (function () {
    function RandomAI(board) {
        this.pieces = board.blackPieces;
        this.board = board;
    }
    RandomAI.prototype.makeMove = function () {
        var piecesP = this.pieces;
        var moves = [];
        this.pieces = [];
        for (var i = 0; i < piecesP.length; i++) {
            if (!piecesP[i].taken) {
                this.pieces.push(piecesP[i]);
            }
        }
        for (var i = 0; i < this.pieces.length; i++) {
            moves = this.pieces[i].generateMoves(this.board);
            for (var j = 0; j < moves.length; j++) {
                if (this.board.pieceAt(moves[j].x, moves[j].y) && this.board.getPieceAt(moves[j].x, moves[j].y).white != this.pieces[i].white) {
                    this.pieces[i].move(moves[j].x, moves[j].y, this.board);
                    return;
                }
            }
        }
        do {
            var p = Math.floor((Math.random() * this.pieces.length) + 0);
            var piece = this.pieces[p];
            moves = piece.generateMoves(this.board);
        } while (moves.length < 1);
        var m = Math.floor((Math.random() * moves.length) + 0);
        piece.move(moves[m].x, moves[m].y, this.board);
    };
    return RandomAI;
}());
function reverseArray(array) {
    return array.slice().reverse();
}
var pawnEvalWhite = [
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    [5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0],
    [1.0, 1.0, 2.0, 3.0, 3.0, 2.0, 1.0, 1.0],
    [0.5, 0.5, 1.0, 2.5, 2.5, 1.0, 0.5, 0.5],
    [0.0, 0.0, 0.0, 2.0, 2.0, 0.0, 0.0, 0.0],
    [0.5, -0.5, -1.0, 0.0, 0.0, -1.0, -0.5, 0.5],
    [0.5, 1.0, 1.0, -2.0, -2.0, 1.0, 1.0, 0.5],
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
];
var pawnEvalBlack = reverseArray(pawnEvalWhite);
var knightEval = [
    [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
    [-4.0, -2.0, 0.0, 0.0, 0.0, 0.0, -2.0, -4.0],
    [-3.0, 0.0, 1.0, 1.5, 1.5, 1.0, 0.0, -3.0],
    [-3.0, 0.5, 1.5, 2.0, 2.0, 1.5, 0.5, -3.0],
    [-3.0, 0.0, 1.5, 2.0, 2.0, 1.5, 0.0, -3.0],
    [-3.0, 0.5, 1.0, 1.5, 1.5, 1.0, 0.5, -3.0],
    [-4.0, -2.0, 0.0, 0.5, 0.5, 0.0, -2.0, -4.0],
    [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0]
];
var bishopEvalWhite = [
    [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
    [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
    [-1.0, 0.0, 0.5, 1.0, 1.0, 0.5, 0.0, -1.0],
    [-1.0, 0.5, 0.5, 1.0, 1.0, 0.5, 0.5, -1.0],
    [-1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, -1.0],
    [-1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0],
    [-1.0, 0.5, 0.0, 0.0, 0.0, 0.0, 0.5, -1.0],
    [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0]
];
var bishopEvalBlack = reverseArray(bishopEvalWhite);
var rookEvalWhite = [
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    [0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5],
    [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
    [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
    [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
    [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
    [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
    [0.0, 0.0, 0.0, 0.5, 0.5, 0.0, 0.0, 0.0]
];
var rookEvalBlack = reverseArray(rookEvalWhite);
var evalQueen = [
    [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
    [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
    [-1.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
    [-0.5, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
    [0.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
    [-1.0, 0.5, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
    [-1.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, -1.0],
    [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0]
];
var kingEvalWhite = [
    [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [-2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
    [-1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
    [2.0, 2.0, 0.0, 0.0, 0.0, 0.0, 2.0, 2.0],
    [2.0, 3.0, 1.0, 0.0, 0.0, 1.0, 3.0, 2.0]
];
var kingEvalBlack = reverseArray(kingEvalWhite);
function getPieceAbsoluteValue(piece) {
    switch (piece.letter) {
        case "p":
            return 10 + (piece.white ? pawnEvalWhite[piece.matrixPosition.y][piece.matrixPosition.x] : pawnEvalBlack[piece.matrixPosition.y][piece.matrixPosition.x]);
        case "Kn":
            return 30 + knightEval[piece.matrixPosition.y][piece.matrixPosition.x];
        case "B":
            return 30 + (piece.white ? bishopEvalWhite[piece.matrixPosition.y][piece.matrixPosition.x] : bishopEvalBlack[piece.matrixPosition.y][piece.matrixPosition.x]);
        case "R":
            return 50 + (piece.white ? rookEvalWhite[piece.matrixPosition.y][piece.matrixPosition.x] : rookEvalBlack[piece.matrixPosition.y][piece.matrixPosition.x]);
        case "Q":
            return 90 + evalQueen[piece.matrixPosition.y][piece.matrixPosition.x];
        case "K":
            return 900 + (piece.white ? kingEvalWhite[piece.matrixPosition.y][piece.matrixPosition.x] : kingEvalBlack[piece.matrixPosition.y][piece.matrixPosition.x]);
        default:
    }
}
var MinimaxAI = /** @class */ (function () {
    function MinimaxAI(board) {
        this.board = board;
        this.pieces = board.blackPieces;
        this.Nodes = [];
    }
    MinimaxAI.prototype.getBoardAbsoluteValue = function (allyPieces, enemyPieces) {
        var value = 0;
        for (var i = 0; i < allyPieces.length; i++) {
            if (allyPieces[i].taken) {
                value -= allyPieces[i].value;
            }
            else {
                value += getPieceAbsoluteValue(allyPieces[i]);
            }
        }
        for (var i = 0; i < enemyPieces.length; i++) {
            if (enemyPieces[i].taken) {
                value += allyPieces[i].value;
            }
            else {
                value -= getPieceAbsoluteValue(enemyPieces[i]);
            }
        }
        return value;
    };
    // Recursion
    MinimaxAI.prototype.createNewBoardsWithMoves = function (board, boards) {
        var moves;
        moves = [];
        for (var i = 0; i < board.blackPieces.length; i++) {
            moves = board.blackPieces[i].generateMoves(board);
            for (var j = 0; j < moves.length; j++) {
                boards.push(board.clone());
                boards[boards.length - 1].movePiece(board.blackPieces[i].matrixPosition, moves[j]);
                this.Nodes.push(new MyNode(this.getBoardAbsoluteValue(boards[boards.length - 1].blackPieces, boards[boards.length - 1].whitePieces)));
                this.Nodes[0].addSubNode(this.Nodes[this.Nodes.length - 1]);
                this.RootNodeindex = boards.length - 1;
                this.createNewBoardsWithMovesA(boards[boards.length - 1], boards);
            }
        }
    };
    // Recursion
    MinimaxAI.prototype.createNewBoardsWithMovesA = function (board, boards) {
        var moves;
        moves = [];
        for (var i = 0; i < board.whitePieces.length; i++) {
            moves = board.whitePieces[i].generateMoves(board);
            for (var j = 0; j < moves.length; j++) {
                boards.push(board.clone());
                boards[boards.length - 1].movePiece(board.whitePieces[i].matrixPosition, moves[j]);
                this.Nodes.push(new MyNode(this.getBoardAbsoluteValue(boards[boards.length - 1].blackPieces, boards[boards.length - 1].whitePieces)));
                this.Nodes[this.RootNodeindex].addSubNode(this.Nodes[this.Nodes.length - 1]);
                this.BranchNodeindex = boards.length - 1;
                this.createNewBoardsWithMovesB(boards[boards.length - 1], boards);
            }
        }
    };
    // Recursion
    MinimaxAI.prototype.createNewBoardsWithMovesB = function (board, boards) {
        var moves;
        moves = [];
        for (var i = 0; i < board.blackPieces.length; i++) {
            moves = board.blackPieces[i].generateMoves(board);
            for (var j = 0; j < moves.length; j++) {
                boards.push(board.clone());
                boards[boards.length - 1].movePiece(board.blackPieces[i].matrixPosition, moves[j]);
                this.Nodes.push(new MyNode(this.getBoardAbsoluteValue(boards[boards.length - 1].blackPieces, boards[boards.length - 1].whitePieces)));
                this.Nodes[this.BranchNodeindex].addSubNode(this.Nodes[this.Nodes.length - 1]);
            }
        }
    };
    MinimaxAI.prototype.makeMove = function () {
        var boards;
        boards = [];
        var bestMoveIndex;
        boards.push(this.board);
        this.Nodes.push(new MyNode(this.getBoardAbsoluteValue(this.board.whitePieces, this.board.blackPieces)));
        this.createNewBoardsWithMoves(this.board, boards);
        // for (var i = 0; i < this.Nodes.length; i++) {
        //     console.log(this.Nodes[i].value);
        //     console.log("Child: " + str(this.Nodes[i].childNodes.length-1));
        // }
        console.log(boards.length + " " + this.Nodes.length);
        bestMoveIndex = this.getBestMove();
        console.log(this.getBoardAbsoluteValue(boards[bestMoveIndex].blackPieces, boards[bestMoveIndex].whitePieces));
        this.board.adjustBoards(boards[bestMoveIndex]);
    };
    MinimaxAI.prototype.getBestMove = function () {
        var nodes = [];
        for (var i = 0; i < this.Nodes[0].childNodes.length; i++) {
            for (var j = 0; j < this.Nodes[0].childNodes[i].childNodes.length; j++) {
                nodes = nodes.concat(this.BestMove(true, this.Nodes[0].childNodes[i].childNodes[j].childNodes));
            }
        }
        nodes.push(this.BestMove(true, this.Nodes[0].childNodes));
        console.log("BestMove");
        // for (let i = 0; i < BestNodes.length; i++) {
        //     console.log(BestNodes[i].value);
        // }
        return 0;
    };
    MinimaxAI.prototype.BestMove = function (max, Nodes) {
        var node;
        if (max) {
            node = this.maxFunc(Nodes);
        }
        else {
            node = this.minFunc(Nodes);
        }
        return node;
    };
    MinimaxAI.prototype.minFunc = function (Nodes) {
        var WorstNode;
        for (var i = 0; i < Nodes.length; i++) {
            if (WorstNode == null) {
                WorstNode = Nodes[i];
            }
            if (Nodes[i].value < WorstNode.value) {
                WorstNode = Nodes[i];
            }
        }
        return WorstNode;
    };
    MinimaxAI.prototype.maxFunc = function (Nodes) {
        var GreatestNode;
        for (var i = 0; i < Nodes.length; i++) {
            if (GreatestNode == null) {
                GreatestNode = Nodes[i];
            }
            if (Nodes[i].value > GreatestNode.value) {
                GreatestNode = Nodes[i];
            }
        }
        return GreatestNode;
    };
    return MinimaxAI;
}());
