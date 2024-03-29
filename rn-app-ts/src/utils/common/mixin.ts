import { StyleSheet, NativeModules, StyleProp, NativeMethods, Constructor } from 'react-native'
import React, { RefObject } from 'react'
import theme from '@/style/theme'
import { webViewSetSize } from './scaleSize'
import { UserState } from '@/reducers/user'
import { ExerciseType } from '@/constants'

export const measure = <T extends NativeMethods>(ref: T) => new Promise<{
    x: number, y: number, width: number, height: number,
    pageX: number, pageY: number
}>((resolve) => {
    ref.measure((x, y, width, height, pageX, pageY) => {
        resolve({
            x, y,
            width, height,
            pageX, pageY
        })
    });
});

//切换样式
export function tabStyle(condition: boolean, StyleOne: StyleProp<any>, StyleTwo: StyleProp<any>) {
    return condition ? [StyleOne, StyleTwo] : StyleOne;
}

//去收尾空格
export function trim(str: string) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

export function toFixed(number: number, pos: number) {
    //return Math.round(number*Math.pow(10, pos))/Math.pow(10, pos);       
    var f = parseFloat(String(number));
    if (isNaN(f)) {
        return false;
    }
    var f = Math.round(number * 100) / 100;
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + pos) {
        s += '0';
    }
    return s;
}

// 加0
export function toDou(num: number) {
    return num < 10 ? '0' + num : '' + num;
}

//是否登录
export const isRegister = (user: UserState['user']) => user != null;

//判断客观题
export function isSubjectExercise(exerciseType: ExerciseType) {
    return exerciseType > 3;
}

//判断复合题
export function isComprehensiveExercise(exerciseType: ExerciseType) {
    return (exerciseType == 8 || exerciseType == 9 || exerciseType == 11);
}

//判断写作
export function isWriting(exerciseType: ExerciseType) {
    return (exerciseType == 7 || exerciseType == 12);
}

//判断默写
export function isDictation(exerciseType: ExerciseType) {
    return (exerciseType == 13);
}

//转换大小
export function bytesToSize(limit: number) {
    var size = "";
    limit = limit * 1024;
    if (limit < 0.1 * 1024) { //如果小于0.1KB转化成B  
        size = limit.toFixed(2) + "B";
    } else if (limit < 0.1 * 1024 * 1024) {//如果小于0.1MB转化成KB  
        size = (limit / 1024).toFixed(2) + "KB";
    } else if (limit < 0.1 * 1024 * 1024 * 1024) { //如果小于0.1GB转化成MB  
        size = (limit / (1024 * 1024)).toFixed(2) + "MB";
    } else { //其他转化成GB  
        size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";
    }

    var sizestr = size + "";
    var len = sizestr.indexOf("\.");
    var dec = sizestr.substr(len + 1, 2);
    if (dec == "00") {//当小数点后为00时 去掉小数部分  
        return sizestr.substring(0, len) + sizestr.substr(len + 3, 2);
    }
    return sizestr;
}

export function border1Px() {
    return theme.border_base_width
}

//nbsp转ensp
export function nbsp2Ensp(str: string) {
    return str.replace(/&nbsp;/g, "&ensp;");
}

export function fitPx(str: string) {
    return str.replace(/\d+(\.\d+)?px/g, s => `${webViewSetSize(Number(s.slice(0, -2)))}px`);
}

//处理url后缀MP4
export function checkIsFlv(filename: string) {
    var flag = false;
    var arr = ["flv", "avi", "wmv"];
    var index = filename.lastIndexOf(".");
    var ext = filename.substr(index + 1).toLowerCase();
    for (var i = 0; i < arr.length; i++) {
        if (ext == arr[i]) {
            flag = true;
            break;
        }
    }
    if (flag) {
        return filename.substring(0, index) + ".mp4";
    }
    else {
        return filename;
    }
};

export function checkPhoneNumberValidity(phoneNumber: string) {
    phoneNumber = phoneNumber.replace(/\D/g, '').substring(0, 11);
    return phoneNumber.length >= 11 && /^1[3456789]\d{9}$/.test(phoneNumber);
}

/**按ascii码从小到大排序
 *
 * @param obj
 * @returns {string}
 */
export function sort_ascii(obj: { [p: string]: any }): string {
    let arr = new Array<string>();
    let num = 0;
    for (let i in obj) {
        arr[num] = i;
        num++;
    }
    let sortArr = arr.sort();
    let str = '';             //自定义排序字符串
    for (let i in sortArr) {
        str += sortArr[i] + '=' + obj[sortArr[i]] + '&';
    }
    //去除两侧字符串
    let char = '&'
    str = str.replace(new RegExp('^\\' + char + '+|\\' + char + '+$', 'g'), '');

    return str;
}

/**
 * This method is similar to lodash `flowRight`. It permits to easily compose
 * several high order components.
 *
 * @static
 * @category Utilities
 * @param {...Function} [funcs] The functions to invoke.
 * @returns {Function} Returns the new composite function.
 * @example
 *
 * const enhance = compose(pure, withProps({foo: 'bar'}));
 * const Component = enhance(MyComponent);
 */
export function compose(): Function {
    for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
        funcs[_key] = arguments[_key];
    }

    if (funcs.length === 0) {
        //@ts-ignore
        return _identity2.default;
    }

    if (funcs.length === 1) {
        return funcs[0];
    }

    return funcs.reduce(function (a, b) {
        return function () {
            return a(b.apply(undefined, arguments));
        };
    });
}