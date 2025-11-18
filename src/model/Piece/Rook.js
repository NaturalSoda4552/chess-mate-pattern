import Piece from '../Piece';

class Rook extends Piece {
  constructor(color) {
    super(color, 'r');
  }

  /**
   * @override
   */
  getValideMoves(board, fromSquare) {
    const moves = [];

    return moves;
  }
}

export default Rook;
