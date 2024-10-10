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
import { createUserWithEmailAndPassword} from '@firebase/auth';

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
    try {// try có thể bắt lỗi và nhận lỗi là error để xử lý trong catch
          // Sign up 
          await createUserWithEmailAndPassword(auth, email, password);//await khi hàm bất đồng bộ đc hoàn thành xong thì mới xử lý công việc tiếp theo
          setErrorText('User created successfully!');
        }
    
    catch (error:any) {
      setErrorText(error.message);
    }finally{
      setIsLoading(false)
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
