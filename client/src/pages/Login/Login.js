import React from 'react';
import './Login.scss';

const Login = () => {
	const handleFailure = (result) => {
		console.clear();
		console.log(result);
	};

	const handleSignIn = (googleUser) => {
		var profile = googleUser.getBasicProfile();
		console.clear();
		console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
		console.log('Name: ' + profile.getName());
		console.log('Image URL: ' + profile.getImageUrl());
		console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
	};

	return (
		<div className="g-signin2 center" data-onsuccess="handleSignIn" data-onfailure="handleFailure"></div>
	);
}

export default Login;