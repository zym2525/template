package com.hellozerod.smartrefreshlayout.manager;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.scwang.smart.refresh.header.BezierRadarHeader;
import android.graphics.Color;
import androidx.annotation.NonNull;

public class RNRadarHeaderManager extends SimpleViewManager<BezierRadarHeader> {

    @Override
    public String getName() {
        return "RNBezierRadarHeader";
    }

    @NonNull
    @Override
    protected BezierRadarHeader createViewInstance(@NonNull ThemedReactContext reactContext) {
        return  new BezierRadarHeader(reactContext);
    }

    /**
     * 设置主题颜色
     * @param view
     * @param primaryColor
     */
    @ReactProp(name = "primaryColor")
    public void setPrimaryColor(BezierRadarHeader view,String primaryColor){
        view.setPrimaryColor(Color.parseColor(primaryColor));
    }

    /**
     * 设置强调颜色
     * @param view
     * @param accentColor
     */
    @ReactProp(name = "accentColor")
    public void setAccentColor(BezierRadarHeader view,String accentColor){
        view.setAccentColor(Color.parseColor(accentColor));
    }

}
