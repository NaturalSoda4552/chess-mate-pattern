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
    color: '#4CAF50',
    icon: CheckCircleOutlineIcon,
    text: '정답입니다.',
  },
  WRONG: {
    color: '#F44336',
    icon: HighlightOffIcon,
    text: '오답입니다.',
  },
  CHECKMATE: {
    color: '#FFC107',
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

  const currentStatus = moveStatus ? moveStatus.status : null;

  const Icon = currentStatus ? statusMap[currentStatus].icon : null;
  const text = currentStatus ? statusMap[currentStatus].text : null;
  const color = currentStatus ? statusMap[currentStatus].color : '#ffffff';

  const canvasRef = useRef(null);
  useEffect(() => {
    if (currentStatus === 'CHECKMATE' && canvasRef.current) {
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
  }, [currentStatus]);

  return (
    <InfoPanelContainer style={{ gap: '20px' }}>
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
      {moveStatus && (
        <Paper
          elevation={2}
          sx={{
            width: '100%',
            height: '100%',
            minHeight: '120px',
            borderRadius: 4,

            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',

            backgroundColor: color,
            border: `2px solid ${color}`,

            position: 'relative',
            overflow: 'hidden',
          }}
        >
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
          <motion.div
            key={moveStatus.id}
            variants={boxVariants}
            animate={currentStatus}
            transition={{ duration: 0.4 }}
            style={{ display: 'flex', gap: '8px', zIndex: 2 }}
          >
            <Icon sx={{ fontSize: 40, color: '#ffffff' }} />
            <Typography
              variant="h4"
              fontWeight="bold"
              color="#ffffff"
              margin="0px"
              gutterBottom
            >
              {statusMap[currentStatus].text}
            </Typography>
          </motion.div>
        </Paper>
      )}
    </InfoPanelContainer>
  );
};

export default InfoPanel;
