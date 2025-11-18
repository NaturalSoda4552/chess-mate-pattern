import { coordsToSquare, squareToCoords } from '../../utils/coordinate';
import Piece from '../Piece';

class Pawn extends Piece {
  constructor(color) {
    super(color, 'p');
  }

  /**
   * @override
   */
  getValidMoves(board, fromSquare) {
    const moves = [];

    const { row, col } = squareToCoords(fromSquare);
    const direction = this.color === 'w' ? -1 : 1;
    const startRow = this.color === 'w' ? 6 : 1;

    // 1. 앞으로 한 칸 이동
    const oneStepForwardRow = row + direction;
    const oneStepForwardSquare = coordsToSquare(oneStepForwardRow, col);
    if (board.getPiece(oneStepForwardSquare) === null) {
      moves.push(oneStepForwardSquare);

      // 2. 첫 이동 시 앞으로 두 칸 이동
      if (row === startRow) {
        const twoStepForwardRow = row + 2 * direction;
        const twoStepForwardSquare = coordsToSquare(twoStepForwardRow, col);
        if (board.getPiece(twoStepForwardSquare) === null) {
          moves.push(twoStepForwardSquare);
        }
      }
    }

    // 3. 대각선 공격 이동
    [-1, 1].forEach((side) => {
      const captureRow = row + direction;
      const captureCol = col + side;
      const captureSquare = coordsToSquare(captureRow, captureCol);
      if (captureSquare) {
        const targetPiece = board.getPiece(captureSquare);
        if (targetPiece && targetPiece.color !== this.color) {
          moves.push(captureSquare);
        }
      }
    });

    return moves;
  }
}

export default Pawn;
