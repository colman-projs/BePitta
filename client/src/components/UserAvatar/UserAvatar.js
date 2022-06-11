import React, { useContext, useState } from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router';
import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import {
    MeetingRoom,
    Storefront,
    Icecream,
    Style,
    Settings,
    Groups,
} from '@mui/icons-material';
import { googleLogout, GoogleLogin } from '@react-oauth/google';
import { decodeJwt } from 'jose';
import { cookie } from '../../actions/cookieActions';
import { UserContext } from '../../context/UserContext';
import { UserIdContext } from '../../context/UserIdContext';
import './UserAvatar.scss';
import {
    createUser,
    getUserByGoogle,
    updateUserGoogle,
} from '../../actions/userActions';

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
    const { userId, setUserId } = useContext(UserIdContext);
    const open = Boolean(anchorEl);
    let navigate = useNavigate();

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleFailure = result => {
        console.error(result);
    };

    const handleSignIn = response => {
        const responsePayload = decodeJwt(response.credential);
        const googleId = responsePayload.sub;

        setUser(responsePayload);
        cookie.setCookie(
            cookie.siteCookies.userCradentials,
            response.credential,
        );

        // Check if google already assigned
        getUserByGoogle(googleId).then(user => {
            if (user) {
                // Update saved user ID
                cookie.setCookie(cookie.siteCookies.userId, user._id);
                setUserId(user._id);
            } else {
                // Connect google to user ID
                updateUserGoogle(userId, googleId);
            }
        });
    };

    const handleLogout = () => {
        googleLogout();

        setUser(null);

        navigate('/');

        cookie.clearCookie(cookie.siteCookies.userCradentials);
        // Create temp user
        createUser().then(uId => {
            cookie.setCookie(cookie.siteCookies.userId, uId);
            setUserId(uId);
        });
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
                {!user ? (
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
                ) : (
                    <MenuItem
                        style={{ pointerEvents: 'none', cursor: 'default' }}
                    >
                        Hey {user.name}
                    </MenuItem>
                )}
                <MenuItem
                    onClick={() => {
                        navigate('/');
                        handleClose();
                    }}
                >
                    <ListItemIcon>
                        <Groups />
                    </ListItemIcon>
                    New Group
                </MenuItem>
                {user && (<>
                    <MenuItem
                        onClick={() => {
                            navigate('/admin/restaurants');
                            handleClose();
                        }}
                    >
                        <ListItemIcon>
                            <Storefront />
                        </ListItemIcon>
                        Manage Restaurants
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            navigate('/admin/dishes');
                            handleClose();
                        }}
                    >
                        <ListItemIcon>
                            <Icecream />
                        </ListItemIcon>
                        Manage Dishes
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            navigate('/admin/tags');
                            handleClose();
                        }}
                    >
                        <ListItemIcon>
                            <Style />
                        </ListItemIcon>
                        Manage Tags
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            navigate('/user/preferences');
                            handleClose();
                        }}
                    >
                        <ListItemIcon>
                            <Settings />
                        </ListItemIcon>
                        Preferences
                    </MenuItem>
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
                </>)}
            </Menu>
        </div>
    );
}
