import Bishop from '../model/pieces/Bishop.js';
import King from '../model/pieces/King.js';
import Knight from '../model/pieces/Knight.js';
import Pawn from '../model/pieces/Pawn.js';
import Queen from '../model/pieces/Queen.js';
import Rook from '../model/pieces/Rook.js';

class PieceFactory {
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

export default PieceFactory;
