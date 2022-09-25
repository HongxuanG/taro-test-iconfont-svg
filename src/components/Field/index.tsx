import { useFormContext } from "@/context/formContext";
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";

export interface FieldProps {
  children: React.ReactNode;
  name: string;
}
// 获取target的值
export const getTargetValue = (e: any) => {
  if(Object.prototype.toString.call(e) === '[object Object]' && 'target' in e){
    return e.target.value
  }
  return e
}
// 抽象成表单项组件
export const Field: FC<FieldProps> = props => {
  const { children, name } = props;
  const { formStore } = useFormContext();

  // const value = fieldsStore[name]
  // 自己维护自己的状态
  const [value, setValue] = useState(()=>formStore.getFields([name])[0])

  const onChange = useCallback(
    (e: any) => {
      formStore.setFields([{ name, value: getTargetValue(e) }]);
    },
    [name, formStore]
  );

  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange
  // 为了确保onChange 不会改变引用地址指向
  const elementOnChange = useCallback((e: any)=>{
    return onChangeRef.current(e)
  }, [])

  const element = useMemo(()=>{
    if(!React.isValidElement(children)){
      return children
    }
    return React.cloneElement(children as React.ReactElement, {
      onChange: elementOnChange,
      value,
      ...children.props
    })
  }, [children, value, elementOnChange])

  useEffect(() => {
    const unsubscribe = formStore.subScribe((changedFields)=>{
      const targetField = changedFields.find(changedField=> {
        name === changedField.name
      });
      targetField && setValue(targetField.value)
    });
    // 取消订阅
    return unsubscribe
  }, [name, formStore]);
  

  return <>{element}</>;
};
