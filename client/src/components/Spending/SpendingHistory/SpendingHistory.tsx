import React, { useEffect, useMemo, useState } from "react";
import styles from "./SpendingHistory.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFromStateThunk,
  FilterType,
  setNewFilter,
  setNewSpending,
} from "../../../redux/spending-reducer";
import { HistoryCard } from "./HistoryCard";
import { CategoryValueState } from "../../../interfaces/ISpendingProps";
import { CategoriesState } from "../../../redux/categories-reducer";
import Select from "react-select";
import { getFilterAmounts, getSpending } from "../../api/SpendingApi";

const SpendingHistory = () => {
  const spending: CategoryValueState[] = useSelector(
    (state: any) => state.spendingReducer.categories
  );
  const categories: CategoriesState[] = useSelector(
    (state: any) => state.categoriesReducer.categories
  );
  const filter: FilterType = useSelector(
    (state: any) => state.spendingReducer.filter
  );
  const dispatch = useDispatch();

  const [fileredSpending, setFilteredSpending] =
    useState<CategoryValueState[]>();

  useEffect(() => {
    setFilteredSpending(spending);
  }, [spending]);

  const categoriesImageMapping = useMemo(() => {
    const result = new Map();
    categories.forEach((item) => {
      result.set(item.name, item.image);
    });
    return result;
  }, [categories]);

  const deleteSpending = (id: string) => {
    // @ts-ignore
    dispatch(deleteFromStateThunk(id));
  };

  const [typeFilter, setTypeFilter] = useState<String[]>([]);
  const [minAmountFilter, setMinAmountFilter] = useState<string>("");
  const [maxAmountFilter, setMaxAmountFilter] = useState<string>("");

  const startFilter = () => {
    dispatch(
      setNewFilter({
        minAmount: +minAmountFilter,
        maxAmount: +maxAmountFilter,
        types: typeFilter || [],
      })
    );
    getFilterAmounts(filter).then((res) => {
      setFilteredSpending(
        res
          .map((item: CategoryValueState) => ({
            ...item,
            date: new Date(item.date),
          }))
          .reverse()
      );
    });
  };

  const options = useMemo(() => {
    return categories.map((item) => ({ value: item.name, label: item.name }));
  }, [categories]);

  return (
    <div>
      <div>
        <Select
          isMulti
          options={options}
          onChange={(e) => {
            const newArr: String[] = [];
            e.forEach((item) => {
              newArr.push(item.value);
            });
            setTypeFilter(newArr);
          }}
        />
        <input
          type="number"
          value={minAmountFilter}
          onChange={(e) => setMinAmountFilter(e.target.value)}
        />
        <input
          type="number"
          value={maxAmountFilter}
          onChange={(e) => setMaxAmountFilter(e.target.value)}
        />
        <button onClick={() => startFilter()}>Filter</button>
      </div>
      <div className={styles.history}>
        {fileredSpending?.length
          ? fileredSpending.map((item: CategoryValueState) => (
              <HistoryCard
                key={item._id}
                card={item}
                src={categoriesImageMapping.get(item.type)}
                deleteSpending={deleteSpending}
              />
            ))
          : `no spending yet`}
      </div>
    </div>
  );
};

export default SpendingHistory;
