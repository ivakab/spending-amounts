import React from "react";
import { ICategory } from "../../../../interfaces/ICategoriesProps";
import { TypeImageMapping } from "../../../../utils/typeImageMapping";
import styles from "./ListCategories.module.css";

interface IProps {
  setSpending: (type: string) => void;
  categoriesList: ICategory[];
  onClick: (el: ICategory) => void;
}

export const ListCategories = (props: IProps) => {
  return (
    <div className={styles.categoriesBlock}>
      {props.categoriesList.map((item, index) => {
        return (
          <button
            onClick={() => props.onClick(item)}
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
