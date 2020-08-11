import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import axios from 'axios'

export default class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            password: ''
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3001/api/users/register', this.state)
            .then((res) => {
                console.log(res)
            }).catch(err => console.log(err.response.data))
    }

    render() {
        return (
            <div className='container'>
                <Form>
                    <FormGroup>
                        <Label for="firstName">First Name</Label>
                        <Input type='text' name='firstName' id='firstName'
                            value={this.state.firstName}
                            onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for='lastName'>Last Name</Label>
                        <Input type='text' name='lastName' id='lastName'
                            value={this.state.lastName}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for='username'>User Name</Label>
                        <Input type='text' name='username' id='username'
                            value={this.state.username}
                            onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for='password'>Password</Label>
                        <Input type='password' name='password' id='password'
                            value={this.state.password}
                            onChange={this.handleChange} />
                    </FormGroup>
                    <Button block color="primary" onClick={this.handleSubmit}>Submit</Button>
                    <Button block color='warning' onClick={() => this.props.history.push('/')}>Cancel</Button>
                </Form>
            </div>
        )
    }
}
