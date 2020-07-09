import {
    Dimensions,
    Platform,
    NativeModules
} from 'react-native';

const { height, width } = Dimensions.get('window');

const { StatusBarManager } = NativeModules;

console.log(height, width, Dimensions.get('screen'), StatusBarManager.HEIGHT)
export default StyleConfig = {
    screen_width: width,
    screen_height: height,
    status_height: Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT
};
