import { describe, it, expect, beforeEach, vi } from 'vitest';
import Board from '../../../src/model/Board.js';
import Knight from '../../../src/model/pieces/Knight.js';

vi.mock('../../../src/utils/PieceFactory.js', () => ({
  default: {
    create: (char) => {
      const color = char === char.toUpperCase() ? 'w' : 'b';
      const type = char.toLowerCase();
      if (type === 'n') return new Knight(color);
      return { id: Math.random(), type, color, getValidMoves: () => [] };
    },
  },
}));

describe('나이트 이동 규칙', () => {
  let board;
  beforeEach(() => {
    board = new Board();
  });

  it('빈 보드에서 L자 형태로 움직일 수 있어야 한다', () => {
    const fen = '8/8/8/8/3N4/8/8/8 w - - 0 1';
    board.loadFen(fen);
    const knight = board.getPiece('d4');
    const validMoves = knight.getValidMoves(board, 'd4');
    expect(validMoves.length).toBe(8);
    expect(validMoves).toEqual(
      expect.arrayContaining(['c2', 'e2', 'b3', 'f3', 'b5', 'f5', 'c6', 'e6']),
    );
  });

  it('경로에 다른 기물이 있어도 뛰어넘을 수 있다', () => {
    const fen = '8/8/8/2PPP3/2PNP3/2PPP3/8/8 w - - 0 1';
    board.loadFen(fen);
    const knight = board.getPiece('d4');
    const validMoves = knight.getValidMoves(board, 'd4');
    expect(validMoves.length).toBe(8);
  });

  it('도착 지점에 아군 기물이 있으면 그 칸으로 이동할 수 없다', () => {
    const fen = '8/8/2P1P3/8/3N4/8/8/8 w - - 0 1';
    board.loadFen(fen);
    const knight = board.getPiece('d4');
    const validMoves = knight.getValidMoves(board, 'd4');
    expect(validMoves).not.toContain('c6');
    expect(validMoves).not.toContain('e6');
    expect(validMoves.length).toBe(6);
  });

  it('도착 지점에 적군 기물이 있으면 그 칸으로 이동할 수 있다', () => {
    const fen = '8/8/2p1p3/8/3N4/8/8/8 w - - 0 1';
    board.loadFen(fen);
    const knight = board.getPiece('d4');
    const validMoves = knight.getValidMoves(board, 'd4');
    expect(validMoves).toContain('c6');
    expect(validMoves).toContain('e6');
    expect(validMoves.length).toBe(8);
  });
});
