<div class="body_area">
    <div class="block-header">
        <div class="container">
            <div class="row clearfix">
                <div class="col-8">
                    <ul class="breadcrumb pl-0 pb-0 ">
                        <li class="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                        <li class="breadcrumb-item">HRIS</li>
                        <li class="breadcrumb-item active">PhilHealth Table</li>
                    </ul>
                    <h1 class="mb-1 mt-1">PhilHealth Table</h1>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
		<div class="row clearfix row-deck">
            <div class="col-12">
                <div class="table-responsive" id="table_content"></div>
            </div>
        </div>
	</div>
</div>


<script>

    $(document).ready(function(){
        
        // ----- DATATABLES -----
        function initDataTables() {
            if ($.fn.DataTable.isDataTable('#tableSssTable')){
                $('#tableSssTable').DataTable().destroy();
            }
            
            var table = $("#tableSssTable").css({"min-width": "100%"}).removeAttr('width').DataTable({
                proccessing:    false,
                serverSide:     false,
                scrollX:        true,
                scrollCollapse: true,
                columnDefs: [
                    { targets: 0, width: "10%" },
                    { targets: 1, width: "30%" },
                    { targets: 2, width: "30%" },
                    { targets: 3, width: "30%" },
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
                url:      `${base_url}operations/getTableData`,
                method:   'POST',
                async:    false,
                dataType: 'json',
                data:     {tableName: "hris_philhealth_table_tbl"},
                beforeSend: function() {
                    $("#table_content").html(preloader);
                },
                success: function(data) {
                    let html = `
                    <table class="table table-bordered table-striped table-hover" id="tableSssTable">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Minumum Range</th>
                                <th>Maximum Range</th>
                                <th>Percentage</th>
                            </tr>
                        </thead>
                        <tbody>`;

                    data.map((item, index, array) => {
                        html += `
                        <tr>
                            <td>${++index}</td>
                            <td>${item.phMinimumRange}</td>
                            <td>${item.phMaximumRange}</td>
                            <td>${item.phPercentage}%</td>
                        </tr>`;
                    })
                    html += `</tbody>
                    </table>`;

                    setTimeout(() => {
                        $("#table_content").html(html);
                        initDataTables();
                    }, 500);
                },
                error: function() {
                    let html = `
                        <div class="w-100 h5 text-center text-danger>
                            There was an error fetching data.
                        </div>`;
                    $("#table_content").html(html);
                }
            })
        }
        tableContent();
        // ----- END TABLE CONTENT -----
        
    });

</script>