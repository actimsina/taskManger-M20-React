import React from 'react'
import { Jumbotron, Container, Button } from 'reactstrap'
import Login from './Login'

export default function Home(props) {
    return (
        <div>
            <Jumbotron fluid>
                <Container fluid>
                    <h1 className='display-3'>Task Manager</h1>
                    <p className="lead">Welcome to the coolest task manager app in the world!!</p>
                    <hr />
                    <Login />
                    <hr />
                    <p className="lead"> New user?
                        <Button color="primary" onClick={() => props.history.push('/register')}>Register</Button>
                        {/* <Link to='/register'>
                            <button className="btn-primary">Register</button>
                        </Link> */}
                    </p>
                </Container>
            </Jumbotron>
        </div>
    )
}
