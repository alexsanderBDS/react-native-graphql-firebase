import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
const ListOfProducts = ({ modeProducts, setModeProducts }) => {
  useEffect(() => {
    console.log(modeProducts);
  }, [modeProducts]);

  return (
    <View
      style={[
        { ...styles.container, display: !modeProducts ? "none" : "flex" },
      ]}
    >
      <Text style={styles.font} onPress={() => setModeProducts(false)}>
        Alex
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    color: "white",
  },
  font: {
    color: "black",
  },
});

export default ListOfProducts;
