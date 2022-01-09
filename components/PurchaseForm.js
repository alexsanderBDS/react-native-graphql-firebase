import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import ContactsModal from "./ContactsModal";
import ProductsModal from "./ProductsModal";

const PurchaseForm = () => {
  const [add, setAdd] = useState({
    contato: {
      nome: "Alex",
      telefone: "1183272972",
    },
    vendas: [
      {
        descricao: "feijao",
        quantidade: 2,
        valor: 44,
      },
    ],
  });
  const [list, setList] = useState([]);

  const {
    state: { user },
  } = useContext(AuthContext);

  useEffect(async () => {
    if (user.uid) {
      const data = await db
        .collection("itens")
        .doc(user.uid)
        .collection("shop")
        .get();

      setList(
        data.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        })
      );
    }
  }, [user, list]);

  const handlePurchase = async () => {
    await db
      .collection("itens")
      .doc(user.uid)
      .collection("vendas")
      .add({ ...add, dateTime: new Date(), vendas: { ...list } })
      .then(() => {
        console.log("Venda Adicionada!");
        deleteCart();
      })
      .catch((err) => {
        console.log("Houve um erro: ", err);
      });
  };

  const deleteCart = () => {
    list.forEach((item) => {
      db.collection("itens")
        .doc(user.uid)
        .collection("shop")
        .doc(item.id)
        .delete()
        .then(() => {
          console.log("item has been deleted");
        });
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.label}>Adicionar Itens</Text>
          <ProductsModal uid={user.uid} />
        </View>
        <View style={styles.list}>
          <Button
            onPress={deleteCart}
            style={styles.deleteBtn}
            title="Deletar carrinho"
          />
          {list.length > 0 ? (
            <FlatList
              data={list}
              renderItem={({ item }) => (
                <TouchableOpacity>
                  <View style={styles.listView} key={item.id}>
                    <View>
                      <Text style={styles.textList}>{item.descricao}</Text>
                      <Text style={styles.textList}>{item.quantidade}</Text>
                    </View>
                    <Text style={styles.textList}>{item.valor}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          ) : (
            <Text
              style={{ ...styles.textList, textAlign: "center", marginTop: 30 }}
            >
              Os itens adicionados serão exibidos aqui.
            </Text>
          )}
        </View>
        <View
          style={{
            marginTop: 20,
          }}
        >
          <Text style={styles.label}>Selecionar Contato</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              margin: 5,
            }}
          >
            <TextInput
              onChangeText={(text) =>
                setAdd((prevState) => ({ ...prevState, contact: text }))
              }
              keyboardType="numeric"
              style={{
                ...styles.input,
                width: 255,
                height: 50,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }}
              placeholder="digite"
              value={add.contact}
            />
            <ContactsModal setAdd={setAdd} />
          </View>
        </View>
        <View style={{ ...styles.form, marginTop: 30 }}>
          <Button onPress={handlePurchase} title="Adicionar" />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "yellow",
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
  },
  form: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 10,
    margin: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    width: 300,
    height: 50,
    fontSize: 30,
    backgroundColor: "#fff",
    textAlign: "center",
  },
  label: {
    fontSize: 25,
    alignSelf: "center",
  },
  list: {
    flex: 2,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "thistle",
    borderRadius: 10,
    margin: 4,
  },
  listView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderWidth: 1,
    borderColor: "grey",
  },
  textList: {
    fontSize: 20,
  },
  deleteBtn: {},
});

export default PurchaseForm;
