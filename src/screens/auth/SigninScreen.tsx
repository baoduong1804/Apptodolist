import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Container from "../../Components/Container";
import TextComponent from "../../Components/TextComponent";
import SectionComponent from "../../Components/SectionComponent";
import TitleComponent from "../../Components/TitleComponent";
import SpaceComponent from "../../Components/SpaceComponent";
import { fontFamilies } from "../../constants/fontFamilies";
import InputComponent from "../../Components/InputComponent";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import ButtonComponent from "../../Components/ButtonComponent";
import { globalStyles } from "../../styles/globalStyles";
import { colors } from "../../constants/colors";
import {auth}  from './firebaseConfig';
import { initializeApp, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';

const SigninScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user:any) => {
  //     setUser(user);
  //   });

  //   return () => unsubscribe();
  // }, [auth]);

  
  const handleSigninWithEmail = async () => {
    setIsLoading(true)
    try {
          // Sign up
          await createUserWithEmailAndPassword(auth, email, password);
          setErrorText('User created successfully!');
        }
    
    catch (error:any) {
      setErrorText(error.message);
    }finally{
      setIsLoading(false)
    }
  };

  return (
    <Container>
      <SpaceComponent height={50} />
      <SectionComponent
        styles={{
          justifyContent: "center",
          flex: 1,
        }}
      >
        <TitleComponent
          size={40}
          text="SIGN IN"
          font={fontFamilies.bold}
          styles={{
            flex: 0,
            textAlign: "center",
          }}
        />
        <View>
          <InputComponent
            value={email}
            onChange={(val) => setEmail(val)}
            prefix={
              <MaterialCommunityIcons
                name="email-outline"
                size={24}
                color="white"
              />
            }
            placeholder="Email"
            title="Email"
            allowClear
          />
          <InputComponent
            value={password}
            onChange={(val) => setPassword(val)}
            prefix={
              <MaterialIcons name="lock-outline" size={24} color="white" />
            }
            placeholder="Password"
            title="Password"
          />
          {errorText && <TextComponent text={errorText} color="coral" flex={0}/>}
        </View>
        <SpaceComponent height={40} />
        <ButtonComponent
          isLoading={isLoading}
          text="SIGN IN"
          onPress={handleSigninWithEmail}
        />
        <SpaceComponent height={10} />
        <Text
          style={[globalStyles.text, { fontSize: 13, textAlign: "center" }]}
        >
          You have an already account?{"  "}
          <Text
            style={{ color: colors.green }}
            onPress={() => navigation.navigate("LoginScreen")}
          >
            Login
          </Text>
        </Text>
      </SectionComponent>
    </Container>
  );
};

export default SigninScreen;
