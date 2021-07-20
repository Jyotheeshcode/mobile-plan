import axios from "axios";
import React from "react";

const url = "http://localhost:4000/plans";

class AddPlan extends React.Component {
  constructor() {
    super();
    this.state = {
      plan: {
        planType: "",
        planPrice: 0,
        planData: 0,
        calls: "",
        addOns: "",
      },
      priceMsg: "",
      dataMsg: "",
      minPrice: 0,
      maxPrice: 5000,
      minData: 0,
      maxData: 1000,
      successMessage: "",
      errorMessage: "",
    };
    this.change = this.change.bind(this);
    this.addPlan = this.addPlan.bind(this);
  }

  addPlan(e) {
    e.preventDefault();
    console.log(this.state.plan);
    axios
      .post(url, this.state.plan)
      .then((response) => {
        this.setState({
          successMessage: `Plan added successfully with Id:${response.data.id}`,
          errorMessage: "",
        });
      })
      .catch((error) => {
        this.setState({
          successMessage: "",
          errorMessage: "Something Went Wrong",
        });
      });
  }

  change(e) {
    let name = e.target.name;
    let value = e.target.value;
    console.log(name, value);
    if (name === "planType") {
      this.setMinValue(name, value);
    } else {
      this.validate(name, value);
    }
  }

  setMinValue(name, value) {
    console.log("in setMinValue");
    if (name === "planType" && value === "prePaid") {
      this.setState({
        minPrice: 299,
        minData: 10,
        plan: { ...this.state.plan, planType: "Prepaid" },
      });
    } else if (name === "planType" && value === "postPaid") {
      this.setState({
        minPrice: 399,
        minData: 50,
        plan: { ...this.state.plan, planType: "Postpaid" },
      });
    }
  }

  validate(name, value) {
    if (name === "planPrice" && value >= this.state.minPrice) {
      this.setState({
        priceMsg: "",
        plan: { ...this.state.plan, planPrice: value },
      });
    } else if (name === "planPrice" && value < this.state.minPrice) {
      this.setState({
        priceMsg: `Value should be greater then or equal to ${this.state.minPrice}`,
        plan: { ...this.state.plan, planPrice: 0 },
      });
    }

    if (name === "planData" && value >= this.state.minData) {
      this.setState({
        dataMsg: "",
        plan: { ...this.state.plan, planData: value },
      });
    } else if (name === "planData" && value < this.state.minData) {
      this.setState({
        dataMsg: `Value should be greater then or equal to ${this.state.minData}`,
        plan: { ...this.state.plan, planData: 0 },
      });
    }

    if (name === "calls" && value === "yes") {
      this.setState({ plan: { ...this.state.plan, calls: "Yes" } });
    } else if (name === "calls" && value === "no") {
      this.setState({ plan: { ...this.state.plan, calls: "No" } });
    }

    if (name === "addOns") {
      this.setState({ plan: { ...this.state.plan, addOns: value } });
    }
  }

  render() {
    return (
      <div className="card">
        <form className="card-body" onSubmit={this.addPlan}>
          <fieldset className="form-group">
            <div className="row">
              <legend className="col-form-label col-sm-2 pt-0">
                Plan Type
              </legend>
              <div className="col-sm-10">
                <input
                  className="form-check-input"
                  type="radio"
                  name="planType"
                  id="prePaid"
                  value="prePaid"
                  onChange={this.change}
                />
                <label className="" htmlFor="prePaid">
                  Prepaid &nbsp;&nbsp;
                </label>
                <input
                  className="form-check-input"
                  type="radio"
                  name="planType"
                  id="postPaid"
                  value="postPaid"
                  onChange={this.change}
                />
                <label className="" htmlFor="postPaid">
                  Postpaid
                </label>
              </div>
            </div>
          </fieldset>
          <div className="form-group row">
            <label htmlFor="planPrice" className="col-sm-2 col-form-label">
              Plan Price
            </label>
            <div className="col-sm-10">
              <input
                type="number"
                className="form-control"
                id="planPrice"
                name="planPrice"
                min={this.state.minPrice}
                max={this.state.maxPrice}
                onChange={this.change}
              />
            </div>
          </div>
          <p className="text-danger">{this.state.priceMsg}</p>
          <div className="form-group row">
            <label htmlFor="planData" className="col-sm-2 col-form-label">
              Plan Data
            </label>
            <div className="col-sm-10">
              <input
                type="number"
                className="form-control"
                id="planData"
                name="planData"
                min={this.state.minData}
                max={this.state.maxData}
                onChange={this.change}
              />
            </div>
          </div>
          <p className="text-danger">{this.state.dataMsg}</p>
          <fieldset className="form-group">
            <div className="row">
              <legend className="col-form-label col-sm-2 pt-0">
                Unlimited Calls
              </legend>
              <div className="col-sm-10">
                <input
                  className="form-check-input"
                  type="radio"
                  name="calls"
                  id="yes"
                  value="yes"
                  onChange={this.change}
                />
                <label className="" htmlFor="yes">
                  Yes &nbsp;&nbsp;
                </label>
                <input
                  className="form-check-input"
                  type="radio"
                  name="calls"
                  id="no"
                  value="no"
                  onChange={this.change}
                />
                <label className="" htmlFor="no">
                  No
                </label>
              </div>
            </div>
          </fieldset>
          <div className="form-group row">
            <label htmlFor="addOns" className="col-sm-2 col-form-label">
              Add Ons
            </label>
            <div className="col-sm-10">
              <textarea
                className="form-control"
                id="addOns"
                name="addOns"
                onChange={this.change}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-10">
              <button type="submit" className="btn btn-primary">
                Sign in
              </button>
            </div>
          </div>
          <p className="text-success">{this.state.successMessage}</p>
          <p className="text-danger">{this.state.errorMessage}</p>
        </form>
      </div>
    );
  }
}

export default AddPlan;
