import React from "react";
import ReactDOM from "react-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "../assets/css/App.css";
import ReactPlayer from "react-player";
import IconButton from "@material-ui/core/Button";
import NonExtendedPin from "./NonExtendedPin";
import ExtendedPin from "./ExtendedPin";
import Dropdown from "react-bootstrap/Dropdown";

import Slider from "@material-ui/core/Slider";
import { withStyles, makeStyles } from "@material-ui/core/styles";

const EditPinSlider = withStyles({
  root: {
    color:
      "linear-gradient(to right, #fa65f7, #f18cff, #eaaaff, #e8c5ff, #ebddff, #e6e6ff, #e5edff, #e9f3ff, #cff1ff, #acf1ff, #81f2ff, #4cf2fa);",
    color: "#3a8589",
    height: 3,
    padding: "13px 0",
  },
  valueLabel: {
    left: -17,
  },
  thumb: {
    height: 30,
    width: 1,
    backgroundColor: "#fff",
    border: "1px solid currentColor",
    marginTop: -12,
    marginLeft: -2,
    boxShadow: "#ebebeb 0 2px 2px",
    "&:focus, &:hover, &$active": {
      boxShadow: "#ccc 0 2px 3px 1px",
    },
    "& .bar": {
      // display: inline-block !important;
      // backgroundColor:
      //   "linear-gradient(to right, #fa65f7, #f18cff, #eaaaff, #e8c5ff, #ebddff, #e6e6ff, #e5edff, #e9f3ff, #cff1ff, #acf1ff, #81f2ff, #4cf2fa);",
      // color: "#fff",
      // height: 2,
      // width: 1,
      // marginLeft: 1,
      // marginRight: 1,
    },
  },
  active: {},
  track: {
    height: 3,
  },
  rail: {
    color: "#d8d8d8",
    opacity: 1,
    height: 3,
  },
})(Slider);

class ReflectPinCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.pin.note,
      pin: this.props.pin,
      startTime: this.props.startTime,
      endTime: this.props.endTime,
    };
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };

  handleLengthChange = (e, times) => {
    let start = times[0];
    let end = times[1];
    if (times[0] > times[1]) {
      start = times[1];
      end = times[0];
    }

    this.setState({ startTime: start, endTime: end });
  };

  editLength = (e) => {
    this.props.handleEditPinLength(
      e,
      this.state.startTime,
      this.state.endTime,
      this.props.ccId
    );
  };

  render() {
    let pinStart = Math.max(parseInt(this.props.startTime) - parseInt(100), 0);
    let pinEnd = Math.min(
      parseInt(this.props.endTime) + parseInt(100),
      parseInt(this.props.episode.duration)
    );
    return (
      <Container
        style={{
          // display: "flex",
          // flexDirection: "row",
          background: "#E7E7E7",
          borderRadius: "10px",
          marginTop: "10px",
        }}
      >
        <Row style={{ width: "100%" }}>
          <Col xs={11} style={{ padding: "1%" }}>
            <p1 style={{ fontWeight: "bold" }}>@</p1>
            <p1 style={{ fontWeight: "bold" }}>{this.props.user.username}</p1>
            <Row
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <EditPinSlider
                style={{ width: "85%" }}
                className="ml-3 mt-3 mb-0"
                defaultValue={[this.state.startTime, this.state.endTime]}
                value={[this.state.startTime, this.state.endTime]}
                onChange={this.handleLengthChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                max={pinEnd}
                min={pinStart}
                valueLabelFormat={this.props.displayTime}
                // getAriaValueText={valuetext}
              />
              <input
                type="submit"
                value="Edit Length"
                onClick={(e) => this.editLength(e)}
                style={{
                  backgroundColor: "#3a8589",
                  border: "1px solid #3a8589",
                  width: "75px",
                  height: "25px",
                  fontSize: "10px",
                  fontFamily: "Avenir Medium",
                  color: "white",
                  borderRadius: "3px",
                  outline: "none",
                  alignSelf: "flex-end",
                }}
              />
            </Row>
          </Col>
          <Col xs={1}>
            <Dropdown>
              <Dropdown.Toggle
                style={{ backgroundColor: "#E5E5E5", borderColor: "#E5E5E5" }}
                id="dropdown-basic"
              >
                <img
                  style={{
                    height: 20,
                    width: 20,
                  }}
                  src="/threeDotCircle.png"
                />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item>Edit Length</Dropdown.Item>
                <Dropdown.Item>Edit Comment</Dropdown.Item>
                <Dropdown.Item>Delete Pin</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>

        <Row style={{ padding: "2%" }}>
          <p1>"{this.state.pin.text}"</p1>
        </Row>
        <Row className="pin_note" style={{ paddingLeft: "5%" }}>
          <p style={{ fontWeight: "bold", marginBottom: "5px" }}>Note:</p>
          {this.props.toggleEdit ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <p style={{ fontStyle: "italic", fontSize: "8px" }}>
                Press enter to submit changes
              </p>
              <form
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
                onSubmit={(e) =>
                  this.props.handleSubmit(
                    e,
                    this.state.value,
                    this.props.pin,
                    this.props.index
                  )
                }
                onKeyDown={(e) =>
                  this.props.initSubmit(
                    e,
                    this.state.value,
                    this.props.pin,
                    this.props.index
                  )
                }
              >
                <input
                  type="text"
                  value={this.state.value}
                  onChange={(e) => this.handleChange(e)}
                  placeholder={"Add a Comment"}
                  style={{
                    backgroundColor: "transparent",
                    marginBottom: "2%",
                    marginRight: "10%",
                    borderTop: "0px",
                    borderLeft: "0px",
                    borderBottom: "0.1px solid white",
                    outline: "none",
                    borderRight: "0px",
                    color: "black",
                    fontFamily: "Avenir Medium",
                    fontSize: "12px",
                    width: "100%",
                  }}
                />
              </form>
            </div>
          ) : (
            <p1
              onClick={(e) => {
                this.props.handleNoteChange(
                  e,
                  this.props.pin,
                  this.props.index
                );
              }}
              style={{ paddingLeft: "10px", fontStyle: "italic" }}
            >
              {this.props.pin.note}
            </p1>
          )}
        </Row>
      </Container>
    );
  }
}

export default ReflectPinCard;
