import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Keyboard } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { db } from "../firebase";

const Form = () => {
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [label, setLabel] = useState("");

  const btnHandler = () => {
    console.log(name, tel);
    db.collection("contatos")
      .add({ name, tel })
      .then(() => {
        setLabel("contato adicionado!");

        setTimeout(() => {
          setLabel("");
        }, 2000);
      })
      .catch((error) => {
        console.log("Um erro ocorreu", error.message);
      });
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.form}>
          {label !== "" && (
            <View style={[styles.item, { backgroundColor: "yellow" }]}>
              <Text style={[styles.font, { textAlign: "center" }]}>
                {label}
              </Text>
            </View>
          )}
          <View style={styles.item}>
            <Text style={[styles.font, styles.label]}>Nome</Text>
            <TextInput
              style={styles.input}
              placeholder="Informe seu nome"
              onChangeText={(val) => setName(val)}
            />
          </View>
          <View style={styles.item}>
            <Text style={[styles.font, styles.label]}>Contato</Text>
            <TextInput
              keyboardType="phone-pad"
              style={styles.input}
              placeholder="informe o contato"
              maxLength={11}
              onChangeText={(val) => setTel(val)}
            />
          </View>
          <View style={[styles.item, { alignSelf: "center" }]}>
            <Button
              style={{ width: 130, padding: 5, backgroundColor: "black" }}
              icon="content-save"
              mode="contained"
              onPress={btnHandler}
            >
              Salvar
            </Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  font: {
    fontSize: 30,
  },
  form: {
    backgroundColor: "grey",
    borderRadius: 10,
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    width: 300,
    height: 50,
    padding: 10,
    fontSize: 30,
    backgroundColor: "#fff",
    textAlign: "center",
  },
  item: {
    margin: 15,
  },
  label: {
    marginBottom: 10,
  },
});

export default Form;
