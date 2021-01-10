import React from 'react';
import book from '../assets/images/book.png';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import './main.css';


const mystyle = {

  position: 'fixed',
  top:'58px',
  left: '0',
  height: '200px',
  opcity:'30%',

  width: '100%',
};

function Book(props) {   
  return(
<Container style={{}}>
  <Row>
     <Image src={book} style={mystyle}  />
  </Row>
</Container>
  )
  }

  export default Book; 

  