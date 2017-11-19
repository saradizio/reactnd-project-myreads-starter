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

	changeShelf(book, newShelf) {
		BooksAPI.update(book, newShelf).then(() => {
			if (this.state.books.filter((b) => b.id === book.id).length > 0) {
				// book is already in the state, we only have to update his shelf
				this.setState((state) => ({
					books: state.books.map((b) => {
						if (b.id === book.id) {
							b.shelf = newShelf
						}
						return b
					})
				}))
			} else {
				// book is not in the state, we have to add it
				BooksAPI.get(book.id).then((newBook) => {
					this.setState((state) => ({
						books: state.books.concat([newBook])
					}))
				})
			}
		})
	}

	render() {
		return (
			<div className="app">
				<Route exact path='/' render={() => (
					<ListBooks books={this.state.books} onChangeShelf={(book, shelf) => this.changeShelf(book, shelf)}/>
				)} />
				<Route path='/search' render={() => (
					<SearchBooks booksInShelves={this.state.books} onChangeShelf={(book, shelf) => this.changeShelf(book, shelf)}/>
				)} />
			</div>
		)
	}
}

export default BooksApp
