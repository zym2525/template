package com.hellozerod.smartrefreshlayout;

import android.graphics.Color;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.scwang.smart.refresh.header.ClassicsHeader;
import com.scwang.smart.refresh.layout.constant.SpinnerStyle;

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

}
