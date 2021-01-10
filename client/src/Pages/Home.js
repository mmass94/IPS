/** @format */

import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Maincontent from "../components/Maincontent";
import RoundedImages from "../components/RoundedImages";
import "../components/main.css";
import DrMohammad from "../assets/images/DrMohammad.jpg";
import manimage from "../assets/images/manimage.png";
import womanimage from "../assets/images/womanimage.png";
import Image from "react-bootstrap/Image";
import Quality from "../assets/images/Quality.png";
import Creativity from "../assets/images/Creativity.png";
import Privacy from "../assets/images/Privacy.png";
import Respect from "../assets/images/Respect.png";
import programs1 from "../assets/images/programs1.png";
import programs2 from "../assets/images/programs2.png";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Footer from "../components/layout/Footer";

function Home(props) {
  return (
    <div>
      <div className="homeimagestyle"> </div>
      <Row className="justify-content-center">
        <text className="stylemaincontent" style={{ marginTop: "-175px" }}>
          {" "}
          الرئيسية
        </text>
      </Row>

      <Container fluid={true}>
        <Row className="justify-content-center">
          <Col xl={3} lg={3} md={6} sm={12} xs={12} className="text-center">
            <RoundedImages image={DrMohammad} />
            <p className="Titlehomestyle "> د.محمد أبو هلال</p>
            <p className="texthomestyle"> طبيب نفسي </p>
            <p className="detailshomestyle">
              {" "}
              طبيب نفسي , استشاري صحة نفسية, حاصل على ماجستير في إدارة الأعمال
              باحث ومدرب في مجال علم النفس الإسلامي .{" "}
            </p>
          </Col>

          <Col xl={3} lg={3} md={6} sm={12} xs={12} className="text-center">
            <RoundedImages image={womanimage} />
            <p className="Titlehomestyle"> الاسم</p>
            <p className="texthomestyle"> المنصب</p>
            <p className="detailshomestyle ">
              لمحة عن الشخص , مؤهلاته العلمية و.....
            </p>
          </Col>

          <Col xl={3} lg={3} md={6} sm={12} xs={12} className="text-center">
            <RoundedImages image={manimage} />

            <p className="Titlehomestyle"> الاسم</p>
            <p className="texthomestyle"> المنصب</p>
            <p className="detailshomestyle ">
              لمحة عن الشخص , مؤهلاته العلمية و.....
            </p>
          </Col>

          <Col xl={3} lg={3} md={6} sm={12} xs={12} className="text-center">
            <RoundedImages image={womanimage} />

            <p className="Titlehomestyle"> الاسم</p>
            <p className="texthomestyle"> المنصب</p>
            <p className="detailshomestyle ">
              لمحة عن الشخص , مؤهلاته العلمية و.....
            </p>
          </Col>
        </Row>
        <h3 className="homewmus"> سيرتنا | قصتنا</h3>

        <p className="HomeText">
          "Lorem Ipsum sed ut perspiciatis unde omnis iste natus error sit
          voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque
          ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
          dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
          dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
          quia non numquam eius modi tempora incidunt ut labore et dolore magnam
          aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
          exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex
          ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in
          ea voluptate velit esse quam nihil molestiae consequatur, vel illum
          qui dolorem eum fugiat quo voluptas nulla pariatur?"
        </p>

        <h3 className="homewmus"> ما يميزنا </h3>

        <Row className="justify-content-center">
          <Col xl={3} lg={3} md={6} sm={8} xs={8} className="text-center">
            <Image src={Privacy} className="homesmallicons hvr-grow" />
            <p className="homevaluestext"> الخصوصيّة</p>
            <p className="homevaluedetails">
              {" "}
              reprehenderit qui in ea voluptate velit esssae quami nihil
              molestiae sawdwq consequatur velwlo illum qui dolorem.{" "}
            </p>
          </Col>

          <Col xl={3} lg={3} md={6} sm={8} xs={8} className="text-center">
            <Image src={Quality} className="homesmallicons hvr-grow" />
            <p className="homevaluestext"> الجودة</p>
            <p className="homevaluedetails">
              {" "}
              reprehenderit qui in ea voluptate velit esssae quami nihil
              molestiae sawdwq consequatur velwlo illum qui dolorem.{" "}
            </p>
          </Col>

          <Col xl={3} lg={3} md={6} sm={8} xs={8} className="text-center">
            <Image
              src={Creativity}
              className="homesmallicons hvr-grow text-center"
            />
            <p className="homevaluestext "> الإبداع</p>
            <p className="homevaluedetails ">
              {" "}
              reprehenderit qui in ea voluptate velit esssae quami nihil
              molestiae sawdwq consequatur velwlo illum qui dolorem.{" "}
            </p>
          </Col>

          <Col xl={3} lg={3} md={6} sm={8} xs={8} className="text-center">
            <Image src={Respect} className="homesmallicons hvr-grow" />
            <p className="homevaluestext"> الإحترام</p>
            <p className="homevaluedetails ">
              {" "}
              reprehenderit qui in ea voluptate velit esssae quami nihil
              molestiae sawdwq consequatur velwlo illum qui dolorem.{" "}
            </p>
          </Col>
        </Row>
      </Container>

      <Container fluid className="programsmargin">
        <h3 className="homewmus"> خدماتنا | برامجنا </h3>

        <Row className="justify-content-center  ">
          <Col
            xl={3}
            lg={3}
            md={6}
            sm={12}
            xs={12}
            className="text-center researchcardbottomspace ">
            <Card className="ResearchCard ">
              <Card.Img variant="top" className="homeprogram1" />
              <Image src={programs2} className="programlogo hvr-pop" />

              <Card.Body>
                <Card.Title className="CardTitle"> اسم البرنامج </Card.Title>
                <Card.Text className="HomeCardText">
                  ,البرنامج , الخدمة ,ميزات البرنامج,.....
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col
            xl={3}
            lg={3}
            md={6}
            sm={12}
            xs={12}
            className="text-center researchcardbottomspace ">
            <Card className="ResearchCard ">
              <Card.Img variant="top" className="homeprogram1" />
              <Image src={programs1} className="programlogo hvr-pop" />

              <Card.Body>
                <Card.Title className="CardTitle"> اسم البرنامج </Card.Title>
                <Card.Text className="HomeCardText">
                  ,البرنامج , الخدمة ,ميزات البرنامج,.....
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col
            xl={3}
            lg={3}
            md={6}
            sm={12}
            xs={12}
            className="text-center researchcardbottomspace ">
            <Card className="ResearchCard ">
              <Card.Img variant="top" className="homeprogram1" />
              <Image src={programs2} className="programlogo hvr-pop" />

              <Card.Body>
                <Card.Title className="CardTitle"> اسم البرنامج </Card.Title>
                <Card.Text className="HomeCardText">
                  ,البرنامج , الخدمة ,ميزات البرنامج,.....
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col
            xl={3}
            lg={3}
            md={6}
            sm={12}
            xs={12}
            className="text-center researchcardbottomspace ">
            <Card className="ResearchCard ">
              <Card.Img variant="top" className="homeprogram1" />
              <Image src={programs1} className="programlogo hvr-pop" />

              <Card.Body>
                <Card.Title className="CardTitle"> اسم البرنامج </Card.Title>
                <Card.Text className="HomeCardText">
                  ,البرنامج , الخدمة ,ميزات البرنامج,.....
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
