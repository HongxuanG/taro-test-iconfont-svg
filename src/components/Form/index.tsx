import {
  FieldMeta,
  FormContext,
  FormContextValue,
  Store
} from "@/context/formContext";
import { FormAction, InternalFormAction, useForm } from "@/use/useForm";
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

  const defaultForm = useForm()
  const form = (formProp || defaultForm) as InternalFormAction
  // 所有表单的字段
  const [fieldsStore, setFieldsStore] = useState<Store>(
    () => initialValues || {}
  );
  const [changedFields, setChangedFields] = useState<FieldMeta[]>([]);

  // 确保不变
  const onFieldsChangeRef = useRef(onFieldsChange);
  onFieldsChangeRef.current = onFieldsChange;

  const ctx: FormContextValue = useMemo(() => {
    return {
      fieldsStore,
      setFields(fields) {
        const newStore = {
          ...fieldsStore,
          ...fields.reduce((acc, next) => {
            acc[next.name] = next.value;
            return acc;
          }, {} as Store)
        };
        setFieldsStore(newStore);
        setChangedFields(fields);
      }
    };
  }, [fieldsStore]);
  // 暴露给外部使用的方法
  useImperativeHandle(
    form.__INTERNAL__,
    () => ({
      getFields(names){
        if(!names){
          return [ctx.fieldsStore]
        }
        return names.map((name)=>{
          return ctx.fieldsStore[name]
        })
      },
      setFields: ctx.setFields,
    }),
    [ctx.fieldsStore, ctx.setFields]
  );

  useEffect(() => {
    onFieldsChangeRef.current?.({
      changedFields,
      fieldsStore
    });
  }, [changedFields, fieldsStore]);

  return <FormContext.Provider value={ctx}>{children}</FormContext.Provider>;
};
export default XForm;
