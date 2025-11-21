import { useState, useMemo } from 'react';
import Header from '../components/Header';
import PatternSelector from '../components/PatternSelector';
import Board from '../components/Board';
import InfoPanel from '../components/InfoPanel';

import { MatePatterns } from '../data/MatePatterns.js';
import ChessManager from '../model/ChessManager.js';

import { Grid, Box } from '@mui/material';

const title = '체스 메이트 패턴 연습하기';

const MainPage = () => {
  const chessManager = useMemo(() => new ChessManager(), []);
  const [updater, setUpdater] = useState(0);

  // PatternSelector 컴포넌트에서 사용하는 함수
  const handlePatternSelect = (patternId) => {
    chessManager.loadPattern(patternId);
    setUpdater((u) => u + 1);
  };

  // Board 관련
  const board = chessManager.getBoard();

  // InfoPanel 관련
  const pattern = chessManager.getCurrentPattern();

  const handleMove = (from, to) => {
    chessManager.handleMove(from, to);
    setUpdater((u) => u + 1);
  };

  const handleDrag = (event) => {};

  return (
    <Box sx={{ padding: 2 }}>
      <Header title={title} />
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid>
          <PatternSelector
            patterns={MatePatterns}
            onPatternSelect={handlePatternSelect}
          />
        </Grid>
        <Grid sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Board board={board} onMove={handleMove} />
          <InfoPanel pattern={pattern} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainPage;
