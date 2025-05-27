import useSWR from "swr";

const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY || "";
class HttpError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "HttpError";
    this.status = status;
  }
}
// Improved fetcher that properly throws errors
const fetcher = async (url: string) => {
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

export const useWeather = (city: string, unit: "metric" | "imperial") => {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&cnt=40&appid=${API_KEY}`;

  const { data: current, error: currentError } = useSWR(
    city ? weatherUrl : null,
    fetcher,
    {
      refreshInterval: 30000,
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // Only retry up to 3 times
        if (retryCount >= 3) return;

        // Don't retry for 404 errors or rate limiting
        if (error.status === 404 || error.status === 429) return;

        // Retry after 5 seconds
        setTimeout(() => revalidate({ retryCount }), 5000);
      },
    }
  );

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
  

  return {
    current,
    forecast,
    isLoading: (!current && !currentError) || (!forecast && !forecastError),
    isError: currentError || forecastError,
    error: currentError || forecastError,
  };
};
