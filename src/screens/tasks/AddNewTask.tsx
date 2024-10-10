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
import { SelectFiles, SelectModel } from "../../models/SelecModel";
import  { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../auth/firebaseConfig";
import ButtonComponent from "../../Components/ButtonComponent";
import TitleComponent from "../../Components/TitleComponent";
import Feather from '@expo/vector-icons/Feather';
import * as DocumentPicker from 'expo-document-picker';
import TextComponent from "../../Components/TextComponent";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import * as FileSystem from 'expo-file-system';

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
  const [selectedFiles, setSelectedFiles] = useState<SelectFiles[]>([])
  const [isLoading, setIsLoading] = useState(false);
  
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
        userList.forEach((item:any) => {
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


  //send data firestore database
  const handleAddNewTask = async () => {
    setIsLoading(true)
    try {
      // Upload từng file lên Firebase Storage và lấy URL
      const fileUrls = await Promise.all(selectedFiles.map(async (file) => {
        console.log('file', file);
        return await uploadFile(file); // uploadFile trả về URL
      }));
  
      // Tạo dữ liệu cần lưu
      const data = {
        ...taskDetail,
        fileUrls: fileUrls, // Gán URL file đã upload
      };
      
      // Lọc các trường undefined
      const filteredData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== undefined)
      );
  
      console.log('data to be added', filteredData);
      
      // Lưu data vào Firestore
      const tasksCollection = collection(db, "tasks");
      await addDoc(tasksCollection, filteredData); // Thêm document mới vào collection
      
      console.log("Task added successfully!");
      setIsLoading(false)
      navigation.goBack()
    } catch (error) {
      console.error("Error adding task: ", error);
    }
  };
  

  const handleChangeValue = (id: string, value: string | Date | string[]) => {
    const item: any = { ...taskDetail };
    item[`${id}`] = value;
    setTaskDetail(item);
  };

  //Chọn files
    const handlePickerDocument = async () => {
    try {
      // Mở trình chọn file
      let result = await DocumentPicker.getDocumentAsync({});
      // Nếu người dùng chọn file thành công
      if (!result.canceled) {
        setSelectedFiles((prevFiles) => [
          ...prevFiles,
          { name: result.assets[0].name, uri: result.assets[0].uri }

        ]);
        // In ra thông tin file: name, size, URI
      } else {
        console.log('File picking was cancelled');
      }
    } catch (error) {
      console.error('Error picking document:', error);
    }
  }

  //remove file
  const handleRemoveFiles = (index:number)=>{
  // Tạo mảng mới mà không chứa file ở vị trí `index`
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles)
      console.log(selectedFiles)
    
  }

  // Hàm upload file
  const uploadFile = async (file: SelectFiles) => {
    try {
      // Khởi tạo Firebase Storage
      const storage = getStorage();
      
      // Tạo một reference tới vị trí bạn muốn lưu file
      const storageRef = ref(storage, `files/${file.name}`);
  
      // Fetch file từ URI và tạo Blob
      const response = await fetch(file.uri);
      const blob = await response.blob();
      
      // Upload file
      await uploadBytes(storageRef, blob);
      
      console.log("File uploaded successfully!");
  
      // Trả về URL của file đã upload
      const fileUrl = `https://firebasestorage.googleapis.com/v0/b/${storage.bucket}/o/${encodeURIComponent(storageRef.fullPath)}?alt=media`;
      return fileUrl;
    } catch (error) {
      console.error("Error uploading file: ", error);
      throw error; // Ném lỗi để quản lý ở nơi gọi
    }
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
      {/* Files */}
      <View>
        <RowComponent justify="flex-start" onPress={handlePickerDocument}>
        <TitleComponent text="Files:"/>
        <SpaceComponent width={10}/>
        <Feather name="file" size={24} color="white" />
        </RowComponent>
        {selectedFiles && selectedFiles.length>0 && selectedFiles.map((item,index) => (
          <RowComponent 
          key={index}
          onPress={()=>handleRemoveFiles(index)}
          styles={{borderColor:'white',
            borderWidth:1,
            flex:1,
            borderRadius:6,
            marginVertical:4
          }}>
            <MaterialIcons name="clear" size={24} color="white" />
            <TextComponent text={item.name}/>
          </RowComponent>
        ))}
      </View>

      {/* Button save */}
      <SectionComponent>
      <SpaceComponent height={20}/>
        <ButtonComponent text="SAVE" onPress={handleAddNewTask} isLoading={isLoading} />
        <SpaceComponent height={60}/>
      </SectionComponent>
    </Container>
  );
};

export default AddNewTask;
