import React from 'react'
import NavBar from '../NavBar'
import Category from './Category'

export default function Dashboard(props) {
    const handleLogout = () => {
        localStorage.removeItem('token');
        props.history.push('/')
    }
    return (
        <div>
            <NavBar handleLogout={handleLogout} />
            <Category />
        </div>
    )
}
