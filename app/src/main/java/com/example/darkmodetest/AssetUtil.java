package com.example.darkmodetest;

import android.content.Context;

import java.io.BufferedReader;
import java.io.InputStreamReader;

public class AssetUtil {

    public static String getFromRaw(Context context, int resourceId) {
        String result = "";
        try {
            InputStreamReader inputReader = new InputStreamReader(context.getResources().openRawResource(resourceId));
            BufferedReader bufReader = new BufferedReader(inputReader);
            String line = "";
            while ((line = bufReader.readLine()) != null)
                result += line;
            return result;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    public static String getFromAssets(Context context, String fileName) {
        String result = "";
        try {
            InputStreamReader inputReader = new InputStreamReader(context.getResources().getAssets().open(fileName));
            BufferedReader bufReader = new BufferedReader(inputReader);
            String line = "";
            while ((line = bufReader.readLine()) != null)
                result += line;
            return result;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }
}
