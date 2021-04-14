const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });

const config = require('./lib/config.json');

const xlsxParser = new (require('./lib/tools/xlsxParser'));
const cgmHandler = new (require('./lib/tools/cgmHandler'));

const app = express();

// configure webserver
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// set static paths
app.use(express.static(path.join(__dirname, config.webContentDir)));
app.use('/node_modules', express.static('node_modules'));

// use EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// reverse proxy configuration
app.set('trust proxy', '127.0.0.1');

// set public router
app.get('/', (req, res) => {
    res.render('index', {
        runtime : config.runtime
    });
});

app.get('/result/:id', (req, res) => {
    // parse XLS data
    let cgmData = xlsxParser.parseCgmData(req.params.id);
    let alarmData = xlsxParser.parseAlertData(req.params.id);
    let pumpData = xlsxParser.parsePumpSettings(req.params.id);

    // delete cached file
    //xlsxParser.cleanupData(req.params.id);

    let cgm = {};
    let glucoseMinMax = {
        min : [],
        max : []
    };

    // setup CGM for frontend
    cgm.all = cgmHandler.getData(cgmData.content, 0);
    cgm.lastDay = cgmHandler.getData(cgmData.content, 1);
    cgm.lastWeek = cgmHandler.getData(cgmData.content, 2);
    cgm.lastMonth = cgmHandler.getData(cgmData.content, 3);

    // setup variable for desired glucose values
    for(let i=0;i<pumpData.length;i++) {
        if(pumpData[i].description === 'Warngrenzwert niedriger BZ') {
            glucoseMinMax.min[0] = pumpData[i].value.split(" ")[0];
        }
        if(pumpData[i].description === 'Warngreznwert hoher BZ') {
            glucoseMinMax.max[0] = pumpData[i].value.split(" ")[0];
        }
    }

    //console.log(glucoseMinMax);

    // render results
    res.render('results', {
        runtime : config.runtime,
        name : cgmData.name,
        timespan : cgmData.timespan,
        cgm : JSON.stringify(cgm),
        alarm : JSON.stringify(alarmData),
        pumpData : pumpData,
        glucoseMinMax : JSON.stringify(glucoseMinMax)
    });
});

app.post('/upload', upload.single('data'), function (req, res) {
    //console.log(req.file);
    if (req.file) {
        res.send(req.file.filename);
    } else {
        res.sendStatus(500);
    }
});

// start server
app.listen(config.port, function () {
    console.log('Server started at Port ' + config.port);
});