import React, { Component } from 'react';
import { callConversationHandler, getFirstState } from '../services/ConversationService.js';
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: { },
      name: "",
      current: "",
      protocol: [],
      game_state: 1
    };

    this.callService = this.callService.bind(this);
    this.isFinalState = this.isFinalState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
  }

  handleChange(event) {
    this.setState({name: event.target.value});
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (this.state.name) {
      const { data } = await getFirstState(this.state.name);
      this.setState({
        data: data.data,
        current: data.current,
        protocol: data.protocol,
        game_state: 2
      });
    }
  }

  async callService(next) {
    const { data } = await callConversationHandler(this.state.name, this.state.current, next);
    this.setState({
      data: data.data,
      current: data.current,
      protocol: data.protocol,
    });
    if (this.isFinalState()) {
      this.setState({ game_state: 3 });
    }
  };

  isFinalState() {
    const current_array = this.state.current.split("");
    current_array.shift();
    const service = Number(current_array.join(""));

    let final = true;
    const states = this.state.protocol[service];
    let length = states.length;
    for(let i = 1; i < length; i++) {
      if (!!states[i]) {
        final = false; // final state is false if atleast one trasition exists
      }
    }
    return final;
  }

  render() {
    const game_state = this.state.game_state;
    const services = [1,2,3,4,5,6,7,8,9,10]; // Array(this.state.protocol[0].length);
    const current = this.state.current;
    const error_message = "Request can’t be executed: violates the coordination protocol";
    let view;
    let response;

    if (typeof this.state.data === "string") {
      if (this.state.data === error_message) {
        response = <div className="card-body text-danger">
                    {this.state.data}
                  </div>
      } else {
        response = <div className="card-body text-success">
                    {this.state.data}
                  </div>
      }
    } else {
      response = <div className="card-body text-success">
                 {JSON.stringify(this.state.data)}
                </div>
    }




    if (game_state === 1) {
      view =  <div className="d-flex flex-row justify-content-center">
                <div className="card bg-light border-dark">
                  <h5 className="card-header">What's your name?</h5>
                  <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="inputName">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputName"
                          value={this.state.value}
                          onChange={this.handleChange}
                          />
                      </div>
                      <button type="submit" className="btn btn-primary">Save</button>
                    </form>
                  </div>
                </div>
              </div>;
    } else if (game_state === 2) {
      view =  <div className="d-flex flex-row justify-content-center">
                <div className="card bg-light border-dark">
                  <h5 className="card-header">Call a service</h5>
                  {response}
                  <div className="card-body">
                    {services.map((service, index) =>
                      <button key={index}
                        className={current === `s${index+1}` ? "btn mr-2 btn-primary": "btn mr-2 btn-secondary"}
                        type="button"
                        onClick={this.callService.bind(this, `s${index+1}`)}>
                        S{index+1}
                      </button>
                    )}
                  </div>
                </div>
              </div>;

    } else {
      view =  <div className="d-flex flex-row justify-content-center">
                <div className="card bg-light border-dark">
                  <h5 className="card-header text-primary">Final State Reached!</h5>
                  <div className="card-body">
                    Refresh the browser to try again
                  </div>
                </div>
              </div>;
    }
    return (
      <main className="bg-white">
        <div className="jumbotron jumbotron-fluid bg-white">
          <div className="container">
            <h1 className="display-4">Welcome to the DashBoard!</h1>
            <p className="lead">
              This is a simple application that lets you talk to a conversation handler.
            </p>
            <br/>
            <br/>
          </div>
          {view}
        </div>
      </main>
    );
  }
}

export default Main;
