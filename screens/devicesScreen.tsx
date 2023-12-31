import { View } from "react-native"
import DeviceList from "../listRenderers/deviceDisplay";

import styles from "../App.tsx"

function DevicesScreen( {navigation} ) {
    return (
        <View style={styles.container}>
            <DeviceList/>
        </View>
    )
}

export default DevicesScreen