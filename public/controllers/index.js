const express = require('express');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const app = express();

app.listen(PORT, () => {
    console.log('app is running in port ' + PORT);
});

app.use(express.static(path.join(__dirname, '../')));

app.get('/', (req, res) => {
    res.end(fs.readFileSync(path.join(__dirname, '../', 'views', 'index.html')));
});