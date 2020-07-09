// import React, { Component } from 'react';
// import { View, StyleSheet } from 'react-native';
// import { Text } from '@/components'
// import { SpringScrollView } from "@youngtailors/react-native-spring-scrollview";
// import { ChineseNormalHeader, CommonLottieHeader } from "@youngtailors/react-native-spring-scrollview/Customize";

// class SpringRefreshListView extends React.Component {
//     _contentCount = 20;
//     render() {
//         const arr = [];
//         for (let i = 0; i < this._contentCount; ++i) arr.push(i);
//         return (
//             <SpringScrollView
//                 ref={ref => (this._scrollView = ref)}
//                 refreshHeader={ChineseNormalHeader}
//                 onRefresh={() => {
//                     setTimeout(() => {
//                         this._scrollView.endRefresh();
//                     }, 2000);
//                 }}
//             >
//                 {arr.map((i, index) =>
//                     <Text key={index} style={{
//                         fontSize: 16,
//                         margin: 20
//                     }}>
//                         Modify the '_contentCount','_bounces' and '_scrollEnabled' in
//                         BouncesExample.js to check if VerticalScrollView works well.
//             </Text>
//                 )}
//             </SpringScrollView>
//         );
//     }
// }

// export default SpringRefreshListView;