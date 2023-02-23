import React from "react";
import styles from "./SpendingHistory.module.css";
import { TypeImageMapping } from "../../../utils/typeImageMapping";
import { useDispatch, useSelector } from "react-redux";
import { deleteSpendingApi } from "../../api/SpendingApi";
import { deleteFromState } from "../../../redux/spending-reducer";
import { HistoryCard } from "./HistoryCard";
import { CategoryValueState } from "../../../interfaces/ISpendingProps";

const SpendingHistory = () => {
  const categories: CategoryValueState[] = useSelector(
    (state: any) => state.spendingReducer.categories
  );
  const dispatch = useDispatch();

  const deleteSpending = (id: string) => {
    deleteSpendingApi(id).then((res) => {
      if (res.acknowledged) dispatch(deleteFromState({ _id: id }));
    });
  };

  return (
    <div className={styles.history}>
      {categories.length
        ? categories.map((item: CategoryValueState) => (
            <HistoryCard
              key={item._id}
              card={item}
              deleteSpending={deleteSpending}
            />
          ))
        : `no spending yet`}
    </div>
  );
};

export default SpendingHistory;
