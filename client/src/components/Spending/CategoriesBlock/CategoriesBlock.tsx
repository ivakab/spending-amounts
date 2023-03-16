import React, { useState } from "react";
import styles from "./CategoriesBlock.module.css";
import { TypeImageMapping } from "../../../utils/typeImageMapping";
import { setSpendingThunk } from "../../../redux/spending-reducer";
import { useDispatch } from "react-redux";
import AddNewCategoryModal from "./AddNewCategoryModal";
import { ListCategories } from "./ListCategories/ListCategories";

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
      img: TypeImageMapping.food,
    },
    {
      name: "Transport",
      img: TypeImageMapping.transport,
    },
    {
      name: "Health",
      img: TypeImageMapping.health,
    },
    {
      name: "Other",
      img: TypeImageMapping.other,
    },
    {
      name: "Add",
      img: TypeImageMapping.add,
      //при нажатии должно появляться
      //модальное окно с возможностью добавить новые категории
    },
  ];

  return (
    <div>
      <ListCategories
        setSpending={(type: string) => setSpending(type)}
        categoriesList={categoriesList}
        onClick={(item) =>
          item.name === "Add"
            ? setShowNewCategory(true)
            : setSpending(item.name.toLowerCase())
        }
      />
      <AddNewCategoryModal
        isOpen={showNewCategory}
        onClose={() => setShowNewCategory(false)}
      />
    </div>
  );
};

export default CategoriesBlock;
