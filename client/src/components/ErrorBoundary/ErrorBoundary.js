import React from 'react';
import { Typography } from '@mui/material';

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

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-page center">
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
