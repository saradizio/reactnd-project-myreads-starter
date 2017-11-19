import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import Book from './Book'

class SearchBooks extends React.Component {
	state = {
		query: '',
		books: []
	}

	searchBooks = (query) => {
		this.setState({ query })
		if (query) {
			BooksAPI.search(query).then((books) => {
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

	render = () => {
		const query = this.state.query;

		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link className="close-search" to='/'>Close</Link>
					<div className="search-books-input-wrapper">
						<input 
							type="text" 
							placeholder="Search by title or author" 
							value={query}
							onChange={(event) => this.searchBooks(event.target.value)}
						/>
					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
						{this.state.books.map((book) => (
							<li key={book.id}>
								<Book book={book}/>
							</li>
						))}
					</ol>
				</div>
			</div>
		)
	}
}

export default SearchBooks