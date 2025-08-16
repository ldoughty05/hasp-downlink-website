import { useNavigate } from 'react-router-dom';
import styles from "../styles/home.module.css"
import PAYLOAD from "../assets/Payload_Alone.png"
import LaunchTimeDelta from '../components/LaunchTimeDelta';

function Home() {
  const navigate = useNavigate();

  return (
    <div className={styles.home}>
      <h2 className={styles.title}>HASP 2025 High Altitude Balloon Payload</h2>
      <h1>Launch in {<LaunchTimeDelta />}</h1>
      <button onClick={() => navigate("/downlink")}>
        Watch Downlink
      </button>
      <div className={styles.description}>
        <p>Welcome to the HASP downlink page! This page displays real-time data from University of Nebraska's payload on the <a href="https://laspace.lsu.edu/hasp/">High Altitude Student Platform</a>.</p>
        <img src={PAYLOAD} className={styles.payload_alone}/>
      </div>
      <button className="glow" onClick={() => navigate("/downlink")}>
        See the Data Live
      </button>
    </div>
  );
}

export default Home;