import axios from "axios";
import {
  CategoryValueState,
  NewCategoryValueState,
} from "../../interfaces/ISpendingProps";
import { Category } from "../../redux/categories-reducer";

const instance = axios.create({
  baseURL: "/api",
});

export const getCategories = async () => {
  try {
    const res = await instance.get("/categories");
    return res.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const createCategory = async (category: Category) => {
  try {
    const res = await instance.post("/categories", { params: { ...category } });
    return res.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const deleteCategoryApi = async (id: string) => {
  try {
    const res = await instance.delete(`/categories/${id}`);
    // const _res = await instance.delete(`/spending/${id}`);
    return res.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getTotalAmount = async (startDate?: any, endDate?: any) => {
  try {
    const res = await instance.get("/amounts", {
      params: { startDate, endDate },
    });
    return res.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};
