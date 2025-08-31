import React, { useEffect, useState } from "react";
import "../css/deal.css";

const Deal = () => {
  const [time, setTime] = useState({
    day: 4,
    hour: 23,
    min: 38,
    sec: 56,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { day, hour, min, sec } = prev;

        if (sec > 0) {
          sec -= 1;
        } else {
          sec = 59;
          if (min > 0) {
            min -= 1;
          } else {
            min = 59;
            if (hour > 0) {
              hour -= 1;
            } else {
              hour = 23;
              if (day > 0) {
                day -= 1;
              } else {
                // Hết giờ
                clearInterval(interval);
              }
            }
          }
        }

        return { day, hour, min, sec };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="deal">
      <div className="deal-image"></div>
      <div className="deal-section">
        <h2 className="deal-title">Deal Of The Week</h2>
        <div className="deal-timer">
          <div className="timer">
            <h1>{time.day}</h1>
            <h2>Days</h2>
          </div>
          <div className="timer">
            <h1>{time.hour}</h1>
            <h2>Hours</h2>
          </div>
          <div className="timer">
            <h1>{time.min}</h1>
            <h2>Mins</h2>
          </div>
          <div className="timer">
            <h1>{time.sec}</h1>
            <h2>Sec</h2>
          </div>
        </div>
        <button className="deal-button">Shop now</button>
      </div>
    </div>
  );
};

export default Deal;
