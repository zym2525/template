package com.hellozerod.smartrefreshlayout.manager;

import android.view.View;

import com.facebook.infer.annotation.Assertions;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.hellozerod.smartrefreshlayout.enums.TwoLevelEvevnts;
import com.hellozerod.utils.EventUtils;
import com.scwang.smart.refresh.header.TwoLevelHeader;
import com.scwang.smart.refresh.header.listener.OnTwoLevelListener;
import com.scwang.smart.refresh.layout.api.RefreshHeader;
import com.scwang.smart.refresh.layout.api.RefreshLayout;

import java.util.List;
import java.util.Locale;
import java.util.Map;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

public class RNTwoLevelHeaderManager extends ViewGroupManager<TwoLevelHeader> {

    ThemedReactContext mContext;
    TwoLevelHeader mHeader;

    private static final int COMMAND_FINISH_TWO_LEVEL = 1001;
    private static final int COMMAND_OPEN_TWO_LEVEL = 1002;

    @NonNull
    @Override
    public String getName() {
        return "RNTwoLevelHeaderManager";
    }

    @NonNull
    @Override
    protected TwoLevelHeader createViewInstance(@NonNull ThemedReactContext reactContext) {
        mContext=reactContext;
        mHeader= new TwoLevelHeader(reactContext);
//        mHeader.setRefreshHeader(new ClassicsHeader((reactContext)));
        return mHeader;
    }

    /**
     * 设置下拉 Header 的最大高度比值
     * @param view
     * @param maxRate
     */
    @ReactProp(name = "maxRate",defaultFloat = 2.5f)
    public void setMaxRate(TwoLevelHeader view, float maxRate){
        view.setMaxRate(maxRate);
    }

    /**
     * 是否禁止在二极状态是上滑关闭状态回到初态
     * @param view
     * @param enabled
     */
    @ReactProp(name = "enablePullToCloseTwoLevel",defaultBoolean = true)
    public void setEnablePullToCloseTwoLevel(TwoLevelHeader view, boolean enabled){
        view.setEnablePullToCloseTwoLevel(enabled);
    }

    /**
     * 设置是否开启刷新功能
     * @param view
     * @param enabled
     */
    @ReactProp(name = "enableRefresh",defaultBoolean = true)
    public void setEnableRefresh(TwoLevelHeader view, boolean enabled){
        view.setEnableRefresh(enabled);
    }

    /**
     * 设置触发二楼的白百分比
     * @param view
     * @param floorRate
     */
    @ReactProp(name = "floorRate",defaultFloat = 1.9f)
    public void setFloorRate(TwoLevelHeader view, float floorRate){
        view.setFloorRate(floorRate);
    }

    /**
     * 设置触发刷新的百分比
     * @param view
     * @param refreshRate
     */
    @ReactProp(name = "refreshRate",defaultFloat = 1f)
    public void setRefreshRate(TwoLevelHeader view, float refreshRate){
        view.setRefreshRate(refreshRate);
    }

    /**
     * 设置是否开启二级刷新
     * @param view
     * @param enableTwoLevel
     */
    @ReactProp(name = "enableTwoLevel",defaultBoolean = true)
    public void setEnableTwoLevel(TwoLevelHeader view, boolean enableTwoLevel){
        view.setEnableTwoLevel(enableTwoLevel);
    }

    /**
     * 设置二楼展开动画持续的时间
     * @param view
     * @param floorDuration
     */
    @ReactProp(name = "floorDuration",defaultInt = 1000)
    public void setFloorDuration(TwoLevelHeader view, int floorDuration){
        view.setFloorDuration(floorDuration);
    }

    /**
     * 设置二路底部上划关闭所占高度比率
     * @param view
     * @param bottomPullUpToCloseRate
     */
    @ReactProp(name = "bottomPullUpToCloseRate",defaultFloat = 1/6f)
    public void setBottomPullUpToCloseRate(TwoLevelHeader view, float bottomPullUpToCloseRate){
        view.setBottomPullUpToCloseRate(bottomPullUpToCloseRate);
    }

    @Nullable
    @Override
    public Map<String, Integer> getCommandsMap() {
        return MapBuilder.<String, Integer>builder()
                .put("finishTwoLevel", COMMAND_FINISH_TWO_LEVEL)
                .put("openTwoLevel", COMMAND_OPEN_TWO_LEVEL)
//                .put("getState", COMMAND_GET_STATE)
                .build();
    }

    @Override
    public void receiveCommand(TwoLevelHeader view, int commandId, @Nullable ReadableArray args) {
        Assertions.assertNotNull(view);
        assert args != null;
        switch (commandId) {
            case COMMAND_FINISH_TWO_LEVEL:
                view.finishTwoLevel();
                return;
            case COMMAND_OPEN_TWO_LEVEL:
                view.openTwoLevel(args.getBoolean(0));
                return;
            default:
                throw new IllegalArgumentException(String.format(Locale.ENGLISH, "Unsupported command %d.", commandId));
        }
    }

    @Override
    public void addView(TwoLevelHeader parent, View child, int index) {
        if(child instanceof RefreshHeader){
            RefreshHeader header;
            header=(RefreshHeader)child;
            parent.setRefreshHeader(header);
        }else {
            parent.addView(child,index);
        }

//        switch (index){
//            case 0:
//        RefreshHeader header;
//        if(child instanceof RefreshHeader){
//            header=(RefreshHeader)child;
//            parent.setRefreshHeader(header);
//        }
//                break;
//            default:
//                parent.addView(child,index);
//                break;
//        }
    }

    @Override
    public void addViews(TwoLevelHeader parent, List<View> views) {
        super.addViews(parent, views);
    }

    @Override
    protected void addEventEmitters(ThemedReactContext reactContext,final TwoLevelHeader view) {

        view.setOnTwoLevelListener(new OnTwoLevelListener() {
            @Override
            public boolean onTwoLevel(@NonNull RefreshLayout refreshLayout) {
                EventUtils.sendEvent(view, TwoLevelEvevnts.onTwoLevel.value(),null);
                return true;//true 将会展开二楼状态 false 关闭刷新
            }
        });

    }

}

