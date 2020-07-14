import React from 'react'
import { Navbar, NavItem, NavbarText, Button, Nav, } from 'reactstrap';
import { NavLink, Switch, Link } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Category from './dashboard/Category';
import Task from './dashboard/Task';
import EditTask from './dashboard/EditTask';
import Profile from './Profile';

export default function NavBar(props) {

    return (
        <div>
            <Navbar color='dark' dark expand='md'>
                <Nav className='mr-auto' vertical navbar>
                    <NavItem>
                        <Link to='/dash/categories'>Categories</Link>
                    </NavItem>
                    <NavItem>
                        <NavLink to='/dash/tasks'>Tasks</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to='/dash/profile'>Username</NavLink>
                    </NavItem>
                </Nav>
                <NavbarText>
                    <Button onClick={props.handleLogout} color='warning'>Logout</Button>
                </NavbarText>
            </Navbar>
            <Switch>
                <PrivateRoute path='/dash/categories' component={Category} />
                <PrivateRoute path='/dash/tasks/:taskId' component={EditTask} />
                <PrivateRoute path='/dash/tasks' component={Task} />
                <PrivateRoute path='/dash/profile' component={Profile} />
            </Switch>
        </div>
    )
}

