import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useSelector } from "react-redux";
import { CategoryValueState } from "../../interfaces/ISpendingProps";

ChartJS.register(ArcElement, Tooltip, Legend);

const HistoryCharts = () => {
  const amounts = useSelector((state: any) => state.spendingReducer.categories);

  let categories: string[] = [];

  type amountType = {
    type: string;
    amount: number;
  };

  let uniqueData: CategoryValueState[] = [];

  amounts.map((item: CategoryValueState) => {
    if (!categories.includes(item.type)) {
      categories.push(item.type);
      uniqueData.push(item);
    } else {
      uniqueData.map((amount) => {
        if (amount.type === item.type) amount.amount += item.amount;
      });
    }
  });

  const [userData, setUserData] = useState({
    labels: uniqueData.map((data: amountType) => data.type),
    datasets: [
      {
        label: "Users Gained",
        data: uniqueData.map((data: amountType) => data.amount),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "rgba(0,190,100,1)",
          "rgba(90,115,160,1)",
          "rgba(7,92,92,1)",
          "rgba(245,19,192,1)",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });
  return <Pie data={userData} />;
};

export default HistoryCharts;
