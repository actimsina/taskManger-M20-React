import React, { Component } from 'react'
import { Form, FormGroup, Input, Button } from 'reactstrap'
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            isLoggedIn: false
        }
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/api/users/login', this.state)
            .then((res) => {
                console.log(res);
                localStorage.setItem('token', res.data.token);
                this.setState({ isLoggedIn: true });
            }).catch(err => console.log(err));
    }

    render() {

        if (this.state.isLoggedIn) {
            return <Redirect to='/dashboard' />
        }

        return (
            <div className='container'>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Input type='text' name='username' id='username'
                            placeholder="Username"
                            value={this.state.username}
                            onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Input type='password' name='password' id='password'
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handleChange} />
                    </FormGroup>
                    <Button block color="primary" onClick={this.handleSubmit}>Login</Button>
                </Form>

            </div>
        )
    }
}
