import { FieldType } from "@/constants/constants";
import { IRootElement, IDefaultValues } from "@/pages/index.types";
import { faker } from "@faker-js/faker";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function GenerateJson(Data: IDefaultValues) {
  const fake: any = faker;
  function Recusor(params: IRootElement[], branch: any, isArray: boolean) {
    const temp: any = {};
    for (let item of params) {
      if (item.type != FieldType.OBJECT) {
        temp[item.key] = fake[item.type][item.subType]();
      } else {
        temp[item.key] = Recusor(
          branch[item.subType].root,
          branch,
          branch[item.subType].isArray
        );
      }
    }
    return temp;
  }
  const gen = Recusor(Data.root, Data.branch, Data.isArray);
  console.log(gen);
}
