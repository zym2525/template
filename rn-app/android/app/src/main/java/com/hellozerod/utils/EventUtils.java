package com.hellozerod.utils;

import android.view.View;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import java.util.HashMap;

public class EventUtils {

    public static void sendEvent(View view, int eventType, WritableMap event) {
        WritableMap nativeEvent = Arguments.createMap();
        nativeEvent.putInt("type", eventType);
        nativeEvent.putMap("event", event);
        ReactContext reactContext = (ReactContext) view.getContext();
        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(view.getId(), "topChange", nativeEvent);
    }

}
