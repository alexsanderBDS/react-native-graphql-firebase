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
import * as Contacts from "expo-contacts";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";

const ContactsModal = ({ setAdd }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState(undefined);
  const [search, setSearch] = useState("");

  useEffect(async () => {
    if (modalVisible) {
      const { status } = await Contacts.requestPermissionsAsync();

      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          const value = data.filter((item) => {
            return item.firstName.toLowerCase().includes(search);
          });
          if (value) {
            setData(value);
          }
        }
      }

      return () => "";
    }

    return () => "";
  }, [modalVisible, data, search]);

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
            <View style={styles.search}>
              <FontAwesome
                name="search"
                style={{ flex: 1 }}
                size={25}
                color="black"
              />
              <TextInput
                style={{ fontSize: 25, flex: 4 }}
                placeholder="Procurar"
                onChangeText={(val) => setSearch(val)}
                editable={!data ? false : true}
              />
            </View>
            <View
              style={{
                flex: 2,
                alignItems: "stretch",
                width: "100%",
              }}
            >
              {!data ? (
                <Text style={{ padding: 10 }}>
                  Sua Lista não contém contatos
                </Text>
              ) : (
                <FlatList
                  data={data}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => {
                        setAdd((prevState) => ({
                          ...prevState,
                          contact: item.phoneNumbers[0].number,
                        }));
                        setModalVisible(!modalVisible);
                      }}
                    >
                      <View style={styles.list}>
                        <Text style={styles.listText}>{item.firstName}</Text>
                        <Text style={styles.listText}>
                          {item.phoneNumbers[0].number
                            ? item.phoneNumbers[0].number
                            : ""}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              )}
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
          <Entypo name="dots-three-horizontal" size={17} color="black" />
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
  list: {
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    margin: 5,
  },
  listText: {
    fontSize: 30,
    padding: 5,
    textAlign: "center",
  },
  search: {
    flexDirection: "row",
    backgroundColor: "grey",
    flexWrap: "nowrap",
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
    marginBottom: 10,
  },
});

export default ContactsModal;
