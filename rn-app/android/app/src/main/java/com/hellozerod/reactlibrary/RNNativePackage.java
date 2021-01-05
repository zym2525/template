package com.hellozerod.reactlibrary;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.hellozerod.smartrefreshlayout.RNClassicsHeader;
import com.hellozerod.smartrefreshlayout.RNRadarHeaderManager;
import com.hellozerod.smartrefreshlayout.SmartRefreshLayoutManager;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class RNNativePackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        return Arrays.asList(new NativeModule[]{
                // Modules from third-party
                new HttpCacheModule(reactContext),
                new OrientationModule(reactContext),
                new RNAliyunOssModule(reactContext),
                new RNConfigModule(reactContext)
        });
    }

    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Arrays.<ViewManager>asList(
                new SmartRefreshLayoutManager(),
                new RNRadarHeaderManager(),
                new RNClassicsHeader()
        );
    }
}
