import { keys } from "@/constants/constants";
import { useFieldArray } from "react-hook-form";

export interface IDefaultValues {
  currentFieldKey: string;
  root: Array<IRootElement>;
  params: ParamsType;
  branch: {
    [key: string]: { key: string; params: ParamsType } & Omit<subType, "key">;
  };
}

interface subType {
  key: string;
  root: Array<IRootElement>;
}

export interface IRootElement {
  key: string;
  type: string;
  subType: string;
}
type ParamsType = {
  isArray: false;
  quantity: 1;
};

export type ISubstackHandler = (value: string, remove?: boolean) => void;

export type FieldsArrayType = ReturnType<typeof useFieldArray> & {
  fields: Array<IRootElement>;
};
