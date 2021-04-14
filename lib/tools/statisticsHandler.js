"use strict";

class StatisticsHandler {
    calculateTargetRangeData = (data, range) => {
        let result = {};

        // get target range
        let min = parseInt(range.min);
        let max = parseInt(range.max);

        const veryLowValue = 55;
        const veryHighValue = 250;

        let targetRange = 0;
        let veryLow = 0;
        let low = 0;
        let high = 0;
        let veryHigh = 0;

        for(let i=0;i<data.length;i++) {
            // too low
            if(data[i] < min) {
                if(data[i] < veryLowValue) {
                    veryLow++;
                } else {
                    low++;
                }
            // too high
            } else if(data[i] > max) {
                if(data[i] > veryHighValue) {
                    veryHigh++;
                } else {
                    high++;
                }
            // in range
            } else {
                targetRange++;
            }
        }

        result.targetRange = targetRange;
        result.veryLow = veryLow;
        result.low = low;
        result.veryHigh = veryHigh;
        result.high = high;

        return result;
    }
}

module.exports = StatisticsHandler;