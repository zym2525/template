package com.hellozerod.smartrefreshlayout.component;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.res.TypedArray;
import android.util.AttributeSet;
import android.util.TypedValue;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;

import com.hellozerod.R;
import com.scwang.smart.drawable.ProgressDrawable;
import com.scwang.smart.refresh.classics.ArrowDrawable;
import com.scwang.smart.refresh.layout.api.RefreshLayout;
import com.scwang.smart.refresh.layout.constant.RefreshState;
import com.scwang.smart.refresh.layout.constant.SpinnerStyle;
import com.scwang.smart.refresh.layout.util.SmartUtil;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentActivity;
import androidx.fragment.app.FragmentManager;

import static android.view.ViewGroup.LayoutParams.WRAP_CONTENT;

public class ClassicsHeader extends com.scwang.smart.refresh.header.ClassicsHeader {


    public ClassicsHeader(Context context) {
        super(context);
    }

//    public ClassicsHeader(Context context, AttributeSet attrs) {
//        super(context, attrs);
//        View.inflate(context, R.layout.srl_classics_header, this);
//
//        final View thisView = this;
//        final View arrowView = mArrowView = thisView.findViewById(R.id.srl_classics_arrow);
//        final View updateView = mLastUpdateText = thisView.findViewById(R.id.srl_classics_update);
//        final View progressView = mProgressView = thisView.findViewById(R.id.srl_classics_progress);
//
//        mTitleText = thisView.findViewById(R.id.srl_classics_title);
//
//        TypedArray ta = context.obtainStyledAttributes(attrs, R.styleable.ClassicsHeader);
//
//        RelativeLayout.LayoutParams lpArrow = (RelativeLayout.LayoutParams) arrowView.getLayoutParams();
//        RelativeLayout.LayoutParams lpProgress = (RelativeLayout.LayoutParams) progressView.getLayoutParams();
//        LinearLayout.LayoutParams lpUpdateText = new LinearLayout.LayoutParams(WRAP_CONTENT, WRAP_CONTENT);
//        lpUpdateText.topMargin = ta.getDimensionPixelSize(R.styleable.ClassicsHeader_srlTextTimeMarginTop, SmartUtil.dp2px(0));
//        lpProgress.rightMargin = ta.getDimensionPixelSize(R.styleable.ClassicsHeader_srlDrawableMarginRight, SmartUtil.dp2px(20));
//        lpArrow.rightMargin = lpProgress.rightMargin;
//
//        lpArrow.width = ta.getLayoutDimension(R.styleable.ClassicsHeader_srlDrawableArrowSize, lpArrow.width);
//        lpArrow.height = ta.getLayoutDimension(R.styleable.ClassicsHeader_srlDrawableArrowSize, lpArrow.height);
//        lpProgress.width = ta.getLayoutDimension(R.styleable.ClassicsHeader_srlDrawableProgressSize, lpProgress.width);
//        lpProgress.height = ta.getLayoutDimension(R.styleable.ClassicsHeader_srlDrawableProgressSize, lpProgress.height);
//
//        lpArrow.width = ta.getLayoutDimension(R.styleable.ClassicsHeader_srlDrawableSize, lpArrow.width);
//        lpArrow.height = ta.getLayoutDimension(R.styleable.ClassicsHeader_srlDrawableSize, lpArrow.height);
//        lpProgress.width = ta.getLayoutDimension(R.styleable.ClassicsHeader_srlDrawableSize, lpProgress.width);
//        lpProgress.height = ta.getLayoutDimension(R.styleable.ClassicsHeader_srlDrawableSize, lpProgress.height);
//
//        mFinishDuration = ta.getInt(R.styleable.ClassicsHeader_srlFinishDuration, mFinishDuration);
//        mEnableLastTime = ta.getBoolean(R.styleable.ClassicsHeader_srlEnableLastTime, mEnableLastTime);
//        mSpinnerStyle = SpinnerStyle.values[ta.getInt(R.styleable.ClassicsHeader_srlClassicsSpinnerStyle,mSpinnerStyle.ordinal)];
//
//        if (ta.hasValue(R.styleable.ClassicsHeader_srlDrawableArrow)) {
//            mArrowView.setImageDrawable(ta.getDrawable(R.styleable.ClassicsHeader_srlDrawableArrow));
//        } else if (mArrowView.getDrawable() == null){
//            mArrowDrawable = new ArrowDrawable();
//            mArrowDrawable.setColor(0xff666666);
//            mArrowView.setImageDrawable(mArrowDrawable);
//        }
//
//        if (ta.hasValue(R.styleable.ClassicsHeader_srlDrawableProgress)) {
//            mProgressView.setImageDrawable(ta.getDrawable(R.styleable.ClassicsHeader_srlDrawableProgress));
//        } else if (mProgressView.getDrawable() == null) {
//            mProgressDrawable = new ProgressDrawable();
//            mProgressDrawable.setColor(0xff666666);
//            mProgressView.setImageDrawable(mProgressDrawable);
//        }
//
//        if (ta.hasValue(R.styleable.ClassicsHeader_srlTextSizeTitle)) {
//            mTitleText.setTextSize(TypedValue.COMPLEX_UNIT_PX, ta.getDimensionPixelSize(R.styleable.ClassicsHeader_srlTextSizeTitle, SmartUtil.dp2px(16)));
////        } else {
////            mTitleText.setTextSize(16);
//        }
//
//        if (ta.hasValue(R.styleable.ClassicsHeader_srlTextSizeTime)) {
//            mLastUpdateText.setTextSize(TypedValue.COMPLEX_UNIT_PX, ta.getDimensionPixelSize(R.styleable.ClassicsHeader_srlTextSizeTime, SmartUtil.dp2px(12)));
////        } else {
////            mLastUpdateText.setTextSize(12);
//        }
//
//        if (ta.hasValue(R.styleable.ClassicsHeader_srlPrimaryColor)) {
//            super.setPrimaryColor(ta.getColor(R.styleable.ClassicsHeader_srlPrimaryColor, 0));
//        }
//        if (ta.hasValue(R.styleable.ClassicsHeader_srlAccentColor)) {
//            setAccentColor(ta.getColor(R.styleable.ClassicsHeader_srlAccentColor, 0));
//        }
//
//        if(ta.hasValue(R.styleable.ClassicsHeader_srlTextPulling)){
//            mTextPulling = ta.getString(R.styleable.ClassicsHeader_srlTextPulling);
//        } else if(REFRESH_HEADER_PULLING != null) {
//            mTextPulling = REFRESH_HEADER_PULLING;
//        } else {
//            mTextPulling = context.getString(R.string.srl_header_pulling);
//        }
//        if(ta.hasValue(R.styleable.ClassicsHeader_srlTextLoading)){
//            mTextLoading = ta.getString(R.styleable.ClassicsHeader_srlTextLoading);
//        } else if(REFRESH_HEADER_LOADING != null) {
//            mTextLoading = REFRESH_HEADER_LOADING;
//        } else {
//            mTextLoading = context.getString(R.string.srl_header_loading);
//        }
//        if(ta.hasValue(R.styleable.ClassicsHeader_srlTextRelease)){
//            mTextRelease = ta.getString(R.styleable.ClassicsHeader_srlTextRelease);
//        } else if(REFRESH_HEADER_RELEASE != null) {
//            mTextRelease = REFRESH_HEADER_RELEASE;
//        } else {
//            mTextRelease = context.getString(R.string.srl_header_release);
//        }
//        if(ta.hasValue(R.styleable.ClassicsHeader_srlTextFinish)){
//            mTextFinish = ta.getString(R.styleable.ClassicsHeader_srlTextFinish);
//        } else if(REFRESH_HEADER_FINISH != null) {
//            mTextFinish = REFRESH_HEADER_FINISH;
//        } else {
//            mTextFinish = context.getString(R.string.srl_header_finish);
//        }
//        if(ta.hasValue(R.styleable.ClassicsHeader_srlTextFailed)){
//            mTextFailed = ta.getString(R.styleable.ClassicsHeader_srlTextFailed);
//        } else if(REFRESH_HEADER_FAILED != null) {
//            mTextFailed = REFRESH_HEADER_FAILED;
//        } else {
//            mTextFailed = context.getString(R.string.srl_header_failed);
//        }
//        if(ta.hasValue(R.styleable.ClassicsHeader_srlTextSecondary)){
//            mTextSecondary = ta.getString(R.styleable.ClassicsHeader_srlTextSecondary);
//        } else if(REFRESH_HEADER_SECONDARY != null) {
//            mTextSecondary = REFRESH_HEADER_SECONDARY;
//        } else {
//            mTextSecondary = context.getString(R.string.srl_header_secondary);
//        }
//        if(ta.hasValue(R.styleable.ClassicsHeader_srlTextRefreshing)){
//            mTextRefreshing = ta.getString(R.styleable.ClassicsHeader_srlTextRefreshing);
//        } else if(REFRESH_HEADER_REFRESHING != null) {
//            mTextRefreshing = REFRESH_HEADER_REFRESHING;
//        } else {
//            mTextRefreshing = context.getString(R.string.srl_header_refreshing);
//        }
//        if(ta.hasValue(R.styleable.ClassicsHeader_srlTextUpdate)){
//            mTextUpdate = ta.getString(R.styleable.ClassicsHeader_srlTextUpdate);
//        } else if(REFRESH_HEADER_UPDATE != null) {
//            mTextUpdate = REFRESH_HEADER_UPDATE;
//        } else {
//            mTextUpdate = context.getString(R.string.srl_header_update);
//        }
//        mLastUpdateFormat = new SimpleDateFormat(mTextUpdate, Locale.getDefault());
//
//        ta.recycle();
//
//        progressView.animate().setInterpolator(null);
//        updateView.setVisibility(mEnableLastTime ? VISIBLE : GONE);
//        mTitleText.setText(thisView.isInEditMode() ? mTextRefreshing : mTextPulling);
//
//        if (thisView.isInEditMode()) {
//            arrowView.setVisibility(GONE);
//        } else {
//            progressView.setVisibility(GONE);
//        }
//
//        try {//try 不能删除-否则会出现兼容性问题
//            if (context instanceof FragmentActivity) {
//                FragmentManager manager = ((FragmentActivity) context).getSupportFragmentManager();
//                if (manager != null) {
//                    @SuppressLint("RestrictedApi")
//                    List<Fragment> fragments = manager.getFragments();
//                    if (fragments.size() > 0) {
//                        setLastUpdateTime(new Date());
//                        return;
//                    }
//                }
//            }
//        } catch (Throwable e) {
//            e.printStackTrace();
//        }
//
//        KEY_LAST_UPDATE_TIME += context.getClass().getName();
//        mShared = context.getSharedPreferences("ClassicsHeader", Context.MODE_PRIVATE);
//        setLastUpdateTime(new Date(mShared.getLong(KEY_LAST_UPDATE_TIME, System.currentTimeMillis())));
//    }

    public void setTextPulling(String text){
        this.mTextRefreshing=text;
    }

}
