import { describe, it, expect, beforeEach, vi } from 'vitest';
import Board from '../../../src/model/Board.js';
import Rook from '../../../src/model/pieces/Rook.js';

vi.mock('../../../src/utils/PieceFactory.js', () => ({
  default: {
    create: (char) => {
      const color = char === char.toUpperCase() ? 'w' : 'b';
      const type = char.toLowerCase();
      if (type === 'r') return new Rook(color);
      return { id: Math.random(), type, color, getValidMoves: () => [] };
    },
  },
}));

describe('룩 이동 규칙', () => {
  let board;
  beforeEach(() => {
    board = new Board();
  });

  it('빈 보드에서 상하좌우 직선으로 움직일 수 있어야 한다', () => {
    const fen = '8/8/8/8/3R4/8/8/8 w - - 0 1';
    board.loadFen(fen);
    const rook = board.getPiece('d4');
    const validMoves = rook.getValidMoves(board, 'd4');
    expect(validMoves.length).toBe(14);
    expect(validMoves).toEqual(
      expect.arrayContaining(['d1', 'd8', 'a4', 'h4']),
    );
  });

  it('경로에 아군 기물이 있으면 그 너머로 이동할 수 없다', () => {
    const fen = '8/8/3P4/8/3RP3/8/8/8 w - - 0 1';
    board.loadFen(fen);
    const rook = board.getPiece('d4');
    const validMoves = rook.getValidMoves(board, 'd4');
    expect(validMoves).not.toContain('f4');
    expect(validMoves).not.toContain('d7');
    expect(validMoves.length).toBe(7);
  });

  it('적군 기물이 있는 칸까지 이동할 수 있지만, 그 너머로는 갈 수 없다', () => {
    const fen = '8/8/3p4/8/3R2p1/8/8/8 w - - 0 1';
    board.loadFen(fen);
    const rook = board.getPiece('d4');
    const validMoves = rook.getValidMoves(board, 'd4');
    expect(validMoves).toContain('d6');
    expect(validMoves).not.toContain('d7');
    expect(validMoves).toContain('g4');
    expect(validMoves).not.toContain('h4');
  });
});
