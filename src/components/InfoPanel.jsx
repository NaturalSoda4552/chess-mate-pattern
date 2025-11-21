import { Paper, Typography, Box } from '@mui/material';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import styled from 'styled-components';

const InfoPanelContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InfoPanel = ({ pattern }) => {
  const title = !pattern ? '퀴즈를 선택하세요.' : pattern.name;
  const description = !pattern
    ? '왼쪽 목록에서 연습하고 싶은 패턴을 선택해주세요.'
    : pattern.description;
  const hint = !pattern ? null : pattern.hint;

  return (
    <InfoPanelContainer>
      <Paper
        elevation={2}
        sx={{
          padding: 3,
          borderRadius: 3,
          borderLeft: '6px solid #6366F1',
          display: 'flex',
          gap: 2,
          minWidth: '420px',
          alignItems: 'start',
        }}
      >
        <EmojiObjectsIcon sx={{ color: '#6366F1', fontSize: 30 }} />
        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {hint}
          </Typography>
        </Box>
      </Paper>

      <Paper
        elevation={2}
        sx={{
          padding: 3,
          borderRadius: 3,
          borderLeft: '6px solid #6366F1',
          display: 'flex',
          gap: 2,
          minWidth: '350px',
          alignItems: 'start',
        }}
      >
        <EmojiObjectsIcon sx={{ color: '#6366F1', fontSize: 30 }} />
        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom></Typography>
          <Typography variant="body2" color="text.secondary"></Typography>
          <Typography variant="body2" color="text.secondary"></Typography>
        </Box>
      </Paper>
    </InfoPanelContainer>
  );
};

export default InfoPanel;
