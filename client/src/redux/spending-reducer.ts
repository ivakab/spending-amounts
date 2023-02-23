import { useDispatch } from "react-redux";
import { deleteSpendingApi } from "../components/api/SpendingApi";

// const dispatch = useDispatch();

enum TypeOfAction {
  SET_AMOUNT_SPENDING = "SET_AMOUNT_SPENDING",
  SET_TEMP = "SET_TEMP",
  DELETE_SPENDING = "DELETE_SPENDING",
}

interface ActionType {
  type: TypeOfAction;
  payload: ActionPayload;
}

type ActionPayload = {
  _id?: string;
  amount?: number;
  date?: Date;
  type?: string;
  temporaryAmount?: string;
};

export type NewCategoryValueState = {
  date: Date;
  amount: number;
  type: string;
};

export type CategoryValueState = {
  _id: string;
} & NewCategoryValueState;

interface IState {
  categories: CategoryValueState[];
  temporaryAmount: string;
}

let initialState: IState = {
  categories: [],
  temporaryAmount: "",
};

const spendingReducer = (
  state: IState = initialState,
  action: ActionType
): IState => {
  switch (action.type) {
    case TypeOfAction.SET_AMOUNT_SPENDING: {
      return {
        ...state,
        categories: [
          {
            _id: action.payload._id || "0",
            date: action.payload.date
              ? new Date(action.payload.date)
              : new Date(),
            amount: action.payload.amount || 0,
            type: action.payload.type || "other",
          },
          ...state.categories,
        ],
      };
    }
    case TypeOfAction.DELETE_SPENDING: {
      return {
        ...state,
        categories: state.categories.filter(
          (item) => item._id != action.payload._id
        ),
      };
    }
    case TypeOfAction.SET_TEMP: {
      return {
        ...state,
        temporaryAmount: action.payload.temporaryAmount || "",
      };
    }
    default:
      return state;
  }
};

export const setNewSpending = (payload: ActionPayload) => {
  return { type: TypeOfAction.SET_AMOUNT_SPENDING, payload: payload };
};

// export const initSpendings = (payload: ActionPayload[]) => {
//   return payload.map((item) => {
//     return { type: TypeOfAction.SET_AMOUNT_SPENDING, payload: item };
//   });
// };

export const setTempValue = (payload: ActionPayload) => {
  return { type: TypeOfAction.SET_TEMP, payload: payload };
};

export const deleteFromState = (payload: ActionPayload) => {
  return { type: TypeOfAction.DELETE_SPENDING, payload: payload };
};

export default spendingReducer;
