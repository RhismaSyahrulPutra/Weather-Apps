import React from "react";
import {
  TbDroplet,
  TbWind,
  TbGauge,
  TbSunrise,
  TbSunset,
} from "react-icons/tb";
import weatherIcons from "../utils/weatherIcons";
import weatherConditions from "../utils/weatherConditions";

const CurrentWeatherCard = ({
  current,
  unit,
  setUnit,
  windUnit,
  setWindUnit,
  pressureUnit,
  setPressureUnit,
  isDay,
  temperature,
}) => {
  const conditionName = weatherConditions[current.condition] || "Unknown";
  const iconClass = weatherIcons[conditionName] || weatherIcons.Unknown;

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg flex flex-col gap-4 justify-center min-h-[520px]">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-1">{current.location}</h1>
        <p className="text-blue-100 mb-4">
          {isDay ? "Siang Hari" : "Malam Hari"}
        </p>
        <i
          className={`wi wi-${iconClass} text-8xl text-yellow-300 pt-8 mb-4`}
        />
        <h2 className="text-6xl font-bold mb-2">
          {Math.round(temperature)}°{unit}
        </h2>
        <button
          onClick={() => setUnit(unit === "C" ? "F" : "C")}
          className="text-sm text-blue-100 underline"
        >
          Tampilkan dalam °{unit === "C" ? "F" : "C"}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm text-blue-100 mt-2 text-center">
        {/* Humidity */}
        <div className="flex items-center justify-center gap-2">
          <TbDroplet />
          {current.humidity && current.humidity !== "-"
            ? `${current.humidity}%`
            : "-"}{" "}
          Kelembaban
        </div>

        {/* Wind */}
        <div className="flex items-center justify-center gap-2">
          <TbWind />
          {windUnit === "km/h"
            ? current.wind
            : (current.wind / 1.609).toFixed(1)}{" "}
          {windUnit}
          <button
            className="text-xs underline ml-1"
            onClick={() => setWindUnit(windUnit === "km/h" ? "mph" : "km/h")}
          >
            ubah
          </button>
        </div>

        {/* Pressure */}
        <div className="flex items-center justify-center gap-2">
          <TbGauge />
          {current.pressure && current.pressure !== "-"
            ? pressureUnit === "hPa"
              ? current.pressure
              : (current.pressure * 0.0295).toFixed(2)
            : "-"}{" "}
          {pressureUnit}
          <button
            className="text-xs underline ml-1"
            onClick={() =>
              setPressureUnit(pressureUnit === "hPa" ? "inHg" : "hPa")
            }
          >
            ubah
          </button>
        </div>

        {/* Sunrise & Sunset */}
        <div className="flex items-center justify-center gap-2">
          <TbSunrise /> {current.sunrise}
          <TbSunset className="ml-3" /> {current.sunset}
        </div>
      </div>
    </div>
  );
};

export default CurrentWeatherCard;
