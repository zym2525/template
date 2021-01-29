package com.hellozerod.smartrefreshlayout;

import android.graphics.Color;
import android.graphics.drawable.Drawable;
import android.view.View;

import com.facebook.infer.annotation.Assertions;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.scwang.smart.refresh.footer.ClassicsFooter;
import com.scwang.smart.refresh.header.ClassicsHeader;
import com.scwang.smart.refresh.layout.SmartRefreshLayout;
import com.scwang.smart.refresh.layout.api.RefreshFooter;
import com.scwang.smart.refresh.layout.api.RefreshHeader;
import com.scwang.smart.refresh.layout.api.RefreshLayout;
import com.scwang.smart.refresh.layout.constant.RefreshState;
import com.scwang.smart.refresh.layout.listener.OnLoadMoreListener;
import com.scwang.smart.refresh.layout.listener.OnMultiListener;
import com.scwang.smart.refresh.layout.listener.OnRefreshListener;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

public class SmartRefreshLayoutManager extends ViewGroupManager<ReactSmartRefreshLayout> {

    private static final String RN_PACKAGE = "RNSmartRefreshLayout";

    private static final int COMMAND_AUTO_REFRESH = 101;
    private static final int COMMAND_AUTO_LOAD_MORE = 102;
    private static final int COMMAND_FINISH_REFRESH = 103;
    private static final int COMMAND_FINISH_LOAD_MORE = 104;
    private static final int COMMAND_FINISH_LOAD_MORE_WITH_NO_MORE_DATA = 105;
    private static final int COMMAND_CLOSE_HEADER_OR_FOOTER = 106;
    private static final int COMMAND_SET_NO_MORE_DATA = 107;
    private static final int COMMAND_GET_STATE = 108;

    private ReactSmartRefreshLayout smartRefreshLayout;
    private ThemedReactContext themedReactContext;

    @Override
    public String getName() {
        return RN_PACKAGE;
    }

    @Override
    protected ReactSmartRefreshLayout createViewInstance(ThemedReactContext reactContext) {
        themedReactContext=reactContext;
        smartRefreshLayout=new ReactSmartRefreshLayout(reactContext);
        smartRefreshLayout.setRefreshHeader(new ClassicsHeader(reactContext));
        smartRefreshLayout.setRefreshFooter(new ClassicsFooter(reactContext));
        return smartRefreshLayout;
    }

    /**
     * 主题颜色
     * @param view
     * @param primaryColor
     */
    @ReactProp(name="primaryColor")
    public void setPrimaryColorsId(ReactSmartRefreshLayout view, String primaryColor){
        if(!primaryColor.equals("")){
            view.setPrimaryColors(Color.parseColor(primaryColor));
        }else{
            view.setPrimaryColorsId(android.R.color.white);
        }
    }

    /**
     * 显示下拉高度/手指真实下拉高度=阻尼效果
     * @param view
     * @param dragRate
     */
    @ReactProp(name="dragRate",defaultFloat = 0.5f)
    public void setDragRate(ReactSmartRefreshLayout view,float dragRate){
        view.setDragRate(dragRate);
    }

    /**
     * 回弹动画时长（毫秒）
     * @param view
     * @param reboundDuration
     */
    @ReactProp(name="reboundDuration",defaultInt = 300)
    public void setReboundDuration(ReactSmartRefreshLayout view,int reboundDuration){
        view.setReboundDuration(reboundDuration);
    }

    /**
     * Header标准高度（显示下拉高度>=标准高度 触发刷新）
     * @param view
     * @param headerHeight
     */
    @ReactProp(name="headerHeight",defaultInt = 100)
    public void setHeaderHeight(ReactSmartRefreshLayout view,int headerHeight){
        view.setHeaderHeight(headerHeight);
    }

    /**
     * Footer标准高度（显示上拉高度>=标准高度 触发加载）
     * @param view
     * @param footerHeight
     */
    @ReactProp(name="footerHeight",defaultInt = 100)
    public void setFooterHeight(ReactSmartRefreshLayout view,int footerHeight){
        view.setFooterHeight(footerHeight);
    }

    /**
     * 设置 Header 起始位置偏移量
     * @param view
     * @param headerInsetStart
     */
    @ReactProp(name="headerInsetStart",defaultInt = 0)
    public void setHeaderInsetStart(ReactSmartRefreshLayout view,int headerInsetStart){
        view.setHeaderInsetStart(headerInsetStart);
    }

    /**
     * 设置 Footer 起始位置偏移量
     * @param view
     * @param footerInsetStart
     */
    @ReactProp(name="footerInsetStart",defaultInt = 0)
    public void setFooterInsetStart(ReactSmartRefreshLayout view,int footerInsetStart){
        view.setFooterInsetStart(footerInsetStart);
    }

    /**
     * 最大显示下拉高度/Header标准高度
     * @param view
     * @param headerMaxDragRate
     */
    @ReactProp(name="headerMaxDragRate",defaultFloat = 2.0f)
    public void setHeaderMaxDragRate(ReactSmartRefreshLayout view,float headerMaxDragRate){
        view.setHeaderMaxDragRate(headerMaxDragRate);
    }

    /**
     * 最大显示下拉高度/Footer标准高度
     * @param view
     * @param footerMaxDragRate
     */
    @ReactProp(name="footerMaxDragRate",defaultFloat = 2.0f)
    public void setFooterMaxDragRate(ReactSmartRefreshLayout view,float footerMaxDragRate){
        view.setFooterMaxDragRate(footerMaxDragRate);
    }

    /**
     * 触发刷新距离 与 HeaderHeight 的比率
     * @param view
     * @param headerTriggerRate
     */
    @ReactProp(name="headerTriggerRate",defaultFloat = 1)
    public void setHeaderTriggerRate(ReactSmartRefreshLayout view,float headerTriggerRate){
        view.setHeaderTriggerRate(headerTriggerRate);
    }

    /**
     * 触发加载距离 与 FooterHeight 的比率
     * @param view
     * @param footerTriggerRate
     */
    @ReactProp(name="footerTriggerRate",defaultFloat = 1)
    public void setFooterTriggerRate(ReactSmartRefreshLayout view,float footerTriggerRate){
        view.setFooterTriggerRate(footerTriggerRate);
    }

    /**
     * 是否启用下拉刷新功能
     * @param view
     * @param enableRefresh
     */
    @ReactProp(name="enableRefresh",defaultBoolean = true)
    public void setEnableRefresh(ReactSmartRefreshLayout view,Boolean enableRefresh){
        view.setEnableRefresh(enableRefresh);
    }

    /**
     * 是否启用上拉加载功能
     * @param view
     * @param enableLoadMore
     */
    @ReactProp(name="enableLoadMore",defaultBoolean = false)
    public void setEnableLoadMore(ReactSmartRefreshLayout view,Boolean enableLoadMore){
        view.setEnableLoadMore(enableLoadMore);
    }

    /**
     * 是否启用列表惯性滑动到底部时自动加载更多
     * @param view
     * @param enableAutoLoadMore
     */
    @ReactProp(name="enableAutoLoadMore",defaultBoolean = true)
    public void setEnableAutoLoadMore(ReactSmartRefreshLayout view,Boolean enableAutoLoadMore){
        view.setEnableAutoLoadMore(enableAutoLoadMore);
    }

    /**
     * 是否启用纯滚动模式
     * @param view
     * @param enablePureScrollMode
     */
    @ReactProp(name="enablePureScrollMode",defaultBoolean = false)
    public void setEnablePureScrollMode(ReactSmartRefreshLayout view,Boolean enablePureScrollMode){
        view.setEnablePureScrollMode(enablePureScrollMode);
    }

    /**
     * 是否启用嵌套滚动
     * @param view
     * @param enableNestedScroll
     */
    @ReactProp(name="enableNestedScroll",defaultBoolean = false)
    public void setEnableNestedScroll(ReactSmartRefreshLayout view,Boolean enableNestedScroll){
        view.setEnableNestedScroll(enableNestedScroll);
    }

    /**
     * 是否启用越界回弹
     * @param view
     * @param enableOverScrollBounce
     */
    @ReactProp(name="enableOverScrollBounce",defaultBoolean = true)
    public void setEnableOverScrollBounce(ReactSmartRefreshLayout view,Boolean enableOverScrollBounce){
        view.setEnableOverScrollBounce(enableOverScrollBounce);
    }

    /**
     * 是否在加载完成时滚动列表显示新的内容
     * @param view
     * @param enableScrollContentWhenLoaded
     */
    @ReactProp(name="enableScrollContentWhenLoaded",defaultBoolean = true)
    public void setEnableScrollContentWhenLoaded(ReactSmartRefreshLayout view,Boolean enableScrollContentWhenLoaded){
        view.setEnableScrollContentWhenLoaded(enableScrollContentWhenLoaded);
    }

    /**
     * 是否下拉Header的时候向下平移列表或者内容
     * @param view
     * @param enableHeaderTranslationContent
     */
    @ReactProp(name="enableHeaderTranslationContent",defaultBoolean = true)
    public void setEnableHeaderTranslationContent(ReactSmartRefreshLayout view,Boolean enableHeaderTranslationContent){
        view.setEnableHeaderTranslationContent(enableHeaderTranslationContent);
    }

    /**
     * 是否上拉Footer的时候向上平移列表或者内容
     * @param view
     * @param enableFooterTranslationContent
     */
    @ReactProp(name="enableFooterTranslationContent",defaultBoolean = true)
    public void setEnableFooterTranslationContent(ReactSmartRefreshLayout view,Boolean enableFooterTranslationContent){
        view.setEnableFooterTranslationContent(enableFooterTranslationContent);
    }

    /**
     * 是否在列表不满一页时候开启上拉加载功能
     * @param view
     * @param enableLoadMoreWhenContentNotFull
     */
    @ReactProp(name="enableLoadMoreWhenContentNotFull",defaultBoolean = true)
    public void setEnableLoadMoreWhenContentNotFull(ReactSmartRefreshLayout view,Boolean enableLoadMoreWhenContentNotFull){
        view.setEnableLoadMoreWhenContentNotFull(enableLoadMoreWhenContentNotFull);
    }

    /**
     * 是否在全部加载结束之后Footer跟随内容
     * @param view
     * @param enableFooterFollowWhenNoMoreData
     */
    @ReactProp(name="enableFooterFollowWhenNoMoreData",defaultBoolean = false)
    public void setEnableFooterFollowWhenNoMoreData(ReactSmartRefreshLayout view,Boolean enableFooterFollowWhenNoMoreData){
        view.setEnableFooterFollowWhenNoMoreData(enableFooterFollowWhenNoMoreData);
    }

    /**
     * 是否在刷新的时候禁止列表的操作
     * @param view
     * @param disableContentWhenRefresh
     */
    @ReactProp(name="disableContentWhenRefresh",defaultBoolean = false)
    public void setDisableContentWhenRefresh(ReactSmartRefreshLayout view,Boolean disableContentWhenRefresh){
        view.setDisableContentWhenRefresh(disableContentWhenRefresh);
    }

    /**
     * 是否在加载的时候禁止列表的操作
     * @param view
     * @param disableContentWhenLoading
     */
    @ReactProp(name="disableContentWhenLoading",defaultBoolean = false)
    public void setDisableContentWhenLoading(ReactSmartRefreshLayout view,Boolean disableContentWhenLoading){
        view.setDisableContentWhenLoading(disableContentWhenLoading);
    }

    /**
     * 是否启用越界拖动（仿苹果效果)
     * @param view
     * @param enableOverScrollDrag
     */
    @ReactProp(name="enableOverScrollDrag",defaultBoolean = false)
    public void setEnableOverScrollDrag(ReactSmartRefreshLayout view,Boolean enableOverScrollDrag){
        view.setEnableOverScrollDrag(enableOverScrollDrag);
    }

    /**
     * 自动刷新
     */
    public void autoRefresh(ReactSmartRefreshLayout view,int delayed){
        if(delayed>0){
            view.autoRefresh(delayed);
        }else{
            view.autoRefresh();
        }
    }

    /**
     * 自动加载
     */
    public void autoLoadMore(ReactSmartRefreshLayout view,int delayed){
        if(delayed>0){
            view.autoLoadMore(delayed);
        }else{
            view.autoLoadMore();
        }
    }

    public void finishRefresh(ReactSmartRefreshLayout view,ReadableArray args){
        int delayed=args.getInt(0);
        boolean success=args.getBoolean(1);
        if(!success){
            view.finishRefresh(success);
            return;
        }
        if(delayed>=0){
            view.finishRefresh(delayed);
        }else{
            view.finishRefresh();
        }
    }

    public void finishLoadMore(ReactSmartRefreshLayout view,ReadableArray args){
        int delayed=args.getInt(0);
        boolean success=args.getBoolean(1);
        if(!success){
            view.finishLoadMore(success);
            return;
        }
        if(delayed>=0){
            view.finishLoadMore(delayed);
        }else{
            view.finishLoadMore();
        }
    }

    @Nullable
    @Override
    public Map<String, Integer> getCommandsMap() {
        return MapBuilder.<String, Integer>builder()
                .put("autoRefresh", COMMAND_AUTO_REFRESH)
                .put("autoLoadMore", COMMAND_AUTO_LOAD_MORE)
                .put("finishRefresh", COMMAND_FINISH_REFRESH)
                .put("finishLoadMore", COMMAND_FINISH_LOAD_MORE)
                .put("finishLoadMoreWithNoMoreData", COMMAND_FINISH_LOAD_MORE_WITH_NO_MORE_DATA)
                .put("closeHeaderOrFooter", COMMAND_CLOSE_HEADER_OR_FOOTER)
                .put("setNoMoreData", COMMAND_SET_NO_MORE_DATA)
//                .put("getState", COMMAND_GET_STATE)
                .build();
    }

    @Override
    public void receiveCommand(ReactSmartRefreshLayout view, int commandId, @Nullable ReadableArray args) {
        Assertions.assertNotNull(view);
        assert args != null;
        switch (commandId) {
            case COMMAND_AUTO_REFRESH:
                autoRefresh(view,args.getInt(0));
                return;
            case COMMAND_AUTO_LOAD_MORE:
                autoLoadMore(view,args.getInt(0));
                return;
            case COMMAND_FINISH_REFRESH:
                finishRefresh(view,args);
                return;
            case COMMAND_FINISH_LOAD_MORE:
                finishLoadMore(view,args);
                return;
            case COMMAND_FINISH_LOAD_MORE_WITH_NO_MORE_DATA:
                view.finishLoadMoreWithNoMoreData();
                return;
            case COMMAND_CLOSE_HEADER_OR_FOOTER:
                view.closeHeaderOrFooter();
                return;
            case COMMAND_SET_NO_MORE_DATA:
                view.setNoMoreData(args.getBoolean(0));
                return;
//            case COMMAND_GET_STATE:
//                return view.getState().;
            default:
                throw new IllegalArgumentException(String.format(Locale.ENGLISH, "Unsupported command %d.", commandId));
        }
    }

   @Override
    public void addView(ReactSmartRefreshLayout parent, View child, int index) {
        switch (index){
            case 0:
                RefreshHeader header;
                if(child instanceof RefreshHeader){
                    header=(RefreshHeader)child;
                    parent.setRefreshHeader(header);
                }
                //parent.setRefreshHeader(new MaterialHeader(themedReactContext).setShowBezierWave(true));
                break;
            case 1:
                parent.setRefreshContent(child);
                break;
            case 2:
                if(child instanceof RefreshFooter){
                    RefreshFooter footer=(RefreshFooter)child;
                    parent.setRefreshFooter(footer);
                }
                break;
            default:break;
        }
    }

    @Override
    protected void addEventEmitters(ThemedReactContext reactContext,final ReactSmartRefreshLayout view) {
        /**
         * 必须设置OnRefreshListener，如果没有设置，
         * 则会自动触发finishRefresh
         *
         * OnRefreshListener和OnSimpleMultiPurposeListener
         * 中的onRefresh都会触发刷新，只需写一个即可
         */
        view.setOnRefreshListener(new OnRefreshListener() {
            @Override
            public void onRefresh(RefreshLayout refreshLayout) {

            }
        });

        /**
         * 必须设置OnLoadMoreListener，如果没有设置，
         * 则会自动触发finishLoadMore
         */
        view.setOnLoadMoreListener(new OnLoadMoreListener(){
            @Override
            public void onLoadMore(RefreshLayout refreshLayout) {
//                RefreshState
            }
        });

        view.setOnMultiListener(new OnMultiListener() {

            @Override
            public void onStateChanged(@NonNull RefreshLayout refreshLayout, @NonNull RefreshState oldState, @NonNull RefreshState newState) {
                WritableMap event = Arguments.createMap();
                event.putString("oldState", oldState.toString());
                event.putString("newState", newState.toString());
                sendEvent(view,Events.onStateChanged.value(),event);
            }

            @Override
            public void onRefresh(@NonNull RefreshLayout refreshLayout) {
                sendEvent(view,Events.onRefresh.value(),null);
            }

            @Override
            public void onLoadMore(@NonNull RefreshLayout refreshLayout) {
                sendEvent(view,Events.onLoadMore.value(),null);
            }

            @Override
            public void onHeaderMoving(RefreshHeader header, boolean isDragging, float percent, int offset, int headerHeight, int maxDragHeight) {

            }

            @Override
            public void onHeaderReleased(RefreshHeader header, int headerHeight, int maxDragHeight) {

            }

            @Override
            public void onHeaderStartAnimator(RefreshHeader header, int headerHeight, int maxDragHeight) {

            }

            @Override
            public void onHeaderFinish(RefreshHeader header, boolean success) {

            }

            @Override
            public void onFooterMoving(RefreshFooter footer, boolean isDragging, float percent, int offset, int footerHeight, int maxDragHeight) {
                WritableMap event = new WritableNativeMap();
                event.putBoolean("isDragging",isDragging);
                event.putInt("offset",offset);
                event.putInt("footerHeight",footerHeight);
                event.putInt("maxDragHeight",maxDragHeight);
                event.putDouble("percent", percent);
                sendEvent(view,Events.onFooterMoving.value(),event);
            }

            @Override
            public void onFooterReleased(RefreshFooter footer, int footerHeight, int maxDragHeight) {

            }

            @Override
            public void onFooterStartAnimator(RefreshFooter footer, int footerHeight, int maxDragHeight) {

            }

            @Override
            public void onFooterFinish(RefreshFooter footer, boolean success) {

            }
        });
    }


    private void sendEvent(View view, int eventType, WritableMap event) {
        WritableMap nativeEvent = Arguments.createMap();
        nativeEvent.putInt("type", eventType);
        nativeEvent.putMap("event", event);
        ReactContext reactContext = (ReactContext) view.getContext();
        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(view.getId(), "topChange", nativeEvent);
    }
}
