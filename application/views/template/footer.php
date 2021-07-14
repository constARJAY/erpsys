	</div>
	<!-- FOOTER -->
	<div class="container sticky-bottom">
		<div class="col-md-12 col-lg-12">
			<div class="body text-center">
				<p class="copyright mb-0 p-1">Copyright 2021 © All Rights Reserved. <a
						href="http://theblackcoders.com" target="_blank">BlackCoders</a></p>
			</div>
		</div>
	</div>

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
	<script src="<?=base_url('assets/custom/js/operations.js')?>"></script>
	<script src="<?= base_url('assets/custom/js/gen/footer.js') ?>"></script>
	<script>

	function dataNotification(){
		const task = getTableData(`pms_employeetaskoard_tbl as pet
		LEFT JOIN pms_timeline_task_list_tbl as ptt ON ptt.taskID = pet.taskID AND ptt.timelineBuilderID = pet.timelineBuilderID
		LEFT JOIN pms_timeline_management_tbl as ptm  ON ptm.taskID = ptt.taskID
		LEFT JOIN pms_milestone_list_tbl as pml ON pml.projectMilestoneID = pet.projectMilestoneID 
		LEFT JOIN pms_milestone_builder_tbl as pmb ON pmb.milestoneBuilderID = pet.milestoneBuilderID OR pmb.milestoneBuilderID = ptt.milestoneBuilderID `, 
		`DISTINCT taskboardID,ptt.taskID,assignedEmployee,ptt.taskName,pet.taskStatus,pml.projectMilestoneName,CASE 
		WHEN pet.taskStartDates = "" THEN ptt.taskEndDate
		WHEN pet.taskStartDates !="" THEN pet.taskStartDates
		END taskStartDate,
		phaseCode `, 
		"assignedEmployee = "+sessionID);
		// "assignedEmployee = "+sessionID+" AND (taskStatus !=7 AND taskStatus != 1 )");

		const subTask = getTableData(`pms_employeetaskoard_details_tbl as ped
		LEFT JOIN pms_timeline_management_tbl as ptm  ON ptm.taskID = ped.taskID
		LEFT JOIN pms_milestone_list_tbl as pml ON pml.projectMilestoneID = ped.projectMilestoneID
		LEFT JOIN pms_milestone_builder_tbl as pmb ON pmb.milestoneBuilderID = ped.milestoneBuilderID`, 
		`DISTINCT subtaskboardID,ped.taskID,subTaskAssignee,ped.subTaskName,ped.subTaskStatus,pml.projectMilestoneName,ped.subTaskStartDates,phaseCode`, 
		` FIND_IN_SET(${sessionID},replace(ped.subTaskAssignee,'|',','))`);
		// ` FIND_IN_SET(${sessionID},replace(ped.subTaskAssignee,'|',',')) AND (subTaskStatus !=7 AND subTaskStatus != 1 )`);
	
			for(var loop =0; loop<task.length;loop++){
				
				(function(index) {
				
						var dueDate = task[index].taskStartDate;
						var phaseCode = task[index].phaseCode;
						var taskName = task[index].taskName;
						var status = task[index].taskStatus;
						var milestoneName = task[index].projectMilestoneName;
				
						var now = moment();
						var then = moment(dueDate);
						var beforeDueDate = moment().diff(dueDate, 'days');

					setTimeout(function() {

						if (now > then && (status == 0 || status == 8 || status == 9)) {
					
							showTaskBoardNotification("info",phaseCode,milestoneName,taskName);
				
						}
						
						if (now > then && (status != 7 && status != 1)) {
					
							showTaskBoardNotification("danger",phaseCode,milestoneName,taskName);
				
						} else {
							if( beforeDueDate == 5 || (beforeDueDate <5 && beforeDueDate !=1) ){
								showTaskBoardNotification("warning",phaseCode,milestoneName,taskName);
							}else{
								if(status != 7 ){
									showTaskBoardNotification("danger",phaseCode,milestoneName,taskName);
								}
							}
						}

						}, loop * 600);
				})(loop);
				
			}	
			
			for(var loop2 =0; loop2<subTask.length;loop2++){
				
				(function(index2) {
				
						var dueDate = subTask[index2].subTaskStartDates;
						var phaseCode = subTask[index2].phaseCode;
						var subTaskName = subTask[index2].subTaskName;
						var status = subTask[index2].subTaskStatus;
						var milestoneName = subTask[index2].projectMilestoneName;
				
						var now = moment();
						var then = moment(dueDate);
						var beforeDueDate = moment().diff(dueDate, 'days');

					setTimeout(function() {

						if (now > then && (status == 0 || status == 8 || status == 9)) {
					
							showTaskBoardNotification("info",phaseCode,milestoneName,subTaskName);
				
						}
						
						if (now > then && (status != 7 && status != 1)) {
					
							showTaskBoardNotification("danger",phaseCode,milestoneName,subTaskName);
				
						} else {
							if( beforeDueDate == 5 || (beforeDueDate <5 && beforeDueDate !=1) ){
								showTaskBoardNotification("warning",phaseCode,milestoneName,subTaskName);
							}else{
								if(status != 7 ){
									showTaskBoardNotification("danger",phaseCode,milestoneName,subTaskName);
								}
							}
						}

						}, loop2 * 600);
				})(loop2);
				
			}	
	}

	var flag = false;
	function doSomething() {
		var d = new Date(),
			h = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), (d.getMinutes() - (d.getMinutes() % 60)) + 60, 0, 0),
			e = h - d;
		window.setTimeout(doSomething, e);
		
		var sessionChecker = <?= $this->session->has_userdata('checkerFlag')?  $this->session->has_userdata('checkerFlag') : 0 ?> ;
	

		if(!sessionChecker){
			<?php $this->session->set_userdata('checkerFlag', 100); ?>
			dataNotification();

		}else{
			if(flag){
			dataNotification();
			}else{
				flag = true;
			}
		}

	}
	doSomething();

		

	

	</script>
</body>
</html>