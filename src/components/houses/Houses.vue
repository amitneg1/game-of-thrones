<template>
	<div class="characters container-fluid">
		<div class="row">
			<div class="col-10 offset-1 mt-5">
				<h1>Houses</h1>
				<div class="loading" v-if="showLoading"><small>Fetching list of houses</small></div>
				<table class="table table-bordered" v-else>
					<tbody>
						<tr v-for="(house, index) in houses" :key="index">
							<td>
								<router-link :to="`/houses/${index + 1}`">{{ house.name }}</router-link>
								<i class="float-right">{{ house.region }} region</i>
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
		name: 'houses',
		data () {
			return {
				houses: [],
				showLoading: false,
			}
		},
		created () {
			this.showLoading = true;
			httpService.getHouses()
				.then(response => {
					this.houses = response.data;
				})
				.catch(error => {
					swal({
						position: 'top-end',
						type: 'error',
						title: error + 'Error occured while fetching the houses',
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
