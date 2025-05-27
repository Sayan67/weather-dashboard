import { useState, useEffect } from "react";
import WeatherCard from "./components/WeatherCard";




function App() {
  const [city, setCity] = useState(
    () => localStorage.getItem("city") || "London"
  );

  useEffect(() => {
    localStorage.setItem("city", city);
  }, [city]);

  return (
    <div>
      {/* <BackgroundImage>
        <img src={imageUrl} />
      </BackgroundImage> */}
      <WeatherCard city={city} setCity={setCity} />
    </div>
  );
}

export default App;
