import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ReactLoading from "react-loading";

function CustomForm() {
  const [question, setQuestion] = useState("");
  const [inputs, setInputs] = useState([{ value: "" }]);
  const [visibility, setVisibility] = useState("Public");
  const [validated, setValidated] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [hasError, sethasError] = useState(false);
  const history = useHistory();

  function handleInputChange(i, event) {
    const values = [...inputs];
    values[i].value = event.target.value;
    setInputs(values);
  }

  function handleChange(event) {
    if (event.target.type === "select-one")
      setVisibility((event.target.name = event.target.value));
    else {
      setQuestion((event.target.name = event.target.value));
    }
  }

  function handleAdd() {
    const values = [...inputs];
    values.push({ value: null });
    setInputs(values);
  }

  function makePoll(id) {
    setisLoading(true);
    axios
      .post("/poll/new", {
        question,
        inputs,
        visibility,
      })
      .then((res) => {
        id = res.data;
        setisLoading(false);
        return history.push(`/poll/${id}`);
      })
      .catch((error) => {
        setisLoading(false);
        sethasError(true);
      });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      makePoll();
    }
    setValidated(true);
  }
  useEffect(()=>{
    if (hasError) {
      throw new Error("Error!");
    }
  },[hasError])
  
  return (
    <div>
      {isLoading ? (
        <div className="d-flex flex-row justify-content-center my-5 py-5">
          <ReactLoading
            type={"spin"}
            color={"black"}
            height={"10%"}
            width={"10%"}
          />
        </div>
      ) : (
        <Form
          noValidate
          validated={validated}
          onSubmit={(event) => handleSubmit(event)}
        >
          <Form.Group>
            <Form.Label htmlFor="inputQuestion">Poll question</Form.Label>
            <Form.Control
              required
              name="inputQuestion"
              value={question || ""}
              onChange={(event) => handleChange(event)}
              size="lg"
              type="text"
              isInvalid=""
              placeholder="Eg. What is your favourite colour"
            />
            <Form.Control.Feedback type="invalid">
              Poll question is required!
            </Form.Control.Feedback>
          </Form.Group>
          <br />
          {inputs.map((field, idx) => {
            return (
              <div key={`${field}-${idx + 1}`}>
                <Form.Group>
                  <Form.Label htmlFor={`option${idx + 1}`}>
                    Poll Option
                  </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={inputs[idx].value || ""}
                    name={`option${idx + 1}`}
                    placeholder={`Eg. Option ${idx + 1}`}
                    onChange={(event) => handleInputChange(idx, event)}
                  />
                  {idx <= 1 ? (
                    <Form.Control.Feedback type="invalid">
                      {" "}
                      At least 2 Poll options are required
                    </Form.Control.Feedback>
                  ) : (
                    " "
                  )}
                  <br />
                </Form.Group>
              </div>
            );
          })}
          <Button className="mb-3" type="button" onClick={() => handleAdd()}>
            Add another option +{" "}
          </Button>
          <br />
          <hr></hr>
          <Form.Group>
            <Form.Label htmlFor="visibility">Poll Visibility</Form.Label>
            <Form.Control
              required
              name="visibility"
              as="select"
              onChange={(event) => handleChange(event)}
              value={visibility}
            >
              <option>Public</option>
              <option>Private</option>
            </Form.Control>
          </Form.Group>
          <br />
          <Button type="submit" variant="success">
            Submit
          </Button>
        </Form>
      )}
    </div>
  );
}
export default CustomForm;