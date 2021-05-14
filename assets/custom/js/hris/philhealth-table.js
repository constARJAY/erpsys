$(document).ready(function () {
	// ----- DATATABLES -----
	function initDataTables() {
		if ($.fn.DataTable.isDataTable("#tablePhTable")) {
			$("#tablePhTable").DataTable().destroy();
		}

		var table = $("#tablePhTable")
			.css({ "min-width": "100%" })
			.removeAttr("width")
			.DataTable({
				proccessing: false,
				serverSide: false,
				paginate: false,
				// scrollX: true,
				scrollCollapse: true,
				columnDefs: [
					{ targets: 0, width: "10px" },
					{ targets: 1, width: "32%" },
					{ targets: 2, width: "32%" },
					{ targets: 3, width: "32%" },
				],
			});
	}
	initDataTables();
	// ----- END DATATABLES -----

	// ----- TABLE CONTENT -----
	function tableContent() {
		// Reset the unique datas
		uniqueData = [];

		$.ajax({
			url: `${base_url}operations/getTableData`,
			method: "POST",
			async: false,
			dataType: "json",
			data: { tableName: "hris_philhealth_table_tbl" },
			beforeSend: function () {
				$("#table_content").html(preloader);
			},
			success: function (data) {
				let html = `
                <table class="table table-bordered table-striped table-hover" id="tablePhTable">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Minimum Range</th>
                            <th>Maximum Range</th>
                            <th>Percentage</th>
                        </tr>
                    </thead>
                    <tbody>`;

				data.map((item, index, array) => {
					html += `
                    <tr>
                        <td>${++index}</td>
                        <td class="text-right">${formatAmount(
													item.phMinimumRange,
													true
												)}</td>
                        <td class="text-right">${formatAmount(
													item.phMaximumRange,
													true
												)}</td>
                        <td class="text-right">${item.phPercentage}%</td>
                    </tr>`;
				});
				html += `</tbody>
                </table>`;

				setTimeout(() => {
					$("#table_content").html(html);
					initDataTables();
				}, 500);
			},
			error: function () {
				let html = `
                    <div class="w-100 h5 text-center text-danger>
                        There was an error fetching data.
                    </div>`;
				$("#table_content").html(html);
			},
		});
	}
	tableContent();
	// ----- END TABLE CONTENT -----
});
