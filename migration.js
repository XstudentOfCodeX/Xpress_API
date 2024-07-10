const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
    db.run('DROP TABLE Artist IF EXIST', (error) => {
        if(error) {
            console.error(error.message);
        }
    })
    db.run(`CREATE TABLE Artist
        (id INTEGER PRIMARY KEY,
        name TEXT,
        date_of_birth TEXT,
        biography 
        )`)
});