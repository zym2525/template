import { Dimensions, PixelRatio } from 'react-native';
import Orientation from '@/utils/orientation';

const initial = Orientation.getInitialOrientation();

//const M3_WIDTH = 960;
export const defaultPixel = 2;
export const defaultWidth = initial === 'PORTRAIT' ? 750 : 1334;

export const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const fontScale = PixelRatio.getFontScale(); //返回字体大小缩放比例
export const pixelRatio = PixelRatio.get() //当前设备的像素密度

const w2 = defaultWidth / defaultPixel;
export const scale = deviceWidth / w2;
console.log(scale, w2, deviceWidth, initial)
export function setSizeText(size) {
    size = Math.round((size * scale + 0.49) / fontScale);
    return size / defaultPixel;
}

export function setSize(size) {
    size = Math.round(size * scale + 0.49);
    return size / defaultPixel;
}

export function webViewSetSize(size) {
    return size * 1.5 / defaultWidth * deviceWidth;
}

export function setScrollSize(value) {
    return value * pixelRatio
}

export function getScrollSize(value) {
    return value / pixelRatio
}

export function px2dp(value) {
    return value / pixelRatio
}