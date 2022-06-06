import React, { useContext } from 'react';
import './Login.scss';
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import { decodeJwt } from 'jose'
import { User } from '../../context/GlobalContext';
import { Button } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { cookie } from '../../actions/cookieActions'

const Login = () => {
	const { user, setUser } = useContext(User);

	const handleFailure = (result) => {
		console.clear();
		console.log(result);
	};

	const handleSignIn = (response) => {
		const responsePayload = decodeJwt(response.credential);

		console.group("User data");
		console.log("ID: " + responsePayload.sub);
		console.log('Full Name: ' + responsePayload.name);
		console.log('Given Name: ' + responsePayload.given_name);
		console.log('Family Name: ' + responsePayload.family_name);
		console.log("Image URL: " + responsePayload.picture);
		console.log("Email: " + responsePayload.email);
		console.groupEnd();

		setUser(responsePayload);
		cookie.setCookie(cookie.siteCookies.userCradentials, response.credential);
	};

	const handleLogout = () => {
		console.log(user);
		googleLogout();

		setUser(null);
		cookie.clearCookie(cookie.siteCookies.userCradentials);
		console.log(user);
	};

	return (
		<div className='center'>
			{user ?
				<Button startIcon={<Logout />} variant="contained" color="primary" onClick={handleLogout}>
					Logout
				</Button> :
				<GoogleLogin onSuccess={handleSignIn} onError={handleFailure} shape="pill" text="continue_with" useOneTap />
			}
		</div>
	);
}

export default Login;