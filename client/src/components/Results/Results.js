import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProgressBar from "./ProgressBar/ProgressBar";
import ReactLoading from "react-loading";

import "./Results.css";

function Results() {
  const [fields, setFields] = useState({ question: "", options: [""], sum: 0 });
  const [isLoading, setisLoading] = useState(true);
  const [hasError, sethasError] = useState(false);

  const ws = useRef(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/results/${id}`)
    .then((res) => {
      setisLoading(false);
      const options = res.data.poll.options;
      const votes = options.map((option) => option.votes);
      const sum = votes.reduce((a, b) => a + b);
      setFields({ question: res.data.poll.question, options, sum });
    })
    .catch((error) => {
      setisLoading(false);
      sethasError(true);
    });

  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      ws.current = new WebSocket(`ws://localhost:8000/poll/${id}`);
  } else {
    ws.current = new WebSocket(`wss://quackpolls.herokuapp.com/poll/${id}`);
  }
    ws.current.onopen = () => {
      console.log("connected");
      ws.current.send("hey");
    };

    ws.current.onclose = () => {
      console.log("disconnected");
    };
    return () => {
      ws.current.close();
    };
  }, [id]);

  useEffect(() => {
    ws.current.onmessage = (res) => {
      // listen to data sent from the websocket server
      const message = JSON.parse(res.data);
      const votes = message.options.map((option) => option.votes);
      const sum = votes.reduce((a, b) => a + b);
      setFields({ options: message.options, sum: sum });
    };
  });

  useEffect(()=>{
    if (hasError) {
      throw new Error("Error!");
    }
  },[hasError]);

  return (
    <div className="results-page-wrapper">
    {isLoading ? (
        <div className="results-poll-wrapper d-flex flex-row justify-content-center my-5 py-5">
          <ReactLoading
            type={"spin"}
            color={"black"}
            height={"10%"}
            width={"10%"}
          />
        </div>
      ) : (
      <div className="results-poll-wrapper">
        <div className="results-pollquestion">
          <h1>{fields.question}</h1>
        </div>
        <div className="results-poll-options">
          {fields.options.map((option, idx) => {
            return (
              <div
                key={`${option}-${idx}`}
                className="results-poll-option d-flex flex-column"
              >
                <div className="d-flex justify-content-between">
                  <h2>{option.value}</h2>
                  <h2>{Math.round((option.votes * 100) / fields.sum)}%</h2>
                </div>
                <ProgressBar votes={option.votes} total={fields.sum} />
                <h3>{option.votes} votes</h3>
              </div>
            );
          })}
        </div>
      </div>
      )}
    </div>
  );
}

export default Results;