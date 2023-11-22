import * as React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from "./screens/homeScreen";
import DevicesScreen from "./screens/devicesScreen";
import ManufacturersScreen from "./screens/manufacturersScreen";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#f4511e',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    }
                }}
            >
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={
                        () => ({
                            title: 'Home',
                        })
                    }
                />
                <Stack.Screen
                    name="Devices"
                    component={DevicesScreen}
                />
                <Stack.Screen
                    name="Manufacturers"
                    component={ManufacturersScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    }
});

export {styles};
