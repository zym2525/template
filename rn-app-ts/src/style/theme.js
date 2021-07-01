import { StyleSheet } from 'react-native'

const theme = {
    // 文字色
    color_text_base: '#333',                  // 基本
    color_text_base_inverse: '#ffffff',          // 基本 _ 反色
    color_text_base_blue: '#347CF4',
    color_link: 'red',
    // 字体尺寸
    font_size_base: 14,
    font_size_subhead: 15,
    font_size_caption: 16,
    font_size_caption_sm: 12,
    font_size_heading: 17,

    // 背景色
    fill_base: '#ffffff',
    fill_body: '#f6f6f6',
    fill_tap: '#dddddd',
    fill_disabled: '#dddddd',
    fill_mask: 'rgba(0, 0, 0, .4)',
    fill_button: '#4689F0',

    brand_primary: 'red',

    // tab_bar
    tab_bar_fill: '#ebeeef',
    tab_bar_height: 50,

    border_base_width: StyleSheet.hairlineWidth,
    border_base_color: '#f3f3f3',

    toast_fill: 'rgba(0, 0, 0, .6)',
};

export default theme;

module.exports = theme;