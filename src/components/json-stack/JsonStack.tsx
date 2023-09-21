import React, { RefObject, useEffect } from "react";
import {
  Control,
  UseFieldArrayReturn,
  UseFormSetValue,
  UseFormWatch,
  useFieldArray,
} from "react-hook-form";
import { Input } from "../ui/input";
import { SelectComponent } from "../ui/select";
import { FieldType, fakerInstance } from "@/constants/constants";
import { Button } from "../ui/button";
import {
  IDefaultValues,
  FieldsArrayType,
  ISubstackHandler,
  IRootElement,
} from "@/pages/index.types";
import { Checkbox } from "../ui/checkbox";

type Props = {
  currentFieldKey: string;
  values: UseFormWatch<IDefaultValues>;
  optionsData: { [data: string]: any };
  subOptions: string[];
  setValue: UseFormSetValue<IDefaultValues>;
  setSubstackVaue: ISubstackHandler;
  isSubStack?: boolean;
  subStackValue: string;
  control: Control<IDefaultValues>;
  lastRef?: RefObject<HTMLElement> | null;
};

const JsonStack = ({
  currentFieldKey,
  values,
  optionsData,
  subOptions,
  setValue,
  setSubstackVaue,
  control,
  isSubStack = false,
  subStackValue,
  lastRef,
}: Props) => {
  const branch = values("branch");
  const masterKey: any = isSubStack
    ? `${currentFieldKey}.root`
    : currentFieldKey;

  const { fields, update, remove, append } = useFieldArray({
    control,
    name: masterKey,
  });

  const handleNew = (index: number) => {
    const obj: IRootElement = values(`${masterKey}[${index}]` as any);
    if (!branch[obj.subType]) {
      const uuid = fakerInstance.string.uuid();

      update(index, { ...fields[index], subType: uuid });
      setValue(`branch.${uuid}`, {
        key: obj.key,
        root: [{ key: "", type: "person", subType: "fullName" }],
        params: { isArray: false, quantity: 1 },
      });
      setSubstackVaue(`branch.${uuid}`);
    } else {
      setSubstackVaue(`branch.${obj.subType}`);
    }
  };
  const { params } = isSubStack ? values(currentFieldKey as any) : values();
  console.log(params);

  return (
    <div
      ref={(r) => {
        if (lastRef) {
          ///@ts-ignore
          lastRef.current = r;
        }
      }}
      className="w-48 min-w-max h-full bg-primary-foreground/75 rounded p-4 overflow-y-auto "
    >
      <div className="w-full flex justify-between">
        <h2>
          {isSubStack
            ? `Sub Object of ${values(currentFieldKey as any).key}`
            : "Root Object"}
        </h2>
        <div className="flex items-center space-x-2">
          <Checkbox id="isArray" />
          <label
            htmlFor="isArray"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Is Array
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Input
            className="w-40"
            type="text"
            placeholder="Object Key"
            defaultValue={"key"}
            onChange={(e) => {}}
            required
          />
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-4">
        {fields.map((field, index: number) => {
          const { key, subType, type, id }: any = field;
          return (
            <div
              className="flex gap-4 items-center justify-start w-full"
              key={`mainstack-${index}-${subStackValue?.split(".")[1]}`}
            >
              <Button
                type="button"
                onClick={() => {
                  remove(index);
                  if (subStackValue?.split(".")[1] == subType) {
                    setSubstackVaue("", true);
                  }
                }}
              >
                X
              </Button>
              <Input
                className="w-40"
                type="text"
                placeholder="Object Key"
                defaultValue={key}
                onChange={(e) => {
                  update(index, {
                    subType,
                    type,
                    key: e.target.value,
                  });
                  if (type == "object") {
                    const temp = values(`branch.${subType}`);
                    temp.key = e.target.value;
                    setValue(`branch.${subType}`, temp);
                  }
                }}
                required
              />

              <SelectComponent
                name={"collection"}
                onValueChange={(value: any) => {
                  update(index, {
                    key,
                    type: value,
                    subType: value != type ? "" : subType,
                  });
                }}
                list={subOptions}
                value={type}
              />
              {type != FieldType.OBJECT ? (
                <SelectComponent
                  name={"type"}
                  onValueChange={(value: any) => {
                    update(index, { key, type, subType: value });
                    // setValue(`${masterKey}[${index}].subType`, value);
                  }}
                  list={
                    optionsData[values(`${masterKey}[${index}].type` as any)] ??
                    []
                  }
                  value={subType}
                />
              ) : (
                <div className="ml-auto relative">
                  <Button
                    className={`" w-8 h-8 bg-primary rounded ${
                      subStackValue?.split(".")[1] == subType
                        ? "bg-purple-700"
                        : ""
                    } `}
                    onClick={() => {
                      handleNew(index);
                    }}
                    type="button"
                  ></Button>
                </div>
              )}
            </div>
          );
        })}
        <Button
          type="button"
          onClick={() =>
            append({ key: "", type: "person", subType: "fullName" })
          }
        >
          Add Field
        </Button>
      </div>
    </div>
  );
};

export default JsonStack;
