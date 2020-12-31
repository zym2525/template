package com.hellozerod.smartrefreshlayout;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.scwang.smart.refresh.header.ClassicsHeader;

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
}
