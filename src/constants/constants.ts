import { faker } from "@faker-js/faker";

export const FieldType = { OBJECT: "object" };
export const fakerInstance: any = faker;
export const subOptions: any = {};

export const keys = [FieldType.OBJECT, ...Object.keys(fakerInstance)];

keys.forEach((i: any) => {
  if (i != FieldType.OBJECT) {
    subOptions[i] = Object.keys(fakerInstance[i]);
  }
});
