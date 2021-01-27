import React from "react";
import Form from "./Form/Form";
import ErrorBoundary from "../../Utils/ErrorBoundary"
import "./CreatePolls.css";

function CreatePolls() {
  return (
    <ErrorBoundary>
    <div className="create-page-wrapper">
      <div className="create-form-wrapper">
        <header className="form-header">
          <h1>Create a poll</h1>
          <p>Complete the below fields to create your poll</p>
        </header>
        <Form />
      </div>
    </div>
    </ErrorBoundary>
  );
}

export default CreatePolls;
