import React, { useContext, useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import { Login } from '@mui/icons-material';
import { useAlert } from 'react-alert';

import { AdminContext } from '../../context/AdminContext';
import { authenticate } from '../../actions/adminActions';

import './AdminLogin.scss';

function AdminLogin() {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { isAdmin, setIsAdmin } = useContext(AdminContext);
    const alert = useAlert();

    let navigate = useNavigate();

    useEffect(() => {
        if (isAdmin) return navigate('/');
    }, [isAdmin, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const res = await authenticate(username, password);

        if (res.message) alert.error(res.message);

        setLoading(false);
        if (res.accessToken) setIsAdmin(true);
    };

    return (
        <form onSubmit={handleSubmit} className="login center">
            <h1>Admin Login: </h1>
            <TextField
                required
                autoFocus
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
                required
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <LoadingButton
                className="login-button"
                variant="contained"
                color="primary"
                type="submit"
                loading={loading}
                loadingPosition="end"
                endIcon={<Login />}
            >
                Login
            </LoadingButton>
        </form>
    );
}

export default AdminLogin;
