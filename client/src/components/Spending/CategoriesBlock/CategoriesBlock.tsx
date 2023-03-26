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
    let date = new Date(Date.UTC(2021, 5, 28, 3, 0, 0));
    let formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Denver",
    });
    let usDate = formatter.format(date);
    return new Date(usDate);
  };

  const setSpending = (type: string) => {
    const date = getDate();
    // @ts-ignore
    dispatch(setSpendingThunk(type, new Date(), +props.amount));
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

  const basa = useSelector((state: any) => state.spendingReducer.categories);
  // const deleteCat = (id: string) => {
  //   // @ts-ignore
  //   dispatch(deleteCategoryThunk(id));
  // };
  // // const showCat = () => {
  // // };

  return (
    <div>
      <ListCategories
        setSpending={(type: string) => setSpending(type)}
        categoriesList={categories}
        onClick={(item) => setSpending(item.name)}
        // onClick={(item) => {
        //   // @ts-ignore
        //   deleteCat(item._id);
        // }}
      />
      <button>
        <img
          className={styles.img}
          src={TypeImageMapping.add}
          onClick={() => setShowNewCategory(true)}
        />
      </button>
      <AddNewCategoryModal
        isOpen={showNewCategory}
        onClose={() => setShowNewCategory(false)}
      />
    </div>
  );
};

export default CategoriesBlock;
