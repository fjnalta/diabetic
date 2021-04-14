/*

 */

/**
 *
 */
function createTargetRangePie(data, chart) {
    new Chart($(chart)[0].getContext('2d'), {
        type: 'pie',
        data: {
            labels: [
                'Very Low',
                'Low',
                'Target range',
                'High',
                'Very High'
            ],
            datasets: [{
                data: [data.veryLow, data.low, data.targetRange, data.high, data.veryHigh],
                backgroundColor: [
                    'rgb(175, 0, 0)',
                    'rgb(250, 123, 45)',
                    'rgb(78, 205, 69)',
                    'rgb(255, 205, 86)',
                    'rgb(250, 45, 45)'
                ],
                hoverOffset: 4
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

function calculatePercentages(data, target) {
    let sum = data.veryHigh + data.high + data.low + data.veryLow + data.targetRange;
    let veryHighPercent = data.veryHigh / sum;
    let highPercent = data.high / sum;
    let veryLowPercent = data.veryLow / sum;
    let lowPercent = data.low / sum;
    let targetRangePercent = data.targetRange / sum;

    let result = {
        'veryHigh' : (veryHighPercent * 100).toFixed(2),
        'high' : (highPercent * 100).toFixed(2),
        'low' : (lowPercent * 100).toFixed(2),
        'veryLow' : (veryLowPercent * 100).toFixed(2),
        'target' : (targetRangePercent * 100).toFixed(2)
    };

    $(target).append("<table class='table'>" +
        "  <thead>" +
        "    <tr>" +
        "      <th scope='col'>#</th>" +
        "      <th scope='col'>%</th>" +
        "    </tr>" +
        "  </thead>" +
        "  <tbody>" +
        "    <tr>" +
        "      <th scope='row'>Very High</th>" +
        "      <td>" + result.veryHigh +"</td>" +
        "    </tr>" +
        "    <tr>" +
        "      <th scope='row'>High</th>" +
        "      <td>" + result.high +"</td>" +
        "    </tr>" +
        "    <tr>" +
        "      <th scope='row'>Target Range</th>" +
        "      <td>" + result.target +"</td>" +
        "    </tr>" +
        "    <tr>" +
        "      <th scope='row'>Low</th>" +
        "      <td>" + result.low +"</td>" +
        "    </tr>" +
        "    <tr>" +
        "      <th scope='row'>Very Low</th>" +
        "      <td>" + result.veryLow +"</td>" +
        "    </tr>" +
        "  </tbody>" +
        "</table>");

    //$(target).append("<p>Very High: " + result.veryHigh + "</p>");
    //$(target).append("<p>High: " + result.high + "</p>");
    //$(target).append("<p>Target Range: " + result.target + "</p>");
    //$(target).append("<p>Low: " + result.low + "</p>");
    //$(target).append("<p>Very Low: " + result.veryLow + "</p>");

    return result;
}
