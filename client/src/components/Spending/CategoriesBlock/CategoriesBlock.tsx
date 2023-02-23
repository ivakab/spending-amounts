import React, { useState } from "react";
import styles from "./CategoriesBlock.module.css";
import { TypeImageMapping } from "../../../utils/typeImageMapping";
import { setNewSpending } from "../../../redux/spending-reducer";
import { useDispatch, useSelector } from "react-redux";
import SpendingHistory from "../SpendingHistory/SpendingHistory";
import AddNewCategoryModal from "./AddNewCategoryModal";
import {
  deleteSpendingApi,
  getSpending,
  createSpending,
  updateSpending,
} from "../../api/SpendingApi";

interface IProps {
  amount: string;
  onChange: (emptyAmount: string) => void;
}

const CategoriesBlock = (props: IProps) => {
  // updateSpending({
  //   _id: "63f5e0edf0c1c52765bebc9c",
  //   type: "health",
  // }).then();
  // deleteSpendingApi("63f5e0cbe9844a17b0a3cd92").then();
  // createSpending({
  //   type: "transport",
  //   amount: 1000,
  //   date: new Date(),
  // }).then();

  const dispatch = useDispatch();

  const [showNewCategory, setShowNewCategory] = useState(false);

  const getDate = () => {
    const date = new Date().getTime();
    return new Date(date);
  };

  const setSpending = (type: string) => {
    const date = getDate();
    createSpending({
      type: type,
      amount: +props.amount,
      date: date,
    }).then((res) => {
      dispatch(
        setNewSpending({
          amount: res.amount,
          date: res.date,
          type: res.type,
          _id: res._id,
        })
      );
    });
    props.onChange("");
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
      onClick: () => setSpending("other"),
    },
    {
      name: "Add",
      img: TypeImageMapping.add,
      onClick: () => setShowNewCategory(true), //при нажатии должно появляться
      //модальное окно с возможностью добавить новые категории
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
      <AddNewCategoryModal
        isOpen={showNewCategory}
        onClose={() => setShowNewCategory(false)}
      />
      {/* добавить чилдрена как еще один компонент */}
    </div>
  );
};

export default CategoriesBlock;
