<template>
	<div class="characterdetail container-fluid">
		<div class="row">
			<div class="col-8 offset-2 mt-5">
				<div class="loading" v-if="showLoading"><small>Fetching character details</small></div>
				<div v-else>
					<h1 class="text-center">{{ character.name || character.aliases[0]}}</h1>
					<p class="text-center"><small><i>({{ character.aliases[0] }})</i></small></p>
					<p class="text-center" v-if="character.books.length">This character appears in {{ character.books.length | pluralize('book') }}</p>
					<hr>
					<table class="table table-borderless">
						<tbody>
							<tr><td><b>Gender</b><span class="float-right">{{ character.gender || 'Not available' }}</span></td></tr>
							<tr><td><b>Culture</b><span class="float-right">{{ character.culture || 'Not available' }}</span></td></tr>
							<tr><td><b>Born</b><span class="float-right">{{ character.born || 'Not available'}}</span></td></tr>
							<tr><td><b>Died</b><span class="float-right">{{ character.died || 'Not available' }}</span></td></tr>
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
		name: 'characterdetail',
		data () {
			return {
				character: {},
				showLoading: false,
			}
		},
		computed: {
			releaseDate () {
				let today = new Date(this.character.released);
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
			httpService.getCharacter(id)
				.then(response => {
					this.character = response.data;
				})
				.catch(error => {
					swal({
						position: 'top-end',
						type: 'error',
						title: error + 'Error occured while fetching the character details',
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


