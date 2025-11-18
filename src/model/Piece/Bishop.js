import Piece from '../Piece';

class Bishop extends Piece {
  constructor(color) {
    super(color, 'b');
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
