import React from 'react'
import { Navbar, NavItem, NavbarText, Button } from 'reactstrap';
import { Link } from 'react-router-dom';


export default function NavBar(props) {
    return (
        <div>
            <Navbar color='dark' expand='l' className='mb-5'>
                <NavItem>
                    <Link to='/'>Task Manager</Link>
                </NavItem>
                <NavbarText>
                    <Button onClick={props.handleLogout} color='primary'>Logout</Button>
                </NavbarText>
            </Navbar>
        </div>
    )
}

