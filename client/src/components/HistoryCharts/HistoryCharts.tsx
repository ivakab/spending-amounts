import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useSelector } from "react-redux";
import { CategoryValueState } from "../../interfaces/ISpendingProps";

ChartJS.register(ArcElement, Tooltip, Legend);

// const UserData = [
//   {
//     id: 1,
//     year: 2016,
//     userGain: 80000,
//     userLost: 823,
//   },
//   {
//     id: 2,
//     year: 2017,
//     userGain: 45677,
//     userLost: 345,
//   },
//   {
//     id: 3,
//     year: 2018,
//     userGain: 78888,
//     userLost: 555,
//   },
//   {
//     id: 4,
//     year: 2019,
//     userGain: 90000,
//     userLost: 4555,
//   },
//   {
//     id: 5,
//     year: 2020,
//     userGain: 4300,
//     userLost: 234,
//   },
// ];

const HistoryCharts = () => {
  const categories = useSelector(
    (state: any) => state.spendingReducer.categories
  );

  const [userData, setUserData] = useState({
    labels: categories.map((data: CategoryValueState) => data.type),
    datasets: [
      {
        label: "Users Gained",
        data: categories.map((data: CategoryValueState) => data.amount),
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
