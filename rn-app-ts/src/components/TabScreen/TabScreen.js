import React, { Component } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { ScreenContainer, Screen, screensEnabled } from 'react-native-screens';
import { Tabs } from '@ant-design/react-native';
import ResourceSavingScene from './ResourceSavingScene'

const tabs = [
    { title: 'First Tab' },
    { title: 'Second Tab' },
    { title: 'Third Tab' },
];

const Scenes = {
    test1: () => <Text>test1</Text>,
    test2: () => <Text>test2</Text>,
    test3: () => <Text>test3</Text>,
}

export function resolveRoutes(scenes) {
    let routes = [];
    for (const key in scenes) {
        routes.push({
            key,
            component: scenes[key]
        })
    }
    return routes;
}

class TabScreen extends Component {

    static defaultProps = {
        lazy: true,
        activeIndex: 1,

    };

    constructor(props) {
        super(props);
        this.state = {
            loaded: [this.props.activeIndex],
            activeSceneIndex: this.props.activeIndex
        }
        this.routes = resolveRoutes(Scenes);
    }

    _getSceneIndex(key) {
        return this.routes.findIndex(
            (route) => route.key === key
        );
    }

    _changeSceneIndex(index) {
        index != this.state.activeIndex && this.setState(prevState => ({
            activeSceneIndex: index,
            loaded: prevState.loaded.includes(index)
                ? prevState.loaded
                : [...prevState.loaded, index],
        }))
    }

    onChange(tab, index) {
        this._changeSceneIndex(index);
    }

    render() {
        const { lazy } = this.props;
        const { loaded, activeSceneIndex } = this.state;
        return (
            <Tabs initialPage={1} tabs={tabs} onChange={this.onChange.bind(this)}>
                {this.routes.map((route, index) => {
                    const isFocused = activeSceneIndex === index;
                    return <View key={route.key} style={styles.pages}>
                        {
                            lazy && !loaded.includes(index)
                                ? null
                                : <ResourceSavingScene
                                    key={route.key}
                                    style={StyleSheet.absoluteFill}
                                    isVisible={isFocused}
                                >
                                    {<route.component isFocused={isFocused} />}
                                </ResourceSavingScene>
                        }
                    </View>
                })}
            </Tabs>
        )
    }
}

const styles = StyleSheet.create({
    pages: {
        flex: 1,
    },
})

export default TabScreen;
