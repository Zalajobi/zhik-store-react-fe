import * as React from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useDispatch} from "react-redux";
import {handlePostRequest} from "../../helper/requests";
import {BASEURL} from "../../helper/constants";
// import AuthToken from "../../helper/contextApi";
import {authorizationToken} from "../../redux/Reducers";

const theme = createTheme();

function SignIn() {
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await handlePostRequest(new FormData(event.currentTarget), `${BASEURL}user/login`)
        sessionStorage.setItem('authToken', response.data.access_token)

        dispatch(authorizationToken(response.data.access_token))
        console.log(response.data.access_token)
        // AuthToken.token = response.data.access_token;
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>

                    <Typography component="h1" variant="h5"> Sign in</Typography>

                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField margin="normal" required fullWidth id="username" label="Username/Email Address" name="username" autoComplete="email" autoFocus/>
                        <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password"/>

                        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me"/>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Sign In</Button>

                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">Forgot password?</Link>
                            </Grid>
                            <Grid item>
                                <Link href="/user/signup" variant="body2">{"Don't have an account? Sign Up"}</Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default SignIn;