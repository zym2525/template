// import React, { Component } from 'react'
// import { Image, StyleSheet, View } from 'react-native'
// import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
// import theme from '@/style/theme'
// import { setSize, setSizeText } from '@/utils/common';
// import { Text, Touchable } from '@/components'

// import HomeScreen from '@/view/Home/Home'
// import AnalysisScreen from '@/view/Analysis/Analysis'
// import InitiativeStudyScreen from '@/view/InitiativeStudy/InitiativeStudy'
// import PersonalScreen from '@/view/Personal/Personal'

// const tabIcons = {
//     home: require('@/img/icon-tab-home.png'),
//     homeActive: require('@/img/icon-tab-home-active.png'),
//     analysis: require('@/img/icon-tab-analysis.png'),
//     analysisActive: require('@/img/icon-tab-analysis-active.png'),
//     initiativeStudy: require('@/img/icon-tab-initiativeStudy.png'),
//     initiativeStudyActive: require('@/img/icon-tab-initiativeStudy-active.png'),
//     personal: require('@/img/icon-tab-personal.png'),
//     personalActive: require('@/img/icon-tab-personal-active.png'),
//     photo: require('@/img/icon-tab-photo.png'),
// }

// export const AppStack = createBottomTabNavigator(
//     {
//         Home: HomeScreen,
//         // Analysis: AnalysisScreen,
//         // InitiativeStudy: InitiativeStudyScreen,
//         Personal: PersonalScreen
//     }, {
//     initialRouteName: 'Home',
//     defaultNavigationOptions: ({ navigation }) => ({
//         tabBarComponent: TabBarComponent,
//         tabBarOptions: {
//             style: {
//                 height: setSize(100),
//                 borderTopColor: theme.border_base_color,
//             },
//             labelStyle: {
//                 fontSize: setSizeText(18),
//             },
//             activeTintColor: theme.color_text_base_blue,
//             inactiveTintColor: '#666',
//         },
//     }),
// }
// )

// const TabBarComponent = (props) => {
//     const { navigation, getLabelText, onTabPress, getTestID } = props;
//     const { routes } = navigation.state;

//     function goPhotoExercise() {
//         navigation.navigate('PhotoExercise')
//     }

//     return (
//         <View style={styles.tabBarComponent}>
//             {routes.map((route, index) => {
//                 const focused = index === navigation.state.index;
//                 const scene = { route, focused };
//                 const accessibilityLabel = props.getAccessibilityLabel({
//                     route,
//                 });

//                 const accessibilityRole = props.getAccessibilityRole({
//                     route,
//                 });

//                 const accessibilityStates = props.getAccessibilityStates(
//                     scene
//                 );
//                 return (
//                     <TabBarButton
//                         key={route.key}
//                         route={route}
//                         focused={focused}
//                         getTestID={getTestID}
//                         onTabPress={onTabPress}
//                         getLabelText={getLabelText}
//                         accessibilityLabel={accessibilityLabel}
//                         accessibilityRole={accessibilityRole}
//                         accessibilityStates={accessibilityStates}
//                     />
//                 )
//             })}
//             {/* <Touchable onPress={goPhotoExercise}>
//                 <View style={styles.photoWrapper} {...{}}>
//                     <View style={styles.photoBtn}>
//                         <Image style={{ width: setSize(88), height: setSize(88) }} source={tabIcons.photo} />
//                     </View>
//                     <Text style={[styles.tabText, styles.tabTextActive]}>拍题</Text>
//                 </View>
//             </Touchable> */}
//         </View>
//     )
// }

// const TabBarButton = (props) => {
//     let { focused, route, onTabPress, getTestID, getLabelText, accessibilityLabel,
//         accessibilityRole,
//         accessibilityStates,
//         ...rest } = props;
//     let tabStyle = styles.tab
//     if (route.routeName == 'Analysis') tabStyle = StyleSheet.flatten([tabStyle, { marginRight: setSize(60) }])
//     if (route.routeName == 'InitiativeStudy') tabStyle = StyleSheet.flatten([tabStyle, { marginLeft: setSize(60) }])
//     return <Touchable
//         hitSlop={{ left: 15, right: 15, top: 0, bottom: 5 }}
//         testID={getTestID({ route })}
//         onPress={() => onTabPress({ route })}
//         accessibilityLabel={accessibilityLabel}
//         accessibilityRole={accessibilityRole}
//         accessibilityStates={accessibilityStates}
//     >
//         <View style={tabStyle} {...rest}>
//             {getTabBarIcon({ focused, route })}
//             <Text style={!focused ? styles.tabText : [styles.tabText, styles.tabTextActive]}>{getLabelText({ route })}</Text>
//         </View>
//     </Touchable>
// }

// const getTabBarIcon = ({ focused, route }) => {
//     const { routeName } = route;
//     let icon = null;
//     switch (routeName) {
//         case 'Home':
//             icon = focused ? tabIcons.homeActive : tabIcons.home
//             break
//         case 'InitiativeStudy':
//             icon = focused ? tabIcons.initiativeStudyActive : tabIcons.initiativeStudy
//             break
//         case 'Analysis':
//             icon = focused ? tabIcons.analysisActive : tabIcons.analysis
//             break
//         case 'Personal':
//             icon = focused ? tabIcons.personalActive : tabIcons.personal
//             break
//         default:
//             icon = focused ? tabIcons.homeActive : tabIcons.home
//     }

//     return <Image source={icon} style={styles.tabIcon} />;
// }

// const styles = StyleSheet.create({
//     tabIcon: {
//         width: setSize(46),
//         height: setSize(46),
//         marginTop: setSize(10),
//     },
//     tab: {
//         flex: 1,
//         alignItems: 'center',
//         marginTop: setSize(6)
//     },
//     tabText: {
//         fontSize: setSizeText(18),
//         color: '#666'
//     },
//     tabTextActive: {
//         color: theme.color_text_base_blue,
//     },
//     tabBarComponent: {
//         height: setSize(100),
//         borderTopColor: theme.border_base_color,
//         borderTopWidth: theme.border_base_width,
//         flexDirection: 'row'
//     },
//     photoBtn: {
//         width: setSize(96),
//         height: setSize(96),
//         backgroundColor: '#fff',
//         borderRadius: setSize(48),
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     photoWrapper: {
//         position: 'absolute',
//         left: '50%',
//         alignItems: 'center',
//         marginLeft: setSize(-43),
//         top: setSize(-40),
//         zIndex: 99999
//     }
// })