package com.hellozerod.smartrefreshlayout.manager;

import android.graphics.Color;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.hellozerod.R;
import com.hellozerod.smartrefreshlayout.component.ClassicsFooter;
import com.scwang.smart.refresh.layout.constant.SpinnerStyle;

import androidx.annotation.NonNull;

public class RNClassicsFooter extends SimpleViewManager<ClassicsFooter> {
    @NonNull
    @Override
    public String getName() {
        return "RNClassicsFooter";
    }

    @NonNull
    @Override
    protected ClassicsFooter createViewInstance(@NonNull ThemedReactContext reactContext) {
        return new ClassicsFooter(reactContext);
    }

    /**
     * 设置主题颜色
     * @param view
     * @param primaryColor
     */
    @ReactProp(name = "primaryColor")
    public void setPrimaryColor(ClassicsFooter view, String primaryColor){
        if(!primaryColor.equals("")){
            view.setPrimaryColor(Color.parseColor(primaryColor));
        }
    }

    /**
     * 设置强调颜色
     * @param view
     * @param accentColor
     */
    @ReactProp(name = "accentColor")
    public void setAccentColor(ClassicsFooter view,String accentColor){
//        view.setProgressResource(R.drawable.animation_loading_rotate); //android.R.drawable.stat_notify_sync
        if(!accentColor.equals("")){
            view.setAccentColor(Color.parseColor(accentColor));
        }
    }

    /**
     * 设置移动样式
     * @param view
     * @param position
     */
    @ReactProp(name = "spinnerStyle",defaultInt = 0)
    public void setSpinnerStyle(ClassicsFooter view,int position){
        view.setSpinnerStyle(SpinnerStyle.values[position]);
    }
}
