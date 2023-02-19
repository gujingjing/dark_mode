package com.example.darkmodetest;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.webkit.JsResult;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import java.util.Locale;

public class MainActivity extends AppCompatActivity {

    private WebView webView;
    private String TAG="DarkModeTest";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        webView=findViewById(R.id.webView);
        findViewById(R.id.darkMode).setOnClickListener(view -> {

        });
        findViewById(R.id.loadJs).setOnClickListener(view -> {
            String dark_reader_js = AssetUtil.getFromAssets(this, "darkreader.min.js");
            webView.evaluateJavascript("javascript:"+dark_reader_js, null);
//            webView.evaluateJavascript("javascript:setDark()", null);

//            String edge_dark_mode = AssetUtil.getFromAssets(this, "edge_dark_mode.js");
//            webView.evaluateJavascript("javascript:"+edge_dark_mode, null);
        });
        findViewById(R.id.callJs).setOnClickListener(view -> {
//            webView.evaluateJavascript("javascript:window.NightMode.setEnabled(true)", null);
            webView.goBack();

        });
        initWebView();
    }

    /**
     * //加载一个远程网页
     * webView.loadUrl("https://developer.android.google.cn/");
     *
     * // 加载assets中资源
     * webView.loadUrl("file:///android_asset/test.html");
     *
     * //加载sdcard中子源
     * webView.loadUrl("content://com.android.htmlfileprovider/sdcard/test.html");
     */
    private void initWebView(){
//        String loadUrl="https://www.tianya.cn/m/";
//        String loadUrl="https://www.bing.com/";
        String loadUrl="https://tieba.baidu.com/index.html";
//        String loadUrl="file:///android_asset/test.html";
        webView.addJavascriptInterface(new JSRelation(this), "android");
        WebSettings settings = webView.getSettings();
        settings.setUseWideViewPort(true); // 将图片调整到适合webview的大小
        settings.setLoadWithOverviewMode(true);  // 缩放至屏幕的大小
        settings.setJavaScriptEnabled(true); //使 WebView 支持 JS
        settings.setUseWideViewPort(true);
        settings.setLoadWithOverviewMode(true);
        settings.setAllowFileAccess(true);
        settings.setSupportZoom(true);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            settings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
        }
        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            webView.setWebContentsDebuggingEnabled(true);
        }
        // 设置 WebViewClient
        webView.setWebViewClient(new WebViewClient(){
            @Override
            public void onPageFinished(WebView view, String url) {

                super.onPageFinished(view, url);
                String dark_reader_js = AssetUtil.getFromAssets(MainActivity.this, "darkreader.min.js");
//                String dark_reader_js = AssetUtil.getFromAssets(MainActivity.this, "edge_dark_mode.js");
                webView.evaluateJavascript("javascript:"+dark_reader_js, null);
            }
        });
        // 设置 WebChromeClient
        webView.setWebChromeClient(new WebChromeClient(){
            @Override
            public boolean onJsAlert(WebView view, String url, String message, JsResult result) {
                return super.onJsAlert(view, url, message, result);
            }
        });
        webView.loadUrl(loadUrl);
    }
}