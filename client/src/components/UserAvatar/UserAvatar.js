import React, { useContext, useState } from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router';
import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import { MeetingRoom, Restaurant } from '@mui/icons-material';
import { googleLogout, GoogleLogin } from '@react-oauth/google';
import { decodeJwt } from 'jose';
import { cookie } from '../../actions/cookieActions';
import { UserContext } from '../../context/UserContext';
import './UserAvatar.scss';

const StyledBadge = styled(Badge)(({ theme, connected }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: connected ? '#44b700' : 'var(--alerting-red)',
        color: connected ? '#44b700' : 'var(--alerting-red)',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            content: '""',
        },
    },
}));

export default function UserAvatar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const { user, setUser } = useContext(UserContext);
    const open = Boolean(anchorEl);
    let navigate = useNavigate();

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleFailure = result => {
        console.clear();
        console.log(result);
    };

    const handleSignIn = response => {
        const responsePayload = decodeJwt(response.credential);

        console.group('User data');
        console.log('ID: ' + responsePayload.sub);
        console.log('Full Name: ' + responsePayload.name);
        console.log('Given Name: ' + responsePayload.given_name);
        console.log('Family Name: ' + responsePayload.family_name);
        console.log('Image URL: ' + responsePayload.picture);
        console.log('Email: ' + responsePayload.email);
        console.groupEnd();

        setUser(responsePayload);
        cookie.setCookie(
            cookie.siteCookies.userCradentials,
            response.credential,
        );
    };

    const handleLogout = () => {
        googleLogout();

        setUser(null);

        navigate('/');

        cookie.clearCookie(cookie.siteCookies.userCradentials);
    };

    return (
        <div className="user-avatar">
            <Stack onClick={handleClick} direction="row" spacing={2}>
                <StyledBadge
                    connected={user}
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                >
                    <Avatar
                        alt="User"
                        imgProps={{ referrerPolicy: 'no-referrer' }}
                        src={user?.picture}
                    />
                </StyledBadge>
            </Stack>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                {user && (
                    <MenuItem
                        style={{ pointerEvents: 'none', cursor: 'default' }}
                    >
                        Hey {user.name}
                    </MenuItem>
                )}
                {user && (
                    <MenuItem
                        onClick={() => {
                            navigate('/user/preferences');
                            handleClose();
                        }}
                    >
                        <ListItemIcon>
                            <Restaurant />
                        </ListItemIcon>
                        Preferences
                    </MenuItem>
                )}
                {user ? (
                    <MenuItem
                        className="logout-item"
                        onClick={() => {
                            handleLogout();
                            handleClose();
                        }}
                    >
                        <ListItemIcon>
                            <MeetingRoom />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                ) : (
                    <MenuItem
                        onClick={() => {
                            handleClose();
                        }}
                    >
                        <ListItemIcon>
                            <GoogleLogin
                                onSuccess={handleSignIn}
                                onError={handleFailure}
                                shape="pill"
                                text="continue_with"
                                useOneTap
                            />
                        </ListItemIcon>
                    </MenuItem>
                )}
            </Menu>
        </div>
    );
}
