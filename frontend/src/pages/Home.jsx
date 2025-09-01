import { useNavigate } from 'react-router-dom';
import styles from "../styles/home.module.css"
import PAYLOAD from "../assets/Payload_Alone.png"
import BRS_LOGO from "../assets/BRS.png"
import COLUMBIA_SIGN from "../assets/ColumbiaSign.JPEG"
import THERMOVAC from "../assets/ThermovacB.JPEG" 
import MANYPAYLOADS from "../assets/ManyPayloads.JPG"
import PAYLOADBOXED from "../assets/PayloadBoxed.JPEG"
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
        <div>
          <h3>Welcome to the HASP downlink page!</h3>
          <p>This page displays real-time data from University of Nebraska's payload on the <a href="https://laspace.lsu.edu/hasp/">High Altitude Student Platform</a>, a high altitude ballooning program for student built scientific payloads.</p>
          <p>We built this payload during the 2024-2025 school year. Its purpose is to evaluate the effectiveness of perovskite solar cells in near-space conditions.</p>
          <h3>What does the payload do?</h3>
          <p>
            The payload is equipped with sensors for temperature, pressure, and acceleration. To measure the efficiency of the solar cells, it uses a "voltage ladder" which steps through a series of 
            resistors to measure the voltage and current output of the solar cells at different loads. Along with the solar cells on the surface of the payload, there is a sun angle sensor so we can 
            correct for varying flux angles of the sunlight relative to the panels during the flight.
          </p>
          <h3>What are perovskites?</h3>
          <p>
            We have a partnership with the National Renewable Energy Lab (NREL) where they send us their new, cutting edge perovskite solar cells, and we perform high altitude tests on them.
            What makes perovskites so special is that they can be manufactured at a fraction of the cost of traditional silicon solar cells, and they have the potential to reach much higher efficiencies 
            than silicon. Additionally, since perovskites have a transparent, crystalline structure, they can be layered on top of traditional silicon solar cells to create tandem cells, which can reach 
            efficiencies greater than either cell alone. Our testing hopes to address the question of their long term stability in near-space, which is one of the main barriers to their commercialization 
            for aerospace applications.
          </p>
          <p><b>More resources on perovskites:</b></p>
          <ul>
            <li><a href="https://www.nrel.gov/pv/perovskite-solar-cells">NREL Perovskite Solar Cells</a></li>
            <li><a href="https://www.energy.gov/eere/solar/perovskite-solar-cells">Energy.gov Perovskite Solar Cells</a></li>
            <li><a href="https://news.mit.edu/2022/perovskites-solar-cells-explained-0715">MIT Explained: Why perovskites could take solar cells to new heights</a></li>
          </ul>
        </div>
        <img src={PAYLOAD} className={styles.payload_alone}/>
      </div>
      <button className="glow" onClick={() => navigate("/downlink")}>
        See the Data Live
      </button>
      <div className={styles.photo_gallery}>
        <img src={BRS_LOGO} className={styles.brs_logo} />
        <img src={COLUMBIA_SIGN} className={styles.columbia_sign} />
        <img src={THERMOVAC} className={styles.thermovac} />
        <img src={MANYPAYLOADS} className={styles.many_payloads} />
        <img src={PAYLOADBOXED} className={styles.payload_boxed} />
      </div>
    </div>
  );
}

export default Home;