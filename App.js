/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { Fragment, useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Header from './src/components/Header';
import { colors } from './src/utility';
import apiClient from './src/pages/apiClient';
const { width, height } = Dimensions.get("window")
import AntDesign from "react-native-vector-icons/AntDesign"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Footer from './src/components/Footer';

const App = () => {

  const [singleProduct, setSingleProduct] = useState("")
  const [productsList, setProductsList] = useState([])
  const [categoryList, setCategoryList] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")

  useEffect(() => {
    getProduct()
    getCategories()
  }, [])


  const getProduct = async () => {
    const productResponse = await apiClient.get("/products/1")
    setSingleProduct(productResponse?.data)
  }

  const getCategories = async () => {
    const categoryResponse = await apiClient.get("/products/categories")
    setCategoryList(categoryResponse?.data)
    setSelectedCategory(categoryResponse?.data[0] || "")
    getProductsByCategory(categoryResponse?.data[0])
  }

  const getProductsByCategory = async (category) => {
    console.log(category);
    const productsResponse = await apiClient.get(`/products/category/${category}`)
    setProductsList(productsResponse?.data || [])
    console.log(productsResponse?.data);
  }


  return (
    <View style={{ flex: 1, backgroundColor: colors.bg1 }}>
      {/* header */}
      <Header />
      <ScrollView>
        {/* Welcome Text */}
        <View style={{ paddingHorizontal: 30, paddingVertical: 10 }}>
          <Text style={{ color: colors.fontPrimary, fontWeight: '900', fontSize: 25 }}>Welcome</Text>
          <Text style={{ color: colors.fontSecondary, fontWeight: '800', fontSize: 18 }}>Our Fashion App</Text>
        </View>

        {/* Search Box */}
        <SearchBox />

        {/* product box horizontal */}
        <ProductBoxHorizontal product={singleProduct} />

        {/* category list */}
        <CategorySection
          categoryList={categoryList}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          getProductsByCategory={getProductsByCategory}
        />

        {/* Product list */}
        <ProductSection
          selectedCategory={selectedCategory}
          productsList={productsList}
        />
      </ScrollView>
      <Footer />
    </View>
  )
}

export default App


const SearchBox = () => {
  return (
    <View style={[styles.innerContainer, {
      backgroundColor: "#fff",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 10
      // paddingVertical
    }]}>
      <View style={{ flex: 1, marginRight: 20, height: 60, justifyContent: "center" }}>
        <TextInput
          style={{
            borderRadius: 40,
            borderWidth: 1,
            height: 60,
            backgroundColor: colors.bg2,
            paddingLeft: 50
          }}
          placeholder='Search...'
          placeholderTextColor={"gray"}
        />
        <View style={{ width: 20, height: 20, position: "absolute", left: 20 }}>
          <AntDesign name="search1" color="gray" size={20} />
        </View>
      </View>
      <View>
        <View style={{
          width: 60,
          height: 60,
          backgroundColor: colors.bgdark,
          borderRadius: 100,
          justifyContent: "center",
          alignItems: "center"
        }}>
          <MaterialCommunityIcons name="sort" color="#fff" size={30} />

        </View>
      </View>
    </View>
  )
}

const ProductBoxHorizontal = ({ product }) => {
  return (
    <View style={[styles.innerContainer,]}>
      <View style={{
        padding: 10,
        backgroundColor: colors.bgWhite,
        borderWidth: .5, flexDirection: "row",
        borderColor: "#f0f0f0",
        borderRadius: 10
      }}>
        <View style={{
          height: 90,
          width: 90,
          backgroundColor: "#f0f0f0",
          borderRadius: 10,
          marginRight: 20
        }}>
          <Image style={{ borderRadius: 10, resizeMode: "contain", height: "100%", width: "100%" }} source={{ uri: product.image }} />
        </View>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <View style={{ flex: 1, marginRight: 10 }}>
            <Text numberOfLines={1} style={{ color: "#000", fontWeight: '900', fontSize: 16 }}>{product.title}</Text>
            <Text numberOfLines={1} style={{ color: "#000", color: colors.fontSecondary, fontWeight: '800' }}>
              {product.description}
            </Text>
            <Text style={{ color: "#000", fontWeight: '900', fontSize: 16 }}>${product.price}</Text>
          </View>
          <View>
            <View style={{ width: 30, height: 30, backgroundColor: "#000", borderRadius: 5 }}></View>
          </View>
        </View>
      </View>
    </View>
  )
}

const CategorySection = (props) => {

  const { categoryList = [],
    selectedCategory,
    setSelectedCategory,
    getProductsByCategory
  } = props

  const onCategoryPress = (category) => {
    setSelectedCategory(category)
    getProductsByCategory(category)
  }

  return (
    <View style={[styles.innerContainer, { paddingVertical: 10 }]}>
      <Text style={{ color: colors.fontPrimary, fontSize: 20, fontWeight: "900", marginBottom: 20 }}>Categories</Text>
      <View style={{ flexDirection: "row" }}>
        <ScrollView horizontal>
          {categoryList.map((category, i) => {
            return (
              <TouchableOpacity key={i} style={{
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderWidth: 1,
                marginRight: 20,
                borderRadius: 20,
                backgroundColor: selectedCategory === category ? "#000" : "#fff",
              }}
                onPress={() => onCategoryPress(category)}
              >
                <Text style={{ color: selectedCategory === category ? "#fff" : "#000", }}>{category}</Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
    </View>
  )
}

const ProductSection = (props) => {

  const { selectedCategory, productsList = [] } = props


  return (
    <View style={[styles.innerContainer, { paddingVertical: 10 }]}>
      <Text style={{ color: colors.fontPrimary, fontSize: 20, fontWeight: "900", marginBottom: 20 }}>
        Top {selectedCategory}
      </Text>
      <View style={{ flexDirection: "row" }}>

        <FlatList
          data={productsList}
          renderItem={({ item }) => <SingleProduct product={item} />}
          // keyExtractor={(item) => item.title}
          numColumns={2}
        />

      </View>
    </View>
  )
}

const SingleProduct = ({ product }) => {
  return (
    <View style={[{ width: "45%", marginBottom: 20, marginRight: 30 }]}>
      <View style={{
        // padding: 10,
        backgroundColor: colors.bgWhite,
        borderWidth: .5, flexDirection: "column",
        borderColor: "#f0f0f0",
        borderRadius: 10,
      }}>
        <View style={{
          height: 140,
          // width: 90,
          width: "100%",
          backgroundColor: "#f0f0f0",
          borderRadius: 10,
          marginRight: 20,
        }}>
          <Image style={{ borderRadius: 10, resizeMode: "contain", height: "100%", width: "100%", alignSelf: "center" }} source={{ uri: product.image }} />
        </View>
        <View style={{ flex: 1, marginRight: 10, alignItems: "center", padding: 10 }}>
          <Text numberOfLines={1} style={{ color: "#000", fontWeight: '900', fontSize: 16 }}>{product.title}</Text>
          <Text numberOfLines={1} style={{ color: "#000", color: colors.fontSecondary, fontWeight: '800' }}>
            {product.description}
          </Text>
          <Text style={{ color: "#000", fontWeight: '900', fontSize: 16 }}>${product.price}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  innerContainer: {
    paddingHorizontal: 30
  },
  headerContainer: {
    height: 100,
    backgroundColor: colors.bgWhite,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 30
  },
  headerCircle: {
    height: 50,
    width: 50,
    backgroundColor: "blue",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  fontBlack: {
    color: "#000"
  }
})