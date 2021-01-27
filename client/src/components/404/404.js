import React from "react";
import Background from "../../static/quack.jpg";

function Lost(){

    return(
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
          <div style={{ padding: "20px", fontSize: "3em", fontWeight: "600" }}>
            404
          </div>{" "}
          <div className="mx-5">Did you lose your way again!</div>
          <div style={{ fontSize: "0.3em"}}>(Or were you looking for me?)</div>
        </h1>
      </div>
    )
}

export default Lost;
