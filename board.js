class Board {
  constructor() {
    this.whitePieces = [];
    this.blackPieces = [];
    this.scoreWhite = 0;
    this.scoreBlack = 0;
    this.setupPieces();
  }

  setupPieces() {
    this.whitePieces.push(new King(4, 0, true));
    this.whitePieces.push(new Rook(0, 0, true));
    this.whitePieces.push(new Rook(7, 0, true));
    this.whitePieces.push(new Knigth(1, 0, true));
    this.whitePieces.push(new Knigth(6, 0, true));
    this.whitePieces.push(new Bishop(2, 0, true));
    this.whitePieces.push(new Bishop(5, 0, true));
    this.whitePieces.push(new Queen(3, 0, true));
    for (var i = 0; i < 8; i++) {
      this.whitePieces.push(new Pawn(i, 1, true));
    }

    this.blackPieces.push(new King(4, 7, false));
    this.blackPieces.push(new Rook(0, 7, false));
    this.blackPieces.push(new Rook(7, 7, false));
    this.blackPieces.push(new Knigth(1, 7, false));
    this.blackPieces.push(new Knigth(6, 7, false));
    this.blackPieces.push(new Bishop(2, 7, false));
    this.blackPieces.push(new Bishop(5, 7, false));
    this.blackPieces.push(new Queen(3, 7, false));
    for (var i = 0; i < 8; i++) {
      this.blackPieces.push(new Pawn(i, 6, false));
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
      if(this.whitePieces[i].matrixPosition.x == x && this.whitePieces[i].matrixPosition.y == y){
        return true;
      }
    }
    for (var i = 0; i < this.blackPieces.length; i++) {
      if(this.blackPieces[i].matrixPosition.x == x && this.blackPieces[i].matrixPosition.y == y){
        return true;
      }
    }
    return false;
  }

  getPieceAt(x,y){
    for (var i = 0; i < this.whitePieces.length; i++) {
      if(!this.whitePieces[i].taken && this.whitePieces[i].matrixPosition.x == x && this.whitePieces[i].matrixPosition.y == y){
        return this.whitePieces[i];
      }
    }
    for (var i = 0; i < this.blackPieces.length; i++) {
      if(!this.blackPieces[i].taken && this.blackPieces[i].matrixPosition.x == x && this.blackPieces[i].matrixPosition.y == y){
        return this.blackPieces[i];
      }
    }
    return null;
  }

  isDone() {
    return this.whitePieces[0].taken || this.blackPieces[0].taken;
  }

  setScore(){
    this.scoreWhite = 0;
    for(var i = 0; i < this.whitePieces.length; i++){
      if(this.whitePieces[i].taken){
        this.scoreWhite += this.whitePieces[i].value;
      }
    }
    this.scoreBlack = 0;
    for(var i = 0; i < this.blackPieces.length; i++){
      if(this.blackPieces[i].taken){
        this.scoreBlack += this.blackPieces[i].value;
      }
    }
  }
  
}
