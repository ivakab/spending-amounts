import { CategoryValueState } from "../interfaces/ISpendingProps";

enum TypeOfAction {
  SET_AMOUNT_SPENDING = "SET_AMOUNT_SPENDING",
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
};

interface IState {
  categories: CategoryValueState[];
}

let initialState: IState = {
  categories: [],
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

export const deleteFromState = (payload: ActionPayload) => {
  return { type: TypeOfAction.DELETE_SPENDING, payload: payload };
};

export default spendingReducer;
