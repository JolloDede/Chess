class Piece {
  constructor(x, y, isWhite, letter) {
    this.matrixPosition = createVector(x, y);
    this.pixelPositon = createVector(x * titleSize + titleSize / 2, y * titleSize + titleSize / 2);

    this.taken = false;
    this.white = isWhite;
    this.letter = letter;
    this.movingThisPiece = false;
  }

  show() {
    if (!this.taken) {
      textSize(40);
      strokeWeight(10);
      if (this.white) {
        fill(255);
        stroke(0);
      } else {
        fill(30);
        stroke(255);
      }
      textAlign(CENTER, CENTER);
      if (this.movingThisPiece) {
        text(this.letter, mouseX, mouseY);
      } else {
        text(this.letter, this.pixelPositon.x, this.pixelPositon.y);
      }
    }else {
      console.log(this.letter);
    }
  }

  move(x, y, board) {
    var attacking = board.getPieceAt(x, y);
    if(attacking != null){
      attacking.taken = true;
    }
    this.matrixPosition = createVector(x, y);
    this.pixelPositon = createVector(x * titleSize + titleSize / 2, y * titleSize + titleSize / 2);
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
      if (board.pieceAt(tempPos.x, tempPos.y)) {
        return true;
      }
      tempPos.x += stepDirectionX;
      tempPos.y += stepDirectionY;
    }
    return false;
  }
}

class King extends Piece {
  constructor(x, y, isWhite) {
    super(x, y, isWhite);
    this.letter = "K";
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
}

class Queen extends Piece {
  constructor(x, y, isWhite) {
    super(x, y, isWhite);
    this.letter = "Q";
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
}

class Rook extends Piece {
  constructor(x, y, isWhite) {
    super(x, y, isWhite);
    this.letter = "R";
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
    return false;
  }
}

class Bishop extends Piece {
  constructor(x, y, isWhite) {
    super(x, y, isWhite);
    this.letter = "B";
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
}

class Knigth extends Piece {
  constructor(x, y, isWhite) {
    super(x, y, isWhite);
    this.letter = "Kn";
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
}

class Pawn extends Piece {
  constructor(x, y, isWhite) {
    super(x, y, isWhite);
    this.letter = "p";
    this.firstTurn = true;
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
        ((this.white && (y - this.matrixPosition.y) == 1) || (!this.white && (y - this.matrixPosition.y) == -1))) {
        this.firstTurn = false;
        return true;
      }
    }
    if (x - this.matrixPosition.x != 0) {
      return false;
    }
    if (this.white) {
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
    if (!this.white) {
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
    return false;
  }
}
