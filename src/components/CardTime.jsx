import React, { Fragment } from "react";
import { Card, CardHeader, CardBody, CardFooter, Row, Col } from "reactstrap";

import "../styles/cardTimeMain.css";

const CartTime = ({ Day, Feels_like, Description, Icon, Min, Max }) => {
  return (
    <Fragment>
      <Card style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
        <CardHeader className="text-center">
          <h5>{Day}</h5>
        </CardHeader>
        <CardBody>
          <Row>
            <Col className="text-center" sm="12" md="12" lg="12">
              <img
                width="100%"
                src={require("../images/" + Icon + ".png").default}
                alt=""
              />
              <div className="let">
                <p>{Description}</p>
              </div>
            </Col>
            <Col className="text-center" sm="12" md="12" lg="12">
              Feels Like
              <h4>{Feels_like}º</h4>
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

export default CartTime;
