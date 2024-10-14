import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Container from "../../Components/Container";
import SectionComponent from "../../Components/SectionComponent";
import TextComponent from "../../Components/TextComponent";
import { globalStyles } from "../../styles/globalStyles";
import RowComponent from "../../Components/RowComponent";
import Ionicons from "@expo/vector-icons/Ionicons";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../auth/firebaseConfig";
import { TaskModel } from "../../models/TaskModel";
import TitleComponent from "../../Components/TitleComponent";
import Feather from "@expo/vector-icons/Feather";
import SpaceComponent from "../../Components/SpaceComponent";
import AvatarGroup from "../../Components/AvatarGroup";
import { HandleDateTime } from "../../utils/handleDateTime";
import { colors } from "../../constants/colors";
import CardComponent from "../../Components/CardComponent";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Slider from "@react-native-community/slider";
import ButtonComponent from "../../Components/ButtonComponent";

interface RouterProp {
  id: string;
  color: string;
}
const TaskDetail = ({ navigation, route }: any) => {
  const { id, color }: RouterProp = route.params;
  const [taskDetail, setTaskDetail] = useState<TaskModel>();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "tasks", id), (docSnapshot) => {
      if (docSnapshot.exists()) {
        setTaskDetail({
          id: docSnapshot.id,
          ...docSnapshot.data(),
        } as TaskModel);
      } else {
        console.log("No such document!");
      }
    });

    // Clean up the listener on unmount
    return () => unsubscribe();
  }, [id]);

  const handleGetTime = () => {
    const timeStart = taskDetail?.start.toDate();
    const timeEnd = taskDetail?.end.toDate();
    const time = `${timeStart
      .getHours()
      .toString()
      .padStart(2, "0")}:${timeStart
      .getMinutes()
      .toString()
      .padStart(2, "0")} - ${timeEnd
      .getHours()
      .toString()
      .padStart(2, "0")}:${timeEnd.getMinutes().toString().padStart(2, "0")}`;
    return time;
  };

  return (
    taskDetail && (
      <View style={{ flex: 1, backgroundColor: colors.bgColor }}>
        {/* Header */}
        <SectionComponent
          isNotpadding
          styles={{
            backgroundColor: color ?? "#BC2FFECC",
            paddingTop: 40,
            paddingHorizontal: 20,
            paddingBottom: 16,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
          }}
        >
          <RowComponent justify="flex-start">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                paddingVertical: 10,
                paddingRight: 10,
                bottom: 2,
                right: 4,
              }}
            >
              <Ionicons name="chevron-back-sharp" size={28} color="white" />
            </TouchableOpacity>
            <TitleComponent text={taskDetail.title || "Task Detail"} flex={1} />
          </RowComponent>

          <SpaceComponent height={18} />
          <TextComponent text="Due date:" />
          <SpaceComponent height={4} />

          <RowComponent>
            <RowComponent styles={{ flex: 1 }} justify="flex-start">
              <Feather name="clock" size={18} color="white" />
              <SpaceComponent width={8} />
              <TextComponent text={handleGetTime()} size={14} />
            </RowComponent>
            <SpaceComponent width={16} />
            <RowComponent styles={{ flex: 1 }}>
              <Ionicons name="calendar-outline" size={18} color="white" />
              <SpaceComponent width={8} />
              <TextComponent
                text={`${HandleDateTime.ChangeMonth(
                  taskDetail.dueDate.toDate().getMonth()
                )} ${taskDetail.dueDate.toDate().getDate()}`}
                size={14}
              />
            </RowComponent>
            <RowComponent styles={{ flex: 1 }} justify="flex-end">
              <AvatarGroup uidsLength={taskDetail.uids.length} />
            </RowComponent>
          </RowComponent>
        </SectionComponent>

        {/* Description    */}
        <ScrollView style={{
          // marginBottom:50
        }}>
          <SectionComponent
            styles={{ paddingHorizontal: 20, paddingVertical: 14 }}
          >
            <TitleComponent text="Description:" />
            <SpaceComponent height={12} />
            <CardComponent
              styles={{
                backgroundColor: colors.bgColor,
                borderWidth: 1,
                borderColor: colors.gray,
              }}
            >
              <TextComponent text={taskDetail.description} />
            </CardComponent>
            <SpaceComponent height={20} />
            {/* Files */}
            <CardComponent>
              <RowComponent>
                <TextComponent text="Files & Links: " />
                <AntDesign name="jpgfile1" size={44} color={colors.green} />
                <AntDesign name="pdffile1" size={44} color="#F04646" />
                <AntDesign name="filetext1" size={44} color="#6AB0FF" />
                <AntDesign name="addfile" size={44} color={colors.text} />
              </RowComponent>
            </CardComponent>
            <SpaceComponent height={20} />

            {/* Progress */}
            <SectionComponent>
              <RowComponent justify="flex-start">
                <MaterialCommunityIcons
                  name="circle-slice-8"
                  size={24}
                  color={colors.green}
                />
                <SpaceComponent width={6} />
                <TitleComponent text="Progress" />
              </RowComponent>
              <RowComponent>
                <Slider
                  style={{ width: 200, height: 40, flex:1 }}
                  minimumValue={0}
                  maximumValue={100}
                  minimumTrackTintColor={colors.green}
                  maximumTrackTintColor={colors.gray}
                  thumbTintColor={colors.green}
                  value={progress}
                  onValueChange={val=>setProgress(val)}
                  step={1}
                />
                <TextComponent text={`${progress}%`} flex={0}/>
              </RowComponent>
            </SectionComponent>

            {/* Sub tasks */}
            <SectionComponent>
              <RowComponent justify="space-between">
                <TitleComponent text="Sub tasks" />
                <AntDesign name="plussquare" size={30} color={colors.green} />
              </RowComponent>
              {Array.from({ length: 3 }).map((item, index) => (
                <CardComponent
                  key={`subtask ${index}`}
                  styles={{
                    marginTop: 10,
                  }}
                >
                  <RowComponent>
                    <AntDesign
                      name="checkcircle"
                      size={20}
                      color={colors.green}
                    />
                    <SpaceComponent width={10} />
                    <TextComponent text="helcnnnnnnnnnnckhsls" />
                  </RowComponent>
                </CardComponent>
              ))}
            </SectionComponent>
            <SpaceComponent height={30}/>
              {/* Button Update 1 */}
                <View>

                <ButtonComponent text="UPDATE" color={color}/>
                </View>
              
           


          </SectionComponent>
        </ScrollView>
         {/* Button Update 2*/}
         {/* <View style={{
                position:"absolute",
                right:0,
                left:0,
                bottom:0,
                marginTop:10
              }}>
                <ButtonComponent text="UPDATE" color={color}/>
              </View> */}
      </View>
    )
  );
};

export default TaskDetail;
