import { ScaleSize } from '@zero-d/rn-components';

const instance = new ScaleSize({
    portraitWidth: 750,
    landScapeWidth: 1280 * 1.5,
    defaultPixel: 1.5
})

export function setSizeText(size: number) {
    return instance.setSizeText(size);
}

export function setSize(size: number) {
    return instance.setSize(size);
}

export function webViewSetSize(size: number) {
    return instance.webViewSetSize(size);
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