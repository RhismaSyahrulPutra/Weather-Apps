import React from "react";
import weatherIcons from "../utils/weatherIcons";

const DailyForecast = ({ forecastDaily }) => {
  return (
    <div className="max-w-7xl mx-auto mt-12 px-2 sm:px-4 md:px-6">
      <h3 className="text-lg font-semibold mb-3 text-center">
        7 Hari ke Depan
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
        {forecastDaily.map((item, index) => {
          const icon = weatherIcons[item.condition] || weatherIcons.Unknown;
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-md p-4 rounded-xl shadow"
            >
              <div className="text-white font-medium text-sm">{item.day}</div>
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

export default DailyForecast;
