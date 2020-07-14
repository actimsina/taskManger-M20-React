import React from 'react'

export default function AdminDash(props) {
    return (
        <div>
            <h1>Admin Only Route</h1>
            <button className='btn btn-warning' onClick={() => {
                localStorage.removeItem('token');
                props.history.push('/');
            }}>
                Logout
                </button>
        </div>
    )
}
