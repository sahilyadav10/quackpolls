import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactLoading from "react-loading";
import "./PublicPolls.css";

function PublicPolls() {
  const [fields, setFields] = useState([{}]);
  const [isLoading, setisLoading] = useState(true);
  const [hasError, sethasError] = useState(false);

  useEffect(() => {
    axios
      .get("/public")
      .then((res) => {
        setisLoading(false);
        const polls = res.data.fields;
        setFields(polls);
      })
      .catch(() => {
        setisLoading(false);
        sethasError(true);
      });
  }, []);

  useEffect(() => {
    if (hasError) {
      throw new Error("Error!");
    }
  }, [hasError]);

  return (
    <div className="public-page-wrapper">
      {isLoading ? (
        <div className="public-poll-wrapper d-flex flex-row justify-content-center my-5 py-5">
          <ReactLoading
            type={"spin"}
            color={"black"}
            height={"10%"}
            width={"10%"}
          />
        </div>
      ) : (
        <div className="public-poll-wrapper">
          <div>
            <h1 className="public-page-title">Public Polls</h1>
          </div>
          {fields.length <= 0 ? (
            <div className="public-poll">
              {" "}
              <h1>Quack, no public polls!</h1>{" "}
            </div>
          ) : (
            fields.map((field) => {
              return (
                <Link
                  className="public-poll-link"
                  key={`${field.question}-${field.pollId}`}
                  to={`/poll/${field.pollId}`}
                >
                  <div className="public-poll">
                    <h1 className="public-poll-question">{field.question}</h1>
                    <h2 className="public-poll-total">{field.total} votes</h2>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

export default PublicPolls;