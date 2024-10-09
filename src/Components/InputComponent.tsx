import {
  View,
  Text,
  TextInput,
  VirtualizedList,
  TouchableOpacity,
} from "react-native";
import React, { ReactNode, useState } from "react";
import TitleComponent from "./TitleComponent";
import RowComponent from "./RowComponent";
import { globalStyles } from "../styles/globalStyles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";
import { colors } from "../constants/colors";

interface Props {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  title?: string;
  prefix?: ReactNode;
  affix?: ReactNode;
  allowClear?: boolean;
  multible?: boolean;
  numberOfLine?: number;
  isPassWord?: boolean;
  isNotPaddingBottom?:boolean
}
const InputComponent = (props: Props) => {
  const {
    value,
    onChange,
    placeholder,
    title,
    prefix,
    affix,
    allowClear,
    multible,
    numberOfLine,
    isPassWord,
    isNotPaddingBottom
  } = props;

  const [showPass, setShowPass] = useState(false);
  return (
    <View style={{ marginBottom: isNotPaddingBottom ? 0 : 16 }}>
      {title && <TitleComponent text={title} />}
      <RowComponent
        styles={[
          globalStyles.inputContainer,
          {
            minHeight: multible && numberOfLine ? 32 * numberOfLine : 32,
            alignItems: "flex-start",
            marginTop: 0,
          },
        ]}
      >
        {prefix && prefix}
        <View
          style={{
            flex: 1,
            paddingLeft: prefix ? 10 : 0,
            paddingRight: affix ? 10 : 0,
          }}
        >
          <TextInput
            style={[
              globalStyles.text,
              {
                flex: 1,
                textAlignVertical: "top",
              },
            ]}
            placeholder={placeholder ?? ""}
            placeholderTextColor={colors.placeHolderColor}
            value={value}
            onChangeText={(val) => onChange(val)}
            numberOfLines={numberOfLine}
            multiline={multible}
            secureTextEntry={isPassWord ? !showPass : false}
          />
        </View>
        {affix && affix}
        {allowClear && value && (
          <TouchableOpacity onPress={() => onChange("")}>
            <MaterialIcons name="clear" size={24} color="white" />
          </TouchableOpacity>
        )}
        {isPassWord && (
          <TouchableOpacity onPress={()=>setShowPass(!showPass)}>
            {showPass ? (
          <Octicons name="eye-closed" size={24} color="white" />
        ) : (
          <Octicons name="eye" size={24} color="white" />
        )}
          </TouchableOpacity>
        )}
      </RowComponent>
    </View>
  );
};

export default InputComponent;
