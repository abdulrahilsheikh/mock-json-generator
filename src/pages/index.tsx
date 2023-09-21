import JsonStack from "@/components/json-stack/JsonStack";
import React, { useEffect, useRef, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { keys, subOptions } from "@/constants/constants";
import { faker } from "@faker-js/faker";
import { IDefaultValues, ISubstackHandler } from "./index.types";
import { GenerateJson } from "@/lib/utils";

type Props = {};

const Index = ({}: Props) => {
  const lastRef = useRef<HTMLElement>(null);
  const [subStack, setSubstack] = useState<string[]>([]);
  const { handleSubmit, watch, setValue, control } = useForm<IDefaultValues>({
    defaultValues: {
      currentFieldKey: "root",
      root: [{ key: "Name", type: "person", subType: "fullName" }],
      params: { isArray: false, quantity: 1 },
      branch: {},
    },
  });

  const onSubmit: SubmitHandler<any> = (data) => console.log(data);
  const onError: SubmitHandler<any> = (data) => console.log(data);
  const handleSubstack =
    (index: number): ISubstackHandler =>
    (value, remove) => {
      const temp = subStack.slice(0, index + 1);
      temp[index] = value;
      if (remove) {
        temp.pop();
      }
      setSubstack(temp);
    };
  useEffect(() => {
    if (lastRef.current) {
      lastRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [subStack]);

  return (
    <div className="h-full box-border w-screen flex flex-col">
      <nav className="w-full h-12 flex px-4 py-3 justify-end">
        <Button
          onClick={() => {
            GenerateJson(watch());
          }}
          className=""
        >
          Generate Json
        </Button>
      </nav>
      <div className="max-h-[calc(100vh_-_3rem)] h-[calc(100vh_-_3rem)] overflow-y-auto">
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="p-4 flex gap-4 max-h-full h-full"
        >
          <JsonStack
            control={control}
            optionsData={subOptions}
            subOptions={keys}
            values={watch}
            currentFieldKey={watch("currentFieldKey")}
            setValue={setValue}
            setSubstackVaue={handleSubstack(0)}
            subStackValue={subStack[0]}
          />
          {subStack.map((item, index) => (
            <JsonStack
              lastRef={index == subStack.length - 1 ? lastRef : null}
              control={control}
              key={`substack-${item}`}
              isSubStack={true}
              optionsData={subOptions}
              subOptions={keys}
              values={watch}
              currentFieldKey={item}
              setValue={setValue}
              setSubstackVaue={handleSubstack(index + 1)}
              subStackValue={subStack[index + 1]}
            />
          ))}
        </form>
      </div>
    </div>
  );
};

export default Index;
