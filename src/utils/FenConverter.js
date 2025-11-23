import PieceFactory from './PieceFactory.js';

class FenConverter {
  /**
   * FEN 문자열을 받아 Piece 인스턴스가 담긴 2차원 배열을 반환한다.
   * @param {string} fen
   * @returns {Array<Array<import('../model/pieces/Piece.js').Piece | null>>}
   */
  static fenToBoard(fen) {
    const [piecePlacement, color] = fen.split(' ');
    const grid = FenConverter.#parsePlacement(piecePlacement);
    return { grid, color };
  }

  /**
   * 기물 배치 문자열을 파싱하여 2차원 배열을 반환한다.
   * @param {string} placementString
   * @returns {Array<Array<import('../model/pieces/Piece.js').Piece | null>>}
   */
  static #parsePlacement(placementString) {
    const grid = [];
    const ranks = placementString.split('/');
    if (ranks.length !== 8) {
      throw new Error('전체 랭크의 수는 8개여야 합니다.');
    }

    ranks.forEach((rankString) => {
      grid.push(FenConverter.#parseRank(rankString));
    });
    return grid;
  }
  /**
   * 한 행의 문자열을 파싱하여 Piece 인스턴스가 담긴 1차원 배열을 반환한다.
   * @param {string} rankString
   * @returns {Array<import('../model/pieces/Piece.js').Piece | null>}
   */
  static #parseRank(rankString) {
    const rank = [];
    let fileCount = 0;

    rankString.split('').forEach((char) => {
      // 문자인 경우
      if (isNaN(parseInt(char, 10))) {
        const pieceInstance = PieceFactory.create(char);
        rank.push(pieceInstance);
        fileCount += 1;
      } else {
        for (let i = 0; i < parseInt(char, 10); i++) {
          rank.push(null);
        }
        fileCount += parseInt(char, 10);
      }
    });

    if (fileCount !== 8) {
      throw new Error('한 랭크는 정확히 8칸이여야 합니다.');
    }

    return rank;
  }
}

export default FenConverter;
