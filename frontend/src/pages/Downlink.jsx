import styles from "../styles/downlink.module.css";
import { useState, useEffect } from 'react';
import api from "../api.js";
import LaunchTimeDelta from "../components/LaunchTimeDelta.jsx";
import ScatterGraph from "../components/Graph.jsx";



function Downlink() {
  const [dataframe, setDataframe] = useState([]);

  const getDataFrame = () => { // TODO: add a payload saying the latest sample time we already have so we don't have to wait to receive the whole file.
    api
      .get("/data")
      .then((res) => res.data)
      .then((data) => {
        setDataframe(data);
        console.log(typeof(data));
      })
      .catch((error) => alert(error));
  };

  useEffect(() => {
    getDataFrame();
    const interval = setInterval(getDataFrame, 60_000); // update every minute
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!dataframe) return;
    // console.log(typeof(dataframe));
    // console.log(dataframe);
  }, [dataframe])

  return (
    <div className={styles.downlink}>
      <h2 className={styles.title}>HASP 2025 High Altitude Balloon Payload</h2>
      <h1>Live Downlink</h1>
      <p className={styles.title}>Flight Time: {<LaunchTimeDelta />}</p>
      <div className={styles.graphs_grid}>
        {dataframe.length > 0 && <>
          <ScatterGraph 
            x={dataframe.map(entry => entry["sample_time"])}
            y_list={[
              dataframe.map(entry => entry["temperature"]["sensor_1"]),
              dataframe.map(entry => entry["temperature"]["sensor_2"]),
              dataframe.map(entry => entry["temperature"]["sensor_3"]),
              dataframe.map(entry => entry["temperature"]["sensor_4"]),
              dataframe.map(entry => entry["temperature"]["sensor_5"]),
              dataframe.map(entry => entry["temperature"]["sensor_6"]),
            ]}
            y_labels={["sensor 1", "sensor 2", "sensor 3", "sensor 4", "sensor 5", "sensor 6"]}
            title="Temperature Sensors"
          />
          <ScatterGraph 
            x={dataframe.map(entry => entry["sample_time"])}
            y_list={[
              dataframe.map(entry => entry["imu"]["accel_x"]),
              dataframe.map(entry => entry["imu"]["accel_y"]),
              dataframe.map(entry => entry["imu"]["accel_z"]),
            ]}
            y_labels={["x", "y", "z"]}

            title="IMU Acceleration"
          />
          <ScatterGraph 
            x={dataframe.map(entry => entry["sample_time"])}
            y_list={[
              dataframe.map(entry => entry["imu"]["gyro_x"]),
              dataframe.map(entry => entry["imu"]["gyro_y"]),
              dataframe.map(entry => entry["imu"]["gyro_z"]),
            ]}
            y_labels={["x", "y", "z"]}
            title="IMU Gyroscope"
          />
          <ScatterGraph 
            x={dataframe.map(entry => entry["sample_time"])}
            y_list={[
              dataframe.map(entry => entry["cell_1"]["voltage"]),
              dataframe.map(entry => entry["cell_2"]["voltage"]),
              dataframe.map(entry => entry["cell_3"]["voltage"]),
              dataframe.map(entry => entry["modules"]["voltage"]),
            ]}
            y_labels={["cell 1", "cell 2", "cell 3", "modules"]}
            title="Solar Cell Voltages"
          />
          <ScatterGraph 
            x={dataframe.map(entry => entry["sample_time"])}
            y_list={[
              dataframe.map(entry => entry["cell_1"]["current"]),
              dataframe.map(entry => entry["cell_2"]["current"]),
              dataframe.map(entry => entry["cell_3"]["current"]),
              dataframe.map(entry => entry["modules"]["current"]),
            ]}
            y_labels={["cell 1", "cell 2", "cell 3", "modules"]}
            title="Solar Cell Currents"
          />
        </>}
      </div>
    </div>
  );
}

export default Downlink;