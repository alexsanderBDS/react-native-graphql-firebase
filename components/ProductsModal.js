import React, { useState, useEffect } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { TextInput, Button } from "react-native-paper";
import { db } from "../firebase";

const ProductsModal = ({ uid }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [item, setItem] = useState({
    produto: "",
    quantidade: "",
    valor_un: "",
    valor_total: "",
  });

  useEffect(() => {
    const memorized = Calc(item.quantidade, item.valor_un);

    setItem({
      ...item,
      valor_total: memorized,
    });

    return () => memorized;
  }, [item.quantidade, item.valor_un]);

  function Calc(q1, v2) {
    return (parseInt(q1) * parseFloat(v2)).toFixed(2).toString();
  }

  const handlePressed = () => {
    db.collection("itens")
      .doc(uid)
      .collection("shop")
      .add({
        descricao: item.produto,
        quantidade: item.quantidade,
        valor: item.valor_total,
      })
      .then(() => {
        console.log("Item Adicionado!", uid);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          console.log("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>Fechar</Text>
          </Pressable>
          <View style={styles.modalView}>
            <View
              style={{
                flex: 1,
                alignItems: "stretch",
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              <TextInput
                style={styles.input}
                label="Produto"
                right={<TextInput.Icon name="dots-horizontal" />}
                onChangeText={(val) => setItem({ ...item, produto: val })}
                value={item.produto}
              />
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                label="Quantidade"
                onChangeText={(val) => {
                  setItem({ ...item, quantidade: val });
                }}
                value={item.quantidade}
              />
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                label="Valor Unitário"
                onChangeText={(val) => {
                  setItem({ ...item, valor_un: val });
                }}
                value={item.valor_un}
              />
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                label="Valor Total"
                editable={false}
                onChangeText={(val) => setItem({ ...item, valor_total: val })}
                value={isNaN(item.valor_total) ? "0" : item.valor_total}
              />
              <Button
                icon="plus-circle-outline"
                mode="contained"
                color="blue"
                onPress={handlePressed}
              >
                Adicionar
              </Button>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable onPress={() => setModalVisible(true)}>
        <View
          style={{
            backgroundColor: "grey",
            height: 50,
            width: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Entypo name="add-to-list" size={30} color="white" />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "black",
  },
  modalView: {
    flex: 1,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    elevation: 5,
    width: Dimensions.get("screen").width - 20,
  },
  button: {
    padding: 6,
    marginTop: 4,
    flexDirection: "column",
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "red",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 21,
    fontWeight: "bold",
  },
  input: {
    // marginBottom: 10,
  },
});

export default ProductsModal;
