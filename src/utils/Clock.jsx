import React, { useState, useEffect } from "react";

 export const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div>{time.toLocaleTimeString()}</div>;
};

const Experience = () => {
  const dateString = "2022-05-15";
  const { years, months } = howLongAgo(dateString);

  return (
    <ParaText as="p" top="2rem" bottom="4rem">
      Hello There , my name is Achike Chude and I'm a FrontEnd Developer with{" "}
      {years} years and {months} months of experience in creating user friendly
      websites and web applications. My experience has grown since{" "}
      <Clock />.
    </ParaText>
  );
};

export default Experience;
