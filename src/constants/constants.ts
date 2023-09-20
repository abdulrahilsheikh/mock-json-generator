import { faker } from "@faker-js/faker";

export const FieldType = { OBJECT: "object" };
export const fakerInstance: any = faker;
export const subOptions: any = {};

export const keys = ["object", ...Object.keys(fakerInstance)];
keys.forEach((i: any) => {
  if (i != "object") {
    subOptions[i] = Object.keys(fakerInstance[i]);
  }
});
