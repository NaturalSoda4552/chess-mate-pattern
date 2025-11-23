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

  const [selectedSquare, setSelectedSquare] = useState(null);
  const [validMoves, setValidMoves] = useState([]);

  // 패턴 선택 시 처리 함수
  const handlePatternSelect = (patternId) => {
    chessManager.loadPattern(patternId);
    setMoveStatus(null);
    setIsBoardLocked(false);
    setCurrentPattern(chessManager.getCurrentPattern());
    setSelectedSquare(null);
    setValidMoves([]);
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

      // WRONG 상태로 변경
      setMoveStatus({ status: result.status, id: Date.now() });

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

      // CORRECT 상태로 변경
      setMoveStatus({ status: result.status, id: Date.now() });

      setTimeout(() => {
        chessManager.handleOpponentMove();
        setUpdater((u) => u + 1);

        setIsBoardLocked(false);
      }, 1000);

      return;
    }

    if (result.status === 'CHECKMATE') {
      // 체크메이트 상태로 변경
      setMoveStatus({ status: result.status, id: Date.now() });

      // 체스판 잠구기
      setIsBoardLocked(true);
    }
  };

  const handleDrag = (event) => {};

  return (
    <Box>
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
            moveStatus={moveStatus}
            selectedSquare={selectedSquare}
            setSelectedSquare={setSelectedSquare}
            validMoves={validMoves}
            setValidMoves={setValidMoves}
          />
          <InfoPanel pattern={currentPattern} moveStatus={moveStatus} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainPage;
