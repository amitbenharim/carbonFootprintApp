import './App.css';
import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import {
  Link
} from "react-router-dom"
import {Icon} from "./Elements"

const TopBar = ({click, page}) => {
  return (
      <div style={{textAlign: "center"}}>
        <Navbar bg="light" expand="lg">
          <Container>
          <Link to="/">Home</Link>
            <Navbar.Brand>
              <img style={{verticalAlign: "top"}} src="favicon.ico" alt="carbon footprint companion logo"></img>
            </Navbar.Brand>
              <Link to="/challenges">Challenges</Link>
                <Nav.Link>
                  <Icon text="Challenges" name="bullseye" color="red" size="36"/>
                </Nav.Link>
              <Link to="/settings">
                <Nav.Link>
                  <Icon text="Settings" name="cog" color="grey" size="36"/>
                </Nav.Link>
              </Link>
          </Container>
        </Navbar>
        
      </div>
    )
  }

  export {TopBar}