import useSWR from "swr";
import { useAuth } from "../components/Providers/AuthProvider";
import { saveWeatherData } from "../services/storeHistory";
import toast from "react-hot-toast";

const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY || "";
class HttpError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "HttpError";
    this.status = status;
  }
}

const fetcher = async (url: string) => {
  console.log("Fetching data from:", url);

  const response = await fetch(url);

  // If the response is not ok, throw an error
  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Unknown error" }));
    throw new HttpError(
      errorData.message || `HTTP error! Status: ${response.status}`,
      response.status
    );
  }

  return response.json();
};

export const useWeather = (
  city: string,
  unit: "metric" | "imperial",
  saveHistory: boolean
) => {
  const { user } = useAuth();
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&cnt=40&appid=${API_KEY}`;

  const { data: current, error: currentError } = useSWR(
    city ? weatherUrl : null,
    fetcher,
    {
      refreshInterval: 30000,
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // retry up to 3 times
        if (retryCount >= 3) return;

        if (error.status === 404 || error.status === 429) return;

        // Retry after 5 seconds
        setTimeout(() => revalidate({ retryCount }), 5000);
      },
    }
  );

  if (current && saveHistory && user) {
    async function fetchFunction() {
      const res = await saveWeatherData({
        city: current.name,
        humidity: current.main.humidity.toString(),
        temperature: current.main.temp.toString(),
        icon: current.weather[0].icon,
      });
    }
    fetchFunction().catch((error) => {
      console.error("Error saving weather data:", error);
      toast.error("Failed to save weather data. Please try again.");
    });
  }

  const { data: forecast, error: forecastError } = useSWR(
    city ? forecastUrl : null,
    fetcher,
    {
      refreshInterval: 180000,
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        if (retryCount >= 3) return;
        if (error.status === 404 || error.status === 429) return;
        setTimeout(() => revalidate({ retryCount }), 5000);
      },
    }
  );
  console.log("Current Weather Data:", current);
  console.log("Forecast Data:", forecast);

  return {
    current,
    forecast,
    isLoading: (!current && !currentError) || (!forecast && !forecastError),
    isError: currentError || forecastError,
    error: currentError || forecastError,
  };
};
