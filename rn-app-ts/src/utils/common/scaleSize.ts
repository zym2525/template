import { ScaleSize } from '@zero-d/rn-components';
import { Dimensions } from 'react-native';

export const defaultPixel = 2;

const instance = new ScaleSize({
    portraitWidth: 750,
    landScapeWidth: 1334,
    defaultPixel: defaultPixel
})

export const defaultWidth = instance.defaultWidth;

export const deviceWidth = Dimensions.get('window').width;

export const scale = instance.scale;

export function setSizeText(size: number) {
    return instance.setSizeText(size);
}

export function setSize(size: number) {
    return instance.setSize(size);
}

export function webViewSetSize(size: number | string) {
    return instance.webViewSetSize(Number(size));
}

export function setScrollSize(value: number) {
    return instance.setScrollSize(value);
}

export function getScrollSize(value: number) {
    return instance.getScrollSize(value);
}

export function px2dp(value: number) {
    return instance.getScrollSize(value);
}