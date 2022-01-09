import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Button } from "react-native-paper";

const Main = ({ navigation: { navigate } }) => {
  const pressedButton = (btn) => {
    if (btn === "cadastrar") {
      navigate("FormStack");
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        source={require("../assets/background/blackBlueCloud.jpg")}
        style={styles.imageBackground}
      >
        <View style={styles.dashboard}>
          <View style={styles.item}>
            <Text style={styles.label}>Clientes</Text>
            <Button
              style={styles.btn}
              icon="email"
              mode="contained"
              onPress={() => pressedButton("clientes")}
            >
              Ir
            </Button>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>Vendas</Text>
            <Button
              style={styles.btn}
              icon="email"
              mode="contained"
              onPress={() => pressedButton("vendas")}
            >
              Ir
            </Button>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>Cadastrar</Text>
            <Button
              style={styles.btn}
              icon="email"
              mode="contained"
              onPress={() => pressedButton("cadastrar")}
            >
              IR
            </Button>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
  },

  dashboard: {
    height: Dimensions.get("screen").height - 200,
    width: Dimensions.get("screen").width - 70,
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.55,
    shadowRadius: 14.78,
    elevation: 22,
  },
  item: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 30,
    marginBottom: 10,
    color: "#fff",
  },
  btn: {
    width: 120,
    backgroundColor: "#ff4510",
  },
  imageBackground: {
    borderRadius: 10,
  },
});

export default Main;
