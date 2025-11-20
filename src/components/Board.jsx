import styled from 'styled-components';

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

const Board = ({ board }) => {
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

          return <Square key={squareName} $isLight={isLight}></Square>;
        })}
    </BoardContainer>
  );
};

export default Board;
