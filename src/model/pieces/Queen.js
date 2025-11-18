import Piece from '../Piece';

class Queen extends Piece {
  constructor(color) {
    super(color, 'q');
  }

  /**
   * @override
   */
  getValidMoves(board, fromSquare) {
    const moves = [];

    return moves;
  }
}

export default Queen;
