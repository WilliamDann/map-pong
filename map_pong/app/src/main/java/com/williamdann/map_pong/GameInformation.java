package com.williamdann.map_pong;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.Dictionary;
import java.util.HashMap;

public class GameInformation {
    int score;

    Goal[] goalData;
    GameParameters gameParams;
    HashMap<String, Integer> leaderboard;

    String lastTouch;

    public GameInformation(Goal[] goalData) {
        this.score = 0;

        this.gameParams = new GameParameters();
        this.leaderboard = new HashMap<String, Integer>();
        this.lastTouch = "";
    }

    public GameInformation(Goal[] goalData, GameParameters gameParams) {
        this.score = 0;

        this.gameParams = gameParams;
        this.leaderboard = new HashMap<String, Integer>();
        this.lastTouch = "";
    }

    public GameInformation(Goal[] goalData, GameParameters gameParams, int score, HashMap<String, Integer> leaderboard, String lastTouch) {
        this.score = score;

        this.gameParams = gameParams;
        this.leaderboard = leaderboard;
        this.lastTouch = lastTouch;
    }

    // Create object from server data
    public GameInformation (JSONObject serverData) throws JSONException {
        this.score = (Integer)serverData.get("score");

        this.gameParams.startBallPosition = (Vector)serverData.get("startBallPosition");
        this.gameParams.startBallVelocity = (Vector)serverData.get("startBallVelocity");
        this.gameParams.requiredHitDistance = (Float) serverData.get("requiredHitDistance");
        this.gameParams.playerHitStrength = (Vector)serverData.get("playerHitStrength");

        this.goalData = new Goal[0];
        this.leaderboard = new HashMap<String, Integer>();

        this.lastTouch = "";
    }

}
