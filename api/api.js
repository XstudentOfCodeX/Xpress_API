const express = require('express');
const apiRouter = express.Router();
const artistsRouter = require('./artist.js');
const seriesRouter = require('./series.js');




apiRouter.use('/series', seriesRouter);

apiRouter.use('/artists', artistsRouter);







module.exports = apiRouter;
