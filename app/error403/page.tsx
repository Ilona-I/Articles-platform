import React from 'react';

const Error403Page: React.FC = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '20%' }}>
            <h1 style={{ fontSize: '3rem', color: '#ff4d4f' }}>403 - Forbidden</h1>
            <p style={{ fontSize: '1.5rem' }}>
                You don't have permission to access this page.
            </p>
            <a href="/" style={{ fontSize: '1.2rem', color: '#1890ff' }}>
                Go back to Home
            </a>
        </div>
    );
};

export default Error403Page;