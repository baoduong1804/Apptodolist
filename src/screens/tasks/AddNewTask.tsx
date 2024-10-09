import { View, Text, Button } from "react-native";
import React, { useEffect, useState } from "react";
import Container from "../../Components/Container";
import SpaceComponent from "../../Components/SpaceComponent";
import { TaskModel } from "../../models/TaskModel";
import InputComponent from "../../Components/InputComponent";
import SectionComponent from "../../Components/SectionComponent";
import DateTimePickerComponent from "../../Components/DateTimePickerComponent";
import RowComponent from "../../Components/RowComponent";
import DropdownPicker from "../../Components/DropdownPicker";
import { SelectModel } from "../../models/SelecModel";
import firestore, { collection, getDocs } from "firebase/firestore";
import { db } from "../auth/firebaseConfig";

const initValue: TaskModel = {
  title: "",
  description: "",
  dueDate: new Date(),
  start: new Date(),
  end: new Date(),
  uids: [],
  fileUrls: [],
};


const AddNewTask = ({ navigation }: any) => {
  const [taskDetail, setTaskDetail] = useState<TaskModel>(initValue);
  const [usersSelect, setUsersSelect] = useState<SelectModel[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, "users"); // Tạo tham chiếu tới collection 'users'
        const userSnapshot = await getDocs(usersCollection); // Lấy danh sách document
        const userList = userSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })); // Chuyển đổi thành mảng
        const items: SelectModel[] = []
        userList.forEach(item => {
          items.push({
            label:item.name,
            value: item.id
          })
        })
        setUsersSelect(items)
      } catch (error) {
        console.error("Error fetching users: ", error);
      } finally {
      }
    };

    fetchUsers();
  }, []);


  const handleChangeValue = (id: string, value: string | Date | string[]) => {
    const item: any = { ...taskDetail };
    item[`${id}`] = value;
    setTaskDetail(item);
  };
  const handleAddNewTask = async () => {
    console.log('taskDetail',taskDetail);
  };

  return (
    <Container back title="Add New Screen" isScroll>
      <SectionComponent>
        <InputComponent
          value={taskDetail.title}
          onChange={(val) => handleChangeValue("title", val)}
          title="Title"
          allowClear
          placeholder="Title of task"
        />
        <InputComponent
          value={taskDetail.description}
          onChange={(val) => handleChangeValue("description", val)}
          title="Description"
          allowClear
          placeholder="Title of task"
          multible
          numberOfLine={3}
        />
        <DateTimePickerComponent
          selected={taskDetail.dueDate}
          onSelect={(val) => handleChangeValue("dueDate", val)}
          placeholder="choice"
          type="date"
          title="Due date"
        />
        <RowComponent justify="space-between">
          <View style={{ flex: 1 }}>
            <DateTimePickerComponent
              selected={taskDetail.start}
              onSelect={(val) => handleChangeValue("start", val)}
              placeholder="choice"
              type="time"
              title="Start"
            />
          </View>
          <SpaceComponent width={14} />
          <View style={{ flex: 1 }}>
            <DateTimePickerComponent
              selected={taskDetail.end}
              onSelect={(val) => handleChangeValue("end", val)}
              placeholder="choice"
              type="time"
              title="End"
            />
          </View>
        </RowComponent>
        <DropdownPicker
          title="Member"
          selected={taskDetail.uids}
          items={usersSelect}
          onSelect={val => handleChangeValue('uids',val)}
          multible
        />
      </SectionComponent>

      <SectionComponent>
        <Button title="Save" onPress={handleAddNewTask} />
      </SectionComponent>
    </Container>
  );
};

export default AddNewTask;
