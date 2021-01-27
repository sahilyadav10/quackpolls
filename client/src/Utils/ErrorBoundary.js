import React, { Component } from "react";
import Background from "../static/quack.jpg";
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            height: "90vh",
            width: "100vw",
            backgroundImage: `url(${Background})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <h1 className="d-flex flex-column align-items-center py-5">
            {" "}
            <div style={{ fontSize: "3em", fontWeight: "600" }}>
              Quack,
            </div>{" "}
            <div className="my-3">Something went wrong!</div>
            <div style={{ fontSize: "0.3em"}}>(What do you get if you mix ducks with fireworks? Firequackers)</div>
          </h1>
        </div>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
