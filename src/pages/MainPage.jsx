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

  const [currentPattern, setCurrentPattern] = useState(null);
  const currentBoard = chessManager.getBoard();
  const [moveStatus, setMoveStatus] = useState(null);

  const [isBoardLocked, setIsBoardLocked] = useState(false);

  // 패턴 선택 시 처리 함수
  const handlePatternSelect = (patternId) => {
    chessManager.loadPattern(patternId);
    setCurrentPattern(chessManager.getCurrentPattern());
    setUpdater((u) => u + 1);
  };

  // 움직임 처리 함수
  const handleMove = (from, to) => {
    // 잠겨있으면 return
    if (isBoardLocked) return;

    const result = chessManager.handleMove(from, to);
    setUpdater((u) => u + 1);

    // 오답일 시 처리
    if (result.status === 'WRONG') {
      // 임시로 이동
      currentBoard.movePiece(from, to);
      setUpdater((u) => u + 1);

      // 대기 후
      setTimeout(() => {
        chessManager.resetToLastCheckpoint();
        setUpdater((u) => u + 1);
      }, 1000);

      return;
    }

    // 정답일 시 처리
    if (result.status === 'CORRECT') {
      setIsBoardLocked(true);

      setTimeout(() => {
        chessManager.handleOpponentMove();
        setUpdater((u) => u + 1);

        setIsBoardLocked(false);
      }, 1000);

      return;
    }
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
          <Board
            board={currentBoard}
            onMove={handleMove}
            isBoardLocked={isBoardLocked}
          />
          <InfoPanel pattern={currentPattern} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainPage;
