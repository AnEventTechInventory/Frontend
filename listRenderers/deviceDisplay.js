import React, { useEffect, useState } from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import { Table, Row, Rows } from 'react-native-reanimated-table';
import axios from 'axios';
import _ from 'lodash';

import Device from '../registry/device';


const DeviceList = ( ) => {

    // load devices from api using axios
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [tableData, setTableData] = useState({
        tableHead: ['Name', 'Description', 'Location', 'Manufacturer', 'Quantity', 'Type', 'Contents'],
        tableContent: [],
    });
    const [devices, setDevices] = useState([]);

    useEffect(() => {
        const throttledFetchData = _.throttle(async () => {
            try {
                const result = await axios.get('http://localhost:5678/devices');
                // Handle error codes
                console.log(result)
                switch (result.status) {
                    case 200:
                        break;
                    case 204:
                        throw new Error('Didn\'t get any devices: ' + result.statusText)
                }
                // verify that the data is an array
                if (!Array.isArray(result.data)) {
                    throw new Error('Data retrieved from API is not an array');
                }
                populateDevices(result.data)
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }, 60000)

        throttledFetchData();

        // Cleanup the throttled function to prevent memory leaks
        return () => {
            throttledFetchData.cancel();
        };
    }, []);

    const populateDevices = (deviceJson) => {
        deviceJson.forEach((deviceId) => {
            Device.fromApi(deviceId).then((result) => {
                if (result) {
                    setDevices(devices => [...devices, result])
                    setTableData(tableData => {
                        tableData.tableContent.push([
                            result.name,
                            result.description,
                            result.location.name,
                            result.manufacturer.name,
                            result.quantity,
                            result.type,
                            result.contents
                        ]);
                        return tableData;
                    });
                }
            });
        });
    }

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error: {error}</Text>;
    }

    return (
        <View style={styles.container}>
            <Table borderStyle={{ borderWidth: 4, borderColor: 'teal' }}>
                <Row data={tableData.tableHead} style={styles.head} textStyle={styles.text} />
                <Rows data={tableData.tableContent} textStyle={styles.text} />
            </Table>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 30,
        backgroundColor: '#fff'
    },
    head: {
        height: 40,
        backgroundColor: '#f1f8ff'
    },
    headText: {
        margin: 6
    },
    text: {
        margin: 6
    }
});
export default DeviceList;
