enum TypeOfAction {
  SET_AMOUNT_FOOD = "SET_AMOUNT_FOOD",
  SET_AMOUNT_TRANSPORT = "SET_AMOUNT_TRANSPORT",
  SET_AMOUNT_HEALTH = "SET_AMOUNT_HEALTH",
  SET_TEMP = "SET_TEMP",
}

type ActionType = {
  type: TypeOfAction;
  payload?: number;
};

type CategoryValueState = {
  date: string;
  amount: number;
};

type CategoryKeys = "food" | "transport" | "health" | "other";

type CategoryType = {
  [key in CategoryKeys]: CategoryValueState[];
};

interface IState {
  categories: CategoryType;
  temporaryAmount: string;
}

let initialState: IState = {
  categories: {
    food: [],

    transport: [],

    health: [],

    other: [],
  },
  temporaryAmount: "",
};

const spendingReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case TypeOfAction.SET_AMOUNT_FOOD: {
      state.categories.food.push({
        date: "today",
        amount: action.payload || 0,
      });
      return {
        ...state,
        categories: { ...state.categories, food: [...state.categories.food] },
      };
    }
    case TypeOfAction.SET_AMOUNT_TRANSPORT: {
      state.categories.transport.push({
        date: "today",
        amount: action.payload || 0,
      });
      return {
        ...state,
        categories: {
          ...state.categories,
          transport: [...state.categories.transport],
        },
      };
    }
    case TypeOfAction.SET_AMOUNT_HEALTH: {
      state.categories.health.push({
        date: "today",
        amount: action.payload || 0,
      });
      return {
        ...state,
        categories: {
          ...state.categories,
          health: [...state.categories.health],
        },
      };
    }
    case TypeOfAction.SET_TEMP: {
      return { ...state, temporaryAmount: action.payload };
    }
    default:
      return state;
  }
};

export const setAmountFood = (amount: number) => {
  return { type: TypeOfAction.SET_AMOUNT_FOOD, payload: amount };
};

export const setAmountFoodDate = (date: number) => {
  return { type: TypeOfAction.SET_AMOUNT_FOOD, payload: date };
};

export const setAmountTransport = (amount: number) => {
  return { type: TypeOfAction.SET_AMOUNT_TRANSPORT, payload: amount };
};

export const setAmountHealth = (amount: number) => {
  return { type: TypeOfAction.SET_AMOUNT_HEALTH, payload: amount };
};

export const setTempValue = (temp: string) => {
  return { type: TypeOfAction.SET_TEMP, payload: temp };
};

export default spendingReducer;
