import { View, Text } from "@tarojs/components";
import IconFont from "@/components/iconfont/iconfont";
import "./index.scss";
import XInput from "@/components/Input";
import { useState } from "react";

export default () => {
  console.log("重新渲染 index");
  const [state, setState] = useState({
    inputValue1: "",
    inputValue2: ""
  });
  const onChange = (input: string, key: string) => {
    setState(preProps => ({
      ...preProps,
      [key]: input
    }));
  };
  return (
    <View className="index">
      <Text>Hello world!</Text>
      <IconFont
        name="icon-alipay"
        size={36}
        customClassName=""
        customStyle={{}}
        color=""
      ></IconFont>
      <View>
        <View>Input1</View>
        <XInput
          onChange={value => onChange(value, "inputValue1")}
        ></XInput>
      </View>
      <View>
        <View>Input2</View>
        <XInput
          onChange={value => onChange(value, "inputValue2")}
        ></XInput>
      </View>
    </View>
  );
};
