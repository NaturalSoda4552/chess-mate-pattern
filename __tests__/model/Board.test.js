import { describe, it, expect, beforeEach, vi } from 'vitest';
import Board from '../../src/model/Board.js';

// PieceFactory의 create() 모의 처리
vi.mock('../../src/utils/PieceFactory.js', () => ({
  default: {
    create: (char) => {
      const color = char === char.toUpperCase() ? 'w' : 'b';
      const type = char.toLowerCase();
      return {
        id: Math.random(),
        type,
        color,
        getValidMoves: () => [],
      };
    },
  },
}));

describe('Board', () => {
  let board;

  // 각 테스트 케이스 실행 전에 새 Board 인스턴스를 생성
  beforeEach(() => {
    board = new Board();
  });

  it('Board 인스턴스 생성 시 체스판은 8x8 빈 배열이여야 합니다.', () => {
    const grid = board.getGrid();
    expect(grid.length).toBe(8);
    expect(grid[0].length).toBe(8);
    expect(grid[3][3]).toBeNull();
  });

  it('체스판은 fen 문자열을 받아 loadFen()로 체스판을 초기화할 수 있어야 합니다.', () => {
    const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 1';
    board.loadFen(fen);

    expect(board.getPiece('a8').type).toBe('r');
    expect(board.getPiece('a8').color).toBe('b');
    expect(board.getPiece('e1').type).toBe('k');
    expect(board.getPiece('e1').color).toBe('w');
    expect(board.getPiece('e4')).toBeNull();
    expect(board.getTurn()).toBe('w');
  });

  it('잘못된 FEN 문자열을 loadFen()에 전달하면 에러를 발생시켜야 합니다.', () => {
    const invalidFenRow = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP w - - 0 1'; // 7줄
    const invalidFenFile =
      'rnbqkbnr/pppppppp/9/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 1'; // 9칸

    expect(() => board.loadFen(invalidFenRow)).toThrow();
    expect(() => board.loadFen(invalidFenFile)).toThrow();
  });

  it('기물을 움직이면 상대 턴으로 바뀌어야 합니다.', () => {
    const fen = 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2';
    board.loadFen(fen);
    expect(board.getTurn()).toBe('w');

    board.movePiece('g1', 'f3');

    expect(board.getPiece('g1')).toBeNull();
    const movedKnight = board.getPiece('f3');
    expect(movedKnight).not.toBeNull();
    expect(movedKnight.type).toBe('n');
    expect(movedKnight.color).toBe('w');
    expect(board.getTurn()).toBe('b');
  });

  it('fen()를 통해 현재 체스판을 fen 문자열로 추출할 수 있어야 합니다.', () => {
    const initialFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 1';
    board.loadFen(initialFen);

    expect(
      board.fen().startsWith('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w'),
    ).toBe(true);
  });

  it('getPiecePosition()는 기물의 ID로 정확한 위치 {row, col}을 반환해야 합니다.', () => {
    const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 1';
    board.loadFen(fen);

    const whiteKing = board.getPiece('e1');
    const position = board.getPiecePosition(whiteKing.id);

    // e1은 {row: 7, col: 4}에 해당
    expect(position).toEqual({ row: 7, col: 4 });
  });

  it('findPieceSquare()는 기물의 타입과 색으로 정확한 좌표를 반환해야 합니다.', () => {
    const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 1';
    board.loadFen(fen);

    const blackKingSquare = board.findPieceSquare('k', 'b');
    const whiteQueenSquare = board.findPieceSquare('q', 'w');

    expect(blackKingSquare).toBe('e8');
    expect(whiteQueenSquare).toBe('d1');
  });
});
