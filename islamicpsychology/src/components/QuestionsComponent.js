import React, { Fragment, useEffect, useState } from "react";
import Spinner from "./layout/Spinner";
import Pagination from "../DashboardComponents/Pagenation";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Collapse from "react-bootstrap/Collapse";
import "../components/main.css";
import Row from "react-bootstrap/Row";


function QuestionsComponent({post}) {
  const [open1, setOpen1] = useState(false);

  return (
    <>
      <div
        className="questionrectangle "
        onClick={() => setOpen1(!open1)}
        name="step-one"
        aria-controls="example-collapse-text"
        aria-expanded={open1}
      >
        <p className="questiontext "> {post.QString}</p>
      </div>
      {open1 && (
        <div name="step-two">
          <p className="questionanswer">{post.Answer}</p>
        </div>
      )}
    </>
  );
}

export default QuestionsComponent;
