import { describe, it, expect, beforeEach, vi } from 'vitest';
import Board from '../../../src/model/Board.js';
import Queen from '../../../src/model/pieces/Queen.js';

vi.mock('../../../src/utils/PieceFactory.js', () => ({
  default: {
    create: (char) => {
      const color = char === char.toUpperCase() ? 'w' : 'b';
      const type = char.toLowerCase();
      if (type === 'q') return new Queen(color);
      return { id: Math.random(), type, color, getValidMoves: () => [] };
    },
  },
}));

describe('퀸 이동 규칙', () => {
  let board;
  beforeEach(() => {
    board = new Board();
  });

  it('빈 보드에서 상하좌우 및 대각선으로 움직일 수 있어야 한다', () => {
    const fen = '8/8/8/8/3Q4/8/8/8 w - - 0 1';
    board.loadFen(fen);
    const queen = board.getPiece('d4');
    const validMoves = queen.getValidMoves(board, 'd4');
    // 14 (rook) + 13 (bishop) = 27 moves
    expect(validMoves.length).toBe(27);
    expect(validMoves).toEqual(
      expect.arrayContaining(['d1', 'h8', 'a1', 'd8', 'a4', 'h4']),
    );
  });

  it('경로에 아군 기물이 있으면 그 너머로 이동할 수 없다', () => {
    const fen = '8/8/3P1P2/8/3QP3/8/8/8 w - - 0 1';
    board.loadFen(fen);
    const queen = board.getPiece('d4');
    const validMoves = queen.getValidMoves(board, 'd4');
    expect(validMoves).not.toContain('d7');
    expect(validMoves).not.toContain('g7');
    expect(validMoves).not.toContain('f4');
  });
});
