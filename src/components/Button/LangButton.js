import styles from "./Button.module.css";
import cn from "classnames";

const LangButton = ({ children }) => {
  return (
    <button className={cn(styles["button"], styles["outlined"])}>
      {" "}
      {children}
    </button>
  );
};

export default LangButton;
