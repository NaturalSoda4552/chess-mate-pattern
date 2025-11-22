import { AppBar, Toolbar, Typography } from '@mui/material';
import styled from 'styled-components';

import bK from '../assets/bK.png';

const ImageBox = styled.img`
  alt: 'blackKing';
  width: 40px;
`;

const Header = ({ title }) => {
  return (
    <AppBar
      position="static"
      color="default"
      sx={{
        backgroundColor: '#ffffff',
      }}
    >
      <Toolbar sx={{ gap: '10px' }}>
        <ImageBox src={bK} />
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            fontWeight: 800,
            color: '#1e293b', // 진한 네이비/블랙 (Slate-900)
            fontFamily: '"Pretendard", "Roboto", sans-serif', // 폰트 설정
            letterSpacing: '-0.5px',
          }}
        >
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
