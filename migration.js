const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
    db.run('DROP TABLE IF EXIST Artist', (error) => {
        if(error) {
            console.error(error.message);
        }
        console.log('Connected to the mydatabase.db SQLite database.')
    })
    db.run(`CREATE TABLE Artist
        (id INTEGER PRIMARY KEY,
        name TEXT,
        date_of_birth TEXT,
        biography TEXT,
        is_currently_employed INTEGER DEFAULT 1
        )`, (error) => {
            if (error) {
              console.error(error.message);
            } else {
              console.log('Table "Strip" created successfully.');
            }
    });
});


