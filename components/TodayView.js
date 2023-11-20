import react from 'react';
import { View, Text } from 'react-native';
import {styles} from "../App";
class TodayView extends react.Component {
    render() {
        return (
            <View style={[styles.container, {width: '90%'}]}>
                <Text style={styles.text}>Today</Text>
                <Text>Today is the the </Text>
            </View>
        )
    }
}

export default TodayView;