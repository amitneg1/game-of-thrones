<template>
	<div class="housedetail container-fluid">
		<div class="row">
			<div class="col-8 offset-2 mt-5">
				<div class="loading" v-if="showLoading"><small>Fetching house details</small></div>
				<div v-else>
					<h1 class="text-center">{{ house.name }}</h1>
					<p class="text-center"><small><i>{{ house.coatOfArms }}</i></small></p>
					<hr>
					<table class="table table-borderless">
						<tbody>
							<tr><td><b>Founder</b><span class="float-right">{{ house.founder || 'Not available' }}</span></td></tr>
							<tr><td><b>Founded</b><span class="float-right">{{ house.founded || 'Not available' }}</span></td></tr>
							<tr><td><b>Heir</b><span class="float-right">{{ house.heir || 'Not available' }}</span></td></tr>
							<tr><td><b>Region</b><span class="float-right">{{ house.region || 'Not available' }}</span></td></tr>
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
		name: 'housedetail',
		data () {
			return {
				house: {},
				showLoading: false,
			}
		},
		computed: {
			releaseDate () {
				let today = new Date(this.house.released);
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
			httpService.getHouse(id)
				.then(response => {
					this.house = response.data;
				})
				.catch(error => {
					swal({
						position: 'top-end',
						type: 'error',
						title: error + 'Error occured while fetching the house details',
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


