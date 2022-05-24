import React from 'react';


const styles = {
    container: {
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        height: "100vh"
    }
}

export default function NotFound() {
    return (
        <div style={styles.container}>
            <h1>Page Not Found</h1>
        </div>
    )
}