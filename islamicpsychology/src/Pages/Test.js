import Maincontent from "../components/Maincontent";
import "../components/main.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";

const Test = (props) => {
  const [Articledetails, setArticledetails] = useState("");
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/articles/${props.match.params.id}`)
      .then((res) => [setArticledetails(res.data.Articledetails)])
      .catch((error) => console.log(error));
  }, [props]);

  return (
    <div>
      <div className="articlemagestyle"></div>
      <h3>Hiiii</h3>
      <Row className="justify-content-center">
        <text className="stylemaincontent" style={{ marginTop: "-175px" }}>
          {" "}
          مقالات
        </text>
      </Row>
      <text>{Articledetails}</text>
      <div className="upspace"></div> <div className="upspace"></div>
    </div>
  );
};

export default Test;
