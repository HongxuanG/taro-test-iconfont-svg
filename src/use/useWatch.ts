import { useFormContext } from "@/context/formContext";
import { useEffect, useState } from "react";

// 封装useFormContext() 不暴露给用户
// 主要用于表单项与表单项之间的联动效果
export function useWatch(name?: string) {
  const { formStore } = useFormContext();
  // 内部维护一个状态值，当监听到指定字段值改变时，会更新当前调用 useWatch 的组件
  const [value, setValue] = useState(() => {
    return name ? formStore.getFields([name])[0] : formStore.getFields()[0];
  });

  useEffect(() => {
    const unsubscribe = formStore.subScribe(changedFields => {
      if (name) {
        const targetField = changedFields.find(changedField => {
          return name === changedField.name;
        });
        targetField && setValue(targetField.value);
      } else {
        setValue(formStore.getFields()[0]);
      }
    });

    return unsubscribe;
  }, [formStore, name]);

  return value;
}
