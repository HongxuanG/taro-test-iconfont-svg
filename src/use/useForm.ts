import { FieldMeta } from "@/context/formContext";
import React, { useRef } from "react";

export interface FormAction {
  setFields: (fields: FieldMeta[]) => void;
  getFields: (names?: string[]) => any[];
}

export interface InternalFormAction extends FormAction {
  __INTERNAL__: React.MutableRefObject<FormAction | null>;
}
// 就是封装了一层 useRef
export function useForm(): FormAction {
  const __INTERNAL__ = useRef<FormAction | null>(null);
  return {
    __INTERNAL__,
    getFields(names) {
      const action = __INTERNAL__.current;
      if (!action) {
        throwError();
      }
      return action.getFields(names);
    },
    setFields(fields) {
      const action = __INTERNAL__.current;
      if (!action) {
        throwError();
      }
      action.setFields(fields);
    }
  } as InternalFormAction;
}

function throwError(): never {
  throw new Error(
    "Instance created by `useForm` is not connected to any Form element. Forget to pass `form` prop?"
  );
}
