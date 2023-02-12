import * as React from "react";
import CalculationButtons from "./CalculationButtons/CalculationButtons";
import CategoriesBlock from "./CategoriesBlock/CategoriesBlock";
import SpendingHistory from "./SpendingHistory/SpendingHistory";

const Spending = () => {
  return (
    <div>
      <CalculationButtons />
      <CategoriesBlock />
      {/* <SpendingHistory /> */}
    </div>
  );
};
export default Spending;
