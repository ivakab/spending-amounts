import React, { useEffect, useState } from "react";
import styles from "./CalculationButtons.module.css";
import deleteButton from "../../../images/deleteButton.png";
import { useDispatch, useSelector } from "react-redux";
import { setTempValue } from "../../../redux/spending-reducer";

const CalculationButtons = () => {
  const dispatch = useDispatch();
  let amount = useSelector(
    (state: any) => state.spendingReducer.temporaryAmount
  );
  const [point, setPoint] = useState(false);

  const enterAmount = (value: string) => {
    if (!amount) setPoint(false);
    if (value === "." && !point && amount) {
      setPoint(true);
      updateAmount(amount + value);
    } else if (value != ".") {
      updateAmount(amount + value);
    }
  };

  const deleteLastSimbol = () => {
    if (!amount.length) return;
    if (amount.endsWith(".")) {
      setPoint(false);
      updateAmount(amount.slice(0, -1));
    } else updateAmount(amount.slice(0, -1));
  };

  const updateAmount = (val: string) => {
    amount = val;
    dispatch(setTempValue({ temp: val }));
  };

  const buttonsList: {
    value: string;
    hasImage?: boolean;
    onClick?: () => void;
  }[] = [
    { value: "1" },
    { value: "2" },
    { value: "3" },
    { value: "4" },
    { value: "5" },
    { value: "6" },
    { value: "7" },
    { value: "8" },
    { value: "9" },
    { value: "." },
    { value: "0" },
    { value: deleteButton, hasImage: true, onClick: () => deleteLastSimbol() },
  ];

  return (
    <div>
      <div className={styles.buttons}>
        {buttonsList.map((item, index) => {
          return (
            <button
              key={index}
              onClick={() => {
                if (item.onClick) {
                  item.onClick();
                } else {
                  enterAmount(`${item.value}`);
                }
              }}
              className={styles.valueBtn}
            >
              {item.hasImage ? (
                <img className={styles.deleteButton} src={item.value} />
              ) : (
                item.value
              )}
            </button>
          );
        })}
      </div>
      <div className={styles.currentEnter}>{amount}</div>
    </div>
  );
};

export default CalculationButtons;
