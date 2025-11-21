export const MatePatterns = [
  {
    id: 0,
    name: "풀스 메이트 (Fool's Mate)",
    description: '가장 짧은 체크메이트 패턴입니다.',
    hint: '백 차례이며, 체크메이트까지 1수',
    initialFen: 'rnbqkbnr/ppppp2p/5p2/4P1p1/8/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1',
    solution: [{ from: 'd1', to: 'h5' }],
  },
  {
    id: 1,
    name: "스콜라 메이트 (Scholar's Mate)",
    description: '퀸과 비숍이 연계한 체크메이트 패턴입니다.',
    hint: '백 차례이며, 체크메이트까지 2수',
    initialFen:
      'r1bqkbnr/pppp1ppp/2n5/4p2Q/4P3/8/PPPP1PPP/RNB1KBNR w KQkq - 0 3',
    solution: [
      { from: 'f1', to: 'c4' }, // w
      { from: 'g8', to: 'f6' }, // b
      { from: 'h5', to: 'f7' }, // w -> 체크메이트
    ],
  },
  {
    id: 2,
    name: '백랭크 메이트 (Backrank Mate)',
    description: '캐슬링 이후 놓치기 쉬운 체크메이트 패턴입니다.',
    hint: '백 차례이며, 체크메이트까지 2수',
    initialFen: '1k3q2/ppp5/7r/8/8/8/7R/3RK3 w - - 0 1',
    solution: [
      { from: 'h2', to: 'h6' }, // w
      { from: 'f8', to: 'h6' }, // b
      { from: 'd1', to: 'd8' }, // w -> 체크메이트
    ],
  },
  {
    id: 3,
    name: '계단/사다리 메이트 (Ladder/Staircase)',
    description: '메이저 피스 2개로 만들 수 있는 체크메이트 패턴입니다.',
    hint: '백 차례이며, 체크메이트까지 2수',
    initialFen: '8/4k3/6R1/7Q/8/8/8/3K4 w - - 0 1',
    solution: [
      { from: 'h5', to: 'h7' }, // w
      { from: 'e7', to: 'd8' }, // b
      { from: 'g6', to: 'g8' }, // w -> 체크메이트
    ],
  },
  {
    id: 4,
    name: '스머더드 메이트 (Smothered Mate)',
    description: '킹이 자신의 기물에 막히는 체크메이트 패턴입니다.',
    hint: '백 차례이며, 체크메이트까지 2수',
    initialFen: '6rk/6pp/8/4N3/8/8/2K5/8 w - - 0 1',
    solution: [
      { from: 'e5', to: 'f7' }, // w -> 체크메이트
    ],
  },
];
