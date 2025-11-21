import { useState } from 'react';
import {
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Box,
} from '@mui/material';

const PatternSelector = ({ patterns, onPatternSelect }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
    onPatternSelect(index);
  };

  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: 4,
        padding: 2,
        width: '400px',
        boxSizing: 'border-box',
      }}
    >
      <Box sx={{ mb: 1.5, pl: 1 }}>
        <Typography variant="h6" component="h1" fontWeight={500}>
          메이트 패턴 목록
        </Typography>
      </Box>
      <List component="nav" aria-label="mate patterns">
        {patterns.map((pattern, index) => (
          <ListItem key={pattern.id} disablePadding>
            <ListItemButton
              selected={selectedIndex === index}
              onClick={() => handleListItemClick(index)}
              sx={{
                borderRadius: 1,
                '&.Mui-selected': {
                  backgroundColor: 'rgba(126, 87, 194, 0.1)', // 연한 보라색 배경
                  borderLeft: '4px solid #7E57C2', // 보라색 테두리
                  '&:hover': {
                    backgroundColor: 'rgba(126, 87, 194, 0.15)',
                  },
                },
              }}
            >
              <ListItemText primary={pattern.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default PatternSelector;
