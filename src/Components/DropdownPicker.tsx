import { View, Text, Modal, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SelectModel } from "../models/SelecModel";
import TitleComponent from "./TitleComponent";
import RowComponent from "./RowComponent";
import TextComponent from "./TextComponent";
import { globalStyles } from "../styles/globalStyles";
import { colors } from "../constants/colors";
import Entypo from "@expo/vector-icons/Entypo";
import ButtonComponent from "./ButtonComponent";
import InputComponent from "./InputComponent";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import SpaceComponent from "./SpaceComponent";

interface Props {
  title?: string;
  items: SelectModel[];
  selected?: string[];
  onSelect: (val: string[]) => void;
  multible?: boolean; // chọn được nhiều
}

const DropdownPicker = (props: Props) => {
  const { title, items, selected, onSelect, multible } = props;
  const [isVisible, setIsVisible] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [results, setResults] = useState<SelectModel[]>([]);
  const [dataSelected, setDataSelected] = useState<string[]>([]);

    useEffect(()=>{
        selected && setDataSelected(selected)
        console.log('selected',selected)
    },[isVisible,selected])
  // filter
  useEffect(() => {
    if (!searchKey) {
      setResults([]);
    } else {
      const data = items.filter((element) =>
        element.label.toLowerCase().includes(searchKey.toLowerCase())
      );
      setResults(data);
    }
  }, [searchKey]);

  //choose item
  const handleSelectItem = (id: string) => {
    const data = [...dataSelected];
    if (multible) {
      const index = data.findIndex((element) => element === id); //element chua co = -1, co roi thi khac -1

      if (index !== -1) {
        data.splice(index, 1);
      } else {
        data.push(id);
      }
      setDataSelected(data);
    } else {
      if (data.includes(id)) {
        setDataSelected([]);
      } else {
        setDataSelected([id]);
      }
    }
  };

  // when enter cofirm
  const handleConfirmSelect = () => {
    onSelect(dataSelected)
    setIsVisible(false)
    setDataSelected([])
  }

  //remove Item
  const handleRemoveItemSelected = (index:number) => {
    if(selected){
        selected.splice(index,1)
        onSelect(selected)
    }
  }
  //render Items
  const renderSelectedItem = (id:string,index:number) => {
    const item = items.find(element => element.value === id)
    return (
        item && <RowComponent key={id}  
                onPress={()=>handleRemoveItemSelected(index)}
            styles={{
                borderWidth:1,
                borderColor:colors.orange,
                borderRadius:4,
                marginRight:10,
                padding:4,
                marginBottom:10
            }}
        >
            <TextComponent text={item.label} flex={0} />
            <SpaceComponent width={10}/>
            <SimpleLineIcons name="close" size={20} color={colors.orange} />
        </RowComponent>
    )
  }
  return (
    <View>
      {title && <TitleComponent text={title} />}
      <RowComponent
        onPress={() => setIsVisible(true)}
        styles={[
          globalStyles.inputContainer,
          {
            marginTop: title ? 8 : 0,
            paddingRight: 12,
          },
        ]}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          {selected && selected.length > 0 ? <RowComponent  styles={{flexWrap:'wrap',justifyContent:"flex-start"}}>
            {selected.map((id,index)=> renderSelectedItem(id,index))}
          </RowComponent>:(
            <TextComponent
            text="Select"
            flex={0}
            color={colors.placeHolderColor}
          />
          )}
        </View>
        <Entypo name="chevron-thin-down" size={20} color="white" />
      </RowComponent>
      <Modal
        visible={isVisible}
        style={{ flex: 1 }}
        transparent
        animationType="slide"
        statusBarTranslucent
      >
        <View
          style={[
            globalStyles.container,
            {
              padding: 20,
              paddingVertical: 60,
            },
          ]}
        >
          <FlatList
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <RowComponent styles={{ paddingBottom: 20 }}>
                <View style={{ flex: 1 }}>
                  <InputComponent
                    isNotPaddingBottom
                    value={searchKey}
                    onChange={(val) => setSearchKey(val)}
                    placeholder="Search..."
                    prefix={<Feather name="search" size={24} color="white" />}
                    allowClear
                  />
                </View>
                <TouchableOpacity
                  onPress={() => setIsVisible(false)}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    paddingLeft: 16,
                  }}
                >
                  {/* exit icon */}
                  <Ionicons name="exit-outline" size={32} color="white" />
                </TouchableOpacity>
              </RowComponent>
            }
            data={searchKey ? results : items}
            renderItem={({ item }) => (
              <RowComponent
                key={item.value}
                styles={{ paddingVertical: 6 }}
                onPress={() => handleSelectItem(item.value)}
              >
                <TextComponent
                  text={item.label}
                  size={18}
                  color={
                    dataSelected.includes(item.value)
                      ? colors.green
                      : colors.text
                  }
                />
                {dataSelected.includes(item.value) && (
                  <AntDesign
                    name="checkcircleo"
                    size={20}
                    color={colors.green}
                  />
                )}
              </RowComponent>
            )}
          />
          <ButtonComponent text="Cofirm" onPress={handleConfirmSelect} />
        </View>
      </Modal>
    </View>
  );
};

export default DropdownPicker;
