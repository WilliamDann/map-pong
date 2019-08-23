package com.williamdann.map_pong;

import android.os.AsyncTask;
import android.util.Log;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedWriter;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;

public class GameServerAPI extends AsyncTask<String, String, String> {
    public GameServerAPI() {

    }

    @Override
    protected void onPreExecute() {
        super.onPreExecute();
    }

    @Override
    protected String doInBackground(String... params) {
        try {
            URL url = new URL("http://10.40.1.64:8080/game/");
            HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
            try {
                InputStream in = new BufferedInputStream(urlConnection.getInputStream());
                String data = "";

                int i = 0;
                while ((i=in.read()) != -1) {
                    data += (char)i;
                }

                Log.d("server-data", data);
            } finally {
                urlConnection.disconnect();
            }

        } catch (Exception e) {
            Log.e("server-error", e.toString());
        }

        return null;
    }
}
