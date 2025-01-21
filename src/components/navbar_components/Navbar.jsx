import React, { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { PencilWrapper } from './PencilWrapper';
import ResizeWindow from './ResizeWindow';
import AppButtonModal from '../utilities/AppButtonModal';
import ProfileEditModal from '../profile/ProfileEditModal';
import PersonIcon from '@mui/icons-material/Person';
import { UserInfoContext } from '../../providers/UserInfoProvider';
import Logout from '../auth/Logout';
import ConfirmDialog from '../utilities/ConfirmDialog';

const Navbar = ({isPencilWrapper}) => {
    const {userInfo, isLoading} = useContext(UserInfoContext);
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams(); 
    const [open, setOpen] = useState(false);
    const [nextPath, setNextPath] = useState('');
  
    const handleClick = (event, path) => {
      if (!location.pathname.includes('cenove-ponuky') || !id) {
        navigate(path);
        return;
      }

      event.preventDefault();
      setNextPath(path);
      setOpen(true);
    };
  
    return (
        <AppBar position="static" sx={{ height: '70px' }}>
            <ConfirmDialog 
                open={open} 
                onClose={() => {
                    setOpen(false);
                  }} 
                onConfirm={() => {
                        setOpen(false);
                        navigate(nextPath);
                    }} 
                cancelButtonText={"Vrátiť sa"}
                confirmButtonText={"Pokračovať"}
                title={"Upozornenie"} 
                message={"Uložili ste vykonané zmeny?"} 
            />
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                    {userInfo?.name}
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
                            onClick={(event) => handleClick(event, '/cenove-ponuky')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Cenové ponuky
                        </Button>
                        <Button
                            onClick={(event) => handleClick(event, '/produkty')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Produkty
                        </Button>
                    </Box>

                    <div style={{gap: '10px', display: 'flex'}}>
                        
                        {isPencilWrapper ? <PencilWrapper /> : null}

                        <Logout />

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