let game = require('../src/game');
let vector = require('../src/vector');

let assert = require("assert");

describe("Game", () => {
    describe("updateBall", () => {
        it("should move the ball", (done) => {
            let testGame = new game.Game([]);
            testGame.ballVelocity = new vector.Vector(10, 0);
            testGame.ballPosition = new vector.Vector(0, 0);
            
            testGame.updateBall()

            assert.equal(testGame.ballPosition.x, 10);
            done();
        });
        it ("should score if inside a goal", (done) => {
            let testGame = new game.Game([ { vector: new vector.Vector(0, 0, 10, 10), team: 1 } ]);
            testGame.score = 0;

            testGame.ballVelocity = new vector.Vector(0, 0);
            testGame.ballPosition = new vector.Vector(5, 5);

            testGame.updateBall();

            assert.equal(1, testGame.score)

            done(); 
        });
    });

    describe("hitBall", () => {
        it("should apply correct force to the ball", (done) => {
            let testGame = new game.Game([]);
            testGame.ballVelocity = new vector.Vector(10, 0);
            testGame.ballPosition = new vector.Vector(0, 0);
            testGame.gameParams.playerHitStrength = new vector.Vector(10, 10);

            let data = testGame.hitBall(
                "testPlayer",
                new vector.Vector(-1, 0),
                new vector.Vector(0, 0)
            );

            assert.equal(0, testGame.ballVelocity.x);
            done();
        });

        it ("should deny hits when player is too far away", (done) => {
            let testGame = new game.Game([]);
            testGame.ballVelocity = new vector.Vector(10, 0);
            testGame.ballPosition = new vector.Vector(0, 0);
            testGame.gameParams.playerHitStrength = new vector.Vector(10, 10);

            let data = testGame.hitBall(
                "testPlayer",
                new vector.Vector(-1, 0),
                new vector.Vector(100, 100)
            );

            assert.equal(10, testGame.ballVelocity.x);
            done();
        });

        it ("should add missing players to the leaderboard", (done) => {
            let testGame = new game.Game([]);
            testGame.ballVelocity = new vector.Vector(10, 0);
            testGame.ballPosition = new vector.Vector(0, 0);
            testGame.gameParams.playerHitStrength = new vector.Vector(10, 10);

            let data = testGame.hitBall(
                "testPlayer",
                new vector.Vector(-1, 0),
                new vector.Vector(0, 0)
            );

            assert.notEqual(undefined, testGame.leaderboard["testPlayer"]);
            done();
        });

        it ("should increments an existing player's hits", (done) => {
            let testGame = new game.Game([]);
            testGame.ballVelocity = new vector.Vector(10, 0);
            testGame.ballPosition = new vector.Vector(0, 0);
            testGame.gameParams.playerHitStrength = new vector.Vector(10, 10);
            testGame.leaderboard["testPlayer"] = 1;

            let data = testGame.hitBall(
                "testPlayer",
                new vector.Vector(-1, 0),
                new vector.Vector(0, 0)
            );

            assert.equal(2, testGame.leaderboard["testPlayer"]);
            done();
        });
    });

    describe("checkHitLocation", () => {
        it ("should return true if in area", (done) => {
            let testGame = new game.Game();
            testGame.ballPosition = new vector.Vector(10, 10);
            testGame.gameParams.requiredHitDistance = 100;

            let result = testGame.checkHitLocationValid(new vector.Vector(0, 0));

            assert.equal(true, result);
            done();
        });

        it ("should return false if out of area", (done) => {
            let testGame = new game.Game();
            testGame.ballPosition = new vector.Vector(10, 10);
            testGame.gameParams.requiredHitDistance = 5;

            let result = testGame.checkHitLocationValid(new vector.Vector(20, 20));

            assert.equal(false, result);
            done();
        });
    });
});

describe("Vector", () => {
    describe("containsPoint", () => {
        it ("should return true if point is contained", (done) => {
            let test = new vector.Vector(0, 0, 10, 10);
            
            assert.equal(test.containsPoint(5, 5), true);
            assert.equal(test.containsPoint(15, 15), false);

            done();
        });
    });
});