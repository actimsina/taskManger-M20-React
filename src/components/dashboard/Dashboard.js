import React from 'react'
import NavBar from '../NavBar'

export default function Dashboard(props) {
    const handleLogout = () => {
        localStorage.removeItem('token');
        props.history.push('/');
    }
    return (
        <NavBar handleLogout={handleLogout} />
    )
}
