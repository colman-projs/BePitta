import React from 'react';
import { Typography, Button } from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';

import './ErrorBoundary.scss';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error(error, errorInfo);
    }

    refresh = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-page center">
                    <Button
                        onClick={this.refresh}
                        color="primary"
                        variant="outlined"
                        endIcon={<RefreshIcon />}
                        className="refresh"
                    >
                        Refresh
                    </Button>
                    <Typography variant="h4">
                        Oops! Something went wrong.
                    </Typography>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
