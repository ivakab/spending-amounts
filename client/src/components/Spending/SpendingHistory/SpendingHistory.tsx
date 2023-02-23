import React from "react";
import styles from "./SpendingHistory.module.css";
import { TypeImageMapping } from "../../../utils/typeImageMapping";
import { useDispatch, useSelector } from "react-redux";
import { deleteSpendingApi } from "../../api/SpendingApi";
import {
  CategoryValueState,
  deleteFromState,
} from "../../../redux/spending-reducer";

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
        ? categories.map((item: CategoryValueState, index: number) => (
            <div key={index} className={styles.historyCards}>
              <div
                className={styles.type}
                onClick={() => deleteSpending(item._id)}
              >
                <img
                  className={styles.image}
                  src={TypeImageMapping[item.type]}
                />
              </div>
              <div className={styles.date}>{item.date.toDateString()}</div>
              <div className={styles.amount}>{`${item.amount} $`}</div>
            </div>
          ))
        : `no spending yet`}
    </div>
  );
};

export default SpendingHistory;
