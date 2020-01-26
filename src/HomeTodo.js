import React, { Component } from 'react';
import AppNav from './components/AppNav';
import axios from 'axios';
import $ from 'jquery';

import {
	Form,
	FormGroup,
	Label,
	Input,
	Container,
	Button,
	ListGroup,
	ListGroupItem,
	Row,
	Col,
	CustomInput
} from 'reactstrap';
import { Link } from 'react-router-dom';

class HomeTodo extends Component {
	state = {
		isLoading: true,
		Todos: []
	};

	// sync  -> you send a request then you wait for the response...
	// async -> you send a request the you don't have to wait...
	async componentDidMount() {
		try {
			const { data } = await axios.get('/todos');
			this.setState({ Todos: data, isLoading: false });
		} catch (e) {
			console.log(`Request failed: ${e}`);
		}
	}

	handleChangeTitle = (e) => {
		this.setState({ title: e.target.value });
	};

	handleDelete = async (e, id) => {
		e.preventDefault();
		const listTodos = this.state.Todos;
		const index = listTodos.findIndex((todo) => todo.id === id);
		await axios.delete(`/todos/${this.state.Todos[index].id}`);

		let todoListCopy = this.state.Todos;
		for (let i = 0; i < todoListCopy.length; i++) {
			let todo = todoListCopy[i];
			if (todo.id === id) {
				todoListCopy.splice(i, 1);
				break;
			}
		}
		this.setState({ Todos: todoListCopy });
		this.props.history.push('/todos');
	};

	handlePost = async (e) => {
		e.target.reset();
		const itemToAdd = this.state.title;
		const todo = {
			title: itemToAdd,
			completed: 'false'
		};
		const { data } = await axios.post('/todos', todo);
		const currentState = this.state.Todos;
		this.setState({
			Todos: currentState.concat(data),
			title: ''
		});
	};

	inputChanging() {
		let inputTodo = $('.input-todo');
		return inputTodo.val();
	}

	editarTodo(id, value) {
		var todos = this.state.Todos
		todos.map((todo) => {
			if (todo.id === id) {
				todo.title = value;
				axios.put('/todos', todo);
			}
		})
		this.setState({Todos: todos});
		
	}

	clickEdit(id) {
		let inputTodo = $('.input-todo');
		let buttonSave = $('.btn-save');
		if (this.state.editing) {
			this.setState({ idEdit: -1, editing: false });			
			let todo = this.editarTodo(id, inputTodo.val());
			buttonSave.attr('color', 'success');
		} else {
			this.setState({ idEdit: id, editing: true });
			buttonSave.attr('color', 'success');
		}
	}

	renderTodos(todos) {
		if (this.state.editing && this.state.idEdit === todos.id) {
			return <Input placeholder={todos.title} className='input-todo text-uppercase' />;
		} else {
			return (
				<ListGroupItem tag='a' className='list-todo inline text-uppercase'>
					{todos.title}
				</ListGroupItem>
			);
		}
	}

	handleCheck = async (e, id) => {
		e.preventDefault();
		let check = e.target.checked;
		this.setState({ completed: check });
		const index = this.state.Todos.findIndex((todo) => todo.id === id);
		const todo = {
			id: id,
			title: this.state.Todos[index].title,
			completed: check
		};
		await axios.put('/todos', todo);

		const currentState = this.state.Todos;
		currentState[index].completed = this.state.completed;
		this.setState({
			Todos: currentState
		});
		this.state.completed = !this.state.completed;
	};

	render() {
		const { Todos, isLoading } = this.state;

		if (isLoading) return <div>Loading...</div>;

		return (
			<div>
				<AppNav />
				<Container style={{ marginTop: '2rem' }}>
					{Todos.map((todos) => (
						<div
							id={todos.id}
							className='clearfix'
							style={{ padding: '.5rem' }}
						>
							<Row>
								<Col xs='1' style={{ marginTop: '10px' }}>
									<CustomInput
										type='checkbox'
										checked={todos.completed}
										onChange={(e) => this.handleCheck(e, todos.id)}
										id={todos.title}
										style={{ marginLeft: '20px' }}
									/>
								</Col>
								<Col xs='4'>
									<ListGroup>{this.renderTodos(todos)}</ListGroup>
								</Col>
								<Col xs='6'>						
									<Button
										outline
										color='warning'
										value={todos.id}
										onClick={this.handleEdit}
										className='btn-save h-100 w-25'
										onClick={() => this.clickEdit(todos.id)}
									>
										Edit
									</Button>{' '}
									<Button
										outline
										color='danger'
										value={todos.id}
										onClick={(e) => this.handleDelete(e, todos.id)}
										className='h-100 w-25'
									>
										Delete
									</Button>{' '}
								</Col>
							</Row>
						</div>
					))}
					<Row>
						<Col xs='4'>
							<Form
								style={{ marginTop: '2rem', marginLeft: '10px' }}
								onSubmit={this.handlePost}
							>
								<FormGroup>
									<Label
										for='todo'
										className='ml-1 display-4'
										style={{ fontSize: '1.7rem', fontWeight: 600 }}
									>
										New ToDo
									</Label>
									<Input
										type='text'
										name='todo'
										onChange={this.handleChangeTitle}
									/>
								</FormGroup>
								<FormGroup>
									<Button outline color='primary' type='submit'>
										Add
									</Button>{' '}
									<Button outline color='secondary' tag={Link} to='/'>
										Cancel
									</Button>{' '}
								</FormGroup>
							</Form>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

export default HomeTodo;
