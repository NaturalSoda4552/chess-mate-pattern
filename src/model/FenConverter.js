import PieceMaker from './PieceMaker.js';

class FenConverter {
  /**
   * FEN 문자열을 받아 Piece 인스턴스가 담긴 2차원 배열을 반환한다.
   * @param {string[]} fen
   * @returns {Array<Array<import('../model/Piece.js').Piece | null>>}
   */
  static fenToBoard(fen) {
    const [piecePlacement, color, _1, _2, _3, _4] = fen.split(' ');
    const grid = this.#parsePlacement(piecePlacement);

    return { grid, color };
  }

  /**
   * 기물 배치 문자열을 파싱하여 2차원 배열을 반환한다.
   * @param {string[]} placementString
   * @returns {Array<Array<import('../model/Piece.js').Piece | null>>}
   */
  static #parsePlacement(placementString) {
    const grid = [];
    const ranks = placementString.split('/');

    ranks.forEach((rankString) => {
      grid.push(this.#parseRank(rankString));
    });
    return grid;
  }
  /**
   * 한 행의 문자열을 파싱하여 Piece 인스턴스가 담긴 1차원 배열을 반환한다.
   * @param {string[]} rankString
   * @returns {Array<import('../model/Piece.js').Piece | null>}
   */
  static #parseRank(rankString) {
    const rank = [];

    rankString.split('').forEach((char) => {
      // 문자인 경우
      if (isNaN(parseInt(char, 10))) {
        const pieceInstance = PieceMaker.create(char);
        rank.push(pieceInstance);
      } else {
        for (let i = 0; i < parseInt(char, 10); i++) {
          rank.push(null);
        }
      }
    });
    return rank;
  }
  //#endregion
}

export default FenConverter;
