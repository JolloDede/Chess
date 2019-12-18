class MyNode {
    value: number;
    childNodes: MyNode[];
    constructor(value: number) {
        this.value = value;
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

class MinimaxAI {
    board: Board;
    pieces: Array<Piece>;
    Nodes: MyNode[];
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
    RootNodeindex: number;
    BranchNodeindex: number;
    secondBranchNodeindex: number;
    // Recursion
    createNewBoardsWithMoves(board: Board, boards: Board[]): void {
        let moves: Vektor[];
        moves = [];
        for (let i: number = 0; i < board.blackPieces.length; i++) {
            moves = board.blackPieces[i].generateMoves(board);
            for (let j: number = 0; j < moves.length; j++) {
                boards.push(board.clone());
                boards[boards.length - 1].movePiece(board.blackPieces[i].matrixPosition, moves[j]);
                this.Nodes.push(new MyNode(this.getBoardAbsoluteValue(boards[boards.length - 1].blackPieces, boards[boards.length - 1].whitePieces)));
                this.Nodes[0].addSubNode(this.Nodes[this.Nodes.length-1]);
                this.RootNodeindex = boards.length - 1;
                this.createNewBoardsWithMovesA(boards[boards.length - 1], boards);
            }
        }
    }
    // Recursion
    createNewBoardsWithMovesA(board: Board, boards: Board[]): void {
        let moves: Vektor[];
        moves = [];
        for (let i: number = 0; i < board.whitePieces.length; i++) {
            moves = board.whitePieces[i].generateMoves(board);
            for (let j: number = 0; j < moves.length; j++) {
                boards.push(board.clone());
                boards[boards.length - 1].movePiece(board.whitePieces[i].matrixPosition, moves[j]);
                this.Nodes.push(new MyNode(this.getBoardAbsoluteValue(boards[boards.length - 1].blackPieces, boards[boards.length - 1].whitePieces)));
                this.Nodes[this.RootNodeindex].addSubNode(this.Nodes[this.Nodes.length - 1]);
                this.BranchNodeindex = boards.length - 1;
                this.createNewBoardsWithMovesB(boards[boards.length - 1], boards);
            }
        }
    }
    // Recursion
    createNewBoardsWithMovesB(board: Board, boards: Board[]): void {
        let moves: Vektor[];
        moves = [];
        for (let i: number = 0; i < board.blackPieces.length; i++) {
            moves = board.blackPieces[i].generateMoves(board);
            for (let j: number = 0; j < moves.length; j++) {
                boards.push(board.clone());
                boards[boards.length - 1].movePiece(board.blackPieces[i].matrixPosition, moves[j]);
                this.Nodes.push(new MyNode(this.getBoardAbsoluteValue(boards[boards.length - 1].blackPieces, boards[boards.length - 1].whitePieces)));
                this.Nodes[this.BranchNodeindex].addSubNode(this.Nodes[this.Nodes.length - 1]);
            }
        }
    }

    makeMove(): void {
        let boards: Board[];
        boards = [];
        let bestMoveIndex: number;
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
    }

    getBestMove(): number {
        var nodes: MyNode[] = [];
        var bestNode: MyNode;
        for(var i: number = 0; i < this.Nodes[0].childNodes.length; i++){
            for(var j: number = 0; j < this.Nodes[0].childNodes[i].childNodes.length; j++){
                nodes = nodes.concat(this.BestMove(true, this.Nodes[0].childNodes[i].childNodes[j].childNodes));
            }
        }
        bestNode = this.BestMove(false, nodes);
        console.log("BestMove");
        // for (let i = 0; i < BestNodes.length; i++) {
        //     console.log(BestNodes[i].value);
        // }
        return 0;
    }

    BestMove(max: boolean, Nodes: MyNode[]): MyNode{
        let node: MyNode;
        if(max){
            node = this.maxFunc(Nodes);
        }else{
            node = this.minFunc(Nodes);
        }
        return node;
    }

    minFunc(Nodes: MyNode[]): MyNode{
        let WorstNode: MyNode;
        for(let i: number = 0; i < Nodes.length; i++){
            if(WorstNode == null){
                WorstNode = Nodes[i];
            }
            if(Nodes[i].value < WorstNode.value){
                WorstNode = Nodes[i];
            }
        }
        return WorstNode;
    }

    maxFunc(Nodes: MyNode[]): MyNode{
        let GreatestNode: MyNode;
        for(let i: number = 0; i < Nodes.length; i++){
            if(GreatestNode == null){
                GreatestNode = Nodes[i];
            }
            if(Nodes[i].value > GreatestNode.value){
                GreatestNode = Nodes[i];
            }
        }
        return GreatestNode;
    }

}
