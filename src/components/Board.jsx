import styled from 'styled-components';

import { pieceImages } from '../utils/imageLoader';
import { useState } from 'react';

const BoardContainer = styled.div`
  width: 640px;
  height: 640px;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  border: 2px solid #333;
`;

const Square = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${(props) => (props.$isLight ? '#f0d9b5' : '#b58863')};

  ${(props) =>
    props.$isSelected &&
    `background-color: 
      #6495ED;`}

  ${(props) =>
    props.$isValidMove && `box-shadow: inset 0 0 0 5px rgba(0, 255, 0, 0.5);`}
`;

const Piece = styled.img`
  width: 75%;
  height: 75%;
  pointer-events: none;
`;

const Board = ({ board, onMove }) => {
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [validMoves, setValidMoves] = useState([]);

  const handleSquareClick = (position) => {
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
      } else {
        const targetPiece = board.getPiece(position);
        console.log(targetPiece);
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

  return (
    <BoardContainer>
      {board
        .getGrid()
        .flat()
        .map((piece, index) => {
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
              onClick={() => handleSquareClick(squareName)}
            >
              {piece && <Piece src={pieceImages[piece.color][piece.type]} />}
            </Square>
          );
        })}
    </BoardContainer>
  );
};

export default Board;
