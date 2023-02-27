import React, { useEffect, useState } from "react";
import styles from "./CalculationButtons.module.css";
import deleteButton from "../../../images/deleteButton.png";
import { useDispatch, useSelector } from "react-redux";
import { ListButtons } from "./ListButtons/ListButtons";

interface IProps {
  amount: string;
  setAmount: (currentValue: string) => void;
}

const CalculationButtons = (props: IProps) => {
  return (
    <div>
      <div className={styles.currentEnter}>{props.amount}</div>
      <ListButtons
        amount={props.amount}
        onChange={(newAmount: string) => props.setAmount(newAmount)}
      />
    </div>
  );
};

export default CalculationButtons;
