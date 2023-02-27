import React, { useState } from "react";
import CalculationButtons from "./CalculationButtons/CalculationButtons";
import CategoriesBlock from "./CategoriesBlock/CategoriesBlock";
import styles from "./Spending.module.css";
import SpendingHistory from "./SpendingHistory/SpendingHistory";

const Spending = () => {
  const [amount, setAmount] = useState("");
  return (
    <div className={styles.content}>
      <CalculationButtons amount={amount} setAmount={setAmount} />
      <CategoriesBlock
        amount={amount}
        onChange={(amount: string) => setAmount(amount)}
      />
      <SpendingHistory />
    </div>
  );
};
export default Spending;
