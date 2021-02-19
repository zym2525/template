package com.hellozerod.smartrefreshlayout.manager;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.util.DisplayMetrics;
import android.util.Log;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.hellozerod.R;
import com.hellozerod.smartrefreshlayout.component.ClassicsHeader;
import com.scwang.smart.refresh.layout.constant.SpinnerStyle;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import androidx.annotation.NonNull;

public class RNClassicsHeader extends SimpleViewManager<ClassicsHeader> {
    @NonNull
    @Override
    public String getName() {
        return "RNClassicsHeader";
    }

    @NonNull
    @Override
    protected ClassicsHeader createViewInstance(@NonNull ThemedReactContext reactContext) {
        return new ClassicsHeader(reactContext);
    }

    /**
     * 设置主题颜色
     * @param view
     * @param primaryColor
     */
    @ReactProp(name = "primaryColor")
    public void setPrimaryColor(ClassicsHeader view, String primaryColor){
        view.setPrimaryColor(Color.parseColor(primaryColor));
    }

    /**
     * 设置强调颜色
     * @param view
     * @param accentColor
     */
    @ReactProp(name = "accentColor")
    public void setAccentColor(ClassicsHeader view,String accentColor){
//        view.setProgressResource(android.R.drawable.stat_notify_sync);
        view.setAccentColor(Color.parseColor(accentColor));
    }

    /**
     * 设置移动样式
     * @param view
     * @param position
     */
    @ReactProp(name = "spinnerStyle",defaultInt = 0)
    public void setSpinnerStyle(ClassicsHeader view,int position){
        view.setSpinnerStyle(SpinnerStyle.values[position]);
    }

    @ReactProp(name = "textPulling")
    public void setTextPulling(ClassicsHeader view,String text){
        if(!text.equals("")){
            view.setTextPulling(text);
        }
    }

}
