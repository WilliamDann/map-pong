package com.williamdann.map_pong;

public class Goal {
    Vector[] positions;
    int scoreCode;

    public Goal(int scoreCode, Vector[] positions) {
        this.scoreCode = scoreCode;
        this.positions = positions;
    }
}
