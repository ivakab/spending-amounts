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
  temporaryAmount?: string;
};

type CategoryValueState = {
  date: Date;
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
        date: action.payload.date || new Date(),
        amount: action.payload.amount || 0,
      });
      return {
        ...state,
        categories: { ...state.categories, food: [...state.categories.food] },
      };
    }
    case TypeOfAction.SET_AMOUNT_TRANSPORT: {
      state.categories.transport.push({
        date: action.payload.date || new Date(),
        amount: action.payload.amount || 0,
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
        date: action.payload.date || new Date(),
        amount: action.payload.amount || 0,
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
      return { ...state, temporaryAmount: action.payload.temporaryAmount };
    }
    default:
      return state;
  }
};

export const setAmountFood = (payload: ActionPayload) => {
  return { type: TypeOfAction.SET_AMOUNT_FOOD, payload: payload };
};

export const setAmountTransport = (payload: ActionPayload) => {
  return { type: TypeOfAction.SET_AMOUNT_TRANSPORT, payload: payload };
};

export const setAmountHealth = (payload: ActionPayload) => {
  return { type: TypeOfAction.SET_AMOUNT_HEALTH, payload: payload };
};

export const setTempValue = (payload: ActionPayload) => {
  return { type: TypeOfAction.SET_TEMP, payload: payload };
};

export default spendingReducer;
