<template>
<div class="bookdetail container-fluid">
	<div class="row">
		<div class="col-8 offset-2 mt-5">
			<div class="loading" v-if="showLoading"><small>Fetching book details</small></div>
			<div v-else>
				<h1 class="text-center">{{ book.name }}</h1>
				<p class="text-center"><small>({{ book.mediaType }}; published in {{ book.country }})</small></p>
				<hr>
				<table class="table table-borderless">
					<tbody>
						<tr><td><b>Author</b><span class="float-right">{{ book.authors.join('') || 'Not available' }}</span></td></tr>
						<tr><td><b>Published By</b><span class="float-right">{{ book.publisher || 'Not available' }}</span></td></tr>
						<tr><td><b>ISBN</b><span class="float-right">{{ book.isbn || 'Not available' }}</span></td></tr>
						<tr><td><b>Number of pages</b><span class="float-right">{{ book.numberOfPages | pluralize('page') }}</span></td></tr>
						<tr><td><b>Initial Release</b><span class="float-right">{{ releaseDate }}</span></td></tr>
					</tbody>
				</table>
			</div>	
		</div>
	</div>
</div>
</template>

<script>
	import httpService from '@/services/http-common.js';
	import swal from 'sweetalert2';
	
	export default {
		name: 'bookdetail',
		data () {
			return {
				book: {},
				showLoading: false,
			}
		},
		computed: {
			releaseDate () {
				let today = new Date(this.book.released);
				let dd = today.getDate();
				let mm = today.getMonth()+1;

				var yyyy = today.getFullYear();
				if(dd<10){
					dd='0'+dd;
				} 
				if(mm<10){
					mm='0'+mm;
				}
				return dd+'/'+mm+'/'+yyyy;				
			}
		},
		created () {
			this.showLoading = true;
			let url = window.location.pathname;
			let id = url.substring(url.lastIndexOf('/') + 1);
			httpService.getBook(id)
				.then(response => {
					this.book = response.data;
				})
				.catch(error => {
					swal({
						position: 'top-end',
						type: 'error',
						title: error + 'Error occured while fetching the book details',
						showConfirmButton: false,
						timer: 2000,
						backdrop: false,
					});
				})
				.finally(() => {
					this.showLoading = false;
				});
		}
	}
</script>

