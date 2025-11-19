import { coordsToSquare, squareToCoords } from '../../utils/coordinate';
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

    const { row, col } = squareToCoords(fromSquare);
    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    directions.forEach((direction) => {
      let distance = 1;

      while (true) {
        const newRow = row + direction[0] * distance;
        const newCol = col + direction[1] * distance;

        const targetSqaure = coordsToSquare(newRow, newCol);
        // 1. 칸이 존재하지 않는 경우 다음 방향으로
        if (!targetSqaure) break;

        const targetPiece = board.getPiece(targetSqaure);
        // 2. 빈 칸인 경우 추가 후 다음 칸으로 이동
        if (!targetPiece) {
          moves.push(targetSqaure);
          distance += 1;
        } else {
          // 3. 상대 색 기물인 경우
          if (targetPiece.color !== this.color) {
            moves.push(targetSqaure);
            break;
          }
          // 4. 같은 색 기물인 경우
          if (targetPiece.color === this.color) {
            break;
          }
        }
      }
    });

    return moves;
  }
}

export default Queen;
