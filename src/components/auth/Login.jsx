import React, { useContext, useRef } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { useUniversalPost } from '../../api/UniversalPost';
import Loading from '../utilities/Loading';
import { useNavigate } from "react-router-dom";
import { SnackBarContext } from '../../providers/SnackBarProvider';

const Login = () => {
    const navigate = useNavigate();
    const email = useRef('');
    const password = useRef('');
    const [sendData, isLoading, error] = useUniversalPost("LOGIN");
    const { handleSnackbarOpen } = useContext(SnackBarContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailValue = email.current.value;
        const passwordValue = password.current.value;

        try {
            if (!emailValue || !passwordValue) {
                throw new Error;
            }

            const response = await sendData({
                email: emailValue,
                password: passwordValue
            })

            localStorage.setItem("token", response.auth.token);
            localStorage.setItem("userId", response.userId);

            navigate("/cenove-ponuky");
        } catch (error) {
            console.log(error);
            handleSnackbarOpen('Nesprávny email alebo heslo!', 'error');
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Container component="main" maxWidth="xs">
        <Box
            sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >
            <Typography component="h1" variant="h4">
                Prihlásenie
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Emailová adresa"
                name="email"
                autoComplete="email"
                autoFocus
                inputRef={email}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Heslo"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={password}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
            >
                Prihlásiť sa
            </Button>
            </Box>
        </Box>
        </Container>
    );
};

export default Login;