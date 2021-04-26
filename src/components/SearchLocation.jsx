import React, { Fragment } from "react";
import { Row, Col, Button, Input } from "reactstrap";

const SearchLocation = ({ searchCity, handleInputChange }) => {
  const onKeyEnter = (e) => {
    if (e.key === "Enter") {
      searchCity();
    }
  };
  return (
    <Fragment>
      <Row className="justify-content-center">
        <Col xs="6" sm="3" md="3" lg="2">
          <Input
            placeholder="Location"
            onChange={handleInputChange}
            onKeyPress={onKeyEnter}
          />
        </Col>
        <Col xs="6" sm="3" md="3" lg="2">
          <Button
            color="primary"
            onClick={() => {
              searchCity();
            }}
          >
            Search
          </Button>
        </Col>
      </Row>
    </Fragment>
  );
};

export default SearchLocation;
