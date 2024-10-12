import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/homes/HomeScreen";
import AddNewTask from "../screens/tasks/AddNewTask";

import SigninScreen from "../screens/auth/SigninScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import {auth} from '../screens/auth/firebaseConfig'
import { onAuthStateChanged } from "firebase/auth";
import SearchScreen from "../screens/SearchScreen";
import TaskDetail from "../screens/tasks/TaskDetail";
// // Cấu hình Firebase




const Router = () => {
  const Stack = createNativeStackNavigator();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {//onAuthStateChanged đăng kí xong tự động đăng nhập
      setIsLogin(!!user); // Thiết lập isLogin là true nếu có user, ngược lại false
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth]);
  
  const MainRouter = (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="AddNewTask" component={AddNewTask} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="TaskDetail" component={TaskDetail} />
    </Stack.Navigator>
  );

  const AuthRouter = (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SigninScreen" component={SigninScreen} />
    </Stack.Navigator>
  );

  // Trả về MainRouter hoặc AuthRouter dựa vào isLogin
  return true ? MainRouter : AuthRouter;
};

export default Router;
