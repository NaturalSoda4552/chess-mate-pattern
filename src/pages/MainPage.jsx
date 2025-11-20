import Header from '../components/Header';
import PatternSelector from '../components/PatternSelector';
import Board from '../components/Board';
import InfoPanel from '../components/InfoPanel';

import { MatePatterns } from '../data/MatePatterns.js';

import styled from 'styled-components';
import { Grid, Box } from '@mui/material';

const MainContainer = styled.div`
  display: flex;
`;

const title = '체스 메이트 패턴 연습하기';

const MainPage = () => {
  const handlePatternSelect = (patternId) => {
    console.log(`Selected pattern ID: ${patternId}`);
  };
  return (
    <Box sx={{ padding: 2 }}>
      <Header title={title} />
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={4}>
          <PatternSelector
            patterns={MatePatterns}
            onPatternSelect={handlePatternSelect}
          />
        </Grid>
        <Grid item xs={8}>
          <Board />
          <InfoPanel />
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainPage;
