import { describe, it, expect, beforeEach, vi } from 'vitest';
import Board from '../../../src/model/Board.js';
import Bishop from '../../../src/model/pieces/Bishop.js';

vi.mock('../../../src/utils/PieceFactory.js', () => ({
  default: {
    create: (char) => {
      const color = char === char.toUpperCase() ? 'w' : 'b';
      const type = char.toLowerCase();
      if (type === 'b') return new Bishop(color);
      return { id: Math.random(), type, color, getValidMoves: () => [] };
    },
  },
}));

describe('비숍 이동 규칙', () => {
  let board;
  beforeEach(() => {
    board = new Board();
  });

  it('빈 보드에서 대각선으로 움직일 수 있어야 한다', () => {
    const fen = '8/8/8/8/3B4/8/8/8 w - - 0 1';
    board.loadFen(fen);
    const bishop = board.getPiece('d4');
    const validMoves = bishop.getValidMoves(board, 'd4');
    expect(validMoves.length).toBe(13);
    expect(validMoves).toEqual(
      expect.arrayContaining(['a1', 'h8', 'a7', 'g1']),
    );
  });

  it('경로에 아군 기물이 있으면 그 너머로 이동할 수 없다', () => {
    const fen = '8/8/5P2/8/3B1P2/8/8/8 w - - 0 1';
    board.loadFen(fen);
    const bishop = board.getPiece('d4');
    const validMoves = bishop.getValidMoves(board, 'd4');
    expect(validMoves).not.toContain('g7');
    expect(validMoves).toContain('f2');
    expect(validMoves.length).toBe(10);
  });

  it('적군 기물이 있는 칸까지 이동할 수 있지만, 그 너머로는 갈 수 없다', () => {
    // d4 비숍, b6과 g7에 적군 폰, b2에 아군 폰을 배치한 새로운 FEN
    const fen = '8/6p1/1p6/8/3B4/8/1P6/8 w - - 0 1';
    board.loadFen(fen);
    const bishop = board.getPiece('d4');
    const validMoves = bishop.getValidMoves(board, 'd4');

    // b6의 적군 폰을 잡을 수 있지만, 그 너머 a7로는 갈 수 없습니다.
    expect(validMoves).toContain('b6');
    expect(validMoves).not.toContain('a7');

    // g7의 적군 폰을 잡을 수 있지만, 그 너머 h8로는 갈 수 없습니다.
    expect(validMoves).toContain('g7');
    expect(validMoves).not.toContain('h8');

    // b2의 아군 폰에 막혀 b2나 a1로는 갈 수 없습니다.
    expect(validMoves).not.toContain('b2');
    expect(validMoves).not.toContain('a1');

    // 오른쪽 아래 대각선(e3, f2, g1)은 경로가 비어있으므로 이동 가능합니다.
    expect(validMoves).toContain('g1');
  });
});
