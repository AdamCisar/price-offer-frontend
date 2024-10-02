import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { PencilWrapper } from './PencilWrapper';
import ResizeWindow from './ResizeWindow';
import AppButtonModal from '../utilities/AppButtonModal';
import ProfileEditModal from '../profile/ProfileEditModal';
import PersonIcon from '@mui/icons-material/Person';

const Navbar = ({isPencilWrapper}) => {
    return (
        <AppBar position="static" sx={{ height: '70px' }}>
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
                        {/* <Button
                            component={Link}
                            to="/"
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Home
                        </Button> */}
                        <Button
                            component={Link}
                            to="/cenove-ponuky"
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Cenové ponuky
                        </Button>
                        <Button
                            component={Link}
                            to="/produkty"
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Produkty
                        </Button>
                    </Box>

                    <div style={{gap: '10px', display: 'flex'}}>
                        
                        {isPencilWrapper ? <PencilWrapper /> : null}

                        <AppButtonModal
                            sx={{ fontSize: 30, cursor: 'pointer' }}
                            title={''}
                            Button={PersonIcon}
                            ModalComponent={ProfileEditModal}
                        />

                        <ResizeWindow />  
                    </div>

                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;