import Piece from '../Piece';

class Bishop extends Piece {
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

export default Bishop;
