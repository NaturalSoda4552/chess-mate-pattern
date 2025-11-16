export const MatePatterns = [
  {
    id: 0,
    name: "풀스 메이트 (Fool's Mate)",
    description: '가장 짧은 체크메이트 패턴입니다. 흑이 백을 2수만에 이깁니다.',
    initialFen:
      'rnbqkbnr/pppp1ppp/8/8/4p1P1/5P2/PPPPP1PP/RNBQKBNR b KQkq - 0 2',
    solution: [{ from: 'd8', to: 'h4' }],
  },
];
