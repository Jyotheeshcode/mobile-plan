import axios from "axios";
import React from "react";

const url = "http://localhost:4000/plans";

class ViewPlans extends React.Component {
  constructor() {
    super();
    this.state = {
      plans: [],
      successMessage: "",
      errorMessage: "",
    };
  }

  componentDidMount() {
    axios.get(url).then((response) => {
      this.setState({ plans: response.data });
    });
  }

  delete(id) {
    axios
      .delete(`${url}/${id}`)
      .then((response) => {
        this.setState({
          plans: this.state.plans.filter((plan) => plan.id !== id),
          successMessage: `Plan with ID:${id} has been Deleted Successfully`,
          errorMessage: "",
        });
      })
      .catch((error) => {
        this.setState({
          errorMessage: "Something Went Wrong",
          successMessage: "",
        });
      });
  }
  render() {
    // eslint-disable-next-line array-callback-return
    var displayList = this.state.plans.map((plan) => (
      <div className="col-md-4" key={plan.id}>
        <div className="card mb-4 box-shadow">
          <div className="card-body">
            <h5 className="card-title">{plan.planType}</h5>
            <p className="card-text">Plan Price: {plan.planPrice}</p>
            <p className="card-text">Plan Data: {plan.planData}</p>
            <p className="card-text">Unlimited Calls: {plan.calls}</p>
            <p className="card-text">Benefits: {plan.addOns}</p>
            <button
              type="button"
              onClick={() => this.delete(plan.id)}
              className="btn btn-sm btn-outline-danger"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    ));

    return (
      <div className="album py-5 bg-light">
        <div className="container">
          <p className="text-success">{this.state.successMessage}</p>
          <p className="text-danger">{this.state.errorMessage}</p>
          <div className="row">{displayList}</div>
        </div>
      </div>
    );
  }
}

export default ViewPlans;
