let vector = require('./vector');

// TODO use latlong instead of xy

// Default game parameters
const defaultGameParams = {
    startBallVelocity: new vector.Vector(0, 0),
    startBallPosition: new vector.Vector(0, 0),
    requiredHitDistance: 1000,
    
    playerHitStrength: new vector.Vector(1, 1),
}

class Game {
    /**
     * Stores game information
     * @param {Object[]} goalPositions The positions of the goals
     * @param {*} gameParams The veloity of the ball in a direction
     * @param {*} leaderboard A dict of usernames and the times they have hit the ball
     */
    constructor(goalPositions, score=0, gameParams=defaultGameParams, leaderboard=null) {
        this.goalPositions = goalPositions;
        this.gameParams = gameParams;
        this.score = score;
        
        this.ballPosition = gameParams.startBallPosition;
        this.ballVelocity = gameParams.startBallVelocity;

        this.lastTouch = "";

        if (!leaderboard) {
            this.leaderboard = {}
        }
    }

    // todo add collision
    updateBall() {
        this.ballPosition.add(this.ballVelocity);

        let goalStatus = this.checkGoalStatus();
        if (goalStatus != 0) {
            this.score += goalStatus;
            
            // score a goal

        }
    }
    
    /**
     * Hit the ball in a directions
     * @param {string} playerName The name of the player that hit the ball
     * @param {vector.Vector} hitDirection The direction to hit the ball in
     * @param {vector.Vector} playerLocation The location of the player hiting the ball
     */
    hitBall(playerName, hitDirection, playerLocation) {
        if (this.checkHitLocationValid(playerLocation)) {
            if (this.leaderboard[playerName]) { this.leaderboard[playerName] += 1}
            else { this.leaderboard[playerName] = 1 }

            let deltaV = hitDirection.multiply(this.gameParams.playerHitStrength);
            this.ballVelocity.add(deltaV);

            this.lastTouch = playerName;

            return {
                hitSpeed: this.gameParams.playerHitStrength,
                hitDirection: hitDirection,
                newVelocity: this.ballVelocity,
                deltaV: deltaV,
                lastTouch: this.lastTouch
            }
        }
        return false;
    }

    /**
     * Check if a player is close enough to hit the ball
     * TODO implement function
     * @param {vector.Vector} playerLocation The location of the player
     */
    checkHitLocationValid(playerLocation) {
        let w = this.gameParams.requiredHitDistance;
        let h = this.gameParams.requiredHitDistance;

        
        let area = new vector.Vector(
            this.ballPosition.x - w,
            this.ballPosition.y - h,
            2 * w,
            2 * h
        );
            
        return area.containsPoint(playerLocation.x, playerLocation.y);
    }

    /**
     * Check if the ball is in the goal
     * @returns {boolean}
     */
    checkGoalStatus() {
        for (var goal of this.goalPositions) {
            if (goal.vector.containsPoint(this.ballPosition.x, this.ballPosition.y)) return goal.team;
        }
        return 0;
    }
} exports.Game = Game;