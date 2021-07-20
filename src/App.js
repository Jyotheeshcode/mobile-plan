import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ViewPlans from "./components/ViewPlans";
import AddPlan from "./components/AddPlan";

function App() {
  return (
    <Router>
      <React.Fragment>
        <nav className="navbar navbar-expand navbar-dark bg-dark mb-4">
          <Link className="navbar-brand pl-2" to="/">
            Internet Plans
          </Link>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/addPlan">
                Add Plan
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/viewPlans">
                View Plans
              </Link>
            </li>
          </ul>
        </nav>
        <main role="main" className="container">
          <Route exact path="/" component={AddPlan}></Route>
          <Route exact path="/addPlan" component={AddPlan}></Route>
          <Route exact path="/viewPlans" component={ViewPlans}></Route>
        </main>
      </React.Fragment>
    </Router>
  );
}

export default App;
