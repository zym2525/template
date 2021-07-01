import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { measure } from '@/utils'

interface componentNameProps { }

const componentName = (props: componentNameProps) => {
    const v = React.useRef<View>(null);
    measure(v).then(r => {
        r.height
    })
    return (
        <View ref={v} style={styles.container} >
            <Text>componentName</Text>
        </View>
    );
};

export default componentName;

const styles = StyleSheet.create({
    container: {}
});
