import Piece from '../Piece';

class Pawn extends Piece {
  constructor(color, sqaure) {
    super(color, sqaure, 'p');
  }

  /**
   * @override
   */
  getValideMoves(board, fromSquare) {
    const moves = [];

    return moves;
  }
}

export default Pawn;
