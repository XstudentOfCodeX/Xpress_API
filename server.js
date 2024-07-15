const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('errorhandler');
const morgan = require('morgan');
const express = require('express');
// const sqlite3 = require('sqlite3');
// const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');


const apiRouter = require('./api/api');     

const app = express();
const PORT = process.env.PORT || 4000;


app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));
app.use(errorHandler());

app.use('/api', apiRouter);


// db.serialize(() => {
//     db.all('PRAGMA table_info(Issue)', (err, columns) => {
//         if (err) {
//             console.error('Error fetching table info:', err);
//         } else {
//             console.log('Issue table columns:', columns);
//         }
//     });

//     db.all('SELECT * FROM Issue', (err, rows) => {
//         if (err) {
//             console.error('Error fetching issue rows:', err);
//         } else {
//             console.log('Issue table rows:', rows);
//         }
//     });
// });



app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});


module.exports = app;