import { useWatch } from "@/use/useWatch";
import { Input, View } from "@tarojs/components";
import { FC, useEffect, useState } from "react";

interface PropsType {
  onChange: (value: string) => void;
}

const XInput: FC<PropsType> = ({ onChange }) => {
  const foo = useWatch("foo");
  const [value, setValue] = useState(foo + "bar");
  useEffect(() => {
    setValue(foo + "bar");
  }, [foo]);

  return (
    <Input
      onInput={e => {
        onChange(e.detail.value);
      }}
      value={value}
    ></Input>
  );
};
export default XInput;
