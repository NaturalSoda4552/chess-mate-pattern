import styled from 'styled-components';
import Header from '../components/Header';
import PatternSelector from '../components/PatternSelector';
import Board from '../components/Board';
import InfoPanel from '../components/InfoPanel';

const MainContainer = styled.div`
  color: black;
`;

const MainPage = () => {
  return (
    <MainContainer>
      <Header />
      <PatternSelector />
      <Board />
      <InfoPanel />
    </MainContainer>
  );
};

export default MainPage;
