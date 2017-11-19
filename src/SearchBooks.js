import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types';
import Book from './Book'

class SearchBooks extends React.Component {
	static propTypes = {
		booksInShelves: PropTypes.array,
		onChangeShelf: PropTypes.func.isRequired
	}

	state = {
		query: '',
		books: []
	}

	updateQuery = (query) => {
		this.setState({ query })
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.query !== this.state.query) {
			if (this.state.query) {
				BooksAPI.search(this.state.query).then((books) => {
					if (books.error) {
						this.setState({ books: [] })
					} else {
						this.setState({ books })
					}
				})
			} else {
				this.setState({ books: [] })
			}
		}
	}

	render = () => {
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link className="close-search" to='/'>Close</Link>
					<div className="search-books-input-wrapper">
						<input 
							type="text" 
							placeholder="Search by title or author" 
							value={this.state.query}
							onChange={(event) => this.updateQuery(event.target.value)}
						/>
					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
						{this.state.books.map((book) => (
							<li key={book.id}>
								{this.props.booksInShelves.forEach((bookInShelves) => {
									if (book.id === bookInShelves.id) {
										book.shelf = bookInShelves.shelf
									}
								})}
								<Book book={book} onChangeShelf={this.props.onChangeShelf}/>
							</li>
						))}
					</ol>
				</div>
			</div>
		)
	}
}

export default SearchBooks