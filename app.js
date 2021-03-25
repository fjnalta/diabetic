const express = require('express');

const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });

const config = require('./lib/config.json');

const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const xlsxParser = new (require('./lib/tools/xlsxParser'));

// use EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// reverse proxy configuration
app.set('trust proxy', '127.0.0.1');

// configure webserver
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// set static paths
app.use(express.static(path.join(__dirname, config.webContentDir)));
app.use('/node_modules', express.static('node_modules'));

// set public router
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/result/:id', (req, res) => {
    // parse data
    let cgmData = xlsxParser.parseCgmData(req.params.id);
    let alarmData = xlsxParser.parseAlertData(req.params.id);

    // delete cached file
    xlsxParser.cleanupData(req.params.id);

    // render results
    res.render('results', {
        cgm : JSON.stringify(cgmData),
        alarm : alarmData
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