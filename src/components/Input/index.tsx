import { Input, View } from "@tarojs/components"
import { FC } from "react"

interface PropsType {
  value: string
  onChange: (value: string) => void
}

const XInput:FC<PropsType> = ({value, onChange}) => {
  console.log("重新渲染 input");
  return (
    <View>
      <View>{value}</View>
      <Input onInput={(e) => {
        onChange(e.detail.value);
      }}></Input>
    </View>
  );
}
export default XInput
