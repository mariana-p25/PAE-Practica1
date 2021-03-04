const express = require('express');
const multer = require('multer');
const path = require('path');
const Database = require('../models/database');

const PORT = process.env.PORT || 3000;

const app = express();

let db = new Database();

app.use(express.static(path.join(__dirname, '../')));

app.listen(PORT, () => {
    console.log('app is running in port ' + PORT);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'register.html'));
});

app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
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

app.post('/', uploadFile.single('profilePic'), (req, res) => {
    if (req.file) {
        if (req.body.name && req.body.email && req.body.password) {
            console.log('Usuario aceptado');
            db.useCollection('usuarios');
            db.insertUser(req.body, req.file.filename);
            res.redirect('/index');
        }
    }
});