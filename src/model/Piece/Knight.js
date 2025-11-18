import Piece from '../Piece';

class Knight extends Piece {
  constructor(color, sqaure) {
    super(color, sqaure, 'k');
  }

  /**
   * @override
   */
  getValideMoves(board, fromSquare) {
    const moves = [];

    return moves;
  }
}

export default Knight;
