import { View } from "@tarojs/components";
import { memo, useState } from "react";

type PropsType = {
  onClick?: () => void;
  itemArray?: any[]
  itemData?: Record<string, any>;
  children?: React.ReactNode;
};

const areEqual = (prev, next) => {
  console.log("prev", prev);
  console.log("prev", next);
  return false
}

const MemoTest = memo<PropsType>(props => {
  const { children, onClick, itemArray, itemData } = props;
  const [count, setCount] = useState("");
  const handleCount = () => {
    setCount(prev => prev + 1);
  };
  return (
    <View>
      <View onClick={handleCount}>{count}</View>
      <View onClick={onClick}>{children}</View>
    </View>
  );
}, areEqual);

export default MemoTest;
