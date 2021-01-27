import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import ReactLoading from "react-loading";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./Vote.css";
function Vote() {
  const [radio, setRadio] = useState("");
  const [fields, setFields] = useState({ question: "", options: [""] });
  const [isLoading, setisLoading] = useState(true);
  const [hasError, sethasError] = useState(false);
  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/poll/${id}`)
      .then((res) => {
        if (res.data.poll) {
          setisLoading(false);
          const options = res.data.poll.options;
          setFields({ question: res.data.poll.question, options: options });
        }
      })
      .catch((error) => {
        setisLoading(false);
        sethasError(true);
      });
  }, [id]);

  function votePoll() {
    setisLoading(true);
    axios
      .post(`/poll/${id}`, { radio })
      .then((res) => {
        setisLoading(false);
        console.log(res);
        return history.push(`/results/${id}`);
      })
      .catch((error) => {
        console.log(error)
        setisLoading(false);
        sethasError(true);
      });
  }

  function handleSubmit(event) {
    event.preventDefault();
    votePoll();
  }

  function handleRadioChange(event) {
    setRadio(event.target.value);
  }

  useEffect(() => {
    if (hasError) {
      throw new Error("Error!");
    }
  }, [hasError]);
  return (
    <div className="vote-page-wrapper">
      {isLoading ? (
        <div className="vote-poll-wrapper d-flex flex-row justify-content-center my-5 py-5">
          <ReactLoading
            type={"spin"}
            color={"black"}
            height={"10%"}
            width={"10%"}
          />
        </div>
      ) : (
        <div className="vote-poll-wrapper">
          <div className="vote-poll-question">
            <h1>{fields.question}</h1>
          </div>
          <Form onSubmit={(event) => handleSubmit(event)}>
            <Form.Group>
              <div
                className="vote-poll-options d-flex flex-column"
                onChange={(event) => {
                  handleRadioChange(event);
                }}
              >
                {fields.options.map((option, idx) => {
                  return (
                    <Form.Label
                      key={`${option._id}-${idx}`}
                      className={
                        radio === `${option._id}`
                          ? "poll-option selected"
                          : "poll-option"
                      }
                    >
                      <Form.Check
                        name="option"
                        value={option._id}
                        type="radio"
                      />
                      <span>{option.value}</span>
                    </Form.Label>
                  );
                })}
              </div>
              <Button type="submit" variant="success">
                Submit
              </Button>
            </Form.Group>
          </Form>
        </div>
      )}
    </div>
  );
}

export default Vote;
