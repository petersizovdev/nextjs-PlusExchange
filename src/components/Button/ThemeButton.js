import styles from "./Button.module.css";
import cn from "classnames";

const ThemeButton = ({ children }) => {
  return (
    <button className={cn(styles["button"], styles["outlined"])}>
      {children}
    </button>
  );
};

export default ThemeButton;
