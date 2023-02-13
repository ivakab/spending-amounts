import React from "react";
import styles from "./SpendingHistory.module.css";
import { TypeImageMapping } from "../../../utils/typeImageMapping";

type CategoryValueState = {
  date: Date;
  amount: number;
  type: "food" | "health" | "transport" | "other";
};

interface IState {
  categories: CategoryValueState[];
}

const SpendingHistory = (props: IState) => {
  return (
    <div className={styles.history}>
      {props.categories.length
        ? props.categories.map((item: CategoryValueState, index: number) => (
            <div key={index} className={styles.historyCards}>
              <div className={styles.type}>
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
