import Piece from '../Piece';

class King extends Piece {
  constructor(color) {
    super(color, 'k');
  }

  /**
   * @override
   */
  getValidMoves(board, fromSquare) {
    const moves = [];

    return moves;
  }
}

export default King;
