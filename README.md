# chess-mate-parttern

## 📁 프로젝트 목표

- **`TDD` 환경**을 구축하여 퍼즐의 정답을 판별하는 모델을 구현한다.
- 퍼즐 데이터, 데이터 관리, 게임 로직을 분리하여 `명확한 책임 구조`를 가진 Model을 만든다.
- `MVC 패턴` 적용 및 `React`를 `View`로 활용하여 UI 체스 게임을 렌더링

## ⌕ 프로젝트 명령어

### 레포지토리 복제

`https://github.com/NaturalSoda4552/chess-mate-pattern.git`

### 프로젝트 폴더로 이동 & 라이브러리 설치

`cd chess-mate-pattern`
`npm install`

### 개발 서버 실행

Vite 개발 서버를 실행하여 프로젝트를 확인합니다. 서버가 실행되면 터미널에
표시되는 로컬 주소(일반적으로 http://localhost:5173)를 웹 브라우저에서
열어주세요.

` npm run dev`

### 테스트 실행

vitest를 사용하여 작성된 단위 테스트를 실행합니다.

`npm test`

## 소감

[4~5주차 오픈미션 일자별 소감문](https://www.notion.so/4-5-2b43ddba37838075a30cd95d72a761ef?source=copy_link)


## 핵심 기능 요구사항

1. 패턴 목록

- 모든 체스 메이트 패턴 목록을 조회할 수 있다.
- 각 퍼즐에는 `이름`, `설명`, `힌트`가 표시된다.
- 사용자는 원하는 퍼즐을 선택할 수 있다.

2. 체스판

- 패턴 선택 시 해당 퍼즐의 `시작 FEN`을 기반으로 체스판이 렌더링된다.
- 퍼즐의 `제목`, `목표`, `설명` 등을 표시한다.

3. 설명 패널

- 현재 턴이 `백`이라면 백 기물만, `흑`이라면 흑 기물만 선택할 수 있다.
- 기물 클릭 시 `해당 기물의 유효한 이동 칸`이 하이라이트된다.
- 사용자는 기물을 이동이 유효한 칸으로만 이동시킬 수 있다.
- 이동 후에는 Board가 턴을 교체한다.
- 1수 내로 체크메이트하는 경우, 퀴즈는 종료된다
- 2수 이상으로 체크메이트하는 경우, Board가 턴을 교체하여 흑 차례를 진행하며 이후 다시 사용자의 유효한 수를 받는다.

4. 설명 패널

- 판별 결과에 따라 설명 패널에서 다음 메시지를 출력한다:
  - `정답입니다.`
  - `오답입니다.`
  - `체크메이트!`
- 오답일 경우:
  - 체스판은 자동으로 **체크포인트 상태**로 되돌아간다.
- 정답일 경우:
  - 다음 수가 존재할 시 상대방 수를 진행하며, 체크메이트일 시 게임을 종료한다.

## 📋 요구사항 명세서

1. 패턴 목록에서 여러 메이트 패턴 중 하나를 선택한다.
2. 선택된 패턴의 체스판과 퍼즐 설명 및 목표가 렌더링된다.
3. 사용자가 옳은 수를 두면 성공이며, 옳지 않을 경우 체크포인트 위치로 되돌아간다.
4. 정답을 맞춘 후 게임을 종료한다.

## ⚙️ 구현할 기능 목록

### `model/`

#### Board.js

- [x] `loadFen(fen)` : FEN 문자열을 받아 체스판을 세팅한다.
- [x] `fen()`: 체스판을 FEN 문자열로 반환한다.
- [x] `movePiece(fromSquare, toSquare)` : 출발 칸에서 목적 칸으로 기물을 움직인다.
- [x] `toggleTurn()` : 턴을 교체한다.
- [x] `getPiece()` : 특정 칸의 기물을 반환한다.
- [x] `getTurn()` : 현재 차례 색을 반환한다.
- [x] `getGrid()` : 현재 체스판을 8x8 2차원 배열로 반환한다.

#### ChessManager.js

#### `속성`

- `#patterns`: 패턴 데이터 목록
- `#board`: Board 인스턴스
- `#currentPattern;`: 현재 패턴
- `#status`: 현재 게임 상태
  - `"idle" | "ongoing" | "correct" | "wrong"`
- `#solutionSteps` : 현재 패턴의 정답

#### `메서드`

- [x] `loadCurrentPattern(index)` : 해당 패턴을 로드하여 보드를 초기화한다.
- [x] `getCurrentPattern()` : 현재 패턴 정보를 반환한다.
- [x] `resetToLastCheckpoint()` : 보드를 마지막 체크포인트로 초기화한다.
- [x] `handleMove(fromSquare, toSquare)` :
  - 이동 처리
  - 정답/오답 판별
  - status 업데이트
- [x] `getBoard()` : 현재 Board 객체를 반환한다.
- [x] `getStatus()` : 현재 상태 반환한다.

### `model/pieces/`

#### Piece.js

- 부모 클래스
- `getValidMoves(board, position)` : 추상 메서드

#### Pawn.js, Knight.js, Rook.js, Bishop.js, Queen.js, King.js

- 자식 클래스
- 각 기물에 맞는 `getValidMoves()` 규칙 구현

### `utils/`

#### coordinate.js

- [x] `squareToCoords(square)` : 체스 표기법을 배열 좌표로 변환한다.
- [x] `coordsToSquare(row, col)` : 배열 좌표를 체스 표기법으로 변환한다.
- [x] `isWithinBounds(row, col)` : 주어진 좌표가 체스판 범위 내에 있는지 확인한다.
- [x] `validateSquare(square)` : 주어진 칸이 유효한 표기법인지 확인한다.

#### PieceFactory.js

- [x] `create(fenChar)` : FEN 기물 문자를 받아 해당 `Piece` 인스턴스를 생성한다.

#### FenConverter.js

- [x] `fenToGrid(fenString)` : FEN 문자열을 받아 2차원 `Piece` 인스턴스 배열을 생성한다.

### `pages/`

#### MainPage.jsx

- 자식 컴포넌트들의 state와 함수들을 모두 관리
- [x] ChessManager 상태와 UI 컴포넌트 연결 및 총괄

### `components/`

#### Header.jsx

- 게임 제목 최상단 헤더 컴포넌트
- [x] 제목 렌더링
- props
  - `title` : 페이지의 제목

#### PatternSelector.jsx

- 사용자가 체스 패턴을 선택할 수 있는 컴포넌트
- [x] 전체 퍼즐 목록을 보여주고 사용자가 선택
- props
  - `patterns` : 모든 패턴 목록
  - `cyrrentPatternId` : 현재 선택된 패턴의 ID
  - `onPatternChange()` : 새로운 패턴을 선택했을 때, 해당 패턴의 id를 알려주는 함수

#### Board.jsx

- 사용자가 말을 드래그 - 드롭하여 움직일 수 있는 컴포넌트
- [x] 체스보드 렌더링
- [x] 기물 렌더링
- [x] 기물 클릭 및 이동 처리
- [x] 기물 이동 시 transition 애니메이션

- props
  - `board` : 현재 체스판 상태를 담는 Board 객체
  - `selectedSquare` : 현재 사용자가 클릭한 칸
  - `valideMoves` : 선택된 칸의 기물의 유효한 이동 경로
  - `onSqaureClick()` : 사용자가 특정 칸을 클릭했을 시, `selectedSquare`를 알려주는 함수

#### InfoPanel.jsx

- 현재 퍼즐의 정보와 게임 상태, 버튼들을 가진 컴포넌트
- [x] 현재 퍼즐 정보 렌더링
- [x] 게임 상태 메세지 처리
- [x] 기물 이동이 정답/오답일 시 시각적으로 표시
- props
  - `pattern` : 현재 로드된 패턴의 정보 객체
  - `status` : 현재 게임 상태 ('ongoing', 'correct', 'wrong')
  - `onReset()` : 사용자가 '처음으로' 버튼을 눌렀을 때 처음으로 리셋하는 함수
  - `onReturnCheckPoint()` : 사용자의 수가 틀렸을 때 이전 수로 돌아가는 함수

### `data/`

#### MatePatterns.js

- 총 10개 패턴 (쉬움 5, 어려움 5)
- 패턴 데이터 구조 예시:

```
  {
    id: 0,
    name: "풀스 메이트 (Fool's Mate)",
    description: '가장 짧은 체크메이트 패턴입니다.',
    hint: '백 차례이며, 체크메이트까지 1수',
    initialFen: 'rnbqkbnr/ppppp2p/5p2/4P1p1/8/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1',
    solution: [{ from: 'd1', to: 'h5' }],
  },
```

### `tests/`

#### `model/`

- vitest를 사용하여 테스트 코드를 작성

#### Board.test.js

- `new Board()`
  - [x] 보드는 8x8 크기의 빈 그리드로 초기화되어야 한다.
- `loadFen(fen)`
  - [x] 유효한 FEN 문자열을 받아 기물을 정확히 배치하고, 턴을 올바르게 설정해야 한다.
- `movePiece(from, to)`
  - [x] 기물을 한 칸에서 다른 칸으로 올바르게 이동시켜야 한다.
  - [x] 기물이 이동한 후, 원래 있던 칸은 비어있어야 한다.
  - [x] 기물 이동 후, 턴이 상대방에게 넘어가야 한다.
- `fen()`
  - [x] 현재 보드 상태를 정확한 FEN 문자열로 변환해야 한다.
- `getPiecePosition(id)`
  - [x] 특정 ID를 가진 기물의 정확한 좌표를 반환해야 한다.
- `findPieceSquare(type, color)`
  - [x] 특정 타입과 색상의 기물의 정확한 좌표 문자열(예: 'e8')을 반환해야
        한다.

#### `pieces/`

##### Pawn.test.js

- [x] 앞 칸이 비어있을 경우, 앞으로 한 칸 전진할 수 있어야 한다.
- [x] 초기 위치(2행)에 있고 앞 두 칸이 모두 비어있을 경우, 앞으로 두 칸 전진할 수 있어야 한다.
- [x] 경로가 막혀있을 경우, 앞으로 전진할 수 없다
- [x] 대각선 앞에 적군 기물이 있을 경우, 해당 칸으로 이동할 수 있어야 한다.
- [x] 대각선 앞에 아군 기물이 있거나 비어있을 경우, 해당 칸으로 이동할 수 없다.

##### Rook.test.js

- [x] 빈 보드에서 상하좌우 직선으로 움직일 수 있는 모든 칸을 반환해야 한다.
- [x] 경로 중간에 아군 기물이 있으면, 그 너머로는 이동할 수 없다.
- [x] 경로 중간에 적군 기물이 있으면, 그 칸까지는 이동할 수 있지만 그 너머로는 이동할 수 없다.

##### Knight.test.js

- [x] L자 형태로 움직일 수 있는 최대 8개의 칸을 반환해야 한다.
- [x] 경로 중간에 다른 기물이 있어도 뛰어넘을 수 있다.
- [x] 도착 지점에 아군 기물이 있으면 그 칸으로 이동할 수 없다.
- [x] 도착 지점에 적군 기물이 있으면 그 칸으로 이동할 수 있다.

##### Bishop.test.js

- [x] 빈 보드에서 대각선으로 움직일 수 있는 모든 칸을 반환해야 한다.
- [x] 경로 중간에 아군 기물이 있으면, 그 너머로는 이동할 수 없다.
- [x] 경로 중간에 적군 기물이 있으면, 그 칸까지는 이동할 수 있지만 그 너머로는 이동할 수 없다.

##### Queen.test.js

- [x] 상하좌우 및 대각선으로 움직일 수 있는 모든 칸을 반환해야 한다.
- [x] 경로 중간에 적군 기물이 있으면, 그 칸까지는 이동할 수 있지만 그 너머로는 이동할 수 없다.

##### King.test.js

- [x] 주변 8개의 모든 칸으로 이동할 수 있어야 한다.
- [x] 도착 지점에 아군 기물이 있으면 이동할 수 없다.

#### ChessManager.js

- `loadPattern(index)`
  - [x] 특정 패턴을 로드했을 때, 보드가 해당 패턴의 초기 상태로 설정되어야 한다.
  - [x] 새로운 패턴을 로드했을 때, solutionStep 등의 내부 상태가 0으로 초기화되어야 한다.
- `handleMove(from, to)`
  - [x] 정답 수를 두었을 때, 'CORRECT' 상태를 반환해야 한다.
  - [x] 마지막 정답 수를 두었을 때, 'CHECKMATE' 상태를 반환해야 한다.
  - [x] 퀴즈의 정답과 다른 수를 두었을 때, 'WRONG' 상태를 반환해야 한다.
  - [x] 규칙에 맞지 않는 수(말이 갈 수 없는 곳)를 두었을 때, 'INVALID_MOVE' 상태를 반환해야 한다.
  - [x] 자신의 턴이 아닌 기물을 움직이려고 할 때, 'INVALID' 상태를 반환해야 한다.
- `handleOpponentMove()`
  - [x] 호출 시, 상대방(흑)의 수가 두어지고 턴이 백에게 돌아와야 한다.
- `resetToLastCheckpoint()`

  - [x] 오답을 두거나 임의의 상황에서 호출했을 때, 사용자가 수를 두기 직전의 상태로 보드를 되돌려야 한다.

### `utils/`

#### coordinate.js

- `squareToCoords(square)`
  - [x] 'a1'과 같은 체스 좌표 문자열을 { row: 7, col: 0 } 형태의 객체로 올바르게 변환해야 한다.
  - [x] 'h8'과 같은 경계 값 좌표를 { row: 0, col: 7 } 형태로 올바르게 변환해야 한다.
  - [x] 'i9', 'a0' 등 유효하지 않은 형식의 문자열이 입력될 경우, 에러를 발생시켜야 한다.
- `coordsToSquare(row, col)`
  - [x] { row: 7, col: 0 } 형태의 객체를 'a1'과 같은 체스 좌표 문자열로 올바르게 변환해야 한다.
  - [x] row나 col이 0-7 범위를 벗어나는 경우, null을 반환해야 한다.
- `validateSquare(square)`
  - [x] 'a1', 'h8' 등 유효한 좌표에 대해 에러를 발생시키지 않아야 한다.
  - [x] 유효하지 않은 좌표에 대해 명시적인 에러를 발생시켜야 한다.

#### FenConverter.js

- `fenToBoard(fen)`
  - [x] 표준 FEN 문자열을 받아, 기물이 올바르게 배치된 8x8 그리드와 턴 정보를 반환해야 한다.
  - [x] '8'과 같이 빈 행을 나타내는 FEN 부분을 올바르게 파싱해야 한다.
  - [x] FEN 문자열의 행(rank)이 8개가 아닐 경우, 에러를 발생시켜야 한다.
  - [x] 특정 행의 칸(file)의 합이 8개가 아닐 경우, 에러를 발생시켜야 한다.
  - [x] FEN에 유효하지 않은 문자(예: 'z')가 포함된 경우, 에러를 발생시켜야 한다.

#### PieceFactory.js

- `create(char)`
  - [x] 대문자 기물 문자를 입력받았을 때, 올바른 타입과 'w'(백) 색상을 가진 기물 인스턴스를 생성해야 한다.
  - [x] 소문자 기물 문자를 입력받았을 때, 올바른 타입과 'b'(흑) 색상을 가진 기물 인스턴스를 생성해야 한다.
  - [x] 각 기물 문자에 따라 정확한 클래스의 인스턴스를 반환해야 한다.
  - [x] 유효하지 않은 문자(예: 'z', '1')가 입력되었을 경우, null을 반환하거나 에러를 발생시켜야 한다.

## 라이브러리

- `Material-UI` : Google의 MD를 기반으로 한 React UI 라이브러리
- `@mui/icons-material` : 다양한 아이콘을 제공하는 라이브러리
- `dnd-kit` : 드래그 앤 드롭 기능을 제공하는 React 라이브러리
- `styled-components` : 코드 내 컴포넌트에 직접 스타일을 적용하는 기능을 제공하는 라이브러리
- `framer-motion` : 기물의 움직임이나 시각적인 텍스트의 움직임을 구현할 수 있는 기능을 제공하는 라이브러리
- `canvas-confetti` : 폭죽 효과를 제공하는 라이브러리 (체크메이트 시 효과에 사용)
