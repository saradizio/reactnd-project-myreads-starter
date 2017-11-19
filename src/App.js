import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends React.Component {
	state = {
		books: []
	}

	componentDidMount = () => {
		BooksAPI.getAll().then(books => {
			this.setState({ books })
		})
	}

	changeShelf(book, shelf) {
		BooksAPI.update(book, shelf).then(() => {
			BooksAPI.getAll().then(books => {
				this.setState({ books })
			})
		})
	}

	render() {
		return (
			<div className="app">
				<Route exact path='/' render={() => (
					// <ListBooks books={this.state.books} onChangeShelf={this.changeShelf}/>
					<ListBooks books={this.state.books} onChangeShelf={(book, shelf) => this.changeShelf(book, shelf)}/>
				)} />
				<Route path='/search' render={() => (
					<SearchBooks />
				)} />
			</div>
		)
	}
}

export default BooksApp
