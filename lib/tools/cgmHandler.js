"use strict";

class CgmHandler {
    /**
     *
     * @param data - CGM data
     * @param timespan - 0 = all data; 1 = single day; 2 = last week; 3 = last month
     * @returns {{data: Array, labels: Array}}
     */
    getData = (data, timespan) => {
        let myDate;
        let myTime;

        let result = {
            data: [],
            labels: []
        };

        // get last available Date from uploaded data
        let lastDateString = data[data.length-1].Zeit.split(" ")[0];
        let lastDateParts = lastDateString.split("/");
        let lastDate = new Date(+lastDateParts[2], lastDateParts[1] - 1, +lastDateParts[0]);

        // calculate start date and set mode accordingly
        let startDate = new Date(lastDate);
        if (timespan === 2) {
            startDate.setDate(startDate.getDate() - 7);
        } else if (timespan === 3) {
            startDate.setDate(startDate.getMonth() - 1);
        }

        for(let i = 0; i < data.length; i++) {
            // parse date and time - e.g. 21/03/2021 15:38
            myDate = data[i].Zeit.split(" ")[0];
            myTime = data[i].Zeit.split(" ")[1];
            let dateParts = myDate.split("/");
            let timeParts = myTime.split(":");
            let dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0], timeParts[0], timeParts[1]);


            // select all data
            if(timespan === 0) {
                result.labels.push(data[i].Zeit);
                result.data.push(data[i]['mg/dL']);
            }
            // select data from single day
            else if(timespan === 1) {
                if(dateObject.getDate() === lastDate.getDate()) {
                    result.labels.push(data[i].Zeit);
                    result.data.push(data[i]['mg/dL']);
                }
                // select data from timespan
            } else {
                if (dateObject > startDate) {
                    result.labels.push(data[i].Zeit);
                    result.data.push(data[i]['mg/dL']);
                }
            }
        }

        return result;
    };
}

module.exports = CgmHandler;