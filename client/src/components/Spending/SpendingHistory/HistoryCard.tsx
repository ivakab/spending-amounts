import React from "react";
import { CategoryValueState } from "../../../interfaces/ISpendingProps";
import styles from "./HistoryCard.module.css";

interface IProps {
  card: CategoryValueState;
  src: string;
  deleteSpending: (_id: string) => void;
}

export const HistoryCard = (props: IProps) => {
  return (
    <div className={styles.historyCards}>
      <div
        className={styles.type}
        onClick={() => props.deleteSpending(props.card._id)}
      >
        <img className={styles.image} src={props.src} />
      </div>
      <div className={styles.date}>{props.card.date.toDateString()}</div>
      <div className={styles.amount}>{`${props.card.amount} $`}</div>
    </div>
  );
};
