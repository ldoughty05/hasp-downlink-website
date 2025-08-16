import styles from "../styles/downlink.module.css";
import { useState, useEffect } from 'react';
import api from "../api.js";
import LaunchTimeDelta from "../components/LaunchTimeDelta.jsx";


function Downlink() {
  const [dataframe, setDataframe] = useState("");

  const getDataFrame = () => { // TODO: add a payload saying the latest sample time we already have so we don't have to wait to receive the whole file.
    api
      .get("/data")
      .then((res) => res.data)
      .then((data) => setDataframe(data))
      .catch((error) => alert(error));
  };

  useEffect(() => {
    getDataFrame();
    const interval = setInterval(getDataFrame, 60_000); // update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.downlink}>
      <h2 className={styles.title}>HASP 2025 High Altitude Balloon Payload</h2>
      <h1>Live Downlink</h1>
      <p className={styles.title}>Flight Time: {<LaunchTimeDelta />}</p>
      <div className={styles.graphs_grid}>
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  );
}

export default Downlink;