const express = require('express');
const multer = require('multer');
const path = require('path');
const database = require('../models/database');

const PORT = 3000;

const app = express();

app.use(express.static(path.join(__dirname, '../')));

app.listen(PORT, () => {
    console.log('app is running in port ' + PORT);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

app.get('/registro', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'register.html'));
});

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../', 'images'));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    const flag = file.mimetype.startsWith('image');
    cb(null, flag);
};

const uploadFile = multer({
    storage: multerStorage,
    fileFilter: fileFilter
});

app.post('/registro', uploadFile.single('profilePic'), (req, res) => {
    if (req.file) {
        console.log('Imagen aceptada');
        database.useCollection('usuarios');
        database.insertUser(req.body, req.file.originalname);
    } else {
        console.log('File not supported');
    }
    //res.sendFile(path.join(__dirname, '../', 'views', 'register.html'));
});