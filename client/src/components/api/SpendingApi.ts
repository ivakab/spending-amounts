import axios from "axios";
import {
  CategoryValueState,
  NewCategoryValueState,
} from "../../redux/spending-reducer";

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
