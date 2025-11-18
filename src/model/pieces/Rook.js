import Piece from '../Piece';

class Rook extends Piece {
  constructor(color) {
    super(color, 'r');
  }

  /**
   * @override
   */
  getValidMoves(board, fromSquare) {
    const moves = [];

    return moves;
  }
}

export default Rook;
