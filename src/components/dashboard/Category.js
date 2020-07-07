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
            },
            isUpdate: false,
            categoryId: ''
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
        this.setState({ categoryName: e.target.value }, () => {
            if (this.state.categoryName === '') {
                this.setState({ isUpdate: false })
            }
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.categoryName === '') {
            this.setState({
                isUpdate: false
            })
            return;
        }
        if (this.state.isUpdate === false) {
            Axios.post(`http://localhost:3001/api/categories`, { name: this.state.categoryName },
                this.state.config)
                .then((res) => {
                    this.setState({
                        categories: [...this.state.categories, res.data],
                        categoryName: ''
                    })
                }).catch(err => console.log(err.response.data.message));
        } else {
            Axios.put(`http://localhost:3001/api/categories/${this.state.categoryId}`,
                { name: this.state.categoryName }, this.state.config)
                .then((res) => {
                    console.log(res)
                    const updatedCategories = this.state.categories.map((category) => {
                        if (category._id === this.state.categoryId) {
                            category.name = this.state.categoryName;
                        }
                        return category;
                    })
                    this.setState({
                        isUpdate: false,
                        categories: updatedCategories,
                        categoryName: ''
                    })
                }).catch(err => console.log(err.response));
        }
    }

    handleDelete = (categoryId) => {
        const filteredCategories = this.state.categories.filter((category) => {
            return category._id !== categoryId;
        })
        Axios.delete(`http://localhost:3001/api/categories/${categoryId}`, this.state.config)
            .then((res) => {
                this.setState({
                    categories: filteredCategories,
                    isUpdate: false,
                    categoryName: ''
                })
            }).catch((err) => console.log(err));
    }

    handleEdit = (categoryId) => {
        this.setState({
            categoryName: this.state.categories.find((category) => {
                return categoryId === category._id;
            }).name,
            categoryId: categoryId,
            isUpdate: true
        });
    }

    render() {
        return (
            <div className='container'>
                <CategoryForm
                    name={this.state.categoryName}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    isUpdate={this.state.isUpdate} />

                <hr />
                <CategoryList categories={this.state.categories}
                    handleDelete={this.handleDelete}
                    handleEdit={this.handleEdit} />
            </div>
        )
    }
}
function CategoryForm(props) {
    return (
        <Form onSubmit={props.handleSubmit}>
            <Input type='text' placeholder='Add category ...'
                value={props.name} onChange={props.handleChange} className='mb-4' />
            {props.isUpdate ? (
                <Button size='sm' color='warning'>Update</Button>
            ) : (
                    <Button size='sm' color='primary'>Add</Button>
                )}

        </Form>
    )
}


function CategoryList(props) {
    return (
        <>
            <ListGroup>
                {
                    props.categories.map((category) => {
                        return <ListGroupItem key={category._id} onClick={() => props.handleEdit(category._id)}>
                            {category.name}
                            <Button close onClick={() => props.handleDelete(category._id)} />
                        </ListGroupItem>
                    })
                }
            </ListGroup>
        </>
    )
}