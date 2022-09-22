import React, { useContext } from "react";

export type Store = Record<string, any>;

export interface FieldMeta {
  name: string
  value: any
}

export interface FormContextValue {
  fieldsStore: Store
  setFields: (fields: FieldMeta[]) => void
}

export const FormContext = React.createContext<FormContextValue | null>(null)

export const useFormContext = () => {
  const ctx = useContext(FormContext)
  if(!ctx){
    throw new Error('FormContext must be used under Form')
  }
  return ctx
}
