import React, { Component } from 'react';
import { View, StyleSheet, BackHandler } from 'react-native';
import { Text } from '@/components'

class Test extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Test'
    });

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            // console.log(12333);
            // //   this.goBack(); // works best when the goBack is async
            // return true;
        });
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    handleTest() {
        alert('handleTest');
    }

    render() {
        return (
            <View>
                <Text style={styles.btn} onPress={this.handleTest.bind(this)}> Test </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: '#999',
        paddingVertical: 20,
        marginBottom: 10
    }
})

export default Test;
