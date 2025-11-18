import Bishop from './Piece/Bishop.js';
import King from './Piece/King.js';
import Knight from './Piece/Knight.js';
import Pawn from './Piece/Pawn.js';
import Queen from './Piece/Queen.js';
import Rook from './Piece/Rook.js';

class PieceMaker {
  static create(char) {
    const color = char === char.toUpperCase() ? 'w' : 'b';
    const type = char.toLowerCase();

    switch (type) {
      case 'p':
        return new Pawn(color);
      case 'k':
        return new King(color);
      case 'q':
        return new Queen(color);
      case 'n':
        return new Knight(color);
      case 'b':
        return new Bishop(color);
      case 'r':
        return new Rook(color);
      default:
        return null;
    }
  }
}

export default PieceMaker;
