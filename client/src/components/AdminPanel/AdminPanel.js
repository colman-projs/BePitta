import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CommercialForm from '../CommercialForm/CommercialForm';
import ClientsList from '../ClientsList/ClientsList';

import './AdminPanel.scss';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`action-tabpanel-${index}`}
            aria-labelledby={`action-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `action-tab-${index}`,
        'aria-controls': `action-tabpanel-${index}`,
    };
}

export default function AdminPanel() {
    const [value, setValue] = React.useState(0);

    const handleChange = (_event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="admin-panel">
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                >
                    <Tab label="Add Commercial" {...a11yProps(0)} />
                    <Tab label="Edit Commercial" {...a11yProps(1)} />
                    <Tab label="Clients Data" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <div className="panels">
                <TabPanel value={value} index={0}>
                    <CommercialForm />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <CommercialForm isEdit />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <ClientsList />
                </TabPanel>
            </div>
        </div>
    );
}
