import React from "react";
import { IButtonInfo } from "../../../../interfaces/IButtonProps";
import styles from "./Button.module.css";

interface IProps {
  info: IButtonInfo;
  onClick: (buttonValue: string) => void;
}

export const Button = (props: IProps) => {
  return (
    <button
      onClick={() => {
        props.onClick(props.info.value);
      }}
      className={styles.valueBtn}
    >
      {/* {item.hasImage ? (
        <img className={styles.deleteButton} src={item.value} />
      ) : (
        item.value
      )} */}
      {props.info.value}
    </button>
  );
};
