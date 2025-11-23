import { describe, it, expect, beforeEach, vi } from 'vitest';
import Board from '../../../src/model/Board.js';
import Pawn from '../../../src/model/pieces/Pawn.js';

vi.mock('../../../src/utils/PieceFactory.js', () => ({
  default: {
    create: (char) => {
      const color = char === char.toUpperCase() ? 'w' : 'b';
      const type = char.toLowerCase();
      if (type === 'p') return new Pawn(color);
      return { id: Math.random(), type, color, getValidMoves: () => [] };
    },
  },
}));

describe('폰 이동 규칙', () => {
  let board;
  beforeEach(() => {
    board = new Board();
  });

  it('앞 칸이 비어있을 경우, 앞으로 한 칸 전진할 수 있어야 한다', () => {
    board.loadFen('8/8/8/8/8/8/4P3/8 w - - 0 1');
    const pawn = board.getPiece('e2');
    const validMoves = pawn.getValidMoves(board, 'e2');
    expect(validMoves).toContain('e3');
  });

  it('초기 위치(2행)에 있고 앞 두 칸이 모두 비어있을 경우, 앞으로 두 칸 전진할 수 있어야 한다', () => {
    board.loadFen('8/8/8/8/8/8/4P3/8 w - - 0 1');
    const pawn = board.getPiece('e2');
    const validMoves = pawn.getValidMoves(board, 'e2');
    expect(validMoves).toContain('e4');
  });

  it('경로가 막혀있을 경우, 두 칸 앞으로 전진할 수 없다', () => {
    board.loadFen('8/8/8/8/4p3/8/4P3/8 w - - 0 1');
    const pawn = board.getPiece('e2');
    const validMoves = pawn.getValidMoves(board, 'e2');
    expect(validMoves).not.toContain('e4');
  });

  it('대각선에 적군 기물이 있을 경우, 잡을 수 있어야 한다', () => {
    board.loadFen('8/8/8/8/8/3p1p2/4P3/8 w - - 0 1');
    const pawn = board.getPiece('e2');
    const validMoves = pawn.getValidMoves(board, 'e2');
    expect(validMoves).toContain('d3');
    expect(validMoves).toContain('f3');
  });
  it('대각선에 아군 기물이 있거나 빈 칸인 경우, 이동할 수 없다.', () => {
    board.loadFen('8/8/8/8/8/3P4/4P3/8 w - - 0 1');
    const pawn = board.getPiece('e2');
    const validMoves = pawn.getValidMoves(board, 'e2');
    expect(validMoves).not.toContain('d3');
    expect(validMoves).not.toContain('f3');
  });
});
