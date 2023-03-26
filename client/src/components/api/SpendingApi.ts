import axios from "axios";
import {
  CategoryValueState,
  NewCategoryValueState,
} from "../../interfaces/ISpendingProps";

const instance = axios.create({
  baseURL: "/api",
});

export const getSpending = async () => {
  try {
    const res = await instance.get("/spending");
    return res.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const createSpending = async (spending: NewCategoryValueState) => {
  try {
    const res = await instance.post("/spending", { params: { ...spending } });
    return res.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const updateSpending = async (spending: Partial<CategoryValueState>) => {
  try {
    const res = await instance.put(`/spending/${spending._id}`, {
      params: { ...spending },
    });
    return res.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const deleteSpendingApi = async (id: string) => {
  try {
    const res = await instance.delete(`/spending/${id}`);
    // const _res = await instance.delete(`/spending/${id}`);
    return res.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

const generateSpendingFilter = (filter: {
  [key: string]: number | string | String[];
}) => {
  const filterData: any = {};
  Object.entries(filter).forEach(([key, value]) => {
    if (key === "minAmount") {
      filterData.amount = { $gte: value };
    }
    if (key === "maxAmount") {
      filterData.amount = { $lte: value };
    }
    if (value && key === "types" && typeof value === "object") {
      filterData.type = { $or: value.map((item) => ({ formType: item })) };
    }
  });
  return { $and: filterData };
};

export const getFilterAmounts = async (filter: {
  [key: string]: string | number | String[];
}) => {
  try {
    const res = await instance.get("/filter", {
      params: { filter },
    });
    return res.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};
