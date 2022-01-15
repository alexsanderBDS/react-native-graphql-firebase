import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
const ListOfProducts = ({ visible, setVisible }) => {
  useEffect(() => {
    console.log(visible);
  }, [visible]);

  return (
    <View style={[{ ...styles.container, display: visible ? "none" : "flex" }]}>
      <Text style={styles.font} onPress={() => setVisible(true)}>
        Alex
      </Text>
      <View>
        <Text>ID</Text>
        <Text>Descricao</Text>
        <Text>Valor</Text>
      </View>
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
