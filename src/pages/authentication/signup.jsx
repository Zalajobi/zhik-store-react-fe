import * as React from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Typography, Avatar, Button, FormControl, InputLabel, MenuItem, Select, FormControlLabel, Checkbox, TextField, CssBaseline, Link, Grid, Box} from "@mui/material";
import {handlePostRequest} from "../../helper/requests";
import {BASEURL} from "../../helper/constants";
import {useHistory} from 'react-router-dom'
import { successColoredTopCenter } from "../../components/common/Beautify/Alert";
const theme = createTheme();

function SignUp() {
	const history = useHistory()

	const handleSubmit = async (event) => {
		event.preventDefault();
		const response = await handlePostRequest(new FormData(event.currentTarget), `${BASEURL}user/signup`)
		if(response.status === 200){
			{successColoredTopCenter(response.data)}
			history.push("/login")
		}else{
			alert(response.data)
		}
	};

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}><LockOutlinedIcon /></Avatar>
					<Typography component="h1" variant="h5">Sign up</Typography>
					<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={4}>
								<FormControl fullWidth>
									<InputLabel id="select-title">Title</InputLabel>
									<Select labelId="Select Title" id="title" label="title" name="title">
										<MenuItem value="Mr.">Mr.</MenuItem>
										<MenuItem value="Mrs.">Mrs.</MenuItem>
										<MenuItem value="Miss">Miss</MenuItem>
										<MenuItem value="Non-Binary">Non Binary</MenuItem>
									</Select>
								</FormControl>
							</Grid>

							<Grid item xs={12} sm={8}>
								<TextField autoComplete="username" name="username" required fullWidth id="username" label="Username" autoFocus/>
							</Grid>

							<Grid item xs={12} sm={6}>
								<TextField required fullWidth id="first_name" label="First Name" name="first_name" autoComplete="first_name"/>
							</Grid>

							<Grid item xs={12} sm={6}>
								<TextField required fullWidth id="last_name" label="Last Name" name="last_name" autoComplete="last_name"/>
							</Grid>

							<Grid item xs={12} sm={6}>
								<TextField required fullWidth id="middle_name" label="Middle Name" name="middle_name" autoComplete="middle_name"/>
							</Grid>

							<Grid item xs={12} sm={6}>
								<FormControl fullWidth>
									<InputLabel id="select-gender">Gender</InputLabel>
									<Select labelId="Select-Gender" id="gender" label="Gender" name="gender">
										<MenuItem value="Male">Male</MenuItem>
										<MenuItem value="Female">Female</MenuItem>
										<MenuItem value="Transgender">Transgender</MenuItem>
										<MenuItem value="Non-Binary">Non Binary</MenuItem>
									</Select>
								</FormControl>
							</Grid>

							<Grid item xs={12} sm={6}>
								<TextField required fullWidth id="phone" type="phone" label="Phone Number" name="phone" autoComplete="phone"/>
							</Grid>

							<Grid item xs={12} sm={6}>
								<TextField required fullWidth id="dob" type="date" label="Date of Birth" name="dob" autoComplete="phone"/>
							</Grid>

							<Grid item xs={12}>
								<TextField required fullWidth id="email" label="Email Address" name="email" autoComplete="email"/>
							</Grid>

							<Grid item xs={12}>
								<TextField required fullWidth name="password" label="Password" type="password" id="password" autoComplete="new-password"/>
							</Grid>

							<Grid item xs={12}>
								<FormControlLabel control={<Checkbox value="allowExtraEmails" color="primary" />} label="I want to receive marketing promotions and updates via email."/>
							</Grid>
						</Grid>

						<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Sign Up</Button>

						<Grid container justifyContent="flex-end">
							<Grid item>
								<Link href={"/login"} variant="body2">Already have an account? Sign in</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}

export default SignUp