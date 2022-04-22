import {
    Dimensions,
    Platform,
    NativeModules,
    StatusBar
} from 'react-native';

const { height, width } = Dimensions.get('window');

console.log(height, width, Dimensions.get('screen'), StatusBar.currentHeight)

const StyleConfig = {
    screen_width: width,
    screen_height: height,
    status_height: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight
};

export default StyleConfig
