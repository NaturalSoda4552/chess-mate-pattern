import { describe, it, expect, vi } from 'vitest';
import FenConverter from '../../src/utils/FenConverter.js';

// FenConverter가 PieceFactory.create(char)에 의존하므로, 이를 모의 처리합니다.
vi.mock('../../src/utils/PieceFactory.js', () => ({
  default: {
    create: (char) => {
      const color = char === char.toUpperCase() ? 'w' : 'b';
      const type = char.toLowerCase();
      return { type, color };
    },
  },
}));

describe('FenConverter 유틸리티', () => {
  describe('fenToBoard', () => {
    it('표준 FEN 문자열을 올바르게 파싱해야 한다', () => {
      const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
      const { grid, color } = FenConverter.fenToBoard(fen);

      expect(grid.length).toBe(8);
      expect(grid[0].length).toBe(8);
      expect(color).toBe('w');
      expect(grid[0][0]).toEqual({ type: 'r', color: 'b' }); // a8의 흑 룩
      expect(grid[7][4]).toEqual({ type: 'k', color: 'w' }); // e1의 백 킹
      expect(grid[3][3]).toBeNull(); // d5의 빈 칸
    });

    it('행의 개수가 8개가 아닌 FEN에 대해 에러를 발생시켜야 한다', () => {
      const invalidFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP w KQkq - 0 1'; // 7줄
      expect(() => FenConverter.fenToBoard(invalidFen)).toThrow(
        '전체 랭크의 수는 8개여야 합니다.',
      );
    });

    it('한 행의 칸 수가 8개가 아닌 FEN에 대해 에러를 발생시켜야 한다', () => {
      const invalidFen =
        'rnbqkbnr/pppppppp/9/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'; // 9칸
      expect(() => FenConverter.fenToBoard(invalidFen)).toThrow(
        '한 랭크는 정확히 8칸이여야 합니다.',
      );
    });
  });
});
