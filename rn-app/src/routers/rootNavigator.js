import * as React from 'react';
import { Linking, Platform, Text } from 'react-native';
import {
    createStackNavigator,
    StackScreenProps,
    TransitionPresets
} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { navigationRef, isReadyRef } from './navigationHelper';
import { useReduxDevToolsExtension } from '@react-navigation/devtools';
import { useSelector } from 'react-redux'
import { CustomNavigationBar } from '@/components'

import HomeScreen from '@/view/Home/Home'
import StartUpScreen from '@/view/StartUp/StartUp'
import LoginScreen from '@/view/Login/Login'
// import TestScreen from '@/view/Test/Test'
import RefreshListScreen from '@/view/RefreshList/RefreshList'
import StickyItemScreen from '@/view/StickyItem/StickyItem'
import BottomSheetScreen from '@/view/BottomSheet/BottomSheet'
import BottomSheetIndexScreen from '@/view/BottomSheet/index'
import BlurToolbarScreen from '@/view/BottomSheet/BlurToolbar'
import CounterScreen from '@/view/Counter/Counter'
import WaterfallGridScreen from '@/view/WaterfallGrid/WaterfallGrid'

const PERSISTENCE_KEY = 'NAVIGATION_STATE';

const linking = {
    prefixes: [
        /* your linking prefixes */
        'hellozerod://hellozerod/'
    ],
    config: {
        /* configuration for matching screens with paths */
        initialRouteName: 'AppStack',
        // screens: {
        //     LiveCourseDetail: 'courseDetail/:liveCourseId',
        // },
    },
};

const Stack = createStackNavigator();

export default function App() {

    useReduxDevToolsExtension(navigationRef);

    const [isReady, setIsReady] = React.useState(false);
    const [initialState, setInitialState] = React.useState();

    const user = useSelector((state) => state.user.user)

    React.useEffect(() => {
        const restoreState = async () => {
            try {
                const initialUrl = await Linking.getInitialURL();

                if (Platform.OS !== 'web' && initialUrl == null) {
                    // Only restore state if there's no deep link and we're not on web
                    const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
                    const state = savedStateString ? JSON.parse(savedStateString) : undefined;

                    if (state !== undefined) {
                        setInitialState(state);
                    }
                }
            } finally {
                setIsReady(true);
            }
        };

        if (!isReady) {
            restoreState();
        }
    }, [isReady]);

    if (!isReady) {
        return null;
    }

    return (
        <NavigationContainer
            ref={navigationRef}
            onReady={() => {
                isReadyRef.current = true;
            }}
            linking={linking}
        // fallback={<Text>Loading...</Text>}
        // initialState={__DEV__ ? initialState : null}
        // onStateChange={(state) =>
        //     AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
        // }
        >
            <Stack.Navigator
                screenOptions={({ route, navigation }) => ({
                    ...TransitionPresets.SlideFromRightIOS,
                    header: (props) => <CustomNavigationBar {...props} />
                })}
                initialRouteName='StartUp'
            >
                <Stack.Screen name="StartUp" component={StartUpScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false, ...TransitionPresets.ScaleFromCenterAndroid }} />
                {
                    user == null &&
                    <Stack.Screen name="Login" component={LoginScreen} />
                }
                <Stack.Screen name="RefreshList" component={RefreshListScreen} options={{ headerShown: false }} />
                <Stack.Screen name="StickyItem" component={StickyItemScreen} />

                <Stack.Screen name="BottomSheetIndex" component={BottomSheetIndexScreen} />
                <Stack.Screen name="BottomSheet" component={BottomSheetScreen} />
                <Stack.Screen name="BlurToolbar" component={BlurToolbarScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Counter" component={CounterScreen} />
                <Stack.Screen name="WaterfallGrid" component={WaterfallGridScreen} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}