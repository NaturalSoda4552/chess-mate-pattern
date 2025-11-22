import { AppBar, Toolbar, Typography } from '@mui/material';
import bK from '../assets/bK.png';

const Header = ({ title }) => {
  return (
    <AppBar position="static" color="default">
      <Toolbar sx={{ gap: '10px' }}>
        <img src={bK} style={{ width: '40px' }} />
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            fontWeight: 800,
            color: '#1e293b',
            fontFamily: '"Pretendard", "Roboto", sans-serif',
          }}
        >
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
