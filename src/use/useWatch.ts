import { useFormContext } from "@/context/formContext";

// 封装useFormContext() 不暴露给用户
export function useWatch(name?: string) {
  const { fieldsStore } = useFormContext();
  return name ? fieldsStore[name] : fieldsStore;
}
