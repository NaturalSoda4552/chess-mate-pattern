import styled from 'styled-components';
import Header from '../components/Header';
import PatternSelector from '../components/PatternSelector';
import Board from '../components/Board';
import InfoPanel from '../components/InfoPanel';

const MainContainer = styled.div`
  color: black;
`;

const title = '체스 메이트 패턴 연습하기';

const MainPage = () => {
  return (
    <MainContainer>
      <Header title={title} />
      <PatternSelector />
      <Board />
      <InfoPanel />
    </MainContainer>
  );
};

export default MainPage;
