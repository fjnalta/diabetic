"use strict";

const xlsx = require('xlsx');
const fs = require('fs');

class XlsxParser {
    parseCgmData = (data) => {
        let wb = xlsx.readFile('public/uploads/' + data);
        let sheetList = wb.SheetNames;

        let cgm = wb.Sheets[sheetList[1]];

        //console.log(sheetList);
        //console.log(cgm);

        let name;
        let timespan = {};

        let headers = {};
        let content = [];

        let result = {};

        for(let curr in cgm) {
            if(curr[0] === '!') {
                continue;
            }

            let tt = 0;

            for(let i = 0; i < curr.length; i++) {
                if (!isNaN(curr[i])) {
                    tt = i;
                    break;
                }
            }

            let col = curr.substring(0,tt);
            //console.log('col ' + col);

            let row = parseInt(curr.substring(tt));
            //console.log('row ' + row);

            let value = cgm[curr].v;
            //console.log(value);

            if(row == 2 && value && col == 'B') {
                name = value;
                continue;
            }

            if(row == 4 && value && col == 'B') {
                let splitString = value.split(' ');
                let from = splitString[0];
                let until = splitString[2];
                timespan = {
                    'From' : from,
                    'Until' : until
                };
                continue;
            }

            // store header names
            if(row == 5 && value) {
                headers[col] = value;
                continue;
            }

            if(!content[row]) {
                content[row] = {};
            }

            content[row][headers[col]] = value;
        }

        // remove empty lines from results
        content.splice(0, 6);

        // create result object
        result.name = name;
        result.timespan = timespan;
        result.content = content;

        //console.log(result);
        return result;
    };

    parseAlertData = (data) => {
        let wb = xlsx.readFile('public/uploads/' + data);
        let sheetList = wb.SheetNames;

        let alarms = wb.Sheets[sheetList[4]];

        let headers = {};
        let content = [];

        for(let curr in alarms) {
            if(curr[0] === '!') {
                continue;
            }

            let tt = 0;

            for(let i = 0; i < curr.length; i++) {
                if (!isNaN(curr[i])) {
                    tt = i;
                    break;
                }
            }

            let col = curr.substring(0,tt);
            //console.log('col ' + col);

            let row = parseInt(curr.substring(tt));
            //console.log('row ' + row);

            let value = alarms[curr].v;
            //console.log(value);

            // store header names
            if(row == 1 && value) {
                headers[col] = value;
                continue;
            }

            if(!content[row]) {
                content[row] = {};
            }

            content[row][headers[col]] = value;
        }

        // remove empty lines from results
        content.splice(0, 2);

        console.log(content);
        return content;
    };

    cleanupData = (data) => {
        fs.unlink('public/uploads/' + data, (err) => {
            if(err != null) {
                console.log(err);
            }
        });
    };
}

module.exports = XlsxParser;