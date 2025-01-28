const db = require('./database');

const newBoss = (boss_name, about, rating, game, image, website, difficulty, killed, callback) => {
    const sql = 'INSERT INTO Bosses (boss_name, about, rating, game, image, website, difficulty, killed) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    if (killed != "on") {
        var alive = 0
    } else {
        var alive = 1
    }
    db.run(sql, [boss_name, about, rating, game, image, website, difficulty, alive], function(err){
        callback(err, {id: this.lastID});
    });
};

const readBosses = (search, callback) => {
    const sql = 'SELECT * FROM Bosses ORDER BY ' + search;
    db.all(sql, [], callback);
}

const readbossstatus = (status, callback) => {
    const sql = 'SELECT * FROM Bosses WHERE killed=?';
    db.all(sql, [status], (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows)
        }
    });
}

const gamelist = (search, callback) => {
    const sql = 'SELECT DISTINCT game FROM Bosses ORDER BY ' + search;
    db.all(sql, [], callback);
}
const readgamesimple = (game, callback) => {
    const sql = 'SELECT * FROM Bosses WHERE game = ?';
    db.all(sql, [game], callback);
}
const readgame = (game, search, callback) => {
    const sql = 'SELECT * FROM Bosses WHERE game = ? ORDER BY ' + search;
    db.all(sql, [game], callback);
}

const readboss = (bossName, callback) => {
    const sql = 'SELECT * FROM Bosses WHERE boss_name = ?';
    db.all(sql, [bossName], (err, rows) => {
        if (err) {
            callback(err, null);
        } else if (rows.length === 0) {
            callback(new Error(`Bro I don't got ${bossName}`), null)
        } else {
            callback(null, rows[0])
        }
    });
}

const updateBoss = (boss_name, about, rating, game, image, website, difficulty, killed, extid, callback) => {
    const sql = 'UPDATE Bosses SET boss_name = ?, about = ?, rating = ?, game = ?, image = ?, website = ?, difficulty = ?, killed = ? WHERE extid = ?'
    db.run(sql, [boss_name, about, rating, game, image, website, difficulty, killed, extid], callback)
}

const bosskilled = (bossName, callback) => {
    readboss(bossName, (err, theboss) => {
        if (err) {
            callback(err);
            return;
        }
    const sql = 'UPDATE Bosses SET boss_name = ?, about = ?, rating = ?, game = ?, image = ?, website = ?, difficulty = ?, killed = 1 WHERE extid = ?'
    db.run(sql, [theboss.boss_name, theboss.about, theboss.rating, theboss.game, theboss.image, theboss.website, theboss.difficulty, theboss.extid], callback)
})};

const deleteBoss = (id, callback) => {
    const sql = 'DELETE FROM Bosses WHERE id = ?'
    db.run(sql, [id], callback)
}

module.exports = {newBoss, readBosses, readbossstatus, gamelist, readgamesimple, readgame, readboss, updateBoss, bosskilled, deleteBoss}
