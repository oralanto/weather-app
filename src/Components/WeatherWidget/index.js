import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import "./style.css";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));

const WeatherWidget = () => {
  const [city, setCity] = useState("Paris");
  const [temperature, setTemperature] = useState();
  const [icon, setIcon] = useState();
  const classes = useStyles();

  useEffect(() => {
    const baseUrl = "http://api.openweathermap.org/data/2.5/weather";
    const apiKey = "881dc81a2114b94b28f914ee7ad786ac";
    const url = `${baseUrl}?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(url).then((response) => {
      console.log("response", response);
      const temp = Math.round(response.data.main.temp);
      setTemperature(temp);
      setIcon(response.data.weather[0].icon);
    });
  }, [city]);

  return (
    <div>
      <Card className={`${classes.root} widget`}>
        <CardHeader title="Weather widget" />
        <CardContent>
          <h2>{city}</h2>
        </CardContent>
        <CardMedia
          className={classes.media}
          image={`http://openweathermap.org/img/wn/${icon}@2x.png`}
          title="Meteo"
        />
        <CardContent>
          <h2>{temperature}°</h2>
        </CardContent>
      </Card>
    </div>
  );
};

// if (temperature === undefined) {
//   return (
//     <div className="weather-widget">
//       <div className="weather-widget__loading">
//         <p>Loading...</p>
//       </div>
//     </div>
//   );
// }

export default WeatherWidget;
