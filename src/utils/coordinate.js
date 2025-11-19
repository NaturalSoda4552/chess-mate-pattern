/**
 * 특정 칸을 나타내는 문자열을 배열 좌표로 변환한다.
 * @param {string} square
 * @returns {{row: number, col: number}}
 * @private
 */
export const squareToCoords = (square) => {
  const col = square.charCodeAt(0) - 'a'.charCodeAt(0);
  const row = 8 - parseInt(square[1], 10);

  if (!isWithinBounds(row, col)) return null;

  return { row, col };
};
/**
 * 배열 좌표를 특정 칸을 나타내는 문자열로 변환한다.
 * @param {{row: number, col: number}}
 * @returns {string}
 * @private
 */
export const coordsToSquare = (row, col) => {
  if (!isWithinBounds(row, col)) return null;

  const rowString = 8 - row;
  const colString = String.fromCharCode('a'.charCodeAt(0) + col);
  return colString + rowString;
};

/**
 * 주어진 좌표가 체스판 범위(0-7) 내에 있는지 확인한다.
 * @param {number} row
 * @param {number} col
 * @returns {boolean}
 */
export const isWithinBounds = (row, col) => {
  return row >= 0 && row < 8 && col >= 0 && col < 8;
};

/**
 * 주어진 칸이 유효한 표기법인지 확인한다.
 * @param {string} square
 */
export const validateSquare = (square) => {
  const squareRegex = /^[a-h][1-8]$/;

  if (!squareRegex.test(square)) {
    throw new TypeError(
      `한 칸은 a~h 사이의 알파벳 하나와 1~8 사이의 숫자로 이루어져야 합니다. (입력: ${square})`,
    );
  }
};
