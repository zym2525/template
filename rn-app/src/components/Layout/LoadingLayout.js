import React, { Component } from 'react';
import { View } from 'react-native';
import { ListEmptyHint, ErrorHint } from '@/components/ListEmptyHint/ListEmptyHint'

class LoadingLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        let { isLoaded, error, children, loadError, style } = this.props;
        return (
            <View style={[{ flex: 1 }, style]}>
                {isLoaded
                    ? error ? <ErrorHint onPress={loadError} />
                        : children
                    : <ListEmptyHint />}
            </View>
        );
    }
}

export default LoadingLayout;
