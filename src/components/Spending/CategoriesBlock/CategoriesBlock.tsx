import React from "react";
import styles from "./CategoriesBlock.module.css";
import FOOD from "../../../images/categoriesImg/foodIcon.png";
import TRANSPORT from "../../../images/categoriesImg/transportIcon.png";
import HEALTH from "../../../images/categoriesImg/healthIcon.png";
import OTHER from "../../../images/categoriesImg/otherIcon.png";
import {
  setAmountFood,
  // setAmountFoodDate,
  setAmountHealth,
  setAmountTransport,
  setTempValue,
} from "../../../redux/spending-reducer";
import { useDispatch, useSelector } from "react-redux";

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

  const setFood = () => {
    dispatch(setAmountFood(+temp));
    // dispatch(setAmountFoodDate(+getDate()));
    dispatch(setTempValue(""));
  };

  const setTransport = () => {
    dispatch(setAmountTransport(+temp));
    dispatch(setTempValue(""));
  };

  const setHealth = () => {
    dispatch(setAmountHealth(+temp));
    dispatch(setTempValue(""));
  };

  const showCategories = () => {
    console.log(categories);
  };

  const categoriesList = [
    {
      name: "Food",
      img: FOOD,
      onClick: () => setFood(),
    },
    {
      name: "Transport",
      img: TRANSPORT,
      onClick: () => setTransport(),
    },
    {
      name: "Health",
      img: HEALTH,
      onClick: () => setHealth(),
    },
    {
      name: "Other",
      img: OTHER,
      onClick: () => showCategories(),
    },
  ];

  return (
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
  );
};

export default CategoriesBlock;