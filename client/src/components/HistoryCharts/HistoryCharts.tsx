import React, { useEffect, useMemo, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useSelector } from "react-redux";
import { CategoryValueState } from "../../interfaces/ISpendingProps";
import { CategoriesState } from "../../redux/categories-reducer";
import { getTotalAmount } from "../api/CategoryApi";

ChartJS.register(ArcElement, Tooltip, Legend);

type uniqueData = {
  category: string;
  amount: number;
};

const HistoryCharts = () => {
  const amounts = useSelector((state: any) => state.spendingReducer.categories);

  const categories = useSelector(
    (state: any) => state.categoriesReducer.categories
  );

  const [uniqueData, setUniqueData] = useState<uniqueData[]>([]);

  useEffect(() => {
    getTotalAmount().then((res) => {
      setUniqueData(
        //@ts-ignore
        Object.entries(res).map(([key, value]) => ({
          category: key,
          amount: value,
        }))
      );
    });
  }, []);

  const userData = useMemo(
    () => ({
      labels: uniqueData.map((data: uniqueData) => data.category),
      datasets: [
        {
          label: "Users Gained",
          data: uniqueData.map((data: uniqueData) => data.amount),
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
    }),
    [uniqueData]
  );

  return <Pie data={userData} />;
};

export default HistoryCharts;
