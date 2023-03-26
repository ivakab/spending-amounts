import React, { useEffect, useMemo, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useSelector } from "react-redux";
import { CategoryValueState } from "../../interfaces/ISpendingProps";
import { CategoriesState } from "../../redux/categories-reducer";
import { getTotalAmount } from "../api/CategoryApi";
import DatePicker from "react-date-picker";
// import "@n3/react-date-picker/dist/n3-date-picker.css";
// require("react-datepicker/dist/react-datepicker.css");

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
  const [newStartDate, setStartDate] = useState(new Date());
  const [newEndDate, setEndDate] = useState(new Date());

  const setNewStartDate = (newDate: string) => {
    let date = new Date(newDate);
    setStartDate(date);
    console.log(newDate);
  };

  const setNewEndDate = (newDate: string) => {
    let date = new Date(newDate);
    date.setDate(date.getDate());
    setEndDate(date);
    console.log(newDate);
  };

  useEffect(() => {
    let endDate = new Date();
    let startDate = new Date(2000, 0, 1);
    updateChart(startDate, endDate);
  }, []);

  const updateChart = (startDate?: any, endDate?: any) => {
    getTotalAmount(startDate, endDate).then((res) => {
      setUniqueData(
        //@ts-ignore
        Object.entries(res).map(([key, value]) => ({
          category: key,
          amount: value,
        }))
      );
    });
  };

  let color = 90;
  const colors = ["rgba(200,50,80,1)"];

  for (let i = 0; i < uniqueData.length; i++) {
    color += 10;
    colors.push(
      `rgba(${color + Math.random() * 100},${color + Math.random() * 100},${
        color + Math.random() * 100
      },1)`
    );
  }

  const setRightFormatOfMonth = (date: any) => {
    let month = date.getMonth();
    if (month.toString().length <= 1) {
      month += 1;
      return "0" + month;
    } else {
      month += 1;
      return month.toString();
    }
  };
  const setRightFormatOfDate = (date: any) => {
    let month = date.getDate();
    if (month.toString().length <= 1) {
      // month += 1;
      return "0" + month;
    } else return month.toString();
  };
  console.log(setRightFormatOfMonth(newStartDate));

  const userData = useMemo(
    () => ({
      labels: uniqueData.map((data: uniqueData) => data.category),
      datasets: [
        {
          label: "Users Gained",
          data: uniqueData.map((data: uniqueData) => data.amount),
          backgroundColor: colors,
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    }),
    [uniqueData]
  );

  let startDate = new Date();
  startDate.setDate(5);
  let endDate = new Date();
  endDate.setDate(25);
  return (
    <div>
      <Pie data={userData} />
      <div>
        <div>Select start date</div>
        <input
          type="date"
          onChange={(e) => setNewStartDate(e.target.value)}
          value={`${newStartDate.getFullYear()}-${setRightFormatOfMonth(
            newStartDate
          )}-${setRightFormatOfDate(newStartDate)}`}
        />
      </div>
      <div>
        <div>Select end date</div>
        <input
          type="date"
          onChange={(e) => setNewEndDate(e.target.value)}
          // value={"2018-07-22"}
          // value={newEndDate.toLocaleString()}
          value={`${newEndDate.getFullYear()}-${setRightFormatOfMonth(
            newEndDate
          )}-${setRightFormatOfDate(newEndDate)}`}
        />
      </div>

      <button onClick={() => updateChart(newStartDate, newEndDate)}>
        show spending for the selected period
      </button>
    </div>
  );
};

export default HistoryCharts;
