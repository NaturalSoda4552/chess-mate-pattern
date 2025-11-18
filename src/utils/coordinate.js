/**
 * 특정 칸을 나타내는 문자열을 배열 좌표로 변환
 * @param {string} square - 특정 칸
 * @returns {{row: number, col: number}} - 좌표
 * @private
 */
export const squareToCoords = (square) => {
  const col = square.charCodeAt(0) - 'a'.charCodeAt(0);
  const row = 8 - parseInt(square[1], 10);

  if (!isWithinBounds(row, col)) throw new Error('유효한 위치가 아닙니다.');

  return { row, col };
};
/**
 * 배열 좌표를 특정 칸을 나타내는 문자열로 변환
 * @param {{row: number, col: number}} - 좌표
 * @returns {string} square - 특정 칸
 * @private
 */
export const coordsToSquare = (row, col) => {
  if (!isWithinBounds(row, col)) throw new Error('유효한 위치가 아닙니다.');

  const rowString = 8 - row;
  const colString = String.fromCharCode('a'.charCodeAt(0) + col);
  return colString + rowString;
};

/**
 * 주어진 좌표가 체스판 범위(0-7) 내에 있는지 확인
 * @param {number} row - 행
 * @param {number} col - 열
 * @returns {boolean}
 */
export const isWithinBounds = (row, col) => {
  return row >= 0 && row < 8 && col >= 0 && col < 8;
};
