import React, { useContext } from 'react';
import './Login.scss';
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import * as jose from 'jose'
import { GlobalContext } from '../../context/GlobalContext';

const Login = () => {
	const handleFailure = (result) => {
		console.clear();
		console.log(result);
	};

	const handleSignIn = (response) => {
		const responsePayload = jose.decodeJwt(response.credential);

		console.group("User data");
		console.log("ID: " + responsePayload.sub);
		console.log('Full Name: ' + responsePayload.name);
		console.log('Given Name: ' + responsePayload.given_name);
		console.log('Family Name: ' + responsePayload.family_name);
		console.log("Image URL: " + responsePayload.picture);
		console.log("Email: " + responsePayload.email);
		console.groupEnd();
	};

	return (
		<div className='center'>
			<GoogleLogin onSuccess={handleSignIn} onError={handleFailure} shape="pill" text="continue_with" useOneTap />
		</div>
	);
}

export default Login;