import React from "react";

const InsightsCard = ({
  isGlow = true,
  label,
  insightNumber,
  tag = "Insights",
}) => {
  return (
    <div className={isGlow ? "card glow" : "card"}>
      <h1>{insightNumber}</h1>
      <h3>{label}</h3>
      <p>{tag}</p>
    </div>
  );
};

export default InsightsCard;
