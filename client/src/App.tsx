import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Spending from "./components/Spending/Spending";
import Navigation from "./components/Spending/Navigation";
import HistoryCharts from "./components/HistoryCharts/HistoryCharts";
import { Route, Routes } from "react-router-dom";
import { getSpending } from "./components/api/SpendingApi";
import { setNewSpending } from "./redux/spending-reducer";
import { useDispatch } from "react-redux";
import { CategoryValueState } from "./interfaces/ISpendingProps";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    getSpending().then((res) =>
      res.map((item: CategoryValueState) => {
        dispatch(setNewSpending({ ...item }));
      })
    );
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Spending />} />
          <Route path="charts" element={<HistoryCharts />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
