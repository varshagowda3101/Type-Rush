
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const seconds = currentTime.getSeconds();
  const minutes = currentTime.getMinutes();
  const hours = currentTime.getHours();

  const numbers = Array.from({ length: 12 }, (_, index) => {
    const number = index === 0 ? 12 : index;
    const angle = (index * Math.PI) / 6;

    return {
      number,
      x: 50 + 41 * Math.sin(angle),
      y: 50 - 41 * Math.cos(angle),
    };
  });

  const hourRotation = (hours % 12) * 30 + minutes * 0.5;
  const minuteRotation = minutes * 6 + seconds * 0.1;
  const secondRotation = seconds * 6;

  const formatTime = (value) => String(value).padStart(2, "0");

  return (
    <main className="page">
      <section className="app-card">
        <div className="top-label">LIVE CLOCK</div>

        <h1>Type Rush<span>.</span></h1>
        <p className="subtitle">Your Real-Time Clock</p>

        <div className="timer-label">
          <span className="live-dot active" />
          CURRENT TIME
        </div>

        <div className="clock">
          <div className="clock-inner">

            {numbers.map((item) => (
              <span
                key={item.number}
                className="number"
                style={{
                  left: `${item.x}%`,
                  top: `${item.y}%`,
                }}
              >
                {item.number}
              </span>
            ))}

            {Array.from({ length: 60 }, (_, i) => (
              <span
                key={i}
                className={`tick ${i % 5 === 0 ? "major" : ""}`}
                style={{ transform: `rotate(${i * 6}deg)` }}
              />
            ))}

            <div
              className="hour-hand"
              style={{ transform: `rotate(${hourRotation}deg)` }}
            />

            <div
              className="minute-hand"
              style={{ transform: `rotate(${minuteRotation}deg)` }}
            />

            <div
              className="second-hand"
              style={{ transform: `rotate(${secondRotation}deg)` }}
            />

            <div className="pin" />

            <div className="time-display">
              <strong>
                {formatTime(hours)}:{formatTime(minutes)}
              </strong>
              <span>{formatTime(seconds)} SECONDS</span>
            </div>

          </div>
        </div>

        <div className="status-text">
          Your clock is running in real time.
        </div>

        <div className="bottom-note">
          <span>LIVE</span> <i>•</i> HOURS <i>•</i> MINUTES <i>•</i> SECONDS
        </div>
      </section>
    </main>
  );
}

export default App;
