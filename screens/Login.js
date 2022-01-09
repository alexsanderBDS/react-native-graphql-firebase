import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TextInput, Dimensions } from "react-native";
import { Button } from "react-native-paper";
import { AuthContext } from "../context/AuthContext";
import { auth, googleAuthProvider } from "../firebase";

const maxWidth = Dimensions.get("window").width;
const maxHeight = Dimensions.get("window").height;

const Login = () => {
  const [email, setEmail] = useState(process.env.API_EMAIL.toString());
  const [password, setPassword] = useState(process.env.API_PASSWORD.toString());

  const { dispatch } = useContext(AuthContext);

  const pressHandler = async () => {
    // console.log(email);

    auth
      .signInWithEmailAndPassword(email, password)
      .then(async (result) => {
        const { user } = result;
        const tokenID = await user.getIdTokenResult();
        dispatch({
          type: "LOGGED_IN_GOOGLE",
          payload: {
            email: user.email,
            token: tokenID.token,
          },
        });

        console.log(user);
      })
      .catch((err) => {
        console.log(err.uid);
      });

    // auth.signInWithPopup(googleAuthProvider).then(async (result) => {
    //   const { user } = result;
    //   const tokenID = await user.getIdTokenResult();

    //   dispatch({
    //     type: "LOGGED_IN_GOOGLE",
    //     payload: {
    //       email: user.email,
    //       token: tokenID.token,
    //     },
    //   });
    // });
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.font}>E-mail</Text>
        <TextInput
          onChangeText={(val) => setEmail(val)}
          style={[styles.font, styles.input]}
          placeholder="informe o seu e-mail"
          autoCompleteType="email"
          value={email}
        />
      </View>
      <View style={styles.form}>
        <Text style={styles.font}>Senha</Text>
        <TextInput
          onChangeText={(val) => setPassword(val)}
          style={[styles.font, styles.input]}
          placeholder="informe sua senha"
          autoCompleteType="password"
          value={password}
        />
      </View>
      <Button icon="email" mode="contained" onPress={pressHandler}>
        Confirmar
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "yellow",
    height: maxHeight,
    width: maxWidth,
    justifyContent: "center",
    alignItems: "center",
  },
  font: {
    fontSize: 20,
    padding: 5,
    margin: 5,
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    width: 350,
  },
  btn: {
    height: 20,
    width: 20,
  },
  form: {
    marginBottom: 20,
  },
});

export default Login;
