import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import TextComponent from "./TextComponent";
import { fontFamilies } from "../constants/fontFamilies";
import { colors } from "../constants/colors";

interface Props {
  text: string;
  isLoading?: boolean;
  onPress?: () => void;
  color?: string;
}
const ButtonComponent = (props: Props) => {
  const { text, isLoading, onPress, color } = props;
  return (
    <TouchableOpacity
      disabled={isLoading}
      onPress={onPress}
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: color ? color : isLoading ? colors.gray : colors.green,
        paddingVertical: 8,
        minHeight:48,
        borderRadius:10
      }}
    >
      {isLoading ? (
        <ActivityIndicator /> // active loading
      ) : (
        <TextComponent
          text={text}
          flex={0}
          size={18}
          font={fontFamilies.bold}
        />
      )}
    </TouchableOpacity>
  );
};

export default ButtonComponent;
