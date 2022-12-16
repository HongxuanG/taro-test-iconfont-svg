import { View, Text } from "@tarojs/components";
import IconFont from "@/components/iconfont/iconfont";
import { useState } from "react";
import "./index.scss";

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
    <View className='index'>
      <View
        style={{
          backgroundImage:
            `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='-10 -18 100 135'><circle cx='50' cy='50' r='40' fill='none' stroke='%23ededed' stroke-width='3'/></svg>")`
        }}
      >
        Hello world!
      </View>
      <IconFont
        name='icon-alipay'
        size={36}
        color='red'
      ></IconFont>
      <IconFont
        name='icon-setup'
        size={36}
      ></IconFont>
      <IconFont
        name='icon-user'
        size={36}
      ></IconFont>
      <IconFont
        name='icon-colorCard'
        size={72}
        color='red'
      ></IconFont>
      <IconFont
        name='icon-take'
        size={72}
      ></IconFont>
      <IconFont
        name='icon-write'
        size={72}
      ></IconFont>
      {/* <View>
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
      </View> */}
    </View>
  );
};
