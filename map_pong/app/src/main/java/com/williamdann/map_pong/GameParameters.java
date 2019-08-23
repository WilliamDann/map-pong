package com.williamdann.map_pong;

public class GameParameters {
    Vector startBallVelocity;
    Vector startBallPosition;
    float requiredHitDistance;

    Vector playerHitStrength;

    public GameParameters() {
        this.startBallPosition = new Vector(0, 0);
        this.startBallVelocity = new Vector(0 ,0);

        this.requiredHitDistance = 1000;
    }

    public GameParameters(Vector startBallPosition, Vector startBallVelocity) {
        this.startBallVelocity = startBallVelocity;
        this.startBallPosition = startBallPosition;
    }

    public GameParameters(Vector startBallPosition, Vector startBallVelocity, float requiredHitDistance, Vector playerHitStrength) {
        this.startBallVelocity = startBallVelocity;
        this.startBallPosition = startBallPosition;

        this.requiredHitDistance = requiredHitDistance;
        this.playerHitStrength   = playerHitStrength;
    }}
