import TRANSPORT from "../images/categoriesImg/transportIcon.png";
import HEALTH from "../images/categoriesImg/healthIcon.png";
import OTHER from "../images/categoriesImg/otherIcon.png";
import ADD from "../images/categoriesImg/plusIcon.png";
import CLOTH from "../images/categoriesImg/clothIcon.png";
import ENTERTAINMENT from "../images/categoriesImg/entertainmentIcon.png";
import GIFT from "../images/categoriesImg/giftIcon.png";
import PURCHASES from "../images/categoriesImg/purchasesIcon.png";
import REPAIR from "../images/categoriesImg/repairIcon.png";
import UTILITIES from "../images/categoriesImg/utilitiesIcon.png";

export const TypeImageMapping: { [key: string]: any } = {
  food: require("../images/categoriesImg/foodIcon.png"),
  transport: TRANSPORT,
  health: HEALTH,
  other: OTHER,
  cloth: CLOTH,
  entertainment: ENTERTAINMENT,
  gift: GIFT,
  purchases: PURCHASES,
  repair: REPAIR,
  utilities: UTILITIES,
  add: ADD,
};
