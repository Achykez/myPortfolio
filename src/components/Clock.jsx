import React, { useState, useEffect } from "react";

export const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // function to get the day suffix based on the day of the month
  const getDaySuffix = (day) => {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  // get the day and suffix
  const day = time.getDate();
  const suffix = getDaySuffix(day);

  

  // format the date string
  const month = time.toLocaleString("default", { month: "long" });

  const dateString = `${time.getDate()}${suffix} of ${month} ${time.getFullYear()}`;

  return (
    <div>      
      <div> the {dateString} {''}{time.toLocaleTimeString()} {''}</div>
    </div>
  );
};



