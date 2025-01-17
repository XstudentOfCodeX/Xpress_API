const express = require('express');
const seriesRouter = express.Router();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');
const issuesRouter = require('./issues.js');




seriesRouter.param('seriesId', (req, res, next, seriesId) => {
    db.get('SELECT * FROM Series WHERE Series.id = $seriesId', 
        {
            $seriesId: seriesId
        },
        function(err, series) {
            if(err) {
                console.error('Error in retrieving data');
                next(err)
            } else if(series) {
                req.series = series;
                next();
            } else {
                res.sendStatus(404);
            }

    });
});


seriesRouter.use('/:seriesId/issues', issuesRouter);




seriesRouter.get('/', (req, res, next) => {
    db.all('SELECT * FROM Series', (err, series) => {
        if(err) {
            console.error('Issue with retrieving data')
            next(err);
        } else {
            res.status(200).json({series: series});
        }
    });
});


seriesRouter.get('/:seriesId', (req, res, next) => {
    res.status(200).json({series: req.series});
});





seriesRouter.post('/', (req, res, next) => {
    const name = req.body.series.name;
    const description = req.body.series.description;

    if (!name || !description) {
       return res.sendStatus(400);
    }

    const sql = 'INSERT INTO Series (name, description) VALUES ($name, $description)';
    
    const values = {
        $name: name,
        $description: description
    };

    db.run(sql, values, function(err) {
            if(err) {
                next(err);
            } else {
                db.get(`SELECT * FROM Series WHERE Series.id = ${this.lastID}`, 
                    function(err, series) {
                        if(err) {
                            console.error('Error retrieving data', err);
                        } else {
                            console.log('data sent to DB', series);
                            res.status(201).json({series: series});
                        }
                        
                    });
                }
            });
    });
                     
                            
                       
     seriesRouter.put('/:seriesId', (req, res, next) => {
        const name = req.body.series.name;
        const description = req.body.series.description;

            if (!name || !description) {
                return res.sendStatus(400);
            }
        
        const sql = 'UPDATE Series SET name = $name, description = $description WHERE Series.id = $seriesId';
        const values = {
            $name: name,
            $description: description,
            $seriesId: req.params.seriesId
        };

        db.run(sql, values, 
            function(err) {
                if(err) {
                    next(err);
                } else {
                    db.get(`SELECT * FROM Series WHERE Series.id = ${req.params.seriesId}`, 
                        function(err, series) {
                            if(err) {
                                console.error('Error Retrieving data', err);
                            } else {
                                console.log('Successfully retrieved data', series);
                                res.status(200).json({series: series});
                            }
                        });
                }
            });


    });                   


seriesRouter.delete('/:seriesId', (req, res, next) => {
    db.get('SELECT * FROM Issue WHERE Issue.series_id = $seriesId', 
        {
            $seriesId: req.params.seriesId
        }, 
        (err, issues) => {
            if(err){
                next(err);
            } else if (issues) {
                res.sendStatus(400);
            } else {
                db.run('DELETE FROM Series WHERE Series.id = $seriesId', 
                    {
                        $seriesId: req.params.seriesId
                    },
                    (err) => {
                        if(err) {
                            next(err);
                        } else {
                           res.sendStatus(204); 
                        }
                    });
            }
        });
});

                        
module.exports = seriesRouter;