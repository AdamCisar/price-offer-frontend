import React, { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { PencilWrapper } from './PencilWrapper';
import ResizeWindow from './ResizeWindow';
import AppButtonModal from '../utilities/AppButtonModal';
import ProfileEditModal from '../profile/ProfileEditModal';
import PersonIcon from '@mui/icons-material/Person';
import { UserInfoContext } from '../../providers/UserInfoProvider';
import Logout from '../auth/Logout';
import { IconButton, Tooltip } from '@mui/material';
import PriceOfferModal from '../price_offer_cards/PriceOfferModal';
import AddIcon from '@mui/icons-material/Add';

const Navbar = ({isPencilWrapper, isAddInvoiceButton}) => {
    const {userInfo, isLoading} = useContext(UserInfoContext);
    const navigate = useNavigate();
  
    const handleClick = (event, path) => {
        navigate(path);
    };
  
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
                        {isAddInvoiceButton ? 
                        <Tooltip title="Vytvorenie cenovej ponuky">
                            <span className='create-price-offer' style={{ display: 'flex', alignItems: 'center' }}>
                                <AppButtonModal
                                    Button={IconButton}
                                    ModalComponent={PriceOfferModal}
                                    InnerComponent={AddIcon}
                                    divStyles={{
                                        display: 'flex', 
                                        justifyContent: 'center', 
                                        alignItems: 'center', 
                                    }}
                                    sx={{
                                        width: 20,
                                        height: 20,
                                        borderRadius: '100%',
                                        backgroundColor: 'darkgrey',
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: 'grey',
                                        },
                                    }}
                                />
                            </span>
                        </Tooltip>
                        : ''}

                        {isPencilWrapper ? 
                            <Tooltip title="Prepnutie do režimu úpravy">
                                <span style={{ display: 'flex', alignItems: 'center' }}>
                                    <PencilWrapper />
                                </span>
                            </Tooltip> 
                            : null
                        }

                        <Tooltip title="Odhlásenie">
                            <span style={{ display: 'flex', alignItems: 'center' }}>
                                <Logout />
                            </span>
                        </Tooltip>

                        <Tooltip title="Úprava profilu">
                            <span style={{ display: 'flex', alignItems: 'center' }}>
                                <AppButtonModal
                                    sx={{ fontSize: 30, cursor: 'pointer' }}
                                    title={''}
                                    Button={PersonIcon}
                                    ModalComponent={ProfileEditModal}
                                />
                            </span>
                        </Tooltip>

                        <Tooltip title="Zväčšenie na celú obrazovku">
                            <span style={{ display: 'flex', alignItems: 'center' }}>
                                <ResizeWindow />  
                            </span>
                        </Tooltip>
                    </div>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;