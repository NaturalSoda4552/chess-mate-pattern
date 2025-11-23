import { describe, it, expect, beforeEach, vi } from 'vitest';
import Board from '../../../src/model/Board.js';
import King from '../../../src/model/pieces/King.js';

vi.mock('../../../src/utils/PieceFactory.js', () => ({
  default: {
    create: (char) => {
      const color = char === char.toUpperCase() ? 'w' : 'b';
      const type = char.toLowerCase();
      if (type === 'k') return new King(color);
      return { id: Math.random(), type, color, getValidMoves: () => [] };
    },
  },
}));

describe('킹 이동 규칙', () => {
  let board;
  beforeEach(() => {
    board = new Board();
  });

  it('주변 8개의 모든 칸으로 이동할 수 있어야 한다', () => {
    const fen = '8/8/8/8/3K4/8/8/8 w - - 0 1';
    board.loadFen(fen);
    const king = board.getPiece('d4');
    const validMoves = king.getValidMoves(board, 'd4');
    expect(validMoves.length).toBe(8);
    expect(validMoves).toEqual(
      expect.arrayContaining(['c3', 'd3', 'e3', 'c4', 'e4', 'c5', 'd5', 'e5']),
    );
  });

  it('도착 지점에 아군 기물이 있으면 그 칸으로 이동할 수 없다', () => {
    const fen = '8/8/8/2PPP3/3K4/8/8/8 w - - 0 1';
    board.loadFen(fen);
    const king = board.getPiece('d4');
    const validMoves = king.getValidMoves(board, 'd4');
    expect(validMoves).not.toContain('c5');
    expect(validMoves).not.toContain('d5');
    expect(validMoves).not.toContain('e5');
    expect(validMoves.length).toBe(5);
  });
});
