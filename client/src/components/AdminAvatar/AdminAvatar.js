import React, { useContext, useState } from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router';
import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import {
    AccountBox,
    AdminPanelSettings,
    ConnectedTv,
    Login,
    MeetingRoom,
} from '@mui/icons-material';

import { logout } from '../../actions/adminActions';
import { AdminContext } from '../../context/AdminContext';

import './AdminAvatar.scss';

const StyledBadge = styled(Badge)(({ theme, isAdmin }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: isAdmin ? '#44b700' : 'var(--alerting-red)',
        color: isAdmin ? '#44b700' : 'var(--alerting-red)',
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

export default function AdminAvatar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const { isAdmin, setIsAdmin } = useContext(AdminContext);
    const open = Boolean(anchorEl);
    let navigate = useNavigate();

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Stack
                onClick={handleClick}
                direction="row"
                spacing={2}
                className="admin-avatar"
            >
                <StyledBadge
                    isAdmin={isAdmin}
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                >
                    <Avatar alt="Admin" />
                </StyledBadge>
            </Stack>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem
                    onClick={() => {
                        navigate('/');
                        handleClose();
                    }}
                >
                    <ListItemIcon>
                        <ConnectedTv />
                    </ListItemIcon>
                    Commercials
                </MenuItem>
                {isAdmin && (
                    <MenuItem
                        onClick={() => {
                            navigate('/admin/panel');
                            handleClose();
                        }}
                    >
                        <ListItemIcon>
                            <AdminPanelSettings />
                        </ListItemIcon>
                        Admin Panel
                    </MenuItem>
                )}
                {isAdmin && (
                    <MenuItem
                        onClick={() => {
                            navigate('/admin/profile');
                            handleClose();
                        }}
                    >
                        <ListItemIcon>
                            <AccountBox />
                        </ListItemIcon>
                        Edit Profile
                    </MenuItem>
                )}
                {isAdmin && (
                    <MenuItem
                        className="logout-item"
                        onClick={() => {
                            logout();
                            navigate('/');
                            setIsAdmin(false);
                            handleClose();
                        }}
                    >
                        <ListItemIcon>
                            <MeetingRoom />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                )}
                {!isAdmin && (
                    <MenuItem
                        onClick={() => {
                            navigate('/admin');
                            handleClose();
                        }}
                    >
                        <ListItemIcon>
                            <Login />
                        </ListItemIcon>
                        Login
                    </MenuItem>
                )}
            </Menu>
        </div>
    );
}
