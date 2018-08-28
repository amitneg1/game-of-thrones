<template>
	<div class="characters container-fluid">
		<div class="row">
			<div class="col-10 offset-1 mt-5">
				<h1>Characters</h1>
				<div class="loading" v-if="showLoading"><small>Fetching list of characters</small></div>
				<table class="table table-bordered" v-else>
					<tbody>
						<tr v-for="(character, index) in characters" :key="index">
							<td>
								<router-link :to="`/characters/${index + 1}`">{{ character.name || character.aliases[0] }}</router-link>
								<i class="float-right">{{ character.gender }}</i>
							</td>
						</tr>
					</tbody>
				</table>	
			</div>
		</div>
	</div>
</template>

<script>
	import httpService from '@/services/http-common.js';
	import swal from 'sweetalert2';
	
	export default {
		name: 'characters',
		data () {
			return {
				characters: [],
				showLoading: false,
			}
		},
		created () {
			this.showLoading = true;
			httpService.getCharacters()
				.then(response => {
					this.characters = response.data;
				})
				.catch(error => {
					swal({
						position: 'top-end',
						type: 'error',
						title: error + 'Error occured while fetching the characters',
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


