import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { colors } from "../utility"
import AntDesign from "react-native-vector-icons/AntDesign"
import Entypo from "react-native-vector-icons/Entypo"
import { useState } from "react"

const Footer = () => {

    const menus = [
        { name: "Home", icon: "home" },
        { name: "Cart", icon: "shopping-cart" },
        { name: "Notification", icon: "bell" },
        { name: "User", icon: "user" }
    ];
    const [selectedMenu, setSelectedMenu] = useState("Home")

    return (
        <View style={{
            backgroundColor: "#fff",
            height: 60,
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            elevation: 5,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 60, alignItems: "center"
        }} >
            {menus.map((item, i) => {
                return (
                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            backgroundColor: selectedMenu === item.name ? "#eee" : "#fff",
                            paddingRight: selectedMenu === item.name ? 15 : 0,
                            borderRadius: 50
                        }}
                        onPress={() => setSelectedMenu(item.name)}
                    >
                        <View style={{
                            borderRadius: 50,
                            backgroundColor: selectedMenu === item.name ? "#000" : "#fff",
                            padding: 10,
                            marginRight: 10
                        }}>
                            <Entypo
                                name={item.icon}
                                color= {selectedMenu === item.name ? "#fff" : "#000"}
                                size={20}
                            />
                        </View>
                        {selectedMenu === item.name ? <Text style={{ color: "#000", fontWeight: "900" }}>{item.name}</Text> : null}
                    </TouchableOpacity>
                )
            })}
            {/* <TouchableOpacity
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "#eee",
                    paddingRight: 15,
                    borderRadius: 50
                }}
                onPress={() => setSelectedMenu("home")}
            >
                <View style={{ borderRadius: 50, backgroundColor: "#000", padding: 10, marginRight: 10 }}>
                    <Entypo name="home" color="#fff" size={20} />
                </View>
                {selectedMenu === "home" ? <Text style={{ color: "#000", fontWeight: "900" }}>Home</Text> : null}
            </TouchableOpacity>
            <TouchableOpacity>
                <Entypo name="shopping-cart" color="#000" size={20} />
            </TouchableOpacity>
            <TouchableOpacity>
                <Entypo name="bell" color="#000" size={20} />
            </TouchableOpacity>
            <TouchableOpacity>
                <Entypo name="user" color="#000" size={20} />
            </TouchableOpacity> */}

        </View>
    )
}

export default Footer


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