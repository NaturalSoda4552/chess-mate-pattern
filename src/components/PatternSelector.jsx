import styled from 'styled-components';
import { Button } from '@mui/material';

const SelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-weight: 500;
  }
`;

const Title = styled.div``;
const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const PatternSelector = ({ patterns, onPatternSelect }) => {
  return (
    <SelectorContainer>
      <Title>
        <h1>메이트 패턴 목록</h1>
      </Title>
      <ButtonGroup>
        {patterns.map((pattern) => (
          <Button
            variant="contained"
            onClick={() => onPatternSelect(pattern.id)}
          >
            {pattern.name}
          </Button>
        ))}
      </ButtonGroup>
    </SelectorContainer>
  );
};

export default PatternSelector;
