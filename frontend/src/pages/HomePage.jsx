import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

import CurrentWeatherCard from "../components/CurrentWeatherCard";
import HourlyForecast from "../components/HourlyForcast";
import TemperatureChart from "../components/TemperatureChart";
import DailyForecast from "../components/DailyForcast";

import { TbRefresh } from "react-icons/tb";

function HomePage() {
  // Unit settings
  const [unit, setUnit] = useState("C");
  const [windUnit, setWindUnit] = useState("km/h");
  const [pressureUnit, setPressureUnit] = useState("hPa");

  // App states
  const [isDay, setIsDay] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Weather & Search data
  const [weatherData, setWeatherData] = useState(null);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Default location: Bandung
  const [location, setLocation] = useState({
    lat: -6.9175,
    lon: 107.6191,
    name: "Bandung",
  });

  const fetchWeather = useCallback(
    async (lat = location.lat, lon = location.lon, name = location.name) => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://api.open-meteo.com/v1/forecast",
          {
            params: {
              latitude: lat,
              longitude: lon,
              current_weather: true,
              hourly: ["temperature_2m", "weathercode"],
              daily: [
                "temperature_2m_max",
                "temperature_2m_min",
                "weathercode",
                "sunrise",
                "sunset",
              ],
              timezone: "auto",
            },
          }
        );

        setWeatherData(response.data);
        setIsDay(response.data.current_weather.is_day === 1);
        setLoading(false);
      } catch (err) {
        console.error("Gagal fetch cuaca:", err);
        setError("Gagal mengambil data cuaca.");
        setLoading(false);
      }
    },
    [location.lat, location.lon, location.name]
  );

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  const searchCity = async () => {
    if (!query) return;

    try {
      const response = await axios.get(
        "https://geocoding-api.open-meteo.com/v1/search",
        {
          params: {
            name: query,
            count: 5,
            language: "id",
            format: "json",
          },
        }
      );

      setSuggestions(response.data.results || []);
      setShowSuggestions(true);
    } catch (err) {
      console.error("Gagal mencari kota:", err);
    }
  };

  const handleSelectCity = (lat, lon, name) => {
    setLocation({ lat, lon, name });
    setQuery(name);
    setShowSuggestions(false);
    fetchWeather(lat, lon, name);
  };

  const temperature = weatherData
    ? unit === "C"
      ? weatherData.current_weather.temperature
      : (weatherData.current_weather.temperature * 9) / 5 + 32
    : 0;

  const current = weatherData
    ? {
        location: location.name,
        condition: weatherData.current_weather.weathercode,
        humidity: "-",
        wind: weatherData.current_weather.windspeed,
        pressure: "-",
        sunrise: weatherData.daily.sunrise[0].split("T")[1],
        sunset: weatherData.daily.sunset[0].split("T")[1],
      }
    : {};

  const forecastHourly = weatherData
    ? weatherData.hourly.time.slice(0, 5).map((time, index) => ({
        time: time.split("T")[1].slice(0, 5),
        temp: weatherData.hourly.temperature_2m[index],
        condition: weatherData.hourly.weathercode[index],
      }))
    : [];

  const forecastDaily = weatherData
    ? weatherData.daily.time.map((day, index) => ({
        day: new Date(day).toLocaleDateString("id-ID", { weekday: "long" }),
        temp: weatherData.daily.temperature_2m_max[index],
        condition: weatherData.daily.weathercode[index],
      }))
    : [];

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div
      className={`min-h-screen py-6 px-4 sm:px-6 md:px-12 xl:px-32 font-sans ${
        isDay
          ? "bg-gradient-to-b from-sky-300 to-blue-600 text-white"
          : "bg-gradient-to-b from-gray-800 to-gray-900 text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto mb-12 relative">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            placeholder="Cari kota..."
            className="w-full p-3 rounded-xl bg-white/10 placeholder-white text-white focus:outline-none shadow-lg"
            onChange={e => setQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />
          <button
            onClick={searchCity}
            className="bg-white/30 px-4 py-2 rounded-xl hover:bg-white/40 transition"
          >
            Cari
          </button>
        </div>

        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute z-10 w-full bg-white text-black rounded-xl mt-1 shadow-md max-h-60 overflow-y-auto">
            {suggestions.map((city, index) => (
              <li
                key={index}
                onClick={() =>
                  handleSelectCity(city.latitude, city.longitude, city.name)
                }
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {city.name}, {city.country}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CurrentWeatherCard
          current={current}
          isDay={isDay}
          unit={unit}
          windUnit={windUnit}
          pressureUnit={pressureUnit}
          temperature={temperature}
          setUnit={setUnit}
          setWindUnit={setWindUnit}
          setPressureUnit={setPressureUnit}
        />

        <div>
          <HourlyForecast forecastHourly={forecastHourly} />
          <TemperatureChart data={forecastHourly} />

          <div className="max-w-xl mx-auto mt-6">
            <button
              onClick={() => fetchWeather()}
              className="w-full flex items-center justify-center gap-2 bg-white/20 px-4 py-3 rounded-xl hover:bg-white/30 transition"
            >
              <TbRefresh className="text-xl" /> Refresh Cuaca
            </button>
          </div>
        </div>
      </div>

      <DailyForecast forecastDaily={forecastDaily} />
    </div>
  );
}

export default HomePage;
