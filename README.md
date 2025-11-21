# chess-mate-parttern

## 📁 프로젝트 목표

- `chess.js`를 정답지로 활용하는 **`TDD` 환경**을 구축하여 퍼즐의 정답을 판별하는 모델을 구현한다.
- 퍼즐 데이터, 데이터 관리, 게임 로직을 분리하여 `명확한 책임 구조`를 가진 Model을 만든다.
- `MVC 패턴` 적용 및 `React`를 `View`로 활용하여 UI 체스 게임을 렌더링

## 핵심 기능 요구사항

1. 메인 화면(패턴 목록)

- 모든 체스 메이트 패턴 목록을 조회할 수 있다.
- 각 퍼즐에는 `이름`, `난이도`, `해결 여부`가 표시된다.
- 사용자는 원하는 퍼즐을 선택하여 퍼즐 화면으로 이동한다.

2. 퍼즐 화면

- 패턴 선택 시 해당 퍼즐의 `시작 FEN`을 기반으로 체스판이 렌더링된다.
- 퍼즐의 `제목`, `난이도`, `목표`, `설명` 등을 표시한다.

3. 기물 이동

- 현재 턴이 `백`이라면 백 기물만, `흑`이라면 흑 기물만 선택할 수 있다.
- 기물 클릭 시 `해당 기물의 유효한 이동 칸`이 하이라이트된다.
- 사용자는 기물을 이동이 유효한 칸으로만 이동시킬 수 있다.
- 이동 후에는 Board가 턴을 교체한다.
- 1수 내로 체크메이트하는 경우, 퀴즈는 종료된다
- 2수 이상으로 체크메이트하는 경우, Board가 턴을 교체하여 흑 차례를 진행하며, 이후 다시 사용자의 유효한 수를 받는다.

4. 결과 피드백

- Model(ChessManager)의 판별 결과에 따라 `View`에서 다음 메시지를 출력한다:
  - `정답입니다!`
  - `틀렸습니다. 다시 시도하세요.`
- 오답일 경우:
  - 체스판은 자동으로 **초기 상태(FEN)**으로 되돌아간다.
- 정답일 경우:
  - 추가적인 패턴 설명을 출력하고 메인 화면으로 돌아간다.
- `힌트 버튼`이 존재하며, 힌트 기물을 하늘색으로 표시한다.

## 📋 요구사항 명세서

1. 메인화면에서 여러 메이트 패턴 중 하나를 선택한다.
2. 선택된 패턴의 체스보드와 퍼즐 설명 및 목표가 렌더링된다.
3. 사용자가 옳은 수를 두면 성공이며, 옳지 않을 경우 원래 체스판으로 되돌아간다.
4. 정답을 맞춘 후 패턴 설명을 보여주고 메인 화면으로 이동한다.

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

#### `coordinate.js`

- [x] `squareToCoords(square)` : 체스 표기법을 배열 좌표로 변환한다.
- [x] `coordsToSquare(row, col)` : 배열 좌표를 체스 표기법으로 변환한다.
- [x] `isWithinBounds(row, col)` : 주어진 좌표가 체스판 범위 내에 있는지 확인한다.
- [x] `validateSquare(square)` : 주어진 칸이 유효한 표기법인지 확인한다.

#### `PieceFactory.js`

- [x] `create(fenChar)` : FEN 기물 문자를 받아 해당 `Piece` 인스턴스를 생성한다.

#### `FenConverter.js`

- [x] `fenToGrid(fenString)` : FEN 문자열을 받아 2차원 `Piece` 인스턴스 배열을 생성한다.

### `pages/`

#### `MainPage.jsx`

- 자식 컴포넌트들의 state와 함수들을 모두 관리
- [ ] ChessManager 상태와 UI 컴포넌트 연결 및 총괄

### `components/`

#### `Header.jsx`

- 게임 제목 최상단 헤더 컴포넌트
- [x] 제목 렌더링
- props
  - `title` : 페이지의 제목

#### `PatternSelector.jsx`

- 사용자가 체스 패턴을 선택할 수 있는 컴포넌트
- [x] 전체 퍼즐 목록을 보여주고 사용자가 선택
- props
  - `patterns` : 모든 패턴 목록
  - `cyrrentPatternId` : 현재 선택된 패턴의 ID
  - `onPatternChange()` : 새로운 패턴을 선택했을 때, 해당 패턴의 id를 알려주는 함수

#### `Board.jsx`

- 사용자가 말을 드래그 - 드롭하여 움직일 수 있는 컴포넌트
- [x] 체스보드 렌더링
- [x] 기물 렌더링
- [x] 기물 클릭 및 이동 처리
- [ ] 기물 드래그 앤 드롭 처리
- [x] 기물 이동 시 transition 애니메이션
- [ ] 기물 이동이 정답/오답일 시 시각적으로 표시

- props
  - `board` : 현재 체스판 상태를 담는 Board 객체
  - `selectedSquare` : 현재 사용자가 클릭한 칸
  - `valideMoves` : 선택된 칸의 기물의 유효한 이동 경로
  - `onSqaureClick()` : 사용자가 특정 칸을 클릭했을 시, `selectedSquare`를 알려주는 함수

#### `InfoPanel.jsx`

- 현재 퍼즐의 정보와 게임 상태, 버튼들을 가진 컴포넌트
- [x] 현재 퍼즐 정보 렌더링
- [ ] 게임 상태 메세지 처리
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
  name: "Smothered Mate",
  difficulty: "easy",
  initialFen: "8/5pkp/6p1/8/8/6N1/5PPP/6K1 w - - 0 1",
  solution: [
  { from: "g3", to: "e4" }
  ],
  description: "나이트에 의한 기본적인 메이트 패턴입니다."
  }
```

### `tests/`

- 테스트 코드

```

```

## 라이브러리

- `Material-UI` : Google의 MD를 기반으로 한 React UI 라이브러리
- `@mui/icons-material` : 다양한 아이콘을 제공하는 라이브러리
- `dnd-kit` : 드래그 앤 드롭 기능을 제공하는 React 라이브러리
- `styled-components` : 코드 내 컴포넌트에 직접 스타일을 적용하는 기능을 제공하는 라이브러리
