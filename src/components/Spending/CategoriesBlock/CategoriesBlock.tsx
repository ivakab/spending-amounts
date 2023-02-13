import React from "react";
import styles from "./CategoriesBlock.module.css";
import { TypeImageMapping } from "../../../utils/typeImageMapping";
import { setNewSpending, setTempValue } from "../../../redux/spending-reducer";
import { useDispatch, useSelector } from "react-redux";
import SpendingHistory from "../SpendingHistory/SpendingHistory";

const CategoriesBlock = () => {
  const dispatch = useDispatch();

  const temp = useSelector(
    (state: any) => state.spendingReducer.temporaryAmount
  );

  const categories = useSelector(
    (state: any) => state.spendingReducer.categories
  );

  const getDate = () => {
    const date = new Date().getTime();
    return new Date(date);
  };

  const setSpending = (type: string) => {
    const date = getDate();
    dispatch(setNewSpending({ amount: +temp, date: date, type: type }));
    dispatch(setTempValue({ temporaryAmount: "" }));
  };

  const showCategories = () => {
    console.log(categories);
  };

  const categoriesList = [
    {
      name: "Food",
      img: TypeImageMapping.food,
      onClick: () => setSpending("food"),
    },
    {
      name: "Transport",
      img: TypeImageMapping.transport,
      onClick: () => setSpending("transport"),
    },
    {
      name: "Health",
      img: TypeImageMapping.health,
      onClick: () => setSpending("health"),
    },
    {
      name: "Other",
      img: TypeImageMapping.other,
      onClick: () => showCategories(),
    },
  ];

  return (
    <div>
      <div className={styles.categoriesBlock}>
        {categoriesList.map((item, index) => {
          return (
            <button
              onClick={item.onClick}
              className={styles.categoryBtn}
              key={index}
            >
              {<img className={styles.iconImg} src={item.img} />}
            </button>
          );
        })}
      </div>
      <SpendingHistory categories={categories} />
    </div>
  );
};

export default CategoriesBlock;
