import ScaleSize from '@zero-d/rn-components/src/utils/common/scaleSize';

const instance = new ScaleSize({
    portraitWidth: 750,
    landScapeWidth: 1334,
    defaultPixel: 2
})

export function setSizeText(size) {
    return instance.setSizeText(size);
}

export function setSize(size) {
    return instance.setSize(size);
}

export function webViewSetSize(size) {
    return instance.webViewSetSize(size);
}

export function setScrollSize(value) {
    return instance.setScrollSize(value);
}

export function getScrollSize(value) {
    return instance.getScrollSize(value);
}

export function px2dp(value) {
    return instance.getScrollSize(value);
}