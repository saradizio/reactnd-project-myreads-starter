import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import Bookshelf from './Bookshelf'

class ListBooks extends Component {
	static propTypes = {
		books: PropTypes.array.isRequired,
		onChangeShelf: PropTypes.func.isRequired
	}

	render = () => {
		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>
				<div className="list-books-content">
					<Bookshelf title='Currently Reading' books={this.props.books.filter((book) => book.shelf === 'currentlyReading')} onChangeShelf={this.props.onChangeShelf}/>
					<Bookshelf title='Want to Read' books={this.props.books.filter((book) => book.shelf === 'wantToRead')} onChangeShelf={this.props.onChangeShelf}/>
					<Bookshelf title='Read' books={this.props.books.filter((book) => book.shelf === 'read')} onChangeShelf={this.props.onChangeShelf}/>
				</div>
				<div className="open-search">
					<Link to='/search'>Add a book</Link>
				</div>
			</div>
		)
	}
}

export default ListBooks