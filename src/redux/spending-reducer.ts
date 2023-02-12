enum TypeOfAction {
  SET_AMOUNT_FOOD = "SET_AMOUNT_FOOD",
  SET_AMOUNT_TRANSPORT = "SET_AMOUNT_TRANSPORT",
  SET_AMOUNT_HEALTH = "SET_AMOUNT_HEALTH",
  SET_TEMP = "SET_TEMP",
}

interface ActionType {
  type: TypeOfAction;
  payload: ActionPayload;
}

type ActionPayload = {
  amount?: number;
  date?: Date;
  type?: string;
  temporaryAmount?: string;
};

type CategoryValueState = {
  date: Date;
  amount: number;
  type: string;
};

interface IState {
  categories: CategoryValueState[];
  temporaryAmount: string;
}

let initialState: IState = {
  categories: [],
  temporaryAmount: "",
};

const spendingReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case TypeOfAction.SET_AMOUNT_FOOD: {
      state.categories.push({
        date: action.payload.date || new Date(),
        amount: action.payload.amount || 0,
        type: action.payload.type || "other",
      });
      return {
        ...state,
        categories: state.categories,
      };
    }
    case TypeOfAction.SET_TEMP: {
      return { ...state, temporaryAmount: action.payload.temporaryAmount };
    }
    default:
      return state;
  }
};

export const setAmountFood = (payload: ActionPayload) => {
  return { type: TypeOfAction.SET_AMOUNT_FOOD, payload: payload };
};

export const setTempValue = (payload: ActionPayload) => {
  return { type: TypeOfAction.SET_TEMP, payload: payload };
};

export default spendingReducer;
