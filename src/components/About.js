import "../assets/css/App.css";

import React from "react";
import Sidebar from "./Sidebar";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import PropTypes from "prop-types";
import Selection from "react-ds";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import FilterBar from "./FilterBar";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default class Example extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      episodes: [
        {
          date: "Nov 20, 2019",
          title: "The Jungle Prince, Chapter 2: The Hunting Lodge",
          summary:
            "'Ellen, have you been trying to get in touch with the royal family of Oudh?' Our reporter receives an invitation to the forest...For more information, visit.....",
          image: "/TheDaily.png",
          duration: 5000,
          current: 3000,
          pins: [
            { time: 200 },
            { time: 400 },
            { time: 2000 },
            { time: 250 },
            { time: 1450 },
          ],
        },
        {
          date: "Nov 20, 2019",
          title: "The Jungle Prince, Chapter 2: The Hunting Lodge",
          summary:
            "'Ellen, have you been trying to get in touch with the royal family of Oudh?' Our reporter receives an invitation to the forest...For more information, visit.....",
          image: "/TheDaily.png",
          duration: 5000,
          current: 3000,
          pins: [
            { time: 200 },
            { time: 400 },
            { time: 2000 },
            { time: 250 },
            { time: 1450 },
          ],
        },
        {
          date: "Nov 20, 2019",
          title: "The Jungle Prince, Chapter 2: The Hunting Lodge",
          summary:
            "'Ellen, have you been trying to get in touch with the royal family of Oudh?' Our reporter receives an invitation to the forest...For more information, visit.....",
          image: "/TheDaily.png",
          duration: 5000,
          current: 3000,
          pins: [
            { time: 200 },
            { time: 400 },
            { time: 2000 },
            { time: 250 },
            { time: 1450 },
          ],
        },
      ],
    };
  }

  componentDidMount = (e) => {
    const url =
      "http://localhost:5000/podcasts/loadUserEpisodes/5fdaf4e7616a7e5445f0ba59";

    fetch(url, {
      method: "GET",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("hi");
        console.log(json.message);
        // this.setState({
        //   episodes: json.message,
        // });
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  render() {
    return (
      <Container fluid className="discussion_background home-back">
        <Row>
          <Sidebar
            handlePlayorpause={this.props.handlePlayorpause}
            fastRewind={this.props.fastRewind}
            fastForward={this.props.fastForward}
            seekToTime={this.props.seekToTime}
            handlePin={this.props.handlePin}
            pinTime={this.props.pinTime}
            playpause={this.props.playpause}
            user={this.props.user}
          />

          <Col className="pr-0 pl-0 mt-5 ml-5 mr-5 home-column">
            <FilterBar />
            {this.state.episodes.map((item, id) => (
              <div
                className="mb-5"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  background: "white",
                }}
              >
                <img
                  className="ml-3 mt-3 mb-3"
                  style={{
                    height: 180,
                    width: 180,
                    borderRadius: 10,
                    boxShadow:
                      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                  }}
                  src={item.image}
                />
                <div
                  className="pl-3 pr-3 mt-3"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: "gray",
                    }}
                  >
                    {item.date}
                  </div>
                  <div style={{ fontSize: "22px", fontWeight: "bold" }}>
                    {item.title}
                  </div>
                  <div className="pb-4">{this.state.episodes[0].summary}</div>
                  <div className="hl" style={{ alignSelf: "right" }} ref="bar">
                    <div
                      style={{
                        left: String(
                          (item.current / item.duration) * 500
                        ).concat("px"),
                      }}
                      className="bubble"
                    />
                    {/* <div className="pinbar"></div> */}
                    {item.pins.map((pin, id) => (
                      <div
                        style={{
                          left: String((pin.time / item.duration) * 500).concat(
                            "px"
                          ),
                        }}
                        className="pinbar"
                      ></div>
                    ))}
                  </div>
                </div>
                <Col
                  xs={3}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Link to="/users">
                    <Button style={{ width: "100%", height: "60px" }}>
                      Listen
                    </Button>
                  </Link>
                  <Link to="/users">
                    <Button style={{ width: "100%", height: "60px" }}>
                      Reflect
                    </Button>
                  </Link>
                </Col>
              </div>
            ))}
          </Col>
        </Row>
      </Container>
    );
  }
}

Example.propTypes = {
  style: PropTypes.object,
};
