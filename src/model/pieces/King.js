import Piece from '../Piece';

class King extends Piece {
  constructor(color) {
    super(color, 'k');
  }

  /**
   * @override
   */
  getValideMoves(board, fromSquare) {
    const moves = [];

    return moves;
  }
}

export default King;
