const express = require('express');
const path = require('path');
const {newBoss, readBosses, gamelist, readgamesimple, readgame, readboss, updateBoss, deleteBoss, bosskilled, readbossstatus} = require('./Codebits.js');

const app=express();

app.use(express.urlencoded({extended:true}))
app.use(express.static('public'));
app.use(express.json());
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/CSS/style.css'));
    res.sendFile(path.join(__dirname, `public/CSS/newboss.css`));
    res.sendFile(path.join(__dirname, 'public/CSS/sidebar.css'));
    res.sendFile(path.join(__dirname, 'public/Images/Destroyer.png'));
    res.sendFile(path.join(__dirname, 'public/Images/BTD6_BAD_Artwork.webp'));
    res.sendFile(path.join(__dirname, 'public/Images/Favicon.png'));
    res.sendFile(path.join(__dirname, 'public/Images/DeadSkull.png'));
    res.sendFile(path.join(__dirname, 'public/Images/AliveSkull.png'));
    res.sendFile(path.join(__dirname, 'public/Images/Controller.png'));
    res.sendFile(path.join(__dirname, 'public/index.html'));
    res.sendFile(path.join(__dirname, 'public/background.js'));
    res.sendFile(path.join(__dirname, 'public/simpledisplay.js'));
    res.sendFile(path.join(__dirname, 'public/displaydata.js'));
});

app.get(`/boss`, (req, res) => {
    const {boss} = req.query;
    readboss(boss, (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.sendFile(path.join(__dirname, 'public/Images/starfull.png'));
            res.sendFile(path.join(__dirname, 'public/Images/starempty.png'));
            res.sendFile(path.join(__dirname, 'public/Images/skullfull.png'));
            res.sendFile(path.join(__dirname, 'public/Images/skullempty.png'));
            res.sendFile(path.join(__dirname, 'public/CSS/ejsstyle.css'));
            res.render('bosstemplate', { rows });
        }
    });
});

app.get(`/bosseskilled`, (req, res) => {
    if (req.query === undefined) {
        var pagenum = 1
    } else {
        var {pagenum} = req.query;
    }
    readbossstatus(1, (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.sendFile(path.join(__dirname, 'public/CSS/ejsstyle.css'));
            res.render('dedicatedlist', { rows , page : pagenum, url : "/bosseskilled?" });
        }
    });
});

app.get(`/bossesalive`, (req, res) => {
    if (req.query === undefined) {
        var pagenum = 1
    } else {
        var {pagenum} = req.query;
    }
    readbossstatus(0, (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.sendFile(path.join(__dirname, 'public/CSS/ejsstyle.css'));
            res.render('dedicatedlist', { rows , page : pagenum, url : "/bossesalive?" });
        }
    });
});

app.get(`/gamedirectory`, (req, res) => {
    res.sendFile(path.join(__dirname, 'public/gamedir.html'));
});

app.get(`/newboss`,(req, res) =>{
    res.sendFile(path.join(__dirname, `public/newboss.html`));
})

app.get(`/gameboss`, (req, res) => {
    var {game, pagenum} = req.query
    if (pagenum === undefined) {
        var pagenum = 1
    }
    readgamesimple(game, (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.sendFile(path.join(__dirname, 'public/CSS/ejsstyle.css'));
            res.render('dedicatedlist', { rows, page : pagenum, url : `/gameboss?game=${game}&`});
        }
    });
});

app.get('/api/Bosses', (req, res) => {
    const {search} = req.query;
    readBosses(search, (err, rows) => {
        if(err){
            res.status(500).send(err.message);
        }else{
            res.status(200).json(rows);
        }
    });
});

app.get('/api/gamelist', (req, res) => {
    const {search} = req.query;
    gamelist(search, (err, rows) => {
        if(err){
            res.status(500).send(err.message);
        }else{
            res.status(200).json(rows);
        }
    });
});


app.get('/api/gameboss', (req, res) => {
    const {game, search} = req.query;
    readgame(game, search, (err, rows) => {
        if(err){
            res.status(500).send(err.message);
        }else{
            res.status(200).json(rows);
        }
    });
});

app.post('/api/newboss', (req, res) => {
    const {boss_name, about, rating, game, image, website, difficulty, killed} = req.body;
    newBoss(boss_name, about, rating, game, image, website, difficulty, killed, (err, data) => {
        if(err){
            res.status(500).send(err.message)
        }else{
            res.redirect('/newboss')
        }
    })
});

app.put('/api/updateboss', (req, res) => {
    const {boss_name, about, rating, game, image, website, difficulty, killed, extid} = req.body;
    updateBoss(boss_name, about, rating, game, image, website, difficulty, killed, extid, (err, data) => {
        if(err){
            res.status(500).send(err.message)
        }else{
            res.status(202).send(`${boss_name} has been updated`)
        }
    })
})

app.put('/api/bosskilled', (req, res) => {
    const {bossName} = req.body;
    bosskilled(bossName, (err, data) => {
        if(err){
            res.status(500).send(err.message)
        }else{
            res.status(202).send(`${bossName} has been killed`)
        }
    })
})

app.listen(8080, () => {
    console.log('Server is listening on port 8080');
});