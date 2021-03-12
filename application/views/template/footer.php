	</div>
	<!-- FOOTER -->
	<div class="container sticky-bottom">
		<div class="col-md-12 col-lg-12">
			<div class="card" style='border:0px;'>
				<div class="body text-center">
					<p class="copyright mb-0">Copyright 2020 © All Rights Reserved. <a
							href="http://theblackcoders.com" target="_blank">BlackCoders</a></p>
				</div>
			</div>
		</div>
	</div>

	<script src="<?=base_url('assets/bundles/vendorscripts.bundle.js')?>"></script>
	<script src="<?=base_url('assets/bundles/apexcharts.bundle.js')?>"></script>
	<script src="<?=base_url('assets/bundles/mainscripts.bundle.js')?>"></script>
	<script src="<?=base_url('assets/js/hospital/index.js')?>"></script>
	<script src="<?=base_url('assets/plugins/horizontal-timeline/js/horizontal-timeline.js')?>"></script>
	<script src="<?=base_url('assets/bundles/datatablescripts.bundle.js')?>"></script>
	<script src="<?=base_url('assets/plugins/jquery-datatable/buttons/dataTables.buttons.min.js')?>"></script>
	<script src="<?=base_url('assets/plugins/jquery-datatable/buttons/buttons.bootstrap4.min.js')?>"></script>
	<script src="<?=base_url('assets/plugins/jquery-datatable/buttons/buttons.colVis.min.js')?>"></script>
	<script src="<?=base_url('assets/plugins/jquery-datatable/buttons/buttons.html5.min.js')?>"></script>
	<script src="<?=base_url('assets/plugins/jquery-datatable/buttons/buttons.print.min.js')?>"></script>
	<script src="<?=base_url('assets/js/pages/tables/pdfmake.min.js')?>"></script>
	<script src="<?=base_url('assets/js/pages/tables/vfs_fonts.js')?>"></script>
	<script src="<?=base_url('assets/js/pages/tables/jszip.min.js')?>"></script>
	<script src="<?=base_url('assets/plugins/momentjs/moment.js')?>"></script>
	<script src="<?=base_url('assets/js/daterangepicker.min.js')?>"></script>
	<script src="<?=base_url('assets/plugins/bootstrap-colorpicker/js/bootstrap-colorpicker.js')?>"></script>
	<script src="<?=base_url('assets/plugins/jquery-inputmask/jquery.inputmask.bundle.js')?>"></script>
	<script src="<?=base_url('assets/plugins/multi-select/js/jquery.multi-select.js')?>"></script>
	<script src="<?=base_url('assets/plugins/jquery-spinner/js/jquery.spinner.js')?>"></script>
	<script src="<?=base_url('assets/plugins/bootstrap-tagsinput/bootstrap-tagsinput.js')?>"></script>
	<script src="<?=base_url('assets/plugins/nouislider/nouislider.js')?>"></script>
	<script src="<?=base_url('assets/js/pages/forms/advanced-form-elements.js')?>"></script>
	<script src="<?=base_url('assets/js/select2.min.js')?>"></script>
	<script src="<?=base_url('assets/plugins/bootstrap-datetimepicker/bootstrap-datetimepicker.js')?>"></script>
	<script src="<?=base_url('assets/plugins/jquery-validation/jquery.validate.js')?>"></script> 
	<script src="<?=base_url('assets/plugins/bootstrap-notify/bootstrap-notify.js')?>"></script> 
	<script src="<?=base_url('assets/js/pages/tables/jquery-datatable.js')?>"></script>
	<script src="<?=base_url('assets/js/pages/forms/form-validation.js')?>"></script> 
	<script src="<?=base_url('assets/js/pages/ui/notifications.js')?>"></script>
	<script src="<?=base_url('assets/js/jquery.inputmask.min.js')?>"></script>
	<script src="<?=base_url('assets/js/jquery.redirect.js')?>"></script>

	<!-- ----- CUSTOM VALIDATION ----- -->
	<script src="<?=base_url('assets/custom/js/custom-validation.js')?>"></script>
	<script src="<?= base_url('assets/custom/js/gen/footer.js') ?>"></script>
	<script>
			function sweetAlertConfirmation(condition = null , moduleName,  modalID = null, containerID = null, data = null){
				$("#"+modalID).modal("hide");

				let lowerCase 	= moduleName.toLowerCase();
				let upperCase	= moduleName.toUpperCase();
				let capitalCase = moduleName;
				let title 				=  "";
				let text 				=  ""
				let success_title       =  "";
				let confirmButtonText  	=  ""; 
				switch(condition) {
				case "add":
					title 					+=  "Add " + capitalCase;
					text 					+=  "Are you sure that you want to add a new "+ lowerCase +" to the system?"
					success_title        	+=  "Add new "+capitalCase + " successfully saved!";
					confirmButtonText   	+=  "Yes";
					break;
				case "update":
					title 					+=  "Update " + capitalCase;
					text 					+=  "Are you sure that you want to update the "+ lowerCase +" to the system?"
					success_title        	+=  "Update "+ capitalCase + " successfully saved!";
					confirmButtonText   	+=  "Yes";  
					break;
				default:
					title 					+=  "Cancel " + capitalCase;
					text 					+=  "Are you sure that you want to cancel this process?"
					success_title        	+=  "Cancel "+ capitalCase + "!";
					confirmButtonText   	+=  "Yes discard!";  
				}
				Swal.fire({
						title, 
						text,
						imageUrl: `${base_url}assets/custom/isometric_image/save.png`,
						imageWidth: 200,
						imageHeight: 200,
						imageAlt: 'Custom image',
						showCancelButton: true,
						confirmButtonColor: '#28a745',
						cancelButtonColor: '#1A1A1A',
						confirmButtonText,
						allowOutsideClick: false
						}).then((result) => {
						if (result.isConfirmed) {
							switch(condition) {
								case "add":
										insertTableData(data);
									break;
								case "update":
										updateTableData(data);
									break;
								default:
							}
							Swal.fire({
								icon: 'success',
								title: success_title,
								showConfirmButton: false,
								timer: 2000
							});
							tableContent();
								
							containerID == null ? "" : $("#"+containerID).show();
						}else{
							 $("#"+modalID).modal("show");
						}
					});
			}
	
			function numberCodeSize(num, size) {
				num = num.toString();
				while (num.length < size) num = "0" + num;
				return num;
			}

			function emptyFormCondition(formID){
				const data = getFormData(formID);

				var validate = false;
					for(var i of data.entries()){
						const count =+i[1];
						validate[0] = i[1];
							if(i[1] !=""){
								validate = true;
							}
					}
					return validate;
			}
	</script>
</body>
</html>