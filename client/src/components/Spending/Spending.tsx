import * as React from "react";
import CalculationButtons from "./CalculationButtons/CalculationButtons";
import CategoriesBlock from "./CategoriesBlock/CategoriesBlock";
import styles from "./Spending.module.css";

const Spending = () => {
  return (
    <div className={styles.content}>
      <CalculationButtons />
      <CategoriesBlock />
    </div>
  );
};
export default Spending;
