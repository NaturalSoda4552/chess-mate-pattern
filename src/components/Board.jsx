import styled from 'styled-components';
import { motion } from 'framer-motion';

import { pieceImages } from '../utils/imageLoader';
import { useState } from 'react';
import { Paper } from '@mui/material';

const BoardFrame = styled.div`
  display: inline-block;
  background-color: #302e2b;
  padding: 25px;
  border-radius: 6px;
  position: relative;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
`;

const BoardContainer = styled.div`
  width: 640px;
  height: 640px;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  border: 2px solid #333;

  position: relative;
`;

const Square = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;

  /* 1. 기본 배경색 (이게 유지되어야 함) */
  background-color: ${(props) => (props.$isLight ? '#f0d9b5' : '#b58863')};

  /* 2. 선택 시 배경색 변경 */
  ${(props) => props.$isSelected && `background-color: #6495ED;`}

  /* 3. 이동 가능 표시 (초록색 링) */
  ${(props) =>
    props.$isValidMove && `box-shadow: inset 0 0 0 5px rgba(0, 255, 0, 0.5);`}

  /* 4. [수정] 체크메이트/체크 표시 */
  ${(props) =>
    props.$isCheckmated &&
    `
      box-shadow: inset 0 0 20px rgba(255, 0, 0, 0.8),
      inset 0 0 0 2px rgba(255, 0, 0, 0.8);
    `}
`;

const PieceContainer = styled(motion.div)`
  position: absolute;
  width: 80px;
  height: 80px;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Piece = styled.img`
  width: 75%;
  height: 75%;
`;

const Coordinate = styled.span`
  position: absolute;
  font-size: 20px;
  font-weight: 800;
  color: #ebecd0;
  pointer-events: none;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const RankLabel = styled(Coordinate)`
  left: 4px;
  width: 20px;
  height: 80px;
`;

const FileLabel = styled(Coordinate)`
  bottom: 2px;
  width: 80px;
  height: 20px;
`;

const Board = ({ board, onMove, isBoardLocked, moveStatus }) => {
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [validMoves, setValidMoves] = useState([]);

  const handleSquareClick = (position) => {
    if (isBoardLocked) return;

    const piece = board.getPiece(position);

    if (selectedSquare) {
      // 선택된 칸을 다시 클릭하면 선택 해제
      if (selectedSquare === position) {
        setSelectedSquare(null);
        setValidMoves([]);
        return;
      }

      // 이동 가능한 칸을 클릭하면 기물 이동
      if (validMoves.includes(position)) {
        onMove(selectedSquare, position);
        setSelectedSquare(null);
        setValidMoves([]);
        return;
      }
    }

    if (piece && piece.color === board.getTurn()) {
      const newValidMoves = piece.getValidMoves(board, position);

      setSelectedSquare(position);
      setValidMoves(newValidMoves);
    } else {
      // 빈 칸이나 상대방 기물을 클릭했다면 선택 해제
      setSelectedSquare(null);
      setValidMoves([]);
    }
  };

  const gridForBackGround = Array.from({ length: 64 });
  const piecesOnBoard = board.getGrid().flat().filter(Boolean);

  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = [8, 7, 6, 5, 4, 3, 2, 1];

  let checkmatedKingSquare = null;
  if (moveStatus === 'CHECKMATE') {
    const opponentColor = board.getTurn();
    checkmatedKingSquare = board.findPieceSquare('k', opponentColor);
  }

  return (
    <Paper
      sx={{
        borderRadius: 4,
        padding: '40px 100px',
        width: 'fit-content',
        boxSizing: 'border-box',
      }}
    >
      <BoardFrame>
        {/* 왼쪽 숫자 좌표 */}
        {ranks.map((rank, index) => (
          <RankLabel
            key={`rank-${rank}`}
            style={{ top: `${25 + index * 80}px` }}
          >
            {rank}
          </RankLabel>
        ))}

        <BoardContainer>
          {/* 체스판 렌더링 */}
          {gridForBackGround.map((_, index) => {
            const row = Math.floor(index / 8);
            const col = index % 8;

            // 체스 좌표 문자열
            const squareName = String.fromCharCode(97 + col) + (8 - row);
            // 칸 색상 밝기 여부
            const isLight = (row + col) % 2 !== 0;

            return (
              <Square
                key={squareName}
                $isLight={isLight}
                $isSelected={selectedSquare === squareName}
                $isValidMove={validMoves.includes(squareName)}
                $isCheckmated={checkmatedKingSquare === squareName}
                onClick={() => handleSquareClick(squareName)}
              />
            );
          })}
          {/* 기물 렌더링 */}
          {piecesOnBoard.map((piece) => {
            const position = board.getPiecePosition(piece.id);
            if (!position) return null; // 만약의 경우에 대한 방어 코드

            const { row, col } = position;
            return (
              <PieceContainer
                key={piece.id} // 기물 고유 ID
                layout // 이 속성이 레이아웃 변경을 자동으로 감지하고 애니메이션을 적용합니다.
                style={{
                  top: `${row * 80}px`,
                  left: `${col * 80}px`,
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 40 }} // 애니메이션 타입 (취향에 맞게 조정)
              >
                <Piece src={pieceImages[piece.color][piece.type]} />
              </PieceContainer>
            );
          })}
        </BoardContainer>

        {/* 하단 문자 좌표 */}
        {files.map((file, index) => (
          <FileLabel
            key={`file-${file}`}
            style={{ left: `${25 + index * 80}px` }}
          >
            {file}
          </FileLabel>
        ))}
      </BoardFrame>
    </Paper>
  );
};

export default Board;
