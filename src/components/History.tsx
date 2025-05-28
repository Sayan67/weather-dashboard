import React, { use, useEffect, useState } from "react";
import { getUserWeatherHistory } from "../services/storeHistory";
import { CardWrapper } from "./WeatherCard";
import styled from "styled-components";

function History() {
  const [history, setHistory] = useState<
    {
      id: string;
      created_at: string;
      city: string;
      humidity: string;
      temperature: string;
      icon: string;
    }[]
  >([]);
  useEffect(() => {
    async function fetchHistory() {
      try {
        // Assuming you have a function to fetch user history
        const history = await getUserWeatherHistory();
        setHistory(history);
        console.log("User Weather History:", history);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    }
    fetchHistory();
  }, []);

  return (
    <>
      <h2
      >
        Weather History
      </h2>
      <Wrapper>
        {history.length > 0 ? (
          <ul
            style={{
              padding: "0",
            }}
          >
            {history.map((item) => (
              <HistoryWrapper key={history[0]?.id}>
                <li key={item.id}>
                  <strong>{item.city}</strong> - {item.temperature}°C, Humidity:{" "}
                  {item.humidity}%, Date :{" "}
                  {new Date(item.created_at).toLocaleString("en-IN", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                </li>
              </HistoryWrapper>
            ))}
          </ul>
        ) : (
          <p>No history available.</p>
        )}
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  max-height: 70vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 100%;
  max-width: 800px;
  box-sizing: border-box;
`;

const HistoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  margin-top: 10px;
  width: 100%;
  max-width: 800px;
  padding: 20px 40px;
  background-color: #f9f9f9a7;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  h2 {
    margin-bottom: 16px;
  }
  ul {
    list-style: none;
    li {
      margin-bottom: 8px;
      strong {
        color: #333;
      }
      span {
        color: #666;
      }
    }
  }
  p {
    color: #999;
  }
`;

export default History;
