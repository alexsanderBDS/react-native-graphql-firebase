import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { gql, useQuery } from "@apollo/client";
import { db, collection, addDoc } from "../firebase";
import Login from "../screens/Login";

const QUERYING = gql`
  query {
    countries {
      __typename @skip(if: true)
      name
      languages {
        __typename @skip(if: true)
        name
        native
      }
      currency
    }
  }
`;

const Home = () => {
  const { loading, error, data } = useQuery(QUERYING);
  const [mygql, setMyGql] = useState("");
  const [text, setText] = useState("");
  const [getValue, setGetValue] = useState("");

  useEffect(() => {
    if (data && data.countries) {
      setMyGql(data.countries);
    }
  }, [data]);

  const handlePressBtn = () => {
    try {
      setGetValue(
        mygql.find((country) => {
          return country.name.toLowerCase() === text.toLowerCase();
        })
      );

      const getCollection = await collection(db, "search");
      addDoc(getCollection, {
        country: getValue.name,
        language: getValue && getValue.languages[0].name,
        currency: getValue.currency,
      })
        .then((res) => {
          console.log("success message: ", res);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error.message, text);
    }
  };

  return (
    <View style={styles.container}>
      <Login />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
  },
  txt: {
    fontSize: 20,
    textAlign: "center",
    padding: 2,
  },
  input: {
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 10,
    textAlign: "center",
    fontSize: 29,
    width: 200,
  },
  item: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
});

export default Home;
