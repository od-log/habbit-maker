import React, { Component } from "react";

class HabbitAddForm extends Component {
  inputRef = React.createRef;

  onSubmit = (event) => {
    event.preventDefault();
    const name = this.inputRef.current.value;
    console.log(this.inputRef.current);
    name && this.props.onAdd(name);
  };
  render() {
    return (
      <form action="" className="add-form" onSubmit={this.onSubmit}>
        <input ref={this.inputRef} type="text" className="add-input" />
        <button>Add</button>
      </form>
    );
  }
}

export default HabbitAddForm;
