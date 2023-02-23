import { NavLink, Outlet, useNavigate } from "react-router-dom";
import styles from "./Navigation.module.css";

const Navigation = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);
  return (
    <div>
      <div className={styles.header}>
        <NavLink to="/">
          <button>Spending</button>
        </NavLink>
        <NavLink to="/charts">
          <button> Charts</button>
        </NavLink>
        <button onClick={goBack}>Go back</button>
      </div>
      <Outlet />
    </div>
  );
};

export default Navigation;
