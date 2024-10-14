import { View, Text, TouchableOpacity, ActivityIndicator, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import Container from "../../Components/Container";
import { globalStyles } from "../../styles/globalStyles";
import RowComponent from "../../Components/RowComponent";
import SectionComponent from "../../Components/SectionComponent";
import TextComponent from "../../Components/TextComponent";
import TitleComponent from "../../Components/TitleComponent";
import { colors } from "../../constants/colors";
import CardComponent from "../../Components/CardComponent";
import AntDesign from "@expo/vector-icons/AntDesign";
import Octicons from "@expo/vector-icons/Octicons";
import TagComponent from "../../Components/TagComponent";
import SpaceComponent from "../../Components/SpaceComponent";
import CircularComponent from "../../Components/CircularComponent";
import CardImageComponent from "../../Components/CardImageComponent";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AvatarGroup from "../../Components/AvatarGroup";
import ProgressBarComponent from "../../Components/ProgressBarComponent";
import Ionicons from '@expo/vector-icons/Ionicons';
import {auth}  from '../auth/firebaseConfig';
import { collection, getDocs, onSnapshot, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from '../auth/firebaseConfig'; // Assuming your Firestore config is exported from this file
import { TaskModel } from "../../models/TaskModel";

const HomeScreen = ({navigation}:any) => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const user  = auth.currentUser


  useEffect(() => {
    setIsLoading(true)
    const unsubscribe = onSnapshot(collection(db, 'tasks'), (snapshot) => {
      const items: TaskModel[] = []
      snapshot.docs.forEach((doc:any) => {
        console.log("start",doc.data())
        items.push({
          ...doc.data(),
          id:doc.id,
        })
      });
      // setData(docsData);
      setIsLoading(false)
      setTasks(items)
    });
  
    // Clean up the listener on unmount
    return () => unsubscribe();
  }, []);
  
  return (
    <View style={{flex:1}}>
    <Container isScroll>
      {/* Header */}
      <SpaceComponent height={40}/>
      <SectionComponent>
        <RowComponent justify="space-between">
          <AntDesign name="appstore-o" size={24} color="white" />
          <Octicons name="bell" size={24} color="white" />
        </RowComponent>
      </SectionComponent>
      {/* Title */}
      <SectionComponent>
        <TextComponent text={`Hi, ${user?.email}`}/>
        <RowComponent justify="space-between">
        <TitleComponent text="Be Productive today" />
        <TouchableOpacity
          onPress={async () => auth.signOut()}
        >
        <AntDesign name="logout" size={26} color={colors.orange} />
        </TouchableOpacity>
        </RowComponent>
      </SectionComponent>
      {/* Search */}
      <SectionComponent>
        <RowComponent
          styles={[globalStyles.inputContainer]}
          onPress={() => navigation.navigate('SearchScreen')}
        >
          <TextComponent text="Search" />
          <AntDesign name="search1" size={24} color="white" />
        </RowComponent>
      </SectionComponent>
      {/* Task Progress */}
      <SectionComponent>
        <CardComponent>
          <RowComponent>
            <View style={{ flex: 1 }}>
              <TitleComponent text="Task Progress" />
              <TextComponent text="30/40 task done" />
              <SpaceComponent height={12} />
              <RowComponent justify="flex-start">
                <TagComponent text="March 22" />
              </RowComponent>
            </View>
            <View>
              <CircularComponent value={80} />
            </View>
          </RowComponent>
        </CardComponent>
      </SectionComponent>
      {/* Cards */}
      
      {isLoading ? <ActivityIndicator/>: tasks.length > 0 ? <SectionComponent>
        <RowComponent styles={{ alignItems: "flex-start"}}>
          <View style={{ flex: 1}}>
            <CardImageComponent color="#BC2FFECC"
            onPress={()=> navigation.navigate('TaskDetail', {
              id:tasks[0]?.id,
              color:'#BC2FFECC'
            })}>
              <TouchableOpacity
                onPress={() => {}}
                style={[globalStyles.iconContainer]}
              >
                <MaterialCommunityIcons
                  name="pencil-plus-outline"
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
              <TitleComponent text={tasks[0]?.title || "Title"} />
              <TextComponent text={tasks[0]?.description || "description"} line={2}/>
              <View style={{marginVertical:28}}>
                <AvatarGroup uidsLength={tasks[0]?.uids.length || 0} />
              </View>
              <ProgressBarComponent percent={tasks[0]?.progress || 0} size="large" duration={1000}/>
              <TextComponent text={`Due ${tasks[0]?.dueDate?.toDate().toLocaleDateString('vi') || 'No due date'}`}/>
            </CardImageComponent>
          </View>
          <SpaceComponent width={16} />

          <View style={{ flex: 1 }}>
            <CardImageComponent color="#41C5FECC" 
            onPress={()=> navigation.navigate('TaskDetail', {
              id:tasks[1]?.id,
              color:"#41C5FECC"
            })}>
              <TouchableOpacity
                onPress={() => {}}
                style={[globalStyles.iconContainer]}
              >
                <MaterialCommunityIcons
                  name="pencil-plus-outline"
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
              <TitleComponent text={tasks[1]?.title || "Title"}/>
              <AvatarGroup uidsLength={tasks[1]?.uids.length || 0}/>
              <ProgressBarComponent percent={tasks[1]?.progress || 0}/>
            </CardImageComponent>
             <SpaceComponent height={16} />

             <CardImageComponent color="#FF983ECC" 
            onPress={()=> navigation.navigate('TaskDetail', {
              id:tasks[2]?.id ?? "",
              color:"#FF983ECC"
            })}>
              <TouchableOpacity
                onPress={() => {}}
                style={[globalStyles.iconContainer]}
              >
                <MaterialCommunityIcons
                  name="pencil-plus-outline"
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
              <TitleComponent text={tasks[2]?.title || "Title"} />
              <TextComponent text={tasks[2]?.description || "description"} line={2}/>
            </CardImageComponent>
          </View>
        </RowComponent>
      </SectionComponent> : <></>}

      {/* Urgents tasks */}
      <SectionComponent>
        <TitleComponent text="Urgents tasks"/>
        <CardComponent>
          <RowComponent>
            <CircularComponent value={40} radius={40} />
            <View style={{flex:1,paddingLeft:20}}>
              <TextComponent text="Title of task"/>
            </View>
          </RowComponent>
        </CardComponent>
      </SectionComponent>
    </Container>

    {/* Add New Tasks */}
    <View style={{
       position:'absolute',
       bottom:0,
       right:0,
       left:0,
       paddingVertical:20,
       paddingHorizontal:60
    }}>
      <TouchableOpacity activeOpacity={0.7} 
        onPress={() => navigation.navigate('AddNewTask')}
      style={
       [globalStyles.row,{
        backgroundColor:colors.blueButton,
        padding:10,
        borderRadius:100
       }]
      }>
        <TextComponent text="Add new task" flex={0}/>
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
    </View>

  );
};

export default HomeScreen;
