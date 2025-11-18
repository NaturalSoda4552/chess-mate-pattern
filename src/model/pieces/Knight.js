import Piece from '../Piece';

class Knight extends Piece {
  constructor(color) {
    super(color, 'n');
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
