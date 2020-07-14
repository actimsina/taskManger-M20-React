import React, { Component } from 'react'
import { Form, FormGroup, Input, CustomInput, Button, ListGroup, ListGroupItem } from 'reactstrap'
import Axios from 'axios'

export default class Task extends Component {
    constructor(props) {
        super(props)

        this.state = {
            categories: [],
            tasks: [],
            categoryId: '',
            taskName: '',
            taskDone: false,
            config: {
                headers: { 'Authorization': localStorage.getItem('token') }
            }
        }
    }

    componentDidMount() {
        Axios.get('http://localhost:3001/api/categories', this.state.config)
            .then((res) => {
                this.setState({
                    categories: res.data
                })
            }).catch(err => console.log(err.response));
    }

    handleCategoryChange = (e) => {
        this.setState({ categoryId: e.target.value });
        if (e.target.value !== '') {
            Axios.get(`http://localhost:3001/api/categories/${e.target.value}/tasks`, this.state.config)
                .then((res) => {
                    console.log(res.data)
                    this.setState({
                        tasks: res.data
                    })
                }).catch((err) => console.log(err.response));
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        Axios.post(`http://localhost:3001/api/categories/${this.state.categoryId}/tasks`,
            { name: this.state.taskName, done: this.state.taskDone }, this.state.config)
            .then((res) => {
                console.log(res.data);
            }).catch((err) => console.log(err.response));
    }

    handleEdit = (taskId) => {
        this.props.history.push(`/dash/tasks/${taskId}`);
    }

    render() {
        return (
            <div className='container'>
                <h1>Tasks here!</h1>
                <TaskForm categories={this.state.categories}
                    handleCategoryChange={this.handleCategoryChange}
                    taskName={this.state.taskName}
                    taskDone={this.state.taskDone}
                    handleNameChange={(e) => this.setState({ taskName: e.target.value })}
                    handleDoneChange={() => this.setState({ taskDone: !this.state.taskDone })}
                    handleSubmit={this.handleSubmit} />
                <hr />
                <TaskList tasks={this.state.tasks}
                    handleEdit={this.handleEdit} />
            </div>
        )
    }
}


function TaskForm(props) {
    return (
        <Form onSubmit={props.handleSubmit}>
            <FormGroup>
                <Input type='select' id='category' onChange={props.handleCategoryChange}>
                    <option value=''>Select Category</option>
                    {
                        props.categories.map((category) => {
                            return (<option value={category._id} key={category._id}>
                                {category.name}
                            </option>)
                        })
                    }
                </Input>
            </FormGroup>
            <FormGroup>
                <Input name='name' type='text' placeholder='Add task ...'
                    value={props.taskName} onChange={props.handleNameChange} />
            </FormGroup>
            <FormGroup>
                <CustomInput name='done' id='custom-switch' type='switch' label='Is Done?' bsSize='lg'
                    value={props.taskDone} onChange={props.handleDoneChange} />
            </FormGroup>
            <Button color='primary'>Add Task</Button>
        </Form>
    )
}

function TaskList(props) {
    return (
        <ListGroup>
            {
                props.tasks.map((task) => {
                    return (<ListGroupItem key={task._id}>
                        {task.name}
                        <span className='float-right'>
                            <Button size='sm' color='warning'
                                onClick={() => props.handleEdit(task._id)} >Edit</Button>
                            <Button size='sm' color='danger'>Delete</Button>
                        </span>
                    </ListGroupItem>)
                })
            }
        </ListGroup>
    )
}


