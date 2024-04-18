import styles from "./Header.module.css";
import Image from "next/image";
import Logo from "@/assetst/svg/logo.svg";

const Header = () => {
  return (
    <div className={styles.header}>
      <Image className={styles.logo} src={Logo} alt="logo" />
      <div lassName={styles.nav}>
        <button>Обмен</button>
        <button>EN</button>
        <button>00</button>
      </div>
    </div>
  );
};

export default Header;
