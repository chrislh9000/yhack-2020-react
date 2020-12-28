import React from "react";
import "../assets/css/App.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

class FilterBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "" };
  }

  changeMessage = (msg) => {
    this.setState({ message: msg });
  };

  render() {
    return (
      <div
        className="mb-5"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <h1>Filter by:</h1>
        <DropdownButton
          className="mt-2 ml-3"
          id="dropdown-item-button "
          title="Podcast"
        >
          <Dropdown.Item eventKey="All" onSelect={this.filterCost} as="button">
            ello
          </Dropdown.Item>
        </DropdownButton>
        <DropdownButton
          className="mt-2 ml-3"
          id="dropdown-item-button "
          title="Genre"
        >
          <Dropdown.Item eventKey="All" onSelect={this.filterCost} as="button">
            ello
          </Dropdown.Item>
        </DropdownButton>
        <DropdownButton
          className="mt-2 ml-3"
          id="dropdown-item-button "
          title="Date"
        >
          <Dropdown.Item eventKey="All" onSelect={this.filterCost} as="button">
            ello
          </Dropdown.Item>
        </DropdownButton>
        <DropdownButton
          className="mt-2 ml-3"
          id="dropdown-item-button "
          title="Pin Type"
        >
          <Dropdown.Item eventKey="All" onSelect={this.filterCost} as="button">
            ello
          </Dropdown.Item>
        </DropdownButton>
        <DropdownButton
          className="mt-2 ml-3"
          id="dropdown-item-button "
          title="Finished"
        >
          <Dropdown.Item eventKey="All" onSelect={this.filterCost} as="button">
            ello
          </Dropdown.Item>
        </DropdownButton>
      </div>
    );
  }
}

export default FilterBar;
