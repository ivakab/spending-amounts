import React, { useState } from "react";
import styles from "./CategoriesBlock.module.css";
import { TypeImageMapping } from "../../../utils/typeImageMapping";
import { setSpendingThunk } from "../../../redux/spending-reducer";
import { useDispatch, useSelector } from "react-redux";
import AddNewCategoryModal from "./AddNewCategoryModal";
import { ListCategories } from "./ListCategories/ListCategories";
import { deleteCategoryThunk } from "../../../redux/categories-reducer";

interface IProps {
  amount: string;
  onChange: (amount: string) => void;
}

const CategoriesBlock = (props: IProps) => {
  // updateSpending({
  //   _id: "63f5e0edf0c1c52765bebc9c",
  //   type: "health",
  // }).then();

  const dispatch = useDispatch();

  const [showNewCategory, setShowNewCategory] = useState(false);

  const getDate = () => {
    const date = new Date().getTime();
    return new Date(date);
  };

  const setSpending = (type: string) => {
    const date = getDate();
    // @ts-ignore
    dispatch(setSpendingThunk(type, date, +props.amount));
    props.onChange("");
  };

  const categoriesList = [
    {
      name: "Food",
      image: TypeImageMapping.food,
    },
    {
      name: "Transport",
      image: TypeImageMapping.transport,
    },
    {
      name: "Health",
      image: TypeImageMapping.health,
    },
    {
      name: "Other",
      image: TypeImageMapping.other,
    },
    {
      name: "Add",
      image: TypeImageMapping.add,
      //при нажатии должно появляться
      //модальное окно с возможностью добавить новые категории
    },
  ];

  const categories = useSelector(
    (state: any) => state.categoriesReducer.categories
  );
  // const deleteCat = (id: string) => {
  //   // @ts-ignore
  //   dispatch(deleteCategoryThunk(id));
  // };
  // const showCat = () => {
  //   console.log(categories);
  // };

  return (
    <div>
      <ListCategories
        setSpending={(type: string) => setSpending(type)}
        categoriesList={categories}
        onClick={(item) =>
          item.name === "Add"
            ? setShowNewCategory(true)
            : setSpending(item.name.toLowerCase())
        }
        // onClick={(item) => {
        //   // @ts-ignore
        //   deleteCat(item._id);
        // }}
      />
      <AddNewCategoryModal
        isOpen={showNewCategory}
        onClose={() => setShowNewCategory(false)}
      />
    </div>
  );
};

export default CategoriesBlock;
