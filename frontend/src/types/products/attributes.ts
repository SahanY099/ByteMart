export type Attribute = {
  id: number;
  name: string;
  values?: AttributeValue[];
};

export type AttributeValue = {
  id: number;
  value: string;
};
