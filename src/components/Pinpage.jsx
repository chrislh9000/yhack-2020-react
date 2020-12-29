import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Link } from 'react-router-dom'
import '../assets/css/App.css';
import Navibar from './Navbar.jsx'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Sidebar from './Sidebar';
import SearchPage from './SearchPage'
import PinCard from './PinCard'

class Pinpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currPins: [{text:"\"...From the New York Times, I\'m Michael Borrow...\"", time:68, note:"OMG its sleepy joe"},
      {text:"\"...I\'m here to tell you tonight...\"", time:68, note:"OMG its sleepy joe"},
      {text:"\"...From the New York Times, I\'m Michael Borrow", time:68, note:"OMG its sleepy joe"},
      {text:"\"...From the New York Times, I\'m Michael Borrow", time:68, note:"OMG its sleepy joe"},
      {text:"\"...From the New York Times, I\'m Michael Borrow", time:68, note:"OMG its sleepy joe"}],
    }
  }

  render() {
    //pre-rendering code
    return(
      <Container fluid className="discussion_background main-back">
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
        
          <Col >
            <Row>
              <SearchPage />
            </Row>
            <Row>
              <h1>{this.props.audioDuration}</h1>
            </Row>
            <Row>
              <Col>
                {this.state.currPins.map((pin, i) => {
                  return (
                    <div 
                      className="mb-5"
                      style={{
                        // display: "flex",
                        // flexDirection: "row",
                        background: "grey", borderRadius: "25px"
                      }}
                    >
                      <PinCard 
                      text={pin.text}
                      key={i}
                      time={pin.time}
                      note={pin.note}
                      />
                    </div>
                  );
                })}
              </Col>
            </Row>
          </Col>

        </Row>
      </Container>
    );
  };
};

export default Pinpage
