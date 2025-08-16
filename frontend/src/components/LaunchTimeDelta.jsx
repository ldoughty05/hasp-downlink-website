import { useState, useEffect } from 'react';

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

function LaunchTimeDelta() {
  const LAUNCH_DATETIME = new Date(2025, 8, 5, 12, 0); // Sept 5, 2025 12:00 (Month is zero indexed)
  const [timedelta, setTimedelta] = useState("");

  useEffect(() => {
    const updateCountdown = () => {
      setTimedelta(new Date() - LAUNCH_DATETIME);
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000); // update every second
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {formatTime(timedelta)}
    </>
  );
}

export default LaunchTimeDelta;