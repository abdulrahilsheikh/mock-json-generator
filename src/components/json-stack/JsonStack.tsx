import React from "react";
import {
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { Input } from "../ui/input";
import {
  Select,
  SelectComponent,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { FieldType, fakerInstance } from "@/constants/constants";
import { Button } from "../ui/button";

type Props = {
  currentFieldKey: string;
  register: UseFormRegister<any>;
  values: any;
  branch: any;
  optionsData: { [data: string]: any };
  subOptions: string[];
  setValue: UseFormSetValue<any>;
  setSubstackVaue: any;
  addNewField: any;
  isSubStack?: boolean;
};

const JsonStack = ({
  currentFieldKey,
  register,
  values,
  optionsData,
  subOptions,
  setValue,
  setSubstackVaue,
  addNewField,
  branch,
  isSubStack = false,
}: Props) => {
  const masterKey = isSubStack ? `${currentFieldKey}.root` : currentFieldKey;
  const handleNew = (index: number, ref: any) => {
    const obj = values(`${currentFieldKey}[${index}]`);
    if (!branch[obj.subType]) {
      const uuid = fakerInstance.string.uuid();
      setValue(`${currentFieldKey}[${index}].subType`, uuid);
      setValue(`branch.${uuid}`, { key: obj.key, root: [], isArray: false });
      setSubstackVaue(`branch.${uuid}`, ref);
    } else {
      setSubstackVaue(`branch.${obj.subType}`, ref);
    }
  };

  return (
    <div className="w-48 min-w-max h-full bg-primary-foreground/75 rounded p-4 overflow-y-auto overflow-x-hidden">
      <h2>{isSubStack ? "Sub Object" : masterKey}</h2>
      <div className="mt-4 flex flex-col gap-4">
        {values.map((item: any, index: number) => (
          <div
            className="flex gap-4 items-center justify-start w-full"
            key={`mainstack-${index}`}
          >
            <Input
              className="w-40"
              type="text"
              placeholder="Object Key"
              {...register(`${masterKey}[${index}].key`)}
            />

            <SelectComponent
              onValueChange={(value: any) => {
                setValue(`${masterKey}[${index}].type`, value);
              }}
              list={subOptions}
            />
            {item.type != FieldType.OBJECT ? (
              <SelectComponent
                onValueChange={(value: any) => {
                  setValue(`${masterKey}[${index}].subType`, value);
                }}
                list={optionsData[values(`${masterKey}[${index}].type`)]}
              />
            ) : (
              <Button
                className="ml-auto w-8 h-8 bg-primary rounded"
                onClick={(e) => {
                  handleNew(index, e);
                }}
                type="button"
              ></Button>
            )}
          </div>
        ))}
        <Button type="button" onClick={() => addNewField(masterKey)}></Button>
      </div>
    </div>
  );
};

export default JsonStack;
