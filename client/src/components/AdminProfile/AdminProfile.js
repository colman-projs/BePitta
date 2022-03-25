import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { useAlert } from 'react-alert';
import { Save as SaveIcon } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import { updateDetails } from '../../actions/adminActions';

import './AdminProfile.scss';

function AdminProfile() {
    const [loadingUsername, setLoadingUsername] = useState(false);
    const [loadingPassword, setLoadingPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const alert = useAlert();

    const updateUsername = async () => {
        if (!username) return alert.info('Empty Username');

        setLoadingUsername(true);

        const res = await updateDetails(username, '');

        if (res) {
            setUsername('');
            alert.success('Username was updated successfuly');
        } else alert.error("Couldn't update username");

        setLoadingUsername(false);
    };

    const updatePassword = async () => {
        if (!password) return alert.info('Empty Password');

        setLoadingPassword(true);

        const res = await updateDetails('', password);

        if (res) {
            setPassword('');
            alert.success('Password was updated successfuly');
        } else alert.error("Couldn't update password");

        setLoadingPassword(false);
    };

    return (
        <div className="admin-profile-edit center">
            <h1>Admin Profile Settings: </h1>
            <span>
                <TextField
                    autoFocus
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <LoadingButton
                    loading={loadingUsername}
                    className="edit-button"
                    variant="contained"
                    color="primary"
                    onClick={updateUsername}
                    loadingPosition="end"
                    endIcon={<SaveIcon />}
                >
                    Update
                </LoadingButton>
            </span>
            <span>
                <TextField
                    type="password"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <LoadingButton
                    loading={loadingPassword}
                    className="edit-button"
                    variant="contained"
                    color="primary"
                    onClick={updatePassword}
                    loadingPosition="end"
                    endIcon={<SaveIcon />}
                >
                    Update
                </LoadingButton>
            </span>
        </div>
    );
}

export default AdminProfile;
