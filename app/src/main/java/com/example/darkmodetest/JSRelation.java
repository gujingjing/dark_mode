package com.example.darkmodetest;

import android.content.Context;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.widget.Toast;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

public class JSRelation {
    private Context mContext;
    public JSRelation(Context context) {
        this.mContext = context;
    }

    @JavascriptInterface
    public void callJava(){
        Toast.makeText(mContext,"Android:callJava",Toast.LENGTH_LONG).show();
    }

    @JavascriptInterface
    public String fetch(String url){
        try {
            URL requestUrl = new URL(url);
            HttpURLConnection conn = (HttpURLConnection) requestUrl.openConnection();
            final StringBuffer sb = new StringBuffer();
            BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String str;
            while((str = reader.readLine()) != null) {
                sb.append(str);
            }
            return sb.toString();
        }catch (Exception e){
            Log.e("TAG","gjj-fetch error:"+ e);
            e.printStackTrace();
        }
        return null;
    }

}
