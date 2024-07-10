const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('errorhandler');
const morgan = require('morgan');
const express = require('express');

import{ apiRouter } from './api/api';

const app = express();
const PORT = process.env.PORT || 4001;


app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/api', apiRouter);


















app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});


module.exports = app;