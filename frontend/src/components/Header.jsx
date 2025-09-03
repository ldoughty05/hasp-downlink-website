import axpLogo from '/AXP_Logo.webp';
import styles from "../styles/header.module.css";
import { useNavigate } from "react-router-dom";


function Header() {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.heading}>
        <button onClick={() => navigate("/")} className={styles.heading_button}>
          <img src={axpLogo} className={styles.logo} alt="AXP logo" />
          <h1>UNL Aerospace Club: Advanced eXperimental Payloads </h1>
        </button>
      </div>
      <hr />
    </>
  );
}

export default Header;