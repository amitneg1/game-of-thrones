import axios from 'axios';

export default {
	getBooks (pageNo, pageSize) {
		if (!pageNo || pageNo < 1)
			pageNo = 1
		if (!pageSize || pageSize < 1)
			pageSize = 10
		return axios.get('/books?page=' + pageNo + '&pageSize=' + pageSize);
	},
	getCharacters () {
		return axios.get('/characters');
	},
	getHouses () {
		return axios.get('/houses');
	},
	getBook(bookId) {
		return axios.get(`/books/${bookId}`);
	},
	getCharacter(id) {
		return axios.get(`/characters/${id}`);
	},
	getHouse(id) {
		return axios.get(`/houses/${id}`);
	}
}

