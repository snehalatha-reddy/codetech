import React, { useState } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const API_KEY = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API Key

  const fetchWeather = async () => {
    if (!city.trim()) return;

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (error) {
      alert("City not found. Please try again.");
      setWeather(null);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Weather App</h2>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={styles.input}
      />
      <button onClick={fetchWeather} style={styles.button}>Get Weather</button>

      {weather && (
        <div style={styles.weatherBox}>
          <h3>{weather.name}, {weather.sys.country}</h3>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

// Inline CSS styles
const styles = {
  container: { maxWidth: "400px", margin: "auto", textAlign: "center" },
  input: { width: "80%", padding: "8px", margin: "10px 0" },
  button: { padding: "8px 12px", background: "blue", color: "white", border: "none" },
  weatherBox: { marginTop: "20px", padding: "10px", background: "#f0f0f0", borderRadius: "5px" }
};

export default Weather;
