import { Image, StyleSheet, Text, View } from "react-native"
import { colors } from "../utility"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

const Header = () => {
    return (
        <View style={styles.headerContainer}>
            <View style={[styles.headerCircle, { backgroundColor: colors.bgdark }]}>
                <MaterialCommunityIcons name="menu" size={25} s color="#fff" />
            </View>
            <View style={[styles.headerCircle, { backgroundColor: colors.bgProfileCircle,overflow:"hidden" }]}>
                <Image style={{ borderRadius: 10, resizeMode: "contain", height: "100%", width: "100%" }} source={{ uri: "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/corporate-user-icon.png" }} />
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    headerContainer: {
        height: 100,
        backgroundColor: colors.bgWhite,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 30,
    },
    headerCircle: {
        height: 50,
        width: 50,
        backgroundColor: "blue",
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center"
    }
})
