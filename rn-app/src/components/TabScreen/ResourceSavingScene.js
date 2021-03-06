import * as React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Screen, screensEnabled } from 'react-native-screens';

const FAR_FAR_AWAY = 30000;

export default class ResourceSavingScene extends React.Component {
    render() {
        if (screensEnabled?.() && Platform.OS !== 'web') {
            const { isVisible, ...rest } = this.props;

            return <Screen active={isVisible ? 1 : 0} {...rest} />;
        }

        const { isVisible, children, style, ...rest } = this.props;

        return (
            <View
                style={[
                    styles.container,
                    Platform.OS === 'web'
                        ? { display: isVisible ? 'flex' : 'none' }
                        : null,
                    style,
                ]}
                collapsable={false}
                removeClippedSubviews={
                    Platform.OS === 'ios' ? !isVisible : true
                }
                pointerEvents={isVisible ? 'auto' : 'none'}
                {...rest}
            >
                <View style={isVisible ? styles.attached : styles.detached}>
                    {children}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: 'hidden',
    },
    attached: {
        flex: 1,
    },
    detached: {
        flex: 1,
        top: FAR_FAR_AWAY,
    },
});
