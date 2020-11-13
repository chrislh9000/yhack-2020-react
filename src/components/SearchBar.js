import React from 'react';
import '../assets/css/App.css'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from '@material-ui/core/Button';
import Audioplayer from './Audioplayer'

const PlayBox = ({ keyword, setKeyword }) => {

    return (
        <Container className="mt-4" fluid style={{
            flexDirection: 'column', display: 'flex', justifyContent: 'center', width: "100%", backgroundColor: "#7597B0"
        }}>
            <Col className="mt-3" style={{ flexDirection: 'column', display: 'flex', alignItems: 'center' }
            } >
                <p classname="text-white" style={{
                    fontFamily: 'Arial',
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 16
                }}> NOW PLAYING </p>
                <img style={{
                    height: 180,
                    width: 180,
                    borderRadius: 10,
                }} src='/TheDaily.png' />

            </Col >
            <Audioplayer />
        </Container >
    );
}

export default PlayBox
