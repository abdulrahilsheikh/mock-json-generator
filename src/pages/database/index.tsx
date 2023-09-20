import JsonStack from "@/components/json-stack/JsonStack";
import React, { useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { keys, subOptions } from "@/constants/constants";
import BezierCurveWithScrollingButtons from "@/components/bezier-curve/BezierCurve";

type Props = {};

const Index = ({}: Props) => {
  const [subStack, setSubstack] = useState<{ key: string; refrence: any }[]>(
    []
  );
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
    setValue,
    control,
  } = useForm<any>({
    defaultValues: {
      currentFieldKey: "root",
      root: [
        { key: "Name", type: "person", subType: "fullName" },
        { key: "Name", type: "person", subType: "fullName" },
        { key: "Name", type: "person", subType: "fullName" },
        { key: "Name", type: "person", subType: "fullName" },
        { key: "Name", type: "person", subType: "fullName" },
        { key: "Name", type: "person", subType: "fullName" },
        { key: "Name", type: "person", subType: "fullName" },
        { key: "Name", type: "person", subType: "fullName" },
        { key: "Name", type: "person", subType: "fullName" },
        { key: "Name", type: "person", subType: "fullName" },
        { key: "Name", type: "person", subType: "fullName" },
        { key: "Name", type: "person", subType: "fullName" },
        { key: "Name", type: "person", subType: "fullName" },
        { key: "Name", type: "person", subType: "fullName" },
        { key: "Name", type: "person", subType: "fullName" },
        { key: "Name", type: "person", subType: "fullName" },
        { key: "Name", type: "person", subType: "fullName" },
        { key: "Name", type: "person", subType: "fullName" },
      ],
      isArray: false,
      branch: {},
    },
  });
  const { fields, remove } = useFieldArray({ control, name: "root" });
  const onSubmit: SubmitHandler<any> = (data) => console.log(data);
  const onError: SubmitHandler<any> = (data) => console.log(data);
  const handleSubstack = (index: number) => (value: string, refrence: any) => {
    const temp = subStack.slice(0, index + 1);
    temp[index] = { key: value, refrence: refrence };
    setSubstack(temp);
  };

  const addNewField = (destination: string) => {
    const temp = [
      ...getValues(destination),
      { key: "", type: "person", subType: "fullName" },
    ];
    setValue(destination, temp);
  };
  return (
    <div className="h-full box-border w-screen flex">
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="p-4 flex gap-4 max-h-[calc(100vh_-_24px)] h-[calc(100vh_-_24px)]"
      >
        <JsonStack
          addNewField={addNewField}
          optionsData={subOptions}
          subOptions={keys}
          values={watch}
          register={register}
          currentFieldKey={watch("currentFieldKey")}
          branch={watch("branch")}
          setValue={setValue}
          setSubstackVaue={handleSubstack(0)}
        />
        {subStack.map((item, index) => (
          <JsonStack
            isSubStack={true}
            addNewField={addNewField}
            optionsData={subOptions}
            subOptions={keys}
            values={watch}
            register={register}
            currentFieldKey={item.key}
            branch={watch("branch")}
            setValue={setValue}
            setSubstackVaue={handleSubstack(index + 1)}
          />
        ))}
        <Button>Button</Button>
      </form>
    </div>
  );
};

export default Index;
