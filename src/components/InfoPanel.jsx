import { Paper, Typography, Box } from '@mui/material';

import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useEffect, useRef } from 'react';

const statusMap = {
  CORRECT: {
    icon: CheckCircleOutlineIcon,
    text: '정답입니다.',
  },
  WRONG: {
    icon: HighlightOffIcon,
    text: '오답입니다.',
  },
  CHECKMATE: {
    icon: EmojiEventsIcon,
    text: '체크메이트!',
  },
};
const boxVariants = {
  initial: { scale: 1, y: 0, x: 0 },

  WRONG: {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.4 },
  },

  CORRECT: {
    y: [0, -20, 0],
    scale: [1, 1.1, 0.9, 1],
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
      times: [0, 0.4, 0.8, 1],
    },
  },

  CHECKMATE: {
    scale: [1, 1.2, 0.9, 1.1, 1],
    transition: { duration: 0.5 },
  },
};

const InfoPanelContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InfoPanel = ({ pattern, moveStatus }) => {
  const title = !pattern ? '퀴즈를 선택하세요.' : pattern.name;
  const description = !pattern
    ? '왼쪽 목록에서 연습하고 싶은 패턴을 선택해주세요.'
    : pattern.description;
  const hint = !pattern ? null : pattern.hint;

  const Icon = moveStatus ? statusMap[moveStatus].icon : null;

  const canvasRef = useRef(null);
  useEffect(() => {
    if (moveStatus === 'CHECKMATE' && canvasRef.current) {
      const myConfetti = confetti.create(canvasRef.current, {
        resize: true,
        useWorker: true,
      });
      myConfetti({
        particleCount: 180,
        spread: 90,
        origin: { y: -0.1 },
        scalar: 1.2,
      });
      return () => myConfetti.reset();
    }
  }, [moveStatus]);

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

      {/* 정답, 오답, 체크메이트 Paper */}
      <Paper
        elevation={2}
        sx={{
          padding: 3,
          borderRadius: 3,
          borderLeft: '6px solid #6366F1',
          display: 'flex',
          gap: 2,
          minWidth: '350px',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {moveStatus && (
          <motion.div
            key={moveStatus}
            variants={boxVariants}
            animate={moveStatus}
            transition={{ duration: 0.4 }}
            style={{ display: 'flex', gap: '8px' }}
          >
            <Icon sx={{ fontSize: 30 }} />
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              {statusMap[moveStatus].text}
            </Typography>
            {moveStatus === 'CHECKMATE' && (
              <canvas
                ref={canvasRef}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  pointerEvents: 'none',
                  zIndex: 1,
                }}
              />
            )}
          </motion.div>
        )}
      </Paper>
    </InfoPanelContainer>
  );
};

export default InfoPanel;
