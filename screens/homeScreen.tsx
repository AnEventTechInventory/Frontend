import {View, Text, TouchableOpacity, StyleSheet, Dimensions} from "react-native";
import {useEffect, useState} from "react";
import React from "react";

import WarehouseIcon from '@mui/icons-material/Warehouse';
import FactoryIcon from '@mui/icons-material/Factory';

import TodayView from "../components/TodayView";

function HomeScreen({navigation}) {

    const [buttonWidth, setButtonWidth] = useState(calculateButtonWidth());
    const [buttonHeight, setButtonHeight] = useState(calculateButtonHeight());

    function calculateButtonWidth() {
        const {width} = Dimensions.get('window');
        return width * 0.3; // Adjust the percentage as needed
    }

    function calculateButtonHeight() {
        const {height} = Dimensions.get('window');
        return height * 0.4; // Adjust the percentage as needed
    }

    useEffect(() => {
        const handleDimensionsChange = () => {
            setButtonWidth(calculateButtonWidth());
            setButtonHeight(calculateButtonHeight());
        };

        Dimensions.addEventListener('change', handleDimensionsChange);

        return () => {
            Dimensions.removeEventListener('change', handleDimensionsChange);
        };
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <TouchableOpacity
                    style={[styles.button, {width: buttonWidth, height: buttonHeight}]}
                    onPress={() => navigation.navigate('Devices')}
                >
                    <WarehouseIcon fontSize="large"/>
                    <Text stype={styles.text}>Devices</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, {width: buttonWidth, height: buttonHeight}]}
                    onPress={() => navigation.navigate('Manufacturers')}
                >
                    <FactoryIcon fontSize="large"/>
                    <Text stype={styles.text}>Manufacturers</Text>
                </TouchableOpacity>
            </View>
            <TodayView/>
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 20,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
