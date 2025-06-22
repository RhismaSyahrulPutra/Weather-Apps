import React, { useState, useEffect } from "react";
import CurrentWeatherCard from "../components/CurrentWeatherCard";
import HourlyForecast from "../components/HourlyForcast";
import TemperatureChart from "../components/TemperatureChart";
import DailyForecast from "../components/DailyForcast";
import { TbRefresh } from "react-icons/tb";

function HomePage() {
  const [unit, setUnit] = useState("C");
  const [windUnit, setWindUnit] = useState("km/h");
  const [pressureUnit, setPressureUnit] = useState("hPa");
  const [tempC] = useState(27);
  const [isDay, setIsDay] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const temperature = unit === "C" ? tempC : (tempC * 9) / 5 + 32;

  useEffect(() => {
    const hour = new Date().getHours();
    setIsDay(hour >= 6 && hour < 18);
  }, []);

  const current = {
    location: "Bandung",
    condition: isDay ? "Clear" : "Clear-night",
    humidity: 70,
    wind: 12,
    pressure: 1012,
    sunrise: "05:45",
    sunset: "17:45",
  };

  const forecastHourly = [
    { time: "09:00", temp: 26, condition: "Clear" },
    { time: "12:00", temp: 28, condition: "Clouds" },
    { time: "15:00", temp: 29, condition: "Rain" },
    { time: "18:00", temp: 25, condition: "Clouds" },
    { time: "21:00", temp: 22, condition: "Clear-night" },
  ];

  const forecastDaily = [
    { day: "Senin", temp: 28, condition: "Clear" },
    { day: "Selasa", temp: 27, condition: "Clouds" },
    { day: "Rabu", temp: 25, condition: "Rain" },
    { day: "Kamis", temp: 26, condition: "Clear" },
    { day: "Jumat", temp: 24, condition: "Clouds" },
    { day: "Sabtu", temp: 29, condition: "Clear" },
    { day: "Minggu", temp: 23, condition: "Rain" },
  ];

  const citySuggestions = ["Bandung", "Jakarta", "Surabaya", "Yogyakarta"];

  return (
    <div
      className={`min-h-screen py-6 px-4 sm:px-6 md:px-12 xl:px-32 font-sans ${
        isDay
          ? "bg-gradient-to-b from-sky-300 to-blue-600 text-white"
          : "bg-gradient-to-b from-gray-800 to-gray-900 text-white"
      }`}
    >
      {/* Search Bar */}
      <div className="max-w-3xl mx-auto mb-8 relative">
        <input
          type="text"
          placeholder="Cari kota..."
          className="w-full p-3 rounded-xl bg-white/10 placeholder-white text-white focus:outline-none shadow-lg"
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
        {showSuggestions && (
          <ul className="absolute z-10 w-full bg-white text-black rounded-xl mt-1 shadow-md">
            {citySuggestions.map((city, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {city}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Current Weather + Hourly */}
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
              onClick={() => alert("Refresh cuaca nanti dihubungkan ke API")}
              className="w-full flex items-center justify-center gap-2 bg-white/20 px-4 py-3 rounded-xl hover:bg-white/30 transition"
            >
              <TbRefresh className="text-xl" /> Refresh Cuaca
            </button>
          </div>
        </div>
      </div>

      {/* 7-Day Forecast */}
      <div className="max-w-7xl mx-auto mt-12 px-2 sm:px-4 md:px-6">
        <DailyForecast forecastDaily={forecastDaily} />
      </div>
    </div>
  );
}

export default HomePage;
