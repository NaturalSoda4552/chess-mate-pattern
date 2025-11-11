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
console.log(chess1.fen());
console.log(chess2.fen());

// 2. 체스판 상태를 ascii 문자열로 반환
console.log(chess1.ascii());
console.log(chess2.ascii());
