const express = require('express');
const artistRouter = express.Router();
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

artistRouter.get('/', (req, req, next) => {
    
});










module.exports = artistRouter;