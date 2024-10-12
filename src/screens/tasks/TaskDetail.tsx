import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Container from '../../Components/Container'
import SectionComponent from '../../Components/SectionComponent'
import TextComponent from '../../Components/TextComponent'
import { globalStyles } from '../../styles/globalStyles'
import RowComponent from '../../Components/RowComponent'
import Ionicons from '@expo/vector-icons/Ionicons';
import { collection, doc, onSnapshot } from 'firebase/firestore'
import { db } from '../auth/firebaseConfig'
import { TaskModel } from '../../models/TaskModel'
import TitleComponent from '../../Components/TitleComponent'
import Feather from '@expo/vector-icons/Feather';
import SpaceComponent from '../../Components/SpaceComponent'
import AvatarGroup from '../../Components/AvatarGroup'


interface RouterProp{
    id:string,
    color:string
}
const TaskDetail = ({navigation,route}:any) => {
   const {id,color}:RouterProp = route.params
    const [taskDetail, setTaskDetail] = useState<TaskModel>();

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, 'tasks', id), (docSnapshot) => {
            if (docSnapshot.exists()) {
                setTaskDetail({ id: docSnapshot.id, ...docSnapshot.data() } as TaskModel);
            } else {
                console.log("No such document!");
            }
        });

        // Clean up the listener on unmount
        return () => unsubscribe();
    }, [id]);
console.log(taskDetail)
  return taskDetail && (
    <ScrollView  style={{flex:1}}>
        <SectionComponent styles={{
            backgroundColor: color ?? '#BC2FFECC',
            paddingTop:30,
            paddingHorizontal:20,
            paddingBottom:16
        }}>
          <RowComponent justify='flex-start'>
            <TouchableOpacity onPress={()=>navigation.goBack()}
                style={{
                    paddingVertical:10,
                    paddingRight:20
                }}
                >
            <Ionicons name="chevron-back-sharp" size={28} color="white"/>
            </TouchableOpacity>
            <TitleComponent text={taskDetail.title || "Task Detail"} flex={1}/>
          </RowComponent>

          <SpaceComponent height={18}/>
          <TextComponent text='Due date:'/>
            <SpaceComponent height={4}/>
            
          <RowComponent >
            <RowComponent styles={{flex:1}}>
            <Feather name="clock" size={18} color="white" />
            <SpaceComponent width={8}/>
            <TextComponent text={'10am - 11am'} size={14} />
            </RowComponent>
            <SpaceComponent width={20}/>
            <RowComponent styles={{flex:1}}>
            <Ionicons name="calendar-outline" size={18} color="white" />
            <SpaceComponent width={8}/>
            <TextComponent text={'May 29'} size={14}/>
            </RowComponent>
            <RowComponent styles={{flex:1}} justify='flex-end'>
            <AvatarGroup uidsLength={taskDetail.uids.length}/>
            </RowComponent>
          </RowComponent>

          
        </SectionComponent>
    </ScrollView>
  )
}

export default TaskDetail