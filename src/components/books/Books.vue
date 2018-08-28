<template>
	<div class="books container-fluid">
		<div class="row">
			<div class="col-10 offset-1 mt-5">
				<h1>Books</h1>
				<div class="row">
					<div class="offset-6 col-3">
						Filter by book name<input type="text" name="bookname" v-model="nameQuery" @input="filterByBookName" @change="filterByBookName" class="form-control">
					</div>
					<div class="col-3">
						by author<input type="text" name="bookauthor" v-model="authorQuery" @input="filterByBookAuthor" @change="filterByBookAuthor" class="form-control">
					</div>
				</div>
				<div class="row mt-3">
					<div class="col-1">
						<button class="btn btn-primary" @click="loadPreviousPage" :disabled="startLimitReached">&laquo;&nbsp;Previous</button>
					</div>
					<div class="offset-9 col-2 text-right">
						<button class="btn btn-primary" @click="loadNextPage" :disabled="endLimitReached">Next&nbsp;&raquo;</button>
					</div>
				</div>
				<div class="loading" v-if="showLoading"><small>Fetching list of books</small></div>
				<table class="table table-bordered mt-3" v-else>
					<tbody>
						<tr v-for="(book, bookIndex) in books" :key="bookIndex">
							<td>
								<router-link :to="`/books/${bookIndex + 1}`">{{ book.name }}</router-link>
								<i class="float-right">by {{ book.authors.join(',')}}</i>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>

	import store from '@/store.js';
	import { mapGetters } from 'vuex';
	
	export default {
		name: 'books',
		store,
		data () {
			return {
				nameQuery: '',
				authorQuery: '',
			}
		},
		computed: {
			pageNumber () {
				return this.$store.getters.pageNo;
			},
			...mapGetters([
				'showLoading',
				'books',
				'startLimitReached',
				'endLimitReached'
			])
		},
		methods: {
			filterByBookName () {
				store.dispatch('filterBooksByName', {'query': this.nameQuery.toLowerCase()})
			},
			filterByBookAuthor () {
				store.dispatch('filterBooksByAuthor', {'query': this.authorQuery.toLowerCase()})
			},
			loadPreviousPage () {
				store.dispatch('loadPreviousPage')
			},
			loadNextPage () {
				store.dispatch('loadNextPage')
			}
		},
		created () {
			store.dispatch('getAllBooks');
		}
	}
</script>
