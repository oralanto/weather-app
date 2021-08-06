import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiDayCloudyHigh,
} from "weather-icons-react";
import "./style.css";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: "auto",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));

const WeatherWidget = () => {
  const [city, setCity] = useState("Paris");
  const [input, setInput] = useState();
  const [temp, setTemp] = useState();
  const [tempMax, setTempMax] = useState();
  const [tempMin, setTempMin] = useState();
  const [feelsLike, setFeelsLike] = useState();
  const [humidity, setHumidity] = useState();
  const [icon, setIcon] = useState();
  const classes = useStyles();

  useEffect(() => {
    const baseUrl = "http://api.openweathermap.org/data/2.5/weather";
    const apiKey = "881dc81a2114b94b28f914ee7ad786ac";
    const url = `${baseUrl}?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(url).then((response) => {
      console.log(response.data.weather[0].main);
      setTemp(response.data.main.temp);
      setTempMax(response.data.main.temp_max);
      setTempMin(response.data.main.temp_min);
      setFeelsLike(response.data.main.feels_like);
      setHumidity(response.data.main.humidity);
      setIcon(response.data.weather[0].main);
    });
  }, [city]);

  const inputChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const onClick = (e) => {
    e.preventDefault();
    setCity(input);
  };

  const icons = () => {
    switch (icon) {
      case "Clear":
        return <WiDaySunny size={200} color="#FFD760" />;
      case "Clouds":
        return <WiCloud size={200} color="#c0bdcc" />;
      case "Rain":
        return <WiRain size={200} color="#5328ff" />;
      default:
        return <WiDayCloudyHigh size={200} color="#d5e08f" />;
    }
  };
  return (
    <div className="weatherApp">
      <div className="mb2">
        <FormControl>
          <InputLabel htmlFor="my-input">Entrer votre ville</InputLabel>
          <Input
            id="my-input"
            aria-describedby="my-helper-text"
            className="mb2 color"
            onChange={(e) => inputChange(e)}
          />
          <Button variant="outlined" size="medium" onClick={(e) => onClick(e)}>
            Valider
          </Button>
        </FormControl>
      </div>
      <Card className={`${classes.root} weather`}>
        <CardContent>
          <h2>{city}</h2>
        </CardContent>
        {icons()}
        <CardContent>
          <h2>Actuel : {Math.round(temp)}°</h2>
          <h2>Max : {Math.round(tempMax)}°</h2>
          <h2>Min : {Math.round(tempMin)}°</h2>
        </CardContent>
        <p>Recentie : {Math.round(feelsLike)}°</p>
        <p>Humidité : {Math.round(humidity)}%</p>
        <CardContent></CardContent>
      </Card>
    </div>
  );
};

export default WeatherWidget;
