import React from "react";
import "../assets/css/App.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/Button";
import AudioBar from "./AudioBar";
import { useHistory, Link, withRouter } from "react-router-dom";
import history from "./history";
import CCC from "./CCC";

import HighlightMenu from "./HighlightMenu";
import { SelectableGroup, createSelectable } from "react-selectable";

import ReactCursorPosition from "react-cursor-position";
import { animateScroll } from "react-scroll";
import transitions from "@material-ui/core/styles/transitions";
const ipcRenderer = window.require("electron").ipcRenderer;
const SelectableComponent = createSelectable(CCC);
class ClosedCaptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedElements: [],
      showComponent: false,
      cursorPos: null,
    };
  }

  handleSelection = (text) => {
    this.setState({
      selectedElements: text,
    });
  };

  saveSelection = () => {
    this.setState({
      showComponent: true,
    });
  };

  disableSelection = () => {
    this.setState({
      showComponent: false,
      selectedElements: [],
    });
  };

  isHighlighted = (i) => {
    for (let [key, value] of this.props.highlighted) {
      if (value.indexOf(i) > -1) {
        return true;
      }
    }
    return false;
  };

  render() {
    return (
      <Col xs={7} className="pr-0 pl-0">
        <ReactCursorPosition style={{ display: "flex", flexDirection: "row" }}>
          <Col
            id="midcol"
            className="middle pr-1 pl-2"
            xs={9}
            style={{ display: "flex", flexDirection: "column" }}
          >
            {/* <Col> */}
            <SelectableGroup
              className="selectGroup"
              onSelection={this.handleSelection}
              onEndSelection={this.saveSelection}
            >
              {this.props.cc_comps.map((comp, i) => {
                let selected = this.state.selectedElements.indexOf(i) > -1;
                let pinned = this.props.highlighted.has(i);
                let highlighted = this.isHighlighted(i);
                return (
                  <div
                    className={
                      this.props.mainComp === i
                        ? "cctext-highlighted"
                        : "cctext"
                    }
                    style={{
                      width: "100%",
                      position: "absolute",
                      top: comp["y"],
                    }}
                    ref={"caption".concat(String(comp.id))}
                    key={comp.id}
                  >
                    <SelectableComponent
                      handleMainComp={this.props.handleMainComp}
                      ccID={comp.id}
                      selected={selected}
                      selectableKey={comp.id}
                      ccText={comp.text}
                      seekToTime={this.props.seekToTime}
                      time={comp.startTime}
                      pins={pinned}
                      highlighted={highlighted}
                      handleDelete={this.props.handleDelete}
                    />
                  </div>
                );
              })}
            </SelectableGroup>
            {/* </Col> */}
          </Col>

          <Col
            xs={3}
            style={{
              paddingLeft: "0px",
              paddingRight: "0px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Container
              style={{ display: "flex", flexDirection: "column" }}
            ></Container>
          </Col>
          {this.state.showComponent ? (
            <HighlightMenu
              makeHighlight={this.props.makeHighlight}
              disableHighlight={this.disableSelection}
              style={{ height: "100%", width: "100%" }}
            />
          ) : null}
        </ReactCursorPosition>
      </Col>
    );
  }
}

export default ClosedCaptions;
