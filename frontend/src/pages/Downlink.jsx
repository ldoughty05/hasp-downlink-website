import styles from "../styles/downlink.module.css";
import React from 'react';
import { useState, useEffect } from 'react';
import api from "../api.js";

function formatTime(ms) {
  // if (ms <= 0) return "Launched!";
  let sign = (ms <= 0) ? "-" : "+"
  ms = Math.abs(ms);
  let seconds = Math.floor(ms / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);

  seconds %= 60;
  minutes %= 60;
  hours %= 24;

  return `T${sign} ${days}d ${hours}h ${minutes}m ${seconds}s`;
};

function Downlink() {
  const LAUNCH_DATETIME = new Date(2025, 8, 5, 12, 0); // Sept 5, 2025 12:00 (Month is zero indexed)
  const [timedelta, setTimedelta] = useState("");
  const [dataframe, setDataframe] = useState("");

  const getDataFrame = () => {
    api
      .get("/data/")
      .then((res) => res.data)
      .then((data) => setDataframe(data))
      .catch((error) => alert(error));
  };

  useEffect(() => {
    getDataFrame();
    const interval = setInterval(getDataFrame, 60_000); // update every minute
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateCountdown = () => {
      setTimedelta(new Date() - LAUNCH_DATETIME);
      console.log(dataframe);
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000); // update every second
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.downlink}>
      <h2 className={styles.title}>HASP 2025 High Altitude Balloon Payload</h2>
      <h1>Live Downlink</h1>
      <p className={styles.title}>Flight Time: {formatTime(timedelta)}</p>
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