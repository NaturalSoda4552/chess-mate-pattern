import { describe, it, expect, beforeEach } from 'vitest';
import ChessManager from '../../src/model/ChessManager.js';

// 테스트를 위한 간단한 목(mock) 패턴 데이터
const mockPatterns = [
  {
    id: 0,
    name: '테스트 메이트 1',
    initialFen:
      'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3',
    solution: [{ from: 'f3', to: 'e5' }],
  },
  {
    id: 1,
    name: '테스트 메이트 2',
    initialFen: '6k1/8/8/8/8/8/R7/6K1 w - - 0 1',
    solution: [
      { from: 'a2', to: 'a8' },
      { from: 'g8', to: 'h7' },
      { from: 'a8', to: 'h8' },
    ],
  },
];

describe('ChessManager 로직', () => {
  let chessManager;

  // mockPatterns를 사용하는 새 ChessManager 인스턴스 생성
  beforeEach(() => {
    chessManager = new ChessManager(mockPatterns);
  });

  it('loadPattern()은 특정 패턴을 로드하고 상태를 초기화해야 한다', () => {
    chessManager.loadPattern(1); // Mate in 2 패턴 로드
    const board = chessManager.getBoard();

    expect(board.getPiece('a2').type).toBe('r');
    expect(board.getTurn()).toBe('w');

    const result = chessManager.handleMove('a2', 'a8');
    expect(result.status).toBe('CORRECT');
  });

  it('handleMove()는 정답 수를 두었을 때 CORRECT를 반환해야 한다', () => {
    chessManager.loadPattern(1);
    const result = chessManager.handleMove('a2', 'a8');
    expect(result.status).toBe('CORRECT');
  });

  it('handleMove()는 마지막 정답 수를 두었을 때 CHECKMATE를 반환해야 한다', () => {
    chessManager.loadPattern(0);
    const result = chessManager.handleMove('f3', 'e5');
    expect(result.status).toBe('CHECKMATE');
  });

  it('handleMove()는 오답 수를 두었을 때 WRONG을 반환해야 한다', () => {
    chessManager.loadPattern(0);
    const result = chessManager.handleMove('d1', 'e2'); // 오답 수
    expect(result.status).toBe('WRONG');
  });

  it('handleMove()는 규칙에 맞지 않는 수를 두었을 때 INVALID_MOVE를 반환해야 한다', () => {
    chessManager.loadPattern(0);
    const result = chessManager.handleMove('f3', 'f4'); // 나이트의 움직임이 아님
    expect(result.status).toBe('INVALID_MOVE');
  });

  it('handleOpponentMove()는 상대방의 수를  두고 턴을 넘겨야 한다', () => {
    chessManager.loadPattern(1);
    chessManager.handleMove('a2', 'a8'); // 백의 첫 수

    // 이제 흑의 턴
    expect(chessManager.getBoard().getTurn()).toBe('b');

    chessManager.handleOpponentMove(); // 흑의 수를 진행 (g8 -> h7)

    // 흑의 수가 잘 두어졌는지, 턴이 백에게 돌아왔는지 확인
    expect(chessManager.getBoard().getPiece('g8')).toBeNull();
    expect(chessManager.getBoard().getPiece('h7').type).toBe('k');
    expect(chessManager.getBoard().getTurn()).toBe('w');
  });

  it('resetToLastCheckpoint()는 보드를 마지막 체크포인트 상태로 되돌려야 한다', () => {
    chessManager.loadPattern(1);
    const initialFen = chessManager.getBoard().fen();

    // 수를 진행
    chessManager.handleMove('a2', 'a8');
    chessManager.handleOpponentMove();

    expect(chessManager.getBoard().fen()).not.toBe(initialFen);

    const checkpointStateFen = chessManager.getBoard().fen();
    chessManager.resetToLastCheckpoint();
    expect(chessManager.getBoard().fen()).toBe(checkpointStateFen);
  });
});
