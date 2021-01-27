import React from "react";
import { Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ErrorBoundary from "./Utils/ErrorBoundary"

import "./App.css";
import Navbar from "./components/CustomNavbar/CustomNavbar";
import Home from "./components/Home/Home";
import PublicPolls from "./components/PublicPolls/PublicPolls";
import CreatePolls from "./components/CreatePolls/CreatePolls";
import Vote from "./components/Vote/Vote";
import Results from "./components/Results/Results";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Lost from "./components/404/404"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <Navbar />
        </nav>
      </header>
      <main>
        <Switch>
          <Route
            path="/"
            exact
            render={() => <ErrorBoundary><Home /></ErrorBoundary>}
          />
          <Route
            path="/public"
            exact
            render={() => (
              <ErrorBoundary><PublicPolls /></ErrorBoundary>
            )}
          />
          <Route
            path="/poll/new"
            exact
            render={() => (
              <ErrorBoundary><CreatePolls/></ErrorBoundary>
            )}
          />
          <Route
            path="/results/:id"
            exact
            render={() => <ErrorBoundary><Results/></ErrorBoundary>}
          />
          <Route
            path="/poll/:id"
            exact
            render={() => <ErrorBoundary><Vote/></ErrorBoundary>}
          />
          <Route
            path="/login"
            exact
            render={() => <ErrorBoundary><Login/></ErrorBoundary>}
          />
          <Route
            path="/register"
            exact
            render={() => <ErrorBoundary><Register/></ErrorBoundary>}
          />
          <Route
            path="*"
            render={()=><Lost />}
          />
        </Switch>
      </main>
    </div>
  );
}

export default App;
