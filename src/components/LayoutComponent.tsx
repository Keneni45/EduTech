import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function LayoutComponent() {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
              <button
                type="button"
                className="navbar-toggler"
                data-bs-toggle="collapse"
                data-bs-target="#navbarCollapse"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarCollapse">
                <div className="navbar-nav pl-5">
                  <Link to={"/"} style={{ marginLeft: "3rem" }}>
                    PlainQuestion
                  </Link>
                  <Link to={"/grouped-question"} style={{ marginLeft: "3rem" }}>
                    Grouped-Question
                  </Link>
                  <Link to={"/direction"} style={{ marginLeft: "3rem" }}>
                    create direction
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
