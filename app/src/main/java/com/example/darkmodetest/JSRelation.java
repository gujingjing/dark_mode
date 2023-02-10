package com.example.darkmodetest;

import android.content.Context;
import android.webkit.JavascriptInterface;
import android.widget.Toast;

public class JSRelation {
    private Context mContext;
    public JSRelation(Context context) {
        this.mContext = context;
    }

    @JavascriptInterface
    public void callJava(){
        Toast.makeText(mContext,"Android:callJava",Toast.LENGTH_LONG).show();
    }
}
