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
    name: '계단/사다리 메이트 (Ladder/Staircase Mate)',
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
    hint: '백 차례이며, 체크메이트까지 1수',
    initialFen: '6rk/6pp/8/4N3/8/8/2K5/8 w - - 0 1',
    solution: [
      { from: 'e5', to: 'f7' }, // w -> 체크메이트
    ],
  },
  {
    id: 5,
    name: "레갈스 메이트 (Legal's Mate)",
    description: '마이너 피스(나이트, 비숍)를 활용한 체크메이트 패턴입니다.',
    hint: '백 차례이며, 체크메이트까지 2수',
    initialFen:
      'r2qkbnr/ppp2ppp/2np4/4N3/2B1P3/2N5/PPPP1PPP/2BbK2R w Kkq - 0 5',
    solution: [
      { from: 'c4', to: 'f7' },
      { from: 'e8', to: 'e7' },
      { from: 'c3', to: 'd5' }, // w -> 체크메이트
    ],
  },
  {
    id: 6,
    name: "스왈로우테일 메이트 (Swallow's Tail Mate)",
    description:
      '폰으로 퇴로가 막힌 킹이 퀸의 공격을 받는 체크메이트 패턴입니다.',
    hint: '백 차례이며, 체크메이트까지 1수',
    initialFen: '8/2p1p3/3k4/8/8/8/Q5B1/8 w - - 0 1',
    solution: [
      { from: 'a2', to: 'd5' }, // w -> 체크메이트
    ],
  },
  {
    id: 7,
    name: "롤리 메이트 (Lolli's Mate)",
    description: '폰과 퀸을 이용한 체크메이트 패턴입니다.',
    hint: '백 차례이며, 체크메이트까지 2수',
    initialFen: '7k/5p1p/5Ppq/8/8/8/8/7Q w - - 0 1',
    solution: [
      { from: 'h1', to: 'h6' },
      { from: 'h8', to: 'g8' },
      { from: 'h6', to: 'g7' },
    ],
  },
  {
    id: 8,
    name: '죽음의 키스 메이트 (Kiss of Death Mate)',
    description: '킹과 퀸을 이용한 체크메이트 패턴입니다.',
    hint: '백 차례이며, 체크메이트까지 2수',
    initialFen: 'k7/8/1K6/1Q6/8/8/8/8 w - - 0 1',
    solution: [
      { from: 'b5', to: 'a6' },
      { from: 'a8', to: 'b8' },
      { from: 'a6', to: 'b7' },
    ],
  },
];
