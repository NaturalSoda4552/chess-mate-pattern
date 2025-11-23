import { describe, it, expect } from 'vitest';
import PieceFactory from '../../src/utils/PieceFactory.js';
import Rook from '../../src/model/pieces/Rook.js';
import Knight from '../../src/model/pieces/Knight.js';
import Bishop from '../../src/model/pieces/Bishop.js';
import Queen from '../../src/model/pieces/Queen.js';
import King from '../../src/model/pieces/King.js';
import Pawn from '../../src/model/pieces/Pawn.js';

describe('PieceFactory 유틸리티', () => {
  describe('create', () => {
    it('대문자 "R"을 입력하면 백 Rook 인스턴스를 생성해야 한다', () => {
      const piece = PieceFactory.create('R');
      expect(piece).toBeInstanceOf(Rook);
      expect(piece.color).toBe('w');
    });

    it('소문자 "n"을 입력하면 흑 Knight 인스턴스를 생성해야 한다', () => {
      const piece = PieceFactory.create('n');
      expect(piece).toBeInstanceOf(Knight);
      expect(piece.color).toBe('b');
    });

    it('대문자 "B"를 입력하면 백 Bishop 인스턴스를 생성해야 한다', () => {
      const piece = PieceFactory.create('B');
      expect(piece).toBeInstanceOf(Bishop);
      expect(piece.color).toBe('w');
    });

    it('소문자 "q"를 입력하면 흑 Queen 인스턴스를 생성해야 한다', () => {
      const piece = PieceFactory.create('q');
      expect(piece).toBeInstanceOf(Queen);
      expect(piece.color).toBe('b');
    });

    it('대문자 "K"를 입력하면 백 King 인스턴스를 생성해야 한다', () => {
      const piece = PieceFactory.create('K');
      expect(piece).toBeInstanceOf(King);
      expect(piece.color).toBe('w');
    });

    it('소문자 "p"를 입력하면 흑 Pawn 인스턴스를 생성해야 한다', () => {
      const piece = PieceFactory.create('p');
      expect(piece).toBeInstanceOf(Pawn);
      expect(piece.color).toBe('b');
    });

    it('유효하지 않은 문자를 입력하면 null을 반환해야 한다', () => {
      // PieceFactory.create가 유효하지 않은 문자에 대해 null을 반환한다고 가정
      expect(PieceFactory.create('z')).toBeNull();
      expect(PieceFactory.create('1')).toBeNull();
      expect(PieceFactory.create('')).toBeNull();
    });
  });
});
