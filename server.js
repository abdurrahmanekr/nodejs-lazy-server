'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

const TIMEOUTS = {};

// App
const app = express();
app.get('/status', (req, res) => {
    res
    .set('Content-Type', 'application/json')
    .send(JSON.stringify(TIMEOUTS));
});

app.use('/lazy', (req, res) => {
    var date = new Date();

    TIMEOUTS[+date] = req.query.s;

    const delayTime = req.query.s || 60;

    setTimeout(() => {
        res.send(JSON.stringify({startDate: date, endDate: new Date(), miliseconds: new Date() - date}));

        TIMEOUTS[+date] = 'ended';
    }, delayTime * 1000);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);