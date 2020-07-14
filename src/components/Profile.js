import React from 'react'

export default function Profile() {
    const user = () => {
        let token = localStorage.getItem('token');
        console.log(token)
    }


    return (
        <div>
            <h3>Welcome, User</h3>
        </div>
    )
}


