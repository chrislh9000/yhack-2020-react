import "../assets/css/App.css";

import React from "react";
import Sidebar from "./Sidebar";

import PropTypes from "prop-types";
import Selection from "react-ds";

export default class Example extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      ref: null,
      elRefs: [],
      selectedElements: [], // track the elements that are selected
    };
  }

  handleSelection = (indexes) => {
    this.setState({
      selectedElements: indexes,
    });
  };

  getStyle = (index) => {
    if (this.state.selectedElements.indexOf(index) > -1) {
      // Selected state
      return {
        background: "orange",
        borderColor: "#2185d0",
        color: "white",
      };
    }
    return {};
  };

  addElementRef = (ref) => {
    const elRefs = this.state.elRefs;
    elRefs.push(ref);
    this.setState({
      elRefs,
    });
  };

  renderSelection() {
    if (!this.state.ref || !this.state.elRefs) {
      return null;
    }
    return (
      <Selection
        target={this.state.ref}
        elements={this.state.elRefs}
        onSelectionChange={this.handleSelection}
        style={{ backgroundColor: "yellow" }}
      />
    );
  }

  render() {
    const selectableElements = [
      "one",
      "another",
      "hey there",
      "item",
      "two",
      "three",
      "something longer?",
      "last",
    ];
    return (
      <div
        ref={(ref) => {
          this.setState({ ref });
        }}
        className="item-container"
      >
        {selectableElements.map((el, index) => (
          <div
            key={el}
            ref={this.addElementRef}
            style={this.getStyle(index)}
            className="item"
          >
            {el}
          </div>
        ))}
        {this.renderSelection()}
        <Sidebar user={this.props.user} handlePin={this.props.handlePin}>
          {" "}
        </Sidebar>
      </div>
    );
  }
}

Example.propTypes = {
  style: PropTypes.object,
};
