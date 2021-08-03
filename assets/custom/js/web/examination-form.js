

$(document).ready(function () {

// ----------- APPLICANT ANSWER -----------------------//
	var applicantAnswer=[];
// ----------- END APPLICANT ANSWER ---------------------//

// -------------- FUNCTION UPDATE APPLICANT EXAM STATUS-----------------------------//
function updateApplicantExamStatus(applicantID=""){
		
	var examStatus =1;

	$.ajax({
		method:      "POST",
		url:         `Examination_form/updateApplicationExamStatus`,
		data:{
			applicantID,
			examStatus},
		async:       false,
		dataType:    "json",
		success: function(data) {
		},
		error: function() {
			setTimeout(() => {
				showNotification("danger", "System error: Please contact the system administrator for assistance!");
			}, 500);
		}
	})

	// setTimeout(() => {
		
		
	// }, 800);

}
// -------------- END FUNCTION UPDATE APPLICANT EXAM STATUS-----------------------------//

// -------------- FUNCTION SAVE EXAM TO DATABASE-----------------------------//
function saveExamData(examinationID="",nextLevel=""){
		
	var applicantID ="1";
	var getPoints =[];
	var examinationQAID =[];
	var totalPoints = 0;
	var defaultPoints = 0;
	var percent =0;

	let data = getTableData(`hris_examination_qa_tbl
	LEFT JOIN hris_examination_setup_tbl USING(examinationID)`,"",`examinationID=${examinationID}`);
	
	// console.log(data)
	// return false;

	data.map((item, index) => {
	
		defaultPoints  += parseFloat(item.points);

		if(applicantAnswer[index] == item.answer){
			getPoints[index] = item.points;
			totalPoints += parseFloat(item.points);
		}else{
			getPoints[index] = "0.00";
		}

		if(applicantAnswer[index]== null){
		
			applicantAnswer[index] = "";
		}
		examinationQAID[index] = item.examinationQaID;
	})

	percent = ((totalPoints/defaultPoints)*100)*(data[0].percentage/100);



	$.ajax({
		method:      "POST",
		url:         `Examination_form/saveExam`,
		data:{ examinationID,
			applicantID,
			applicantAnswer,
			examinationQAID,
			getPoints,
			totalPoints,
			percent
		},
		async:       false,
		dataType:    "json",
		beforeSend: function() {
			
		},
		success: function(data) {
			setTimeout(() => {
				applicantAnswer=[];
				pageContent(nextLevel.toString(),true);
				$('#setTime').backward_timer('cancel');
				$('#setTime').backward_timer('reset');
			}, 500);
		},
		error: function() {
			setTimeout(() => {
				$("#loader").hide();
				showNotification("danger", "System error: Please contact the system administrator for assistance!");
			}, 500);
		}
	})

	// setTimeout(() => {
		
		
	// }, 800);

}
// -------------- END FUNCTION SAVE EXAM TO DATABASE-----------------------------//

// ---------------- Timer ---------------------------//
var addedTime = [0];
function setCountDown(time="",examinationID="",nextLevel=""){

	$('#setTime').backward_timer({
		seconds: time,
		on_tick: function(timer) {

			if(timer.seconds_left != 300  && timer.seconds_left != 180  && timer.seconds_left != 240 && timer.seconds_left != 120 ){
				var color = "#FFFF"
				timer.target.css('color', color);
			}

			if(timer.seconds_left == 300 ){
				var color = "#F82828"
				timer.target.css('color', color);
			}

			if(timer.seconds_left == 240 ){
				var color = "#F82828"
				timer.target.css('color', color);
			}

			if(timer.seconds_left == 180 ){
				var color = "#F82828"
				timer.target.css('color', color);
			}

			if(timer.seconds_left == 120 ){
				var color = "#F82828"
				timer.target.css('color', color);
			}


			if(timer.seconds_left < 61 ){
				
			var color = ((timer.seconds_left % 2) == 0)
			? "#F82828"
			: "#FFFF"
			timer.target.css('color', color);
			}

			
			if(timer.seconds_left == 0){
				// execute to save the exam
				Swal.fire({
					icon:              'warning',
					title:             "Time is up!",
					showConfirmButton: false,
					timer:             1800
				});

				setTimeout(() => {
					saveExamData(examinationID,nextLevel);
				}, 500);
				
			}
		  }
	  })

		// var timer2 = "60:01";
		// var interval = setInterval(function() {
		
		
		//   var timer = timer2.split(':');
		//   //by parsing integer, I avoid all extra string processing
		//   var minutes = parseInt(timer[0], 10);
		//   var seconds = parseInt(timer[1], 10);
		//   --seconds;
		//   minutes = (seconds < 0) ? --minutes : minutes;
		//   if (minutes < 0) clearInterval(interval);
		//   seconds = (seconds < 0) ? 59 : seconds;
		//   seconds = (seconds < 10) ? '0' + seconds : seconds;
		//   //minutes = (minutes < 10) ?  minutes : minutes;
		//   $('#setTime').html(minutes + ':' + seconds);
		//   timer2 = minutes + ':' + seconds;
		// }, 1000);
}
// ---------------- Timer ---------------------------//

// ------------  QUESTIONS BUTTON ----------//
function questionsButton(nextQuestionID="",nextQuestionType="",examData=false,pageQuestionsNumber=1,level="",ExaminationID=""){
	
	let html ='';
	if(nextQuestionID){
		html +=`
		<button type="button" class="btn btn-warning text-white mr-2 skipQuestion " nextQuestionID="${encryptString(nextQuestionID)}" examData="${encryptString(JSON.stringify(examData))}"  examinationQaID ="${encryptString(nextQuestionID)}" examinationType="${encryptString(nextQuestionType)}" pageQuestionsNumber="${pageQuestionsNumber}" level="${encryptString(level)}"><i class="fas fa-step-forward"></i> Skip</button>
		<button type="button" class="btn btn-success mr-2  nextQuestion" nextQuestionID="${encryptString(nextQuestionID)}" nextQuestionID="${encryptString(nextQuestionID)}" examData="${encryptString(JSON.stringify(examData))}"  examinationQaID ="${encryptString(nextQuestionID)}" examinationType="${encryptString(nextQuestionType)}" pageQuestionsNumber="${pageQuestionsNumber}" level="${encryptString(level)}"><i class="fas fa-chevron-right"></i> Next</button>
		`;
	}else{
		html +=`
		<button type="button" class="btn btn-danger mr-2 finishQuestion" examinationID="${encryptString(ExaminationID)}" level="${encryptString(level)}"><i class="fas fa-flag-alt"></i> Finish</button>
		`;
	}

	return html;
}
// ------------  QUESTIONS BUTTON ----------//

// ----- GET CHOICES -----
function getChoices(examinationType = "", examinationQaID = "",pageQuestionsNumber="1") {
	pageQuestionsNumber = pageQuestionsNumber-1;
	let html = "";
	let choices;
	if (examinationType == "Multiple Choice") {

		choices = getTableData(
			`hris_examination_choices_tbl`,
			"",
			`examinationQaID =${examinationQaID}`)

		const keyIDArr = ["A", "B", "C", "D"];
		keyIDArr.map(ky => {
			let choice = choices.filter(chc => chc.keyID == ky);
			const { description = "" } = choice.length > 0 && choice[0];

			// html += `
			// <div class="form-group">
			// 	<div class="input-group">
			// 		<div class="input-group-prepend align-self-center pr-2 font-weight-bold">${ky}.</div>
			// 		<input type="text"
			// 			class="form-control-plaintext text-dark border-bottom validate"
			// 			data-allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:]['][''][-][_][(][)][%][&][*][ ]"
			// 			minlength="2"
			// 			maxlength="150"
			// 			name="choice${ky}"
			// 			value="${description}"
			// 			autocomplete="off"
			// 			required>
			// 	</div>
			// 	<div class="d-block invalid-feedback"></div>
			// </div>`;

			html += `
			<div class="form-group" style="font-weight: bolder;">
				<div class="radio inlineblock mr-3">
					<input type="radio" trueorfalse="true" id="multipleChoice" name="multipleChoice" class="with-gap mt-1 ml-1" pageQuestionsNumber="${pageQuestionsNumber}" ${applicantAnswer[pageQuestionsNumber]  == ky ? "checked":""} value="${ky}" >
					<span for="True">${ky}. ${description}</span>
				</div>                                
			</div>`;
		})
	} else if (examinationType == "True or False") {
		html += `
		<div class="form-group" style="font-weight: bolder;">
			<div class="radio inlineblock mr-3">
				<input type="radio" trueorfalse="true" id="trueOrfalse" name="trueOrfalse" class="with-gap mt-1 ml-1" pageQuestionsNumber="${pageQuestionsNumber}" ${ applicantAnswer[pageQuestionsNumber]  == "True" ? "checked":""} value="True" >
				<span for="True">True</span>
			</div>                                
			<div class="radio inlineblock">
				<input type="radio" trueorfalse="true" id="trueOrfalse" name="trueOrfalse" class="with-gap mt-1 ml-1" pageQuestionsNumber="${pageQuestionsNumber}" ${ applicantAnswer[pageQuestionsNumber] =="False" ? "checked":""} value="False">
				<span for="Female">False</sp>
			</div>
		</div>`;
	}
	return html;
}
// ----- END GET CHOICES -----

// ----- GET MULTIPLE CHOICE QUESTION -----
function getMultipleChoiceQuestion(data = false,pageQuestionsNumber=1,examData=false,level="",ExaminationID="") {
	
	var questionsID =[];
	var nextQuestionID="";
	
	const { 
		question = "", 
		choices  = []
	} = data;

	examData.map((exam, index) => {
		questionsID[index] = exam.examinationQaID;
	});

	var index = questionsID.indexOf(data[0].examinationQaID);
	if(index >= 0 && index < questionsID.length - 1){
	nextQuestionID = questionsID[index + 1];
	}
	

	let html = "";
	
		html = `
		<div class="row border rounded m-2 py-1">
		<table class="table">
		<tbody id="tbodyQuestions">
		<tr><td>
		<div class="py-3 px-2">
			<div class="question py-2">
				<div class="form-group">
					<h5 style="font-weight: bolder;">${pageQuestionsNumber}. ${data[0].question}</h5>
				</div>
			<div class="choices py-2">
				${getChoices("Multiple Choice",data[0].examinationQaID,pageQuestionsNumber)}
			</div>
			<div class="answer py-2">
				<div class="row">
					<div class="offset-md-7 col-md-5 col-sm-12">
						<div class="row">
							<div class="col-md-12 col-sm-12">
								<div class="row">
									<div class="col-md-5 col-sm-5 px-0 align-self-center font-weight-bold text-right">
									
									</div>
									<div class="col-md-7 col-sm-7 text-right">
									${questionsButton(nextQuestionID,data[0].examinationType,examData,pageQuestionsNumber,level,ExaminationID)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		</td></tr>
		</tbody>
		</table>
		</div>
		</div>`;
	
	return html;
}
// ----- END GET MULTIPLE CHOICE QUESTION -----


// -------- GET ESSAY QUESTION ------------------//
// ----- GET ESSAY QUESTION -----
function getEssayQuestion(data = false,pageQuestionsNumber=1,examData=false,level="",ExaminationID="") {
	var pageQuestionsNumberIndex = pageQuestionsNumber - 1;
	var questionsID =[];
	var nextQuestionID="";

	const { 
		question = "",  
		choices  = [], 
	} = data;

	examData.map((exam, index) => {
		questionsID[index] = exam.examinationQaID;
	});

	var index = questionsID.indexOf(data[0].examinationQaID);
	if(index >= 0 && index < questionsID.length - 1){
	nextQuestionID = questionsID[index + 1];
	}
	
	let html = "";

		html = `
		<div class="row border rounded m-2 py-1">
		<table class="table">
		<tbody id="tbodyQuestions">
		<tr><td>
		<div class="py-3 px-2">
			<div class="question py-2">
				<div class="form-group">
					<h5 style="font-weight: bolder;">${pageQuestionsNumber}. ${data[0].question}</h5>
				</div>
			</div>
			<div class="choices">
				${getChoices("Essay",data[0].examinationQaID,pageQuestionsNumber)}
			</div>
			<div class="answer pb-2">
				<div class="row">
					<div class="col-12">
						<div class="form-group">
							<textarea class="form-control validate"
							name="essay"
							id="essay"
							data-allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:]['][''][-][_][(][)][%][&][*][ ]"
							minlength="2"
							maxlength="11735"
							autocomplete="off"
							rows="10"
							style="resize: none"
							pageQuestionsNumber="${pageQuestionsNumberIndex}"
							>${applicantAnswer[pageQuestionsNumberIndex] || ""}</textarea>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="offset-md-7 col-md-5 col-sm-12">
						<div class="row">
							<div class="col-md-12 col-sm-12">
								<div class="row">
									<div class="col-md-5 col-sm-5 px-0 align-self-center font-weight-bold text-right">
									
									</div>
									<div class="col-md-7 col-sm-7 text-right">
									${questionsButton(nextQuestionID,data[0].examinationType,examData,pageQuestionsNumber,level,ExaminationID)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		</td></tr>
		</tbody>
		</table>
		</div>
		</div>`;

	return html;
}
// ----- END GET ESSAY QUESTION -----
// -------- GET ESSAY QUESTION ------------------//

// ----- GET IDENTIFICATION QUESTION -----
function getIdentificationQuestion(data = false,pageQuestionsNumber=1,examData=false,level="",ExaminationID="") {
	var pageQuestionsNumberIndex = pageQuestionsNumber - 1;
	var questionsID =[];
	var nextQuestionID="";

	const { 
		question = "",  
		choices  = [], 
	} = data;

	examData.map((exam, index) => {
		questionsID[index] = exam.examinationQaID;
	});

	var index = questionsID.indexOf(data[0].examinationQaID);
	if(index >= 0 && index < questionsID.length - 1){
	nextQuestionID = questionsID[index + 1];
	}
	
	let html = "";

		html = `
		<div class="row border rounded m-2 py-1">
		<table class="table">
		<tbody id="tbodyQuestions">
		<tr><td>
		<div class="py-3 px-2">
			<div class="question py-2">
				<div class="form-group">
					<h5 style="font-weight: bolder;">${pageQuestionsNumber}. ${data[0].question}</h5>
				</div>
			</div>
			<div class="choices">
				${getChoices("Identification",data[0].examinationQaID,pageQuestionsNumber)}
			</div>
			<div class="answer pb-2">
				<div class="row">
					<div class="col-12">
						<div class="form-group">
							<input type="text"
								class="form-control validate"
								data-allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:]['][''][-][_][(][)][%][&][*][ ]"
								minlength="2"
								maxlength="1735"
								rows="8"
								autocomplete="off"
								id="identification"
								name="identification"
								pageQuestionsNumber="${pageQuestionsNumberIndex}"
								value="${applicantAnswer[pageQuestionsNumberIndex] || ""}"
								>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="offset-md-7 col-md-5 col-sm-12">
						<div class="row">
							<div class="col-md-12 col-sm-12">
								<div class="row">
									<div class="col-md-5 col-sm-5 px-0 align-self-center font-weight-bold text-right">
									
									</div>
									<div class="col-md-7 col-sm-7 text-right">
									${questionsButton(nextQuestionID,data[0].examinationType,examData,pageQuestionsNumber,level,ExaminationID)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		</td></tr>
		</tbody>
		</table>
		</div>
		</div>`;
	
	return html;
}
// ----- END GET IDENTIFICATION QUESTION -----

// ----- GET TRUE FALSE QUESTION -----
function getTrueFalseQuestion(data = false,pageQuestionsNumber=1,examData=false,level="",ExaminationID="") {
	
	var questionsID =[];
	var nextQuestionID="";
	
	let { 
		question = "", 
		choices  = [], 
	} = data;

	examData.map((exam, index) => {
		questionsID[index] = exam.examinationQaID;
	});

	var index = questionsID.indexOf(data[0].examinationQaID);
	if(index >= 0 && index < questionsID.length - 1){
	nextQuestionID = questionsID[index + 1];
	}


	let html = "";
	
		html += `
		<div class="row border rounded m-2 py-1">
		<table class="table">
		<tbody id="tbodyQuestions">
		<tr><td>
		<div class="py-3 px-2">
			<div class="question py-2">
				<div class="form-group">
					<h5 style="font-weight: bolder;">${pageQuestionsNumber}. ${data[0].question}</h5>
				</div>
			</div>
			<div class="choices py-2">
				${getChoices("True or False",data[0].examinationQaID,pageQuestionsNumber)}
			</div>
			<div class="answer py-2">
				<div class="row">
					<div class="offset-md-7 col-md-5 col-sm-12">
						<div class="row">
							<div class="col-md-12 col-sm-12">
								<div class="row">
									<div class="col-md-5 col-sm-5 px-0 align-self-center font-weight-bold text-right">
									
									</div>
									<div class="col-md-7 col-sm-7 text-right">
									${questionsButton(nextQuestionID,data[0].examinationType,examData,pageQuestionsNumber,level,ExaminationID)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		</td></tr>
		</tbody>
		</table>
		</div>
		</div>	`;

	return html;
}
// ----- END GET TRUE FALSE QUESTION -----

// ----- LIST OF QUESTION  CONTENT --------------//
function listQuestionsContent(data = false,level="") {
	
	let count =1;
	let dataLength = data.length;
	let html = `
	<h6 class="bg-primary text-light p-3" style="line-height: 10px;"><strong ">Questions (${dataLength})</strong></h6>
	<ul class="container_choices float">
	`;

	data.map((item, index) => {
		if(index ==0){
			html += `<li  class="item float-item selectedQuestion"
			style="background-color:#28a74594;"
			id="listQuestion${index}" 
			examData="${encryptString(JSON.stringify(data))}"  
			examinationQaID ="${encryptString(item.examinationQaID)}" 
			examinationType="${encryptString(item.examinationType)}" 
			level="${encryptString(level)}" 
			pageQuestionsNumber="${count}">${count}</li>`;
		}else{
			html += `<li  class="item float-item selectedQuestion" 
			id="listQuestion${index}" 
			examData="${encryptString(JSON.stringify(data))}"  
			examinationQaID ="${encryptString(item.examinationQaID)}" 
			examinationType="${encryptString(item.examinationType)}" 
			level="${encryptString(level)}" 
			pageQuestionsNumber="${count}">${count}</li>`;
		}
		count ++;
		
	});

	html += `</ul>`;

	return html;
}
// ----- END LIST OF QUESTION  CONTENT --------------//

//------------------ GET DISPLAY QUESTION CONTENT------------------// 
function getDisplayQuestionContent(examData =false,examinationQaID = "",examinationType="",pageQuestionsNumber="1",level="") {

	let data;
	let tmpExaminationID;
	
	let html ='';
			data = getTableData(
				`hris_examination_qa_tbl`,
				"",
				`examinationQaID =${examinationQaID}`);
			
		
        count = 0;

		tmpExaminationID =  data[0].examinationID;
		
		if(data[0].examinationType == "Identification"){
			html = getIdentificationQuestion(data,pageQuestionsNumber,examData,level,tmpExaminationID);
		}

		if(data[0].examinationType == "True or False"){
			html = getTrueFalseQuestion(data,pageQuestionsNumber,examData,level,tmpExaminationID);
		}

		if(data[0].examinationType == "Essay"){
			html = getEssayQuestion(data,pageQuestionsNumber,examData,level,tmpExaminationID);
		}

		if(data[0].examinationType == "Multiple Choice"){
			html = getMultipleChoiceQuestion(data,pageQuestionsNumber,examData,level,tmpExaminationID);
		}
	
		return html;
}
//------------------ GET DISPLAY QUESTION CONTENT------------------// 

// ------------- PAGE CONTENT --------------------------------//
function pageContent(level = "0",onGoing = false) {
		
		$("#roles_permission_content").html(preloader);
		
		var applicantID= decryptString($(".body_area").attr("applicantID"));
		// var designationID="4";
		// var examStatus="0";
		var dateToday=moment().format('YYYY-MM-DD');
		var schedule=  "2021-08-02";
		// var schedule=  decryptString($(".body_area").attr("applicantSchedule"));

		// console.log(dateToday)
		const applicantData = getTableData(`web_applicant_list_tbl`,"","applicantID= "+applicantID);

		const getExamData = getTableData(`hris_examination_setup_tbl hest
							LEFT JOIN hris_examination_tbl as het ON het.examinationID  = hest.examinationID  `,"","designationID= "+applicantData[0].applicantDesignationID);
		
		let html = "";
		if(schedule == dateToday ){
			if(onGoing == true){
				let dataLength = getExamData.length-1;
					
				if(dataLength >= level){
					html =`<div class="container">
					<div class="section">
						<div class="row">
							<div class="col-4">
								<img src="../assets/modal/exam.svg" alt="">
							</div>
							<div class="col-8">
							
								<h1 class="font-weight-bolder mt-4  mb-1 pt-4">${getExamData[level].examinationName}</h1>
								<h4><strong>Instructions:</strong><p>${getExamData[level].examinationDescription}</p></h4>
							</div>
						</div>
					</div>
					<div class="footer">
					<button type="button" class="btn btn-success btn-lg float-right startExam" style="width: 15%;line-height: 49px;font-size: 32px;font-weight: 1000;border-radius: 50px;" examTitle="${getExamData[level].examinationName}" examinationID="${encryptString(getExamData[level].examinationID)}" examinationType="${encryptString(getExamData[level].examinationType)}" level="${encryptString(level)}">Start <i class="fas fa-arrow-right"></i></button>
					</div> 
				</div>`;
				preventRefresh(false);
				}else{
					html =`<div class="container">
					<div class="section">
						<div class="row">
							<div class="col-4">
								<img src="../assets/modal/exam.svg" alt="">
							</div>
							<div class="col-8">
							
								<h1 class="font-weight-bolder mt-4  mb-1 pt-4">Thank you for taking the examination</h1>
								<h4><p>Kindly wait for the HR to give further instructions on the next action that must be done.</p></h4>
							</div>
						</div>
					</div>
					<div class="footer">
					<button type="button" class="btn btn-success btn-lg float-right" style="width: 15%;line-height: 49px;font-size: 32px;font-weight: 1000;border-radius: 50px;" >Go Back on Website <i class="fas fa-house"></i></button>
					</div> 
				</div>`;
				preventRefresh(false);
				}
			}else{
				if(applicantData[0].examStatus !=1){
					let dataLength = getExamData.length-1;
					
					if(dataLength >= level){
						html =`<div class="container">
						<div class="section">
							<div class="row">
								<div class="col-4">
									<img src="../assets/modal/exam.svg" alt="">
								</div>
								<div class="col-8">
								
									<h1 class="font-weight-bolder mt-4  mb-1 pt-4">${getExamData[level].examinationName}</h1>
									<h4><strong>Instructions:</strong><p>${getExamData[level].examinationDescription}</p></h4>
								</div>
							</div>
						</div>
						<div class="footer">
						<button type="button" class="btn btn-success btn-lg float-right startExam" style="width: 15%;line-height: 49px;font-size: 32px;font-weight: 1000;border-radius: 50px;" examTitle="${getExamData[level].examinationName}" examinationID="${encryptString(getExamData[level].examinationID)}" examinationType="${encryptString(getExamData[level].examinationType)}" level="${encryptString(level)}">Start <i class="fas fa-arrow-right"></i></button>
						</div> 
					</div>`;
					preventRefresh(false);
					}else{
						html =`<div class="container">
						<div class="section">
							<div class="row">
								<div class="col-4">
									<img src="../assets/modal/exam.svg" alt="">
								</div>
								<div class="col-8">
								
									<h1 class="font-weight-bolder mt-4  mb-1 pt-4">Thank you for taking the examination</h1>
									<h4><p>Kindly wait for the HR to give further instructions on the next action that must be done.</p></h4>
								</div>
							</div>
						</div>
						<div class="footer">
						<button type="button" class="btn btn-success btn-lg float-right" style="width: 15%;line-height: 49px;font-size: 32px;font-weight: 1000;border-radius: 50px;" >Go Back on Website <i class="fas fa-house"></i></button>
						</div> 
					</div>`;
					preventRefresh(false);
					}
					
		
				}else{
					html =`<div class="container">
							<div class="section">
									<div class="row">
										<div class="col-4">
											<img src="../assets/modal/warning.svg" alt="">
										</div>
										<div class="col-8">
										
											<h1 class="font-weight-bolder mt-4  mb-1 pt-4">WARNING!</h1>
											<h4><strong>You already closed or reload the examination portal and you cannot take the exam anymore.</strong></h4>
										</div>
									</div>
								</div>
								<div class="footer">
								<button type="button" class="btn btn-success btn-lg float-right " style="width: 17%;line-height: 49px;font-size: 26px;font-weight: 1000;border-radius: 50px;">Back to Homepage  <i class="fas fa-arrow-right"></i></button>
								</div> 
							</div>
						</div>`;
				}
			}
			
		}else{
			html =`<div class="container">
						<div class="section">
								<div class="row">
									<div class="col-4">
										<img src="../assets/modal/warning.svg" alt="">
									</div>
									<div class="col-8">
									
										<h1 class="font-weight-bolder mt-4  mb-1 pt-4">WARNING!</h1>
										<h4><strong>Your time to take the examination has already passed. Kindly contact the HR for further instructions.</strong></h4>
									</div>
								</div>
							</div>
							<div class="footer">
							<button type="button" class="btn btn-success btn-lg float-right " style="width: 17%;line-height: 49px;font-size: 26px;font-weight: 1000;border-radius: 50px;">Back to Homepage  <i class="fas fa-arrow-right"></i></button>
							</div> 
						</div>
					</div>`;
		}
		

		setTimeout(() => {
			$("#roles_permission_content").html(html);		
		}, 500);
}
pageContent();
// ------------- END PAGE CONTENT --------------------------------//


// ------------ EXAM CONTENT ----------//
function examContent(data = false,examinationType="",level="",examTitle=""){
		let examinationQAID = data[0].examinationQaID;
		let examinationID = data[0].examinationID
		let nextLevel = parseFloat(level) + 1;
		let html='';
		if (data) {
			html = `
            <div class="col-md-9 col-sm-12 mb-4">
                <div class="">
					<div class="col-12 col-lg-8 col-xl-12 text-left">
					<h5 class="bg-primary text-light p-3 text-left" style="position: absolute;"><strong>${examTitle}</strong></h5>
						<h5 class="bg-primary text-light p-3 text-right"><i class="fas fa-alarm-clock"></i> <strong id="setTime">00:00:00</strong></h5>
						<div class="card my-0 p-2 approval-list" style='box-shadow:none;'>
							<div  id="module_access_content">
               			     ${getDisplayQuestionContent(data,examinationQAID,examinationType,"1",level)}	
							</div>
					</div>
                </div>
            </div>
			<div class="col-md-3 col-sm-12" style="padding-left: 29px;
			padding-right: 29px;">
                <div class="" id="user_role_content">
                    ${listQuestionsContent(data,level)}
                </div>
				<div class="row">
					<div class="col-12">
					<hr class="mb-0">
						<div class="container p-5 pl-1">
						<label class="mb-0 " style="width: 45px; 
						border-radius: 3px;
						height: 12px; 
						background-color: #28a74594;"></label>
						<label class="p-2">Attended</label>

						
						<label class="mb-0 " style="width: 45px; 
						border-radius: 3px;
						height: 12px; 
						background-color:#ffc107a3;"></label>
						<label class="p-2">Skipped</label>

					
						<label class="mb-0 " style="width: 45px; 
						border-radius: 3px;
						height: 12px; 
						background-color:#f2f2f2;"></label>
						<label class="p-2">Yet to Attend</label>

						</div>
					</div>	
				</div>
            </div>`;
		} else {
			html = `
            <div class="w-100 h5 text-center text-danger>
                There was an error fetching data.
            </div>`;
		}

		var hms = data[0].timeLimit;   // your input string
		var a = hms.split(':'); // split it at the colons
		// minutes are worth 60 seconds. Hours are worth 60 minutes.
		var time = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 


		setTimeout(() => {
			$("#roles_permission_content").html(html);
			setCountDown(time,examinationID,nextLevel);
			initSelect2();
			$('#setTime').backward_timer('reset');
			$('#setTime').backward_timer('start');
		}, 500);
	
}
// ------------ END EXAM CONTENT ----------//.	

//----------------- CLICK START------------------------//
$(document).on("click",".startExam",function(){
	var examinationID = decryptString($(this).attr("examinationID"));
	var examinationType = decryptString($(this).attr("examinationType"));
	var examTitle = $(this).attr("examTitle");
	var level = decryptString($(this).attr("level"));
	var applicantID= decryptString($(".body_area").attr("applicantID"));
	
	$("#roles_permission_content").html(preloader);
		const data  = getTableData(`hris_examination_qa_tbl LEFT JOIN hris_examination_setup_tbl USING(examinationID) `,
		`designationID,examinationID,examinationQaID,examinationType,question,timeLimit
		`,`examinationID='${examinationID}' AND  examinationType='${examinationType}'`);

		if(level == "0"){
			updateApplicantExamStatus(applicantID);
		}
	
	setTimeout(() => {
		preventRefresh(true);
		examContent(data,examinationType,level,examTitle);
		
	}, 500);

})
//----------------- END CLICK START--------------------//


// ----- SELECT USER ROLE -----
$(document).on("click", ".selectedQuestion", function () {
	const examinationQaID  = decryptString($(this).attr("examinationQaID"));
	const examinationType  = decryptString($(this).attr("examinationType"));
	const level  = decryptString($(this).attr("level"));
	const pageQuestionsNumber  = $(this).attr("pageQuestionsNumber");
	const examData  = JSON.parse(decryptString($(this).attr("examData")));

	if($(this).css('background-color') != "#ffc107a3"){
		$(this).css('background-color','#28a74594'); 
	}
	
	const moduleData = getDisplayQuestionContent(examData,examinationQaID,examinationType,pageQuestionsNumber,level);
	$("#module_access_content").html(preloader);
	setTimeout(() => {
		$("#module_access_content").html(moduleData);
		initSelect2();
	}, 500);
});
// ----- END SELECT USER ROLE -----

// ---------------  SKIP QUESTION --------------//
$(document).on("click", ".skipQuestion", function (){
	const examinationQaID  = decryptString($(this).attr("nextQuestionID"));
	const examinationType  = decryptString($(this).attr("examinationType"));
	const pageQuestionsNumber  = parseFloat($(this).attr("pageQuestionsNumber"))+1;
	const indexMinus  = $(this).attr("pageQuestionsNumber")-1;
	const indexPlus  = $(this).attr("pageQuestionsNumber");
	const examData  = JSON.parse(decryptString($(this).attr("examData")));
	const level  = decryptString($(this).attr("level"));

	$("#listQuestion"+indexMinus).css('background-color','#ffc107a3');
	$("#listQuestion"+indexPlus).css('background-color','#28a74594');

	const moduleData = getDisplayQuestionContent(examData,examinationQaID,examinationType,pageQuestionsNumber,level);
	$("#module_access_content").html(preloader);
	setTimeout(() => {
		$("#module_access_content").html(moduleData);
		initSelect2();
	}, 500);
})
// ---------------  SKIP QUESTION --------------//

// ---------------  NEXT QUESTION --------------//
$(document).on("click", ".nextQuestion", function (){
	const examinationQaID  = decryptString($(this).attr("nextQuestionID"));
	const examinationType  = decryptString($(this).attr("examinationType"));
	const pageQuestionsNumber  = parseFloat($(this).attr("pageQuestionsNumber"))+1;
	const indexMinus  = $(this).attr("pageQuestionsNumber")-1;
	const indexPlus  = $(this).attr("pageQuestionsNumber");
	const examData  = JSON.parse(decryptString($(this).attr("examData")));
	const level  = decryptString($(this).attr("level"));

		$("#listQuestion"+indexMinus).css('background-color','#28a74594'); 
		$("#listQuestion"+indexPlus).css('background-color','#28a74594'); 
	

	const moduleData = getDisplayQuestionContent(examData,examinationQaID,examinationType,pageQuestionsNumber,level);
	$("#module_access_content").html(preloader);
	setTimeout(() => {
		$("#module_access_content").html(moduleData);
		initSelect2();
	}, 500);
})
// ---------------  NEXT QUESTION --------------//

// ---------------  CLICK TRUE OR FALSE --------------//
$(document).on("click", "[name=trueOrfalse]", function (){
	const pageQuestionsNumber  = parseFloat($(this).attr("pageQuestionsNumber"));
	const value =  $(this).val();
	applicantAnswer[pageQuestionsNumber] = value;
})
// ---------------  END  CLICK TRUE OR FALSE --------------//

// ---------------  CHANGE IDENTIFICATION --------------//
$(document).on("change", "[name=identification]", function (){
	const pageQuestionsNumber  = parseFloat($(this).attr("pageQuestionsNumber"));
	const value =  $(this).val();
	applicantAnswer[pageQuestionsNumber] = value;
	
})
// ---------------  END  CHANGE IDENTIFICATION --------------//

// ---------------  CHANGE ESSAY --------------//
$(document).on("change", "[name=essay]", function (){
	const pageQuestionsNumber  = parseFloat($(this).attr("pageQuestionsNumber"));
	const value =  $(this).val();
	applicantAnswer[pageQuestionsNumber] = value;
})
// ---------------  END  CHANGE ESSAY --------------//

// ---------------  CLICK MULTIPLE CHOICE --------------//
$(document).on("click", "[name=multipleChoice]", function (){
	const pageQuestionsNumber  = parseFloat($(this).attr("pageQuestionsNumber"));
	const value =  $(this).val();
	applicantAnswer[pageQuestionsNumber] = value;
})
// ---------------  END  CLICK MULTIPLE CHOICE --------------//



// ---------------  CLICK FINISH QUESTION --------------//
$(document).on("click", ".finishQuestion", function (){
	const level  = decryptString($(this).attr("level"));
	const examinationID  = decryptString($(this).attr("examinationID"));
	const nextLevel = parseFloat(level)+1;


	Swal.fire({
		title: 'Finish this part',
		text: "Are you sure that you want to finish this part of your exam?",
		imageUrl: ` ../assets/custom/isometric_image/save.png`,
		imageWidth: 200,
		imageHeight: 200,
		imageAlt: 'Custom image',
		showCancelButton: true,
		confirmButtonColor: '#28a745',
		cancelButtonColor: '#1A1A1A',
		confirmButtonText: 'Next',
		allowOutsideClick: false
	}).then((result) => {
		if (result.isConfirmed) {
			// $("#roles_permission_content").html(preloader);
			$('#setTime').backward_timer('cancel');
			$('#setTime').backward_timer('reset');
			saveExamData(examinationID,nextLevel);
		}
	})

})
// ---------------  END  CLICK FINISH QUESTION --------------//




});
