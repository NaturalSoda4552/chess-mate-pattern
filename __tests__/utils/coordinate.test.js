import { describe, it, expect } from 'vitest';
import {
  squareToCoords,
  coordsToSquare,
  validateSquare,
} from '../../src/utils/coordinate.js';

describe('coordinate', () => {
  describe('squareToCoords', () => {
    it("'a1'을 { row: 7, col: 0 }으로 변환해야 한다", () => {
      expect(squareToCoords('a1')).toEqual({ row: 7, col: 0 });
    });

    it("'h8'을 { row: 0, col: 7 }으로 변환해야 한다", () => {
      expect(squareToCoords('h8')).toEqual({ row: 0, col: 7 });
    });

    it("'e4'를 { row: 4, col: 4 }로 변환해야 한다", () => {
      expect(squareToCoords('e4')).toEqual({ row: 4, col: 4 });
    });

    it('잘못된 형식의 좌표에 대해 에러를 발생시켜야 한다', () => {
      expect(() => squareToCoords('a9')).toThrow();
      expect(() => squareToCoords('a0')).toThrow();
      expect(() => squareToCoords('i1')).toThrow();
      expect(() => squareToCoords('i8')).toThrow();
      expect(() => squareToCoords('1')).toThrow();
      expect(() => squareToCoords('a')).toThrow();
    });
  });

  describe('coordsToSquare', () => {
    it('{ row: 7, col: 0 }을 "a1"로 변환해야 한다', () => {
      expect(coordsToSquare(7, 0)).toBe('a1');
    });

    it('{ row: 0, col: 7 }을 "h8"로 변환해야 한다', () => {
      expect(coordsToSquare(0, 7)).toBe('h8');
    });

    it('{ row: 4, col: 4 }를 "e4"로 변환해야 한다', () => {
      expect(coordsToSquare(4, 4)).toBe('e4');
    });

    it('범위를 벗어난 좌표에 대해 null을 반환해야 한다', () => {
      expect(coordsToSquare(-1, 0)).toBeNull();
      expect(coordsToSquare(0, 8)).toBeNull();
      expect(coordsToSquare(8, 7)).toBeNull();
    });
  });

  describe('validateSquare', () => {
    it('유효한 좌표에 대해 에러를 발생시키지 않아야 한다', () => {
      expect(() => validateSquare('a1')).not.toThrow();
      expect(() => validateSquare('h8')).not.toThrow();
    });

    it('유효하지 않은 좌표에 대해 에러를 발생시켜야 한다', () => {
      expect(() => validateSquare('i9')).toThrow(
        '한 칸은 a~h 사이의 알파벳 하나와 1~8 사이의 숫자로 이루어져야 합니다. (입력: i9)',
      );
    });
  });
});
