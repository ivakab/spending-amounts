import { createSpending } from "./../components/api/SpendingApi";
import { AnyAction, Dispatch } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { deleteSpendingApi } from "../components/api/SpendingApi";
import {
  CategoryValueState,
  NewCategoryValueState,
} from "../interfaces/ISpendingProps";
import {
  createCategory,
  deleteCategoryApi,
} from "../components/api/CategoryApi";

enum TypeOfAction {
  SET_CATEGORY = "SET_CATEGORY",
  DELETE_CATEGORY = "DELETE_CATEGORY",
}

type ActionType = {
  type: String;
  payload: CategoriesState;
};

export type Category = {
  image: String;
  name: String;
};

export type CategoriesState = {
  _id: String;
} & Category;

interface IState {
  categories: CategoriesState[];
}

let initialState: IState = {
  categories: [],
};

const categoriesReducer = (
  state: IState = initialState,
  action: ActionType
): IState => {
  switch (action.type) {
    case TypeOfAction.SET_CATEGORY: {
      return {
        ...state,
        categories: [
          {
            name: action.payload.name,
            image: action.payload.image,
            _id: action.payload._id,
          },
          ...state.categories,
        ],
      };
    }
    case TypeOfAction.DELETE_CATEGORY: {
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

export const setNewCategory = (payload: CategoriesState) => {
  return { type: TypeOfAction.SET_CATEGORY, payload: payload };
};

export const setCategoryThunk =
  (name: string, image: String) => (dispatch: any) => {
    const category: Category = {
      name: name,
      image: image,
    };
    createCategory(category).then((res) => {
      const newCategory: CategoriesState = {
        name: res.name,
        image: res.image,
        _id: res._id,
      };
      dispatch(setNewCategory(newCategory));
    });
  };

export const deleteCategory = (payload: Partial<CategoriesState>) => {
  return { type: TypeOfAction.DELETE_CATEGORY, payload: payload };
};

export const deleteCategoryThunk = (_id: string) => (dispatch: any) => {
  deleteCategoryApi(_id).then((res) => {
    if (res.acknowledged) dispatch(deleteCategory({ _id: _id }));
  });
};

// export const deleteFromStateThunk = (
//   _id: string
// ): ThunkAction<Promise<vo_id>, ActionPayload, unknown, ActionType> => {
//   return async (dispatch) => {
//     deleteSpendingApi(_id).then((res) => {
//       if (res.acknowledged) dispatch(deleteFromState({ __id: _id }));
//     });
//   };
// };

export default categoriesReducer;
