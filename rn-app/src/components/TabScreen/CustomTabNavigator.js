import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScreenContainer } from 'react-native-screens';
import ResourceSavingScene from './ResourceSavingScene'
import PropTypes from 'prop-types';
import { resolveRoutes } from './TabScreen'

const Scenes = {
    test1: () => <Text>test1</Text>,
    test2: () => <Text>test2</Text>,
    test3: () => <Text>test3</Text>,
}

class CustomTabNavigator extends Component {

    static propTypes = {
        lazy: PropTypes.bool,
        activeKey: PropTypes.string,
        tabBarPosition: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
        renderTabBarComponent: PropTypes.func,
        scenes: PropTypes.object.isRequired
    }

    static defaultProps = {
        lazy: true,
        activeKey: '',
        tabBarPosition: 'bottom',
        scenes: Scenes
    };

    constructor(props) {
        super(props);
        let routes = resolveRoutes(this.props.scenes);
        let activeSceneIndex = this._getSceneIndex(this.props.activeKey);
        activeSceneIndex = activeSceneIndex >= 0 ? activeSceneIndex : 0;
        this.state = {
            loaded: [activeSceneIndex],
            activeSceneIndex: activeSceneIndex,
            routes
        }

    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { scenes } = nextProps;
        if (scenes.length != prevState.scenes.length) {
            return {
                routes: resolveRoutes(this.props.scenes)
            };
        }
    }

    _getSceneIndex(key) {
        return this.state.routes.findIndex(
            (route) => route.key === key
        );
    }

    _changeSceneIndex(index) {
        index != this.state.activeSceneIndex && this.setState(prevState => ({
            activeSceneIndex: index,
            loaded: prevState.loaded.includes(index)
                ? prevState.loaded
                : [...prevState.loaded, index],
        }), () => {
            let { onChange } = this.props;
            onChange && onChange(this.state.routes[index].key);
        })
    }

    _renderScreen() {
        const { lazy } = this.props;
        const { loaded, activeSceneIndex } = this.state;
        return <ScreenContainer style={styles.pages} key='Screen'>
            {this.state.routes.map((route, index) => {
                if (lazy && !loaded.includes(index)) {
                    return null;
                }

                const isFocused = activeSceneIndex === index;

                return (
                    <ResourceSavingScene
                        key={route.key}
                        style={StyleSheet.absoluteFill}
                        isVisible={isFocused}
                    >
                        {<route.component isFocused={isFocused} />}
                    </ResourceSavingScene>
                );
            })}
        </ScreenContainer>
    }

    _renderTabBar() {
        const { renderTabBarComponent, tabBarPosition } = this.props;
        const isRtl = tabBarPosition == 'left' || tabBarPosition == 'right';
        return <View key='TabBar'>
            {
                renderTabBarComponent
                    ? renderTabBarComponent({ routes: this.state.routes, goToScene: this._changeSceneIndex.bind(this) })
                    : <View style={[{ justifyContent: 'center', alignItems: 'center' }, isRtl ? styles.ttb : styles.rtl]}>
                        {
                            this.state.routes.map((route, index) =>
                                <Text key={route.key} onPress={this._changeSceneIndex.bind(this, index)} style={{ marginHorizontal: 20, fontSize: 40 }}>{route.key}</Text>
                            )
                        }
                    </View>
            }
        </View>
    }

    render() {
        const { tabBarPosition } = this.props;
        let content = [this._renderScreen(), this._renderTabBar()];
        const isRtl = tabBarPosition == 'left' || tabBarPosition == 'right';
        if (tabBarPosition == 'left' || tabBarPosition == 'top') content.reverse();
        return (
            <View style={[{ flex: 1 }, isRtl ? styles.rtl : styles.ttb]}>
                {content}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    pages: {
        flex: 1,
    },
    ttb: {
        flexDirection: "column"
    },
    rtl: {
        flexDirection: 'row'
    }
})

export default CustomTabNavigator;
