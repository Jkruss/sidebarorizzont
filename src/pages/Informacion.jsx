import styled from "styled-components";
import { WiDaySunny, WiRain, WiCloudy, WiHumidity, WiStrongWind } from "react-icons/wi";
import { useState } from "react";

// Mock data for demonstration
const mockWeatherData = {
  current: {
    temp: 23,
    condition: "Soleado",
    humidity: 65,
    windSpeed: 12,
    rainChance: 10
  },
  forecast: [
    { day: "Mañana", temp: 24, icon: <WiDaySunny />, rainChance: 5 },
    { day: "Miércoles", temp: 22, icon: <WiCloudy />, rainChance: 30 },
    { day: "Jueves", temp: 20, icon: <WiRain />, rainChance: 80 },
    { day: "Viernes", temp: 21, icon: <WiCloudy />, rainChance: 45 },
    { day: "Sábado", temp: 23, icon: <WiDaySunny />, rainChance: 10 }
  ]
};

const cities = ["Madrid", "Barcelona", "Valencia", "Sevilla", "Bilbao", "Bogota", "Popayan", "Cali", "Medellin", "Cartagena"];

export function Informacion() {
  const [selectedCity, setSelectedCity] = useState("Madrid");
  const weather = mockWeatherData; // This would be replaced with actual API data

  return (
    <Container>
      <WeatherHeader>
        <Title>El Tiempo</Title>
        <CitySelect 
          value={selectedCity} 
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </CitySelect>
      </WeatherHeader>

      <MainWeather>
        <CurrentTemp>
          <WiDaySunny size={80} />
          <Temperature>{weather.current.temp}°C</Temperature>
          <Condition>{weather.current.condition}</Condition>
        </CurrentTemp>

        <WeatherDetails>
          <DetailItem>
            <WiHumidity size={24} />
            <span>Humedad: {weather.current.humidity}%</span>
          </DetailItem>
          <DetailItem>
            <WiStrongWind size={24} />
            <span>Viento: {weather.current.windSpeed} km/h</span>
          </DetailItem>
          <DetailItem>
            <WiRain size={24} />
            <span>Prob. de lluvia: {weather.current.rainChance}%</span>
          </DetailItem>
        </WeatherDetails>
      </MainWeather>

      <ForecastSection>
        <SectionTitle>Pronóstico de 5 días</SectionTitle>
        <ForecastGrid>
          {weather.forecast.map((day, index) => (
            <ForecastCard key={index}>
              <Day>{day.day}</Day>
              <IconWrapper>{day.icon}</IconWrapper>
              <ForecastTemp>{day.temp}°C</ForecastTemp>
              <RainChance>{day.rainChance}% lluvia</RainChance>
            </ForecastCard>
          ))}
        </ForecastGrid>
      </ForecastSection>
    </Container>
  );
}

const Container = styled.div`
  padding: 2rem;
  height: 100%;
  background-color: #f5f5f5;
`;

const WeatherHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
`;

const CitySelect = styled.select`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: white;
  cursor: pointer;
`;

const MainWeather = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CurrentTemp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border-right: 1px solid #eee;

  @media (max-width: 768px) {
    border-right: none;
    border-bottom: 1px solid #eee;
  }
`;

const Temperature = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: #333;
  margin: 1rem 0;
`;

const Condition = styled.div`
  font-size: 1.2rem;
  color: #666;
`;

const WeatherDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.1rem;
  color: #555;

  svg {
    color: #4a90e2;
  }
`;

const ForecastSection = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1.5rem;
`;

const ForecastGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
`;

const ForecastCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 10px;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const Day = styled.div`
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
`;

const IconWrapper = styled.div`
  font-size: 2rem;
  color: #4a90e2;
  margin: 0.5rem 0;
`;

const ForecastTemp = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
`;

const RainChance = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.5rem;
`;
