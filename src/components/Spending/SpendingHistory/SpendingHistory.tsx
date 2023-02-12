import React from "react";
import { useSelector } from "react-redux";
import styles from "./SpendingHistory.module.css";

type CategoryValueState = {
  date: Date;
  amount: number;
  type: string;
};

interface IState {
  categories: CategoryValueState[];
}

const SpendingHistory = (props: IState) => {
  return (
    <div className={styles.history}>
      {props.categories.length
        ? props.categories.map((item: any, index: number) => (
            <div key={index}>
              <div>{item.type}</div>
              <div>{item.date.toDateString()}</div>
              <div>{item.amount}</div>
            </div>
          ))
        : `no spending yet`}
    </div>
  );
};

export default SpendingHistory;
