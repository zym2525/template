import { getDisplayName } from './common'
import React, { Component } from 'react';
import {
    View,
    Modal,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';

export const widthLoading = (loadingCheck) => WrappedComponent => class extends WrappedComponent {
    static displayName = `WidthLoading(${getDisplayName(WrappedComponent)})`
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Modal
                    animationType={"none"}
                    transparent={true}
                    onRequestClose={() => { }}
                    visible={loadingCheck(this.props)}
                >
                    <ActivityIndicator style={styles.activityStyle} color="#3498db" size="large" />
                </Modal>
                {super.render()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    activityStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})