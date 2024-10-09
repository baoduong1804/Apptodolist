import { View, Text } from "react-native";
import React, { useState } from "react";
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
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState("");

  const handleLoginWithEmail = async () => {
    if (!email || !password) {
      setErrorText("Please enter your email and password");
    } else {
      setIsLoading(true);
      setErrorText("");
      try {
        // Sign up
        await signInWithEmailAndPassword(auth, email, password);
        setErrorText("User login successfully!");
      } catch (error: any) {
        setErrorText(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const enterEmail = (val: string) => {
    setEmail(val);
    setErrorText("");
  };
  const enterPassword = (val: string) => {
    setPassword(val);
    setErrorText("");
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
          text="LOGIN"
          font={fontFamilies.bold}
          styles={{
            flex: 0,
            textAlign: "center",
          }}
        />
        <View>
          <InputComponent
            value={email}
            onChange={enterEmail}
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
            onChange={enterPassword}
            prefix={
              <MaterialIcons name="lock-outline" size={24} color="white" />
            }
            placeholder="Password"
            title="Password"
            isPassWord
          />
            {/* error text */}
            <View style={{height:20}}>
            {errorText && (
              <TextComponent text={errorText} color="coral" flex={0} />
            )}
            </View>
        </View>
        <SpaceComponent height={20} />
        <ButtonComponent
          isLoading={isLoading}
          text="LOGIN"
          onPress={handleLoginWithEmail}
        />
        <SpaceComponent height={10} />
        <Text
          style={[globalStyles.text, { fontSize: 13, textAlign: "center" }]}
        >
          You don't have an account?{"  "}
          <Text
            style={{ color: "coral" }}
            onPress={() => navigation.navigate("SigninScreen")}
          >
            Create an account
          </Text>
        </Text>
      </SectionComponent>
    </Container>
  );
};

export default LoginScreen;
