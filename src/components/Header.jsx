import { AppBar, Toolbar, Typography } from '@mui/material';
import styled from 'styled-components';

const CenteredTypography = styled(Typography)`
  flex-grow: 1;
  text-align: center;
`;

const Header = ({ title }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <CenteredTypography variant="h5" component="div">
          {title}
        </CenteredTypography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
