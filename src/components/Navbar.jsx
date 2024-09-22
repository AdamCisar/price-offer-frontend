import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { PencilWrapper } from './PencilWrapper';
import ProfileEdit from './profile/ProfileEdit';

const Navbar = ({isPencilWrapper}) => {
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                       Adam Čisár
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button
                            component={Link}
                            to="/"
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Home
                        </Button>
                        <Button
                            component={Link}
                            to="/cenove-ponuky"
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Cenové ponuky
                        </Button>
                    </Box>

                    <div style={{gap: '10px', display: 'flex'}}>
                        {isPencilWrapper ? <PencilWrapper /> : null}
                        <ProfileEdit />
                    </div>

                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;