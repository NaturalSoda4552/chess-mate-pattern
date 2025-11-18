import Piece from '../Piece';

class Pawn extends Piece {
  constructor(color) {
    super(color, 'p');
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
