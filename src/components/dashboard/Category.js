import React, { Component } from 'react'
import { Form, Input, Button, ListGroup, ListGroupItem } from 'reactstrap'
import Axios from 'axios'

export default class Category extends Component {

    constructor(props) {
        super(props)

        this.state = {
            categoryName: '',
            categories: [],
            config: {
                headers: { 'Authorization': localStorage.getItem('token') }
            }
        }
    }

    componentDidMount() {
        Axios.get(`http://localhost:3001/api/categories`, this.state.config)
            .then((res) => {
                console.log(res);
                this.setState({ categories: res.data })
            }).catch((err) => console.log(err));
    }

    handleChange = (e) => {
        this.setState({ categoryName: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        Axios.post(`http://localhost:3001/api/categories`, { name: this.state.categoryName },
            this.state.config)
            .then((res) => {
                this.setState({
                    categories: [...this.state.categories, res.data],
                    categoryName: ''
                })
            }).catch(err => console.log(err.response.data.message));
    }

    handleDelete = (categoryId) => {
        const filteredCategories = this.state.categories.filter((category) => {
            return category._id !== categoryId;
        })
        Axios.delete(`http://localhost:3001/api/categories/${categoryId}`, this.state.config)
            .then((res) => {
                // console.log(res.data);
                this.setState({
                    categories: filteredCategories
                })
            }).catch((err) => console.log(err));
    }

    render() {
        return (
            <div className='container'>
                <CategoryForm name={this.state.categoryName}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit} />
                <hr />
                <CategoryList categories={this.state.categories}
                    handleDelete={this.handleDelete} />
            </div>
        )
    }
}
function CategoryForm(props) {
    return (
        <Form onSubmit={props.handleSubmit}>
            <Input type='text' placeholder='Add category ...'
                value={props.name}
                onChange={props.handleChange} />
            <Button block className="mt-4">Add</Button>
        </Form>
    )
}

function CategoryList(props) {
    return (
        <>
            <ListGroup>
                {
                    props.categories.map((category) => {
                        return <ListGroupItem key={category._id}>{category.name}
                            <Button close onClick={() => props.handleDelete(category._id)} />
                        </ListGroupItem>
                    })
                }
            </ListGroup>
        </>
    )
}