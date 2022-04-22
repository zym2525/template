import { StyleSheet } from 'react-native'
import {
    NavigationContainer,
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
    Theme
} from '@react-navigation/native';
import { DefaultTheme as PaperDefaultTheme } from '@zero-d/rn-components'
import { setSize } from '@/utils'

const theme = {
    // 文字色
    color_text_base: '#333333',                  // 基本
    color_text_base_inverse: '#ffffff',          // 基本 _ 反色
    color_text_base_blue: '#59b8fa',
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
    border_base_color: '#dcdcdc',

    toast_fill: 'rgba(0, 0, 0, .6)',

    home_meunbar_width: setSize(136)
};

export const CombinedDefaultTheme = {
    ...PaperDefaultTheme,
    ...NavigationDefaultTheme,
    colors: {
        ...PaperDefaultTheme.colors,
        ...NavigationDefaultTheme.colors,
        primary: theme.color_text_base_blue,
        text: theme.color_text_base,
        accent: '#f1c40f',
    },
    fonts: {
        regular: {
            fontFamily: 'normal',
            fontWeight: 'normal' as 'normal',
        },
        medium: {
            fontFamily: 'normal',
            fontWeight: 'normal' as 'normal',
        },
        light: {
            fontFamily: 'normal',
            fontWeight: 'normal' as 'normal',
        },
        thin: {
            fontFamily: 'normal',
            fontWeight: 'normal' as 'normal',
        },
    }
};

export default theme;