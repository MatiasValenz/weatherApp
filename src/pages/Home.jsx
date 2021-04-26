import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Alert } from "reactstrap";
import { KEY } from "../config";
import CardTimeMain from "../components/CardTimeMain";
import CardTime from "../components/CardTime";
import PageLoading from "../components/PageLoading";
import Search from "../components/SearchLocation";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nameLocation, setNameLocation] = useState("");
  const [current, setCurrent] = useState(undefined);
  const [daily, setDaily] = useState(undefined);

  useEffect(() => {
    location();
  }, []);

  //Obtener lon y lat
  const location = () => {
    const handleSuccess = (position) => {
      getCurrent(null, position.coords.latitude, position.coords.longitude);
    };

    const handleError = (err) => {
      setError(err.message);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
        enableHighAccuracy: true,
        timeout: 10000,
      });
    }
  };

  //Datos actuales del clima obtenidos a traves de la ubicación actal
  //O según el nombre ingresado en el input
  const getCurrent = async (location, lat, lon) => {
    setLoading(true);
    setError(null);

    let parameters = "";
    if (location) {
      parameters = `q=${location}`;
    } else {
      parameters = `lat=${lat}&lon=${lon}`;
    }

    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?${parameters}&units=metric&appid=${KEY}`
      );

      const coord = response.data.coord;

      const resDaily = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=minutely,hourly,current&units=metric&appid=${KEY}`
      );

      setCurrent(response.data);
      setDaily(resDaily.data.daily.slice(1, 7));
      setLoading(false);
    } catch (err) {
      setError("Incorrect location");
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setNameLocation(e.target.value);
  };
  const searchCity = () => {
    getCurrent(nameLocation.trim());
  };

  //Actualizar el formato unix de la fecha
  const Day = (format_unix) => {
    let options = {
      weekday: "long",
      //year: "numeric",
      month: "long",
      day: "numeric",
    };

    var unix = format_unix.dt;
    var date = new Date(unix * 1000);

    return date.toLocaleDateString("en", options);
  };

  if (error) {
    return (
      <Fragment>
        <Container className="mt-3">
          <Search
            searchCity={searchCity}
            handleInputChange={handleInputChange}
          />
          <Alert className="mt-3" color="danger">
            Error: {error}.
          </Alert>
        </Container>
      </Fragment>
    );
  }

  if (loading || !current || !daily) {
    return (
      <Fragment>
        <Container className="mt-3">
          <Search
            searchCity={searchCity}
            handleInputChange={handleInputChange}
          />
          <PageLoading />
        </Container>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Container className="mt-3">
        <Search searchCity={searchCity} handleInputChange={handleInputChange} />
        <Row className="justify-content-center mt-3">
          <Col xs="12" sm="6" md="6" lg="4">
            <CardTimeMain
              Day={Day(current)}
              Feels_like={current.main.feels_like.toFixed(1)}
              Min={daily[0].temp.min.toFixed(1)}
              Max={daily[0].temp.max.toFixed(1)}
              Description={current.weather[0].description}
              Icon={current.weather[0].icon}
              City={current.name}
            />
          </Col>
        </Row>
        <Row className="justify-content-center mt-3">
          {daily.map((d, i) => {
            return (
              <Col key={i} xs="6" sm="4" md="4" lg="2" className="mt-3">
                <CardTime
                  Day={Day(d)}
                  Feels_like={d.feels_like.day.toFixed(1)}
                  Description={d.weather[0].description}
                  Icon={d.weather[0].icon}
                  Min={d.temp.min.toFixed(1)}
                  Max={d.temp.max.toFixed(1)}
                />
              </Col>
            );
          })}
        </Row>
      </Container>
    </Fragment>
  );
};

export default Home;
