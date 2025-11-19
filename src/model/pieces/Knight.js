import { coordsToSquare, squareToCoords } from '../../utils/coordinate';
import Piece from '../Piece';

class Knight extends Piece {
  constructor(color) {
    super(color, 'n');
  }

  /**
   * @override
   */
  getValidMoves(board, fromSquare) {
    const moves = [];

    const { row, col } = squareToCoords(fromSquare);
    const directions = [
      [-1, -2],
      [-2, -1],
      [1, -2],
      [2, -1],
      [-1, 2],
      [-2, 1],
      [1, 2],
      [2, 1],
    ];

    directions.forEach((direction) => {
      const newRow = row + direction[0];
      const newCol = col + direction[1];

      const targetSqaure = coordsToSquare(newRow, newCol);
      if (targetSqaure) {
        const targetPiece = board.getPiece(targetSqaure);

        if (!targetPiece || targetPiece.color !== this.color)
          moves.push(targetSqaure);
      }
    });

    return moves;
  }
}

export default Knight;
