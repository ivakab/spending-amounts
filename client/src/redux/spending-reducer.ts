import { createSpending } from "./../components/api/SpendingApi";
import { AnyAction, Dispatch } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { deleteSpendingApi } from "../components/api/SpendingApi";
import {
  CategoryValueState,
  NewCategoryValueState,
} from "../interfaces/ISpendingProps";

enum TypeOfAction {
  SET_AMOUNT_SPENDING = "SET_AMOUNT_SPENDING",
  DELETE_SPENDING = "DELETE_SPENDING",
  SET_NEW_FILTER = "SET_NEW_FILTER",
}

interface ActionType {
  type: TypeOfAction;
  payload: ActionPayload & FilterType;
}

type ActionPayload = {
  _id?: string;
  amount?: number;
  date?: Date;
  type?: string;
};

export type FilterType = {
  minAmount: number;
  maxAmount: number;
  types: String[];
};

interface IState {
  categories: CategoryValueState[];
  filter: FilterType;
}

let initialState: IState = {
  categories: [],
  filter: { minAmount: 0, maxAmount: 0, types: [] },
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
    case TypeOfAction.SET_NEW_FILTER: {
      return {
        ...state,
        filter: {
          minAmount: action.payload.minAmount,
          maxAmount: action.payload.maxAmount,
          types: action.payload.types,
        },
      };
    }
    default:
      return state;
  }
};

export const setNewSpending = (payload: ActionPayload) => {
  return { type: TypeOfAction.SET_AMOUNT_SPENDING, payload: payload };
};

export const setSpendingThunk =
  (type: string, date: Date, amount: number) => (dispatch: any) => {
    const spending: NewCategoryValueState = {
      type: type,
      amount: amount,
      date: date,
    };
    createSpending(spending).then((res) => {
      const newSpending: CategoryValueState = {
        amount: res.amount,
        date: res.date,
        type: res.type,
        _id: res._id,
      };
      dispatch(setNewSpending(newSpending));
    });
  };

export const deleteFromState = (payload: ActionPayload) => {
  return { type: TypeOfAction.DELETE_SPENDING, payload: payload };
};

export const deleteFromStateThunk = (id: string) => (dispatch: any) => {
  deleteSpendingApi(id).then((res) => {
    if (res.acknowledged) dispatch(deleteFromState({ _id: id }));
  });
};

export const setNewFilter = (payload: FilterType) => {
  return { type: TypeOfAction.SET_NEW_FILTER, payload: payload };
};

// export const deleteFromStateThunk = (
//   id: string
// ): ThunkAction<Promise<void>, ActionPayload, unknown, ActionType> => {
//   return async (dispatch) => {
//     deleteSpendingApi(id).then((res) => {
//       if (res.acknowledged) dispatch(deleteFromState({ _id: id }));
//     });
//   };
// };

export default spendingReducer;
