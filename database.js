const sqlite3 = require('sqlite3');
const dbfile = './BossData.db';

//Make new boss
const db = new sqlite3.Database(dbfile, (err) => {
    if(err){
        console.log(err.message);
    }
    else{
        db.run('CREATE TABLE IF NOT EXISTS Bosses(extid INTEGER PRIMARY KEY AUTOINCREMENT, boss_name TEXT NOT NULL, about TEXT NOT NULL, rating INTEGER NOT NULL, game TEXT NOT NULL, image TEXT, website TEXT, difficulty INTEGER, killed TEXT)', (err) => {
            if(err){
                console.error(err.message);
            } else {
                console.log("Table created or exists.");
            }});
    };
});

module.exports = db