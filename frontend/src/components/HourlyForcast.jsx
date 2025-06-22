import React from "react";
import weatherIcons from "../utils/weatherIcons";

const HourlyForecast = ({ forecastHourly }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3 text-center">Per Jam</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {forecastHourly.map((item, index) => {
          const icon = weatherIcons[item.condition] || weatherIcons.Unknown;
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-md p-4 rounded-xl shadow"
            >
              <div className="text-white text-sm">{item.time}</div>
              <i className={`wi wi-${icon} text-2xl text-yellow-200`} />
              <div className="text-white font-semibold text-sm">
                {item.temp}°C
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HourlyForecast;
