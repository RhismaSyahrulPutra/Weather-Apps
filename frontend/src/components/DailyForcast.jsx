import React from "react";
import weatherIcons from "../utils/weatherIcons";
import weatherConditions from "../utils/weatherConditions";

const DailyForecast = ({ forecastDaily }) => {
  return (
    <div className="max-w-7xl mx-auto mt-12 px-2">
      <h3 className="text-lg font-semibold mb-4 text-center">
        Prakiraan 7 Hari ke Depan
      </h3>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-4">
        {forecastDaily.map((item, index) => {
          const conditionName = weatherConditions[item.condition] || "Unknown";
          const icon = weatherIcons[conditionName] || weatherIcons.Unknown;

          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow"
            >
              <div className="text-white font-medium text-sm mb-1">
                {item.day}
              </div>
              <i className={`wi wi-${icon} text-2xl text-yellow-200 p-2`} />
              <div className="text-white font-semibold text-sm mt-1">
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
