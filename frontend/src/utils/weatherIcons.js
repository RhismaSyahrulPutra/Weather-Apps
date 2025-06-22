const weatherIcons = {
  // Kondisi Umum
  Clear: "day-sunny",
  Clouds: "cloudy",
  Rain: "rain",
  Drizzle: "sprinkle",
  Thunderstorm: "thunderstorm",
  Snow: "snow",
  Mist: "fog",
  Haze: "day-haze",
  Fog: "fog",
  Smoke: "smoke",
  Dust: "dust",
  Sand: "sandstorm",
  Ash: "volcano",
  Squall: "strong-wind",
  Tornado: "tornado",

  // Kondisi Khusus Berdasarkan Waktu (Siang/Malam)
  "Clear-day": "day-sunny",
  "Clear-night": "night-clear",
  "Clouds-day": "day-cloudy",
  "Clouds-night": "night-alt-cloudy",
  "Rain-day": "day-rain",
  "Rain-night": "night-alt-rain",
  "Snow-day": "day-snow",
  "Snow-night": "night-alt-snow",

  // Fallback
  Unknown: "na",
};

export default weatherIcons;
