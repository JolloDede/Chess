class MyNode {
    value: number;
    childNodes: MyNode[];
    parentNode: MyNode;
    constructor() {
        this.value;
        this.childNodes = [];
    }

    addSubNode(value: MyNode): void {
        this.childNodes.push(value);
    }

}

class RandomAI {
    pieces: Piece[];
    board: Board;
    constructor(board: Board) {
        this.pieces = board.blackPieces;
        this.board = board;
    }

    makeMove(): void {
        let piecesP = this.pieces;
        let moves = [];
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
    }
}

function reverseArray(array: number[][]): number[][] {
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

function getPieceAbsoluteValue(piece: Piece): number {
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
const maxDepth = 3;
class MinimaxAI {
    board: Board;
    pieces: Piece[];
    Nodes: MyNode[];

    RootNodeindex: number;
    BranchNodeindex: number;
    secondBranchNodeindex: number;

    constructor(board: Board) {
        this.board = board;
        this.pieces = board.blackPieces;
        this.Nodes = [];
    }

    getBoardAbsoluteValue(allyPieces: Piece[], enemyPieces: Piece[]): number {
        let value: number = 0;
        for (var i = 0; i < allyPieces.length; i++) {
            if (allyPieces[i].taken) {
                value -= allyPieces[i].value;
            } else {
                value += getPieceAbsoluteValue(allyPieces[i]);
            }
        }
        for (var i = 0; i < enemyPieces.length; i++) {
            if (enemyPieces[i].taken) {
                value += allyPieces[i].value;
            } else {
                value -= getPieceAbsoluteValue(enemyPieces[i]);
            }
        }
        return value;
    }

    // getWhitePiecesMoves(board: Board): Vektor[]{
    //     let moves: Vektor[];
    //     for(var i = 0; i > board.whitePieces.length; i++){
    //         if(!board.whitePieces[i].taken){
    //             moves.push(board.whitePieces[i].generateMoves(board));
    //         }
    //     }
    //     return moves;
    // }
    //
    // getBlackPiecesMoves(board: Board): Vektor[]{
    //     let moves: Vektor[];
    //     for(var i = 0; i > board.blackPieces.length; i++){
    //         if(!board.blackPieces[i].taken){
    //             moves.push(board.blackPieces[i].generateMoves(board));
    //         }
    //     }
    //     return moves;
    // }

    // // Recursion
    // createNewBoardsWithMoves(board: Board, boards: Board[]): void {
    //     let moves: Vektor[];
    //     moves = [];
    //     for (let i: number = 0; i < board.blackPieces.length; i++) {
    //         moves = board.blackPieces[i].generateMoves(board);
    //         for (let j: number = 0; j < moves.length; j++) {
    //             boards.push(board.clone());
    //             boards[boards.length - 1].movePiece(board.blackPieces[i].matrixPosition, moves[j]);
    //             this.Nodes.push(new MyNode());
    //             this.Nodes[0].addSubNode(this.Nodes[this.Nodes.length-1]);
    //             this.Nodes[this.Nodes.length-1].parentNode = this.Nodes[0];
    //             this.RootNodeindex = boards.length - 1;
    //             this.createNewBoardsWithMovesA(boards[boards.length - 1], boards);
    //         }
    //     }
    // }
    // // Recursion
    // createNewBoardsWithMovesA(board: Board, boards: Board[]): void {
    //     let moves: Vektor[];
    //     moves = [];
    //     for (let i: number = 0; i < board.whitePieces.length; i++) {
    //         moves = board.whitePieces[i].generateMoves(board);
    //         for (let j: number = 0; j < moves.length; j++) {
    //             boards.push(board.clone());
    //             boards[boards.length - 1].movePiece(board.whitePieces[i].matrixPosition, moves[j]);
    //             this.Nodes.push(new MyNode());
    //             this.Nodes[this.RootNodeindex].addSubNode(this.Nodes[this.Nodes.length - 1]);
    //             this.Nodes[this.Nodes.length-1].parentNode = this.Nodes[this.RootNodeindex];
    //             this.BranchNodeindex = boards.length - 1;
    //             this.createNewBoardsWithMovesB(boards[boards.length - 1], boards);
    //         }
    //     }
    // }
    // // Recursion
    // createNewBoardsWithMovesB(board: Board, boards: Board[]): void {
    //     let moves: Vektor[];
    //     moves = [];
    //     for (let i: number = 0; i < board.blackPieces.length; i++) {
    //         moves = board.blackPieces[i].generateMoves(board);
    //         for (let j: number = 0; j < moves.length; j++) {
    //             boards.push(board.clone());
    //             boards[boards.length - 1].movePiece(board.blackPieces[i].matrixPosition, moves[j]);
    //             this.Nodes.push(new MyNode());
    //             this.Nodes[this.Nodes.length-1].value = this.getBoardAbsoluteValue(boards[boards.length-1].blackPieces, boards[boards.length-1].whitePieces);
    //             this.Nodes[this.BranchNodeindex].addSubNode(this.Nodes[this.Nodes.length - 1]);
    //             this.Nodes[this.Nodes.length-1].parentNode = this.Nodes[this.BranchNodeindex];
    //         }
    //     }
    // }

    createNewBoardsWithMovesRecursiv(board: Board, boards: Board[], depth: number): void {
        let moves: Vektor[] = [];
        let pieces: Piece[];
        if (depth == maxDepth) {
            return;
        }
        if (depth % 2 == 0) {
            pieces = board.blackPieces;
        } else {
            pieces = board.whitePieces;
        }
        for (let i = 0; i < pieces.length; i++) {
            moves = pieces[i].generateMoves(board);
            for (let j = 0; j < moves.length; j++) {
                boards.push(board.clone());
                boards[boards.length - 1].movePiece(pieces[i].matrixPosition, moves[j]);
                this.Nodes.push(new MyNode());
                if (depth == 0) {
                    this.Nodes[0].addSubNode(this.Nodes[this.Nodes.length - 1]);
                    this.Nodes[this.Nodes.length - 1].parentNode = this.Nodes[0];
                    this.RootNodeindex = boards.length - 1;
                }
                if (depth == 1) {
                    this.Nodes[this.RootNodeindex].addSubNode(this.Nodes[this.Nodes.length - 1]);
                    this.Nodes[this.Nodes.length - 1].parentNode = this.Nodes[this.RootNodeindex];
                    this.BranchNodeindex = boards.length - 1;
                }
                if (depth == maxDepth - 1) {
                    this.Nodes[this.Nodes.length - 1].value = this.getBoardAbsoluteValue(boards[boards.length - 1].blackPieces, boards[boards.length - 1].whitePieces);
                    this.Nodes[this.BranchNodeindex].addSubNode(this.Nodes[this.Nodes.length - 1]);
                    this.Nodes[this.Nodes.length - 1].parentNode = this.Nodes[this.BranchNodeindex];
                }
                this.createNewBoardsWithMovesRecursiv(boards[boards.length - 1], boards, depth + 1);
            }
        }
    }

    makeMove(): void {
        let boards: Board[];
        boards = [];
        let bestMoveIndex: number;
        boards.push(this.board);
        this.Nodes.push(new MyNode());
        // this.createNewBoardsWithMoves(this.board, boards);
        this.createNewBoardsWithMovesRecursiv(this.board, boards, 0);
        console.log(boards.length + " " + this.Nodes.length);
        console.log(this.minimax(this.Nodes[0], 3, true), this.Nodes[0].value);
        bestMoveIndex = this.getChildNodeIndexWithValue(this.Nodes[0]);
        board.adjustBoards(boards[bestMoveIndex]);
    }

    minimax(position: MyNode, depth: number, maximizingPlayer: boolean): number {
        let value: number;
        if (depth == 0) {
            return position.value;
        }
        if (maximizingPlayer) {
            value = -Infinity;
            for (let i = 0; i < position.childNodes.length; i++) {
                value = max(value, this.minimax(position.childNodes[i], depth - 1, false));
            }
            position.value = value;
            return value
        } else if (!maximizingPlayer) {
            value = Infinity;
            for (let i = 0; i < position.childNodes.length; i++) {
                value = min(value, this.minimax(position.childNodes[i], depth - 1, true));
            }
            position.value = value;
            return value;
        }
    }

    getChildNodeIndexWithValue(node: MyNode): number {
        for (let i = 0; i < node.childNodes.length; i++) {
            if (node.childNodes[i].value == node.value) {
                return this.Nodes.indexOf(node.childNodes[i]);
            }
        }
    }

}
