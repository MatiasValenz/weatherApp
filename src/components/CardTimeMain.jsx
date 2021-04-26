import React, { Fragment } from "react";
import { Card, CardHeader, CardBody, CardFooter, Row, Col } from "reactstrap";

import "../styles/cardTimeMain.css";

const CardTimeMain = ({
  City,
  Day,
  Min,
  Max,
  Feels_like,
  Description,
  Icon,
}) => {
  return (
    <Fragment>
      <Card style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
        <CardHeader className="text-center">
          <h4>{Day}</h4>
        </CardHeader>
        <CardBody>
          <Row className="align-items-center">
            <Col xs="6" sm="6" md="6">
              <img
                width="100%"
                src={require("../images/" + Icon + ".png").default}
                alt=""
              />
            </Col>
            <Col xs="6" sm="6" md="6">
              <div className="let">
                <h3>{City}</h3>
                <p>{Description}</p>
              </div>
            </Col>
            <Col sm="12" className="text-center">
              <h6>Feels Like</h6>
              <h1>{Feels_like}º</h1>
            </Col>
          </Row>
        </CardBody>
        <CardFooter>
          <div>
            {Min}º<span style={{ float: "right" }}>{Max}º</span>
          </div>
        </CardFooter>
      </Card>
    </Fragment>
  );
};

export default CardTimeMain;
