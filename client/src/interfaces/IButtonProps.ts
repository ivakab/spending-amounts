export interface IButtonInfo {
  value: string;
  icon: string;
  onClick?: (currentValue: string) => string;
}

export const deleteLastSimbol = (amount: string) => {
  if (!amount.length) return "";
  return amount.slice(0, -1);
};

export const setPoint = (amount: string) => {
  const isPoint = amount.indexOf(".") > -1;
  if (!isPoint && amount.length != 0) return amount + ".";
  else return amount;
};
