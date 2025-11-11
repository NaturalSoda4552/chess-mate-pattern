import { Chess } from 'chess.js';

// 기본 포지션으로 체스판 생성
const chess1 = new Chess();

// FEN 표기 문자열로 체스판 생성
// FEN 표기법
// 기본적으로 백이 대문자, 흑이 소문자
// 1. rnbqkbnr/pppp1ppp/8/1111p111/1111P111/8/PPPP1PPP/RNBQKBNR : 흑이 위, 백이 아래일 때 체스판의 상태
// 2. w : 백의 차례 (흑의 경우는 b)
// 3. KQkq : 백, 흑 모두 캐슬링 가능 (백만 가능한 경우는 KQ, 둘 다 불가능 한 경우 -(하이픈))
// 4. 0 : 마지막 폰의 움직임 또는 기물이 잡힌 이후 지난 수
// 5. 1 : 현재 둘 수가 몇 번째 수인지
const chess2 = new Chess(
  'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1',
);

// 1. 체스판 상태를 FEN 표기법인 문자열로 반환
// console.log(chess1.fen());
// console.log(chess2.fen());

// 2. 체스판 상태를 ascii 문자열로 반환
// console.log(chess1.ascii());
// console.log(chess2.ascii());

// 3. 체스 기물 이동
// 3-1. 3가지 이동 방식
// 3-1-1. Standard Algebraic Notation (SAN)
// 간결한 방식
chess1.move('e4'); // w
chess1.move('d5'); // b
chess1.move('exd5'); // w
chess1.move('e6'); // b

// 3-1-2. Long Algebraic Notation (LAN)
// 어디에서 어디로 이동하는지
chess1.move('b1c3'); // w
chess1.move('g8f6'); // b

// 3-1-3. Object
// 어디 칸에서(from) 어디 칸으로(to) 이동하는지
// 보통 프로모션을 처리할 때 유용함.
chess1.move({ from: 'g1', to: 'f3' }); // w
chess1.move({ from: 'e6', to: 'd5' }); // b

// 3-2. move() 성공 시 Move 객체 반환
const moveResult = chess1.move('d4'); // w
// console.log(moveResult);
// Move {
//   color: 'w',                    // 수를 둔 플레이어
//   from: 'd2',                    // 어디에서
//   to: 'd4',                      // 어디로
//   piece: 'p',                    // 어떤 기물
//   captured: undefined,           // (만약 잡았다면) 잡은 기물
//   promotion: undefined,          // (만약 프로모션한다면) 승급한 기물
//   flags: 'b',                    // 이 수의 특성 ('b': 폰 2칸 전진, 'c': 캡처, 'k': 킹사이드 캐슬링 등)
//   san: 'd4',                     // SAN 표기
//   lan: 'd2d4',                   // LAN 표기
//   before: 'rnbqkb1r/ppp2ppp/5n2/3p4/8/2N2N2/PPPP1PPP/R1BQKB1R w KQkq - 0 5',
//   after: 'rnbqkb1r/ppp2ppp/5n2/3p4/3P4/2N2N2/PPP2PPP/R1BQKB1R b KQkq - 0 5'
// }

// 3-3. move() 실패 시 ERROR 발생
// chess1.move('c4'); // b -> Error: Invalid move: c4 (흑 차례에 폰이 c4로 갈 수 없음)

// 3-4. 이동이 모호한 경우 ERROR 발생
// chess1.move('b5'); // w -> Error: Invalid move: b5 (c3의 나이트와 f1의 비숍이 둘 다 b5로 갈 수 있음, SAN으로 표기하면 모호함)

// 3-5. 마지막 수 무르기
chess1.undo();

// 4. 상태 판별
// 4-1. isGameOver(): 게임 종료 여부
const isGameOver = chess1.isGameOver();
// 4-2. 현재 턴 플레이어의 체크메이트 여부
const isCheckMate = chess1.isCheckmate();
// 4-3. 스테일메이트 여부
const isStaleMate = chess1.isStalemate();
// 4-4. 무승부 여부
const isDraw = chess1.isDraw();
// 4-5. 3회 동형 반복으로 인한 무승부 여부
const isThreefoldRepetition = chess1.isThreefoldRepetition();
// 4-6. 현재 턴인 플레이어의 체크 여부
const isInCheck = chess1.inCheck();

// 5. 불러오기 및 관리
// 5-1. load(fen): FEN 문자열로 보드 초기화
chess1.load('rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1');

// 5-2. loadPgn(pgn): PGN 문자열을 로드

// 5-3. pgn(): 현재까지의 기록을 PGN 형식으로 반환
// console.log(chess1.pgn());

// 5-4. clear(): 보드 비우기
chess1.clear();

// 5-5. reset(): 기본 포지션으로 보드 리셋
chess1.reset();

// 6. 기물
// 6-1. get(square): 특정 칸에 있는 기물 정보를 객체로 반환 (비어있으면 null)
console.log(chess1.get('e1')); // e1 칸에 존재하는 기물: 백색 킹, 반환값: {type: 'k', color: 'w'}
console.log(chess1.get('e3')); // e3 칸에 존재하는 기물: 없음, 반환값: null

// 6-2. put(square): 특정 칸에 기물을 놓음
chess1.put({ type: 'q', color: 'w' }, 'e4'); // 백색 퀸을 e4 칸에 놓음
console.log(chess1.ascii());

// 6-3.remove(square): 특정 칸의 기물을 제거
chess1.remove('e4'); // e4 칸의 기물을 제거
console.log(chess1.ascii());
