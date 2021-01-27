import React from "react";
import "./ProgressBar.css";

function ProgressBar(fields) {
  const rgb = [];
  for (let i = 0; i < 3; ++i) {
    rgb.push(Math.floor(Math.random() * 255));
  }
  const style = {
    backgroundColor: "rgb(" + rgb.join(",") + ")",
    width: `${(fields.votes / fields.total) * 100}%`,
    transition: "width 2s ease-in-out",
  };
  return (
    <div className="results-poll-bar">
      <div className="poll-bar" style={style}></div>
    </div>
  );
}
export default ProgressBar;
