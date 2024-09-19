// header component that contains navbar using mui library

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Navbar = () => {
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
                        Price Offer
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

                    <Box sx={{ flexGrow: 0 }}>
                        <Button
                            to="/login"
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Login
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;