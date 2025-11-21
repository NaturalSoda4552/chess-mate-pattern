import { useState, useMemo, useEffect } from 'react';
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

  // Board 클릭 & DND 기능 관련 함수
  const board = chessManager.getBoard();

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
        <Grid>
          <Board board={board} onMove={handleMove} />
          <InfoPanel />
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainPage;
