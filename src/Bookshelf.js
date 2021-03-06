import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Book from './Book'

class Bookshelf extends Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
		books: PropTypes.array.isRequired,
		onChangeShelf: PropTypes.func.isRequired
	}

	render = () => {
		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{this.props.title}</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
						{this.props.books.map((book) => (
							<li key={book.id}>
								<Book book={book} onChangeShelf={this.props.onChangeShelf}/>
							</li>
						))}
					</ol>
				</div>
			</div>
		)
	}
}

export default Bookshelf