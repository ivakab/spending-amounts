import React from "react";
import deleteButton from "../../../../images/deleteButton.png";
import {
  deleteLastSimbol,
  IButtonInfo,
  setPoint,
} from "../../../../interfaces/IButtonProps";
import { Button } from "./Button";
import styles from "./ListButtons.module.css";

interface IProps {
  amount: string;
  onChange: (newAmount: string) => void;
}

const buttonValues: IButtonInfo[] = [
  { value: "1", icon: "" },
  { value: "2", icon: "" },
  { value: "3", icon: "" },
  { value: "4", icon: "" },
  { value: "5", icon: "" },
  { value: "6", icon: "" },
  { value: "7", icon: "" },
  { value: "8", icon: "" },
  { value: "9", icon: "" },
  { value: ".", icon: "", onClick: setPoint },
  { value: "0", icon: "" },
  {
    value: "del",
    icon: deleteButton,
    onClick: deleteLastSimbol,
  },
];

export const ListButtons = (props: IProps) => {
  const onClick = (value: string) => {
    const button = buttonValues.filter((item) => item.value === value)[0];
    if (button.onClick) {
      const updateAmount = button.onClick(props.amount);
      props.onChange(updateAmount);
    } else props.onChange(props.amount + value);
  };

  return (
    <div className={styles.buttons}>
      {buttonValues.map((item, index) => {
        return <Button onClick={onClick} info={item} key={index} />;
      })}
    </div>
  );
};
