import { useEffect, type Dispatch, type SetStateAction } from "react";
import styled from "styled-components";
import { FiCloud } from "react-icons/fi";
import SearchBar from "./SearchBar";
import { useWeatherContext } from "../context/WeatherProvider";
import { useWeather } from "../hooks/useWeather";
import toast from "react-hot-toast";
import { WeatherIcon } from "./WeatherIcons";
import { useAuth } from "./Providers/AuthProvider";

const WeatherDashboard = ({
  city,
  setCity,
}: {
  city: string;
  setCity: Dispatch<SetStateAction<string>>;
}) => {
  const { toggleUnit, unit } = useWeatherContext();
  const { user } = useAuth();
  const { current, forecast, isLoading, isError, error } = useWeather(
    city,
    unit,
    user ? true : false
  );

  useEffect(() => {
    console.log("Current Weather Data:", current);
    console.log("Forecast Data:", forecast);
    if (isError) {
      toast.error(
        error.message || "An error occurred while fetching weather data."
      );
    }
  }, [unit, city, setCity, isError]);

  if (isLoading || isError)
    return (
      <CardWrapper>
        <SearchBar onSearch={setCity} value={city} />
        <UnitToggleWrapper>
          <UnitLabel>°C</UnitLabel>
          <UnitToggle>
            <ToggleInput
              type="checkbox"
              checked={unit === "imperial"}
              onChange={toggleUnit}
            />
            <ToggleSlider />
          </UnitToggle>
          <UnitLabel>°F</UnitLabel>
        </UnitToggleWrapper>
        <Container>
          <TopInfo>
            {!isError && <span>"Loading..."</span>}
            <span>{new Date().toLocaleTimeString()}</span>
          </TopInfo>
          <WeatherMain>
            <SubText>
              {isError ? error?.message : "Loading weather data..."}
            </SubText>
          </WeatherMain>
          <ForecastRow>
            {Array.from({ length: 5 }, (_, index) => (
              <ForecastCard key={index}>
                <div>Loading</div>
                <ForecastIcon>
                  <FiCloud />
                </ForecastIcon>
                <div>--°</div>
              </ForecastCard>
            ))}
          </ForecastRow>
        </Container>
      </CardWrapper>
    );

  return (
    <CardWrapper>
      <SearchBar onSearch={setCity} value={city} />
      {!user && <h4>Login to save the search data</h4>}
      <UnitToggleWrapper>
        <UnitLabel>°C</UnitLabel>
        <UnitToggle>
          <ToggleInput
            type="checkbox"
            checked={unit === "imperial"}
            onChange={toggleUnit}
          />
          <ToggleSlider />
        </UnitToggle>
        <UnitLabel>°F</UnitLabel>
      </UnitToggleWrapper>
      <Container>
        <TopInfo>
          <h1>{current?.name}</h1>
          <span>
            {new Date().toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </span>
        </TopInfo>
        <WeatherMain>
          <SubText>
            {current.weather?.[0]?.main ?? ""}{" "}
            {current.weather?.[1]?.main && " "}
            {current.weather?.[1]?.main ?? ""}
          </SubText>
          <Temperature>
            {current?.main?.temp}°{unit === "metric" ? "C" : "F"}
          </Temperature>
          <SubText>
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              day: "numeric",
            })}{" "}
            — Wind : {current.wind.speed}mph
          </SubText>
          <SubText>
            Feels like : {Math.round(current.main?.feels_like)}°
          </SubText>
          <SubText>Humidity : {Math.round(current.main.humidity)}%</SubText>

          <WeatherIcon icon={current.weather?.[0].icon} size={80} />
        </WeatherMain>
        <TopInfo>Forecast :</TopInfo>
        <ForecastRow>
          {forecast.list
            .filter((_: any, i: number) => i % 8 === 0)
            .slice(1, 7)
            .map((f: any, index: number) => (
              <ForecastCard key={index}>
                <div
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    display: "flex",
                    gap: "0.5rem",
                    alignItems: "center",
                  }}
                >
                  <span>
                    {new Date(f.dt_txt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                    })}
                  </span>
                  {new Date(f.dt_txt).toLocaleDateString("en-IN", {
                    weekday: "short",
                  })}
                </div>
                <WeatherIcon icon={current.weather?.[0]?.icon} size={30} />
                <div>{Math.round(f.main?.temp)}°</div>
              </ForecastCard>
            ))}
        </ForecastRow>
      </Container>
    </CardWrapper>
  );
};

export const CardWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 8rem;
  padding-left: 1rem;
  padding-bottom: 2rem;
  max-width: 100vw;
  padding-right: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  overflow-y: auto;
`;

export const AppWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to top, #8dc26f, #76b2fe);
  color: black;
  overflow-y: auto;
  overflow-x: hidden;
`;

const Container = styled.div`
  @media screen and (min-width: 860px) {
    width: 100%;
  }
  width: 85%;
  min-height: 60vh;
  max-width: 800px;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
`;

const TopInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  margin-bottom: 1rem;
  align-items: center;
`;

const WeatherMain = styled.div`
  text-align: center;
  margin: 1rem 0;
`;

const Temperature = styled.h1`
  font-size: 4rem;
  margin: 0.5rem 0;
`;

const SubText = styled.p`
  font-size: 1.4rem;
  opacity: 0.8;
`;

// const WeatherIcon = styled.div`
//   font-size: 4rem;
//   margin: 1rem 0;
// `;

const ForecastRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
`;

const ForecastCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  @media screen and (max-width: 470px) {
    max-width: 100%;
  }
  max-width: 160px;
  min-width: 120px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 0.75rem;
  text-align: center;
  backdrop-filter: blur(5px);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
`;

const ForecastIcon = styled.div`
  font-size: 2rem;
  margin: 0.5rem 0;
`;

const UnitToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UnitToggle = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 30px;
  margin: 0 10px;
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: rgba(76, 175, 80, 0.6);
  }

  &:checked + span:before {
    transform: translateX(30px);
  }
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.3);
  transition: 0.4s;
  border-radius: 34px;
  backdrop-filter: blur(5px);

  &:before {
    position: absolute;
    content: "";
    height: 22px;
    width: 22px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

const UnitLabel = styled.span`
  color: white;
  font-size: 0.9rem;
`;

export default WeatherDashboard;
