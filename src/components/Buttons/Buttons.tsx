import React from "react";
import styles from "./Buttons.module.css";

type Props = {
  label: string;
  disabled?: boolean;
  onClick: () => void;
};

export const Buttons = (props: Props) => {
  return (
    <button
      className={styles.btn}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.label}
    </button>
  );
};
