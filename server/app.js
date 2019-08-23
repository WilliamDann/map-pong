let game = require("./src/game");
let vector = require('./src/vector')

let express = require('express');
let bodyParser = require("body-parser");
let cors = require('cors');

// initilize app
let activeGame = new game.Game([]);


let app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

/// routes

// get activeGame information
app.get("/game/", (req, res) => {
    console.log(req);
    
    if (!activeGame) {
        res.status(500);
        res.send("No activeGame in progress!");
    } else {
        res.status(200);
        res.send(JSON.stringify(activeGame));
    }
});

// hit ball
app.post("/game/hit/", (req, res) => {
    if (!req.body.playerName)     { res.status(400); res.send("'playerName' not found in request.")}
    if (!req.body.playerLocation) { res.status(400); res.send("'playerLocation' not found in request.")}
    if (!req.body.hitDirection)   { res.status(400); res.send("'hitDirection' not found in request.")}
    
    let hitDirection = req.body.hitDirection.split(',');
    hitDirection[0] = parseFloat(hitDirection[0].split('(')[1])
    hitDirection[1] = parseFloat(hitDirection[1].split(')')[0])

    hitDirection = new vector.Vector(hitDirection[0], hitDirection[1]);

    let playerLocation = req.body.playerLocation.split(',');
    playerLocation[0] = parseFloat(playerLocation[0].split('(')[1])
    playerLocation[1] = parseFloat(playerLocation[1].split(')')[0])

    playerLocation = new vector.Vector(playerLocation[0], playerLocation[1]);

    let data = activeGame.hitBall(
        req.body.playerName,
        hitDirection,
        playerLocation
    );

    if (!data) {
        res.status(400);
        res.send("Player out of range.")
    }
    else {
        res.status(200);
        res.send(JSON.stringify(data));
    }
});

setInterval(() => { activeGame.updateBall(); }, 1000)

// start server
app.listen(8080, () => { console.log("listening on 8080") })