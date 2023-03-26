import React, { useMemo, useState } from "react";
import { TypeImageMapping } from "../../../utils/typeImageMapping";
import styles from "./AddNewCategoryModal.module.css";
import { v4 } from "uuid";
import {
  CategoriesState,
  setCategoryThunk,
} from "../../../redux/categories-reducer";
import { useDispatch, useSelector } from "react-redux";

const ListCategories = [
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
    name: "Cloth",
    img: TypeImageMapping.cloth,
  },
  {
    name: "Entertainment",
    img: TypeImageMapping.entertainment,
  },
  {
    name: "Gift",
    img: TypeImageMapping.gift,
  },
  {
    name: "Purchases",
    img: TypeImageMapping.purchases,
  },
  {
    name: "Repair",
    img: TypeImageMapping.repair,
  },
  {
    name: "Utilities",
    img: TypeImageMapping.utilities,
  },
  {
    name: "Add",
    img: TypeImageMapping.add,
  },
];

type Modal = {
  isOpen: boolean;
  onClose: () => void;
};

const AddNewCategoryModal = (props: Modal) => {
  const [newCategory, setNewCategory] = useState("");

  const categories = useSelector(
    (state: any) => state.categoriesReducer.categories
  );

  const dispatch = useDispatch();

  const names = new Set();
  categories.forEach((item: CategoriesState) => names.add(item.name));

  const createNewCategory = (name: string, image: string) => {
    if (names.has(name)) {
      return;
    }
    names.add(name);
    // @ts-ignore
    dispatch(setCategoryThunk(name, image));
  };

  if (!props.isOpen) {
    return <></>;
  }
  return (
    <div
      className={`${styles.modal} + ${styles.active}`}
      onClick={props.onClose}
    >
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <div className={styles.label}>Enter the name of the new category:</div>
        <input
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <div className={styles.categories}>
          {Object.keys(TypeImageMapping)
            // .filter((type) => !distinctInfo.names.has(type))
            .map((type, index) => (
              <div
                key={index}
                className={styles.category}
                onClick={() =>
                  createNewCategory(newCategory, TypeImageMapping[type])
                }
              >
                <img src={TypeImageMapping[type]} className={styles.image} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AddNewCategoryModal;
