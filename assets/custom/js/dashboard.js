function formatCurrency(amount) {
    var currency = new Intl.NumberFormat('tl-PH', {
        style: 'currency',
        currency: 'PHP'
    }).format(amount);
    return currency;
}

// ----- EXECUTE THIS LINE OF CODES FIRST -----
const getAmenitiesMonitoringData = function() {
    let result;
    $.ajax({
        method: "POST",
        url: "dashboard/getAmenitiesMonitoring",
        data: true,
        dataType: "JSON",
        async: false,
        success: function(data) {
            result = data;
        }
    })
    let seriesData = [];
    result.map(item => {
        let temp = {
            name: item.amenitiesName,
            data: []
        };
        item["data"].map(activity => {
            temp.data.push(activity.quantity);
        })
        seriesData.push(temp);
    })
    return seriesData;
}();
let amenitiesMonitoringSeriesData = getAmenitiesMonitoringData;

let generateColors = () => {
    const randomColor = "#"+Math.floor(Math.random()*16777215).toString(16);
    return randomColor;
}
let amenitiesMonitoringColors = [];
amenitiesMonitoringSeriesData.map(item => amenitiesMonitoringColors.push(generateColors()));

const barChartOptions = {
    chart: {
        height: 450,
        type: 'bar',
    },
    colors: amenitiesMonitoringColors,
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
    },
    series: amenitiesMonitoringSeriesData,
    xaxis: {
        categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    },
    yaxis: {
        title: {
            text: 'No. of People'
        }
    },
    fill: {
        opacity: 1

    },
    tooltip: {
        y: {
            formatter: function (val) {
                return val + " Persons"
            }
        }
    }
}

let barChart = new ApexCharts(
    document.querySelector("#apex-basic-column"),
    barChartOptions
);
barChart.render();


const getOccupancyReportData = function() {
    let result, roomSales = 0, hallSales = 0, roomProfit = 0, hallProfit = 0;
    $.ajax({
        method: "POST",
        url: "dashboard/getOccupancyReport",
        data: true,
        dataType: "JSON",
        async: false,
        success: function(data) {
            result = data;
        }
    })
    let roomSalesData = {
        name: "Room Sales",
        type: "area",
        data: []
    };
    let roomProfitData = {
        name: "Room Profit",
        type: "line",
        data: []
    };
    let hallSalesData = {
        name: "Hall Sales",
        type: "area",
        data: []
    };
    let hallProfitData = {
        name: "Hall Profit",
        type: "line",
        data: []
    };
    result.room.map(item => {
        roomSalesData.data.push(item.sales);
        roomSales += item.sales;
        roomProfitData.data.push(item.profit);
        roomProfit += item.profit;
    })
    result.hall.map(item => {
        hallSalesData.data.push(item.sales);
        hallSales += item.sales;
        hallProfitData.data.push(item.profit);
        hallProfit += item.profit;
    })
    let seriesData = [roomSalesData, roomProfitData, hallSalesData, hallProfitData];
    let roomSeriesData = [roomSalesData, roomProfitData];
    let hallSeriesData = [hallSalesData, hallProfitData];
    return {roomSeriesData, hallSeriesData, roomSales, roomProfit, hallSales, hallProfit};
}();

let occupancyReport = getOccupancyReportData;
let occupancyReportRoomData = occupancyReport.roomSeriesData;
let occupancyReportHallData = occupancyReport.hallSeriesData;

$("#occupancyRoomSales").html(formatCurrency(occupancyReport.roomSales));
$("#occupancyHallSales").html(formatCurrency(occupancyReport.hallSales));
$("#occupancyRoomProfit").html(formatCurrency(occupancyReport.roomProfit));
$("#occupancyHallProfit").html(formatCurrency(occupancyReport.hallProfit));

let occupancyReportRoomColors = [];
occupancyReportRoomData.map(item => occupancyReportRoomColors.push(generateColors()));

let occupancyReportHallColors = [];
occupancyReportHallData.map(item => occupancyReportHallColors.push(generateColors()));

let lineChartRoomOptions = {
    chart: {
        height: 350,
        // type: 'line',
        toolbar: {
            show: false,
        },
    },
    colors: ["#87d9d3", "#10948b"],
    series: occupancyReportRoomData,
    stroke: {
        width: [0, 4],
        curve: 'smooth'
    },
    title: {
        text: "Occupancy Report"
    },
    xaxis: {
        // type: 'datetime'
        categories: [
            "January", 
            "February", 
            "March", 
            "April", 
            "May", 
            "June", 
            "July", 
            "August", 
            "September", 
            "October", 
            "November", 
            "December"
        ],
    },
    yaxis: [{
        title: {
            text: 'Sales',
        },

    }, {
        opposite: true,
        title: {
            text: 'Profit'
        }
    }]
}
let lineChartHallOptions = {
    chart: {
        height: 350,
        // type: 'line',
        toolbar: {
            show: false,
        },
    },
    colors: ["#87d9d3", "#10948b"],
    series: occupancyReportHallData,
    stroke: {
        width: [0, 4],
        curve: 'smooth'
    },
    title: {
        text: "Occupancy Report"
    },
    xaxis: {
        // type: 'datetime'
        categories: [
            "January", 
            "February", 
            "March", 
            "April", 
            "May", 
            "June", 
            "July", 
            "August", 
            "September", 
            "October", 
            "November", 
            "December"
        ],
    },
    yaxis: [{
        title: {
            text: 'Sales',
        },

    }, {
        opposite: true,
        title: {
            text: 'Profit'
        }
    }]
}
let lineChartRoom = new ApexCharts(
    document.querySelector("#apex-chart-line-column-room-occupancy"),
    lineChartRoomOptions
);
let lineChartHall = new ApexCharts(
    document.querySelector("#apex-chart-line-column-hall-occupancy"),
    lineChartHallOptions
);
lineChartRoom.render();
lineChartHall.render();
// ----- END EXECUTE THIS LINE OF CODES FIRST -----