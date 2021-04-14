/*
    Logic for general CGM Charts
 */

const charts = [];

/**
 * @param data - CGM data
 * @param chart - HTML reference
 */
function createCGMChart(data, chart, target) {
    let myChart = new Chart($(chart)[0].getContext('2d'), {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'T-Slim X2',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: data.data,
                fill: false
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 350
                }
            },
            plugins: {
                annotation: {
                    annotations: {
                        box1: {
                            drawTime: 'beforeDraw',
                            type: 'box',
                            yMin: target.min,
                            yMax: target.max,
                            backgroundColor: 'rgba(205, 197, 197, 0.5)'
                        }
                    }
                },
                zoom: {
                   pan: {
                       enabled: true,
                       mode: 'x'
                   },
                   zoom: {
                       enabled: true,
                       mode: 'x',
                       speed: 1,
                       threshold: 0,
                       sensitivity: 0
                   }
                }
            }
        }
    });
    charts.push(myChart);
}

function resetZoom() {
    for(let i=0;i<charts.length;i++) {
        charts[i].resetZoom();
    }
}

/*
    Logic for custom CGM Charts
 */

/**
 *  sets up an empty chart for CGM comparison
 */
function createCustomCGMChart() {
    new Chart($('#cgmChart-custom')[0].getContext('2d'), {
        type: 'line',
        data: {
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
            datasets: [{
                label: 'T-Slim X2',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                fill: false
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}
