export type NewCategoryValueState = {
  date: Date;
  amount: number;
  type: string;
};

export type CategoryValueState = {
  _id: string;
} & NewCategoryValueState;
