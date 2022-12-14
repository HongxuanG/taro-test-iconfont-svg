import {
  FieldMeta,
  FormContext,
  FormContextValue,
  Store
} from "@/context/formContext";
import { FormAction, InternalFormAction, useForm } from "@/use/useForm";
import { FormStore } from "@/utils/formStore";
import { FC, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";


interface FormProps {
  initialValues?: Store;
  onFieldsChange?: (options: {
    fieldsStore: Store;
    changedFields: FieldMeta[];
  }) => void;
  children?: React.ReactNode;
  form?: FormAction
}

const XForm: FC<FormProps> = (props) => {
  const { initialValues, onFieldsChange, children, form: formProp } = props
  console.log("重新渲染 input");
  // 默认的 ref
  const defaultForm = useForm()
  const form = (formProp || defaultForm) as InternalFormAction
  // // 所有表单的字段
  // const [fieldsStore, setFieldsStore] = useState<Store>(
  //   () => initialValues || {}
  // );

  const formStore = useMemo(()=>{
    return new FormStore(initialValues);
  }, [])

  // const [changedFields, setChangedFields] = useState<FieldMeta[]>([]);

  // 确保不变
  const onFieldsChangeRef = useRef(onFieldsChange);
  onFieldsChangeRef.current = onFieldsChange;

  const ctx: FormContextValue = useMemo(() => {
    return {
      formStore
    };
  }, [formStore]);
  // 暴露给外部使用的方法
  useImperativeHandle(
    form.__INTERNAL__,
    () => ({
      getFields(names) {
        return formStore.getFields(names)
      },
      setFields(fields){
        formStore.setFields(fields);
      }
    }),
    [formStore]
  );

  useEffect(() => {
    const unsubScribe = formStore.subScribe(changedFields => {
      onFieldsChangeRef.current?.({
        changedFields,
        fieldsStore: formStore.getFields
      });
    });
    // 组件卸载的时候取消订阅
    return unsubScribe;
  }, [formStore]);

  return <FormContext.Provider value={ctx}>{children}</FormContext.Provider>;
};
export default XForm;
