import styled from "styled-components";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

// Mock data for demonstration
const heartRateData = [
  { time: '6:00', rate: 75 },
  { time: '8:00', rate: 82 },
  { time: '10:00', rate: 88 },
  { time: '12:00', rate: 85 },
  { time: '14:00', rate: 90 },
  { time: '16:00', rate: 87 },
  { time: '18:00', rate: 80 },
];

const bodyFatData = [
  { month: 'Ene', percentage: 25 },
  { month: 'Feb', percentage: 24 },
  { month: 'Mar', percentage: 23 },
  { month: 'Abr', percentage: 22 },
  { month: 'May', percentage: 21 },
  { month: 'Jun', percentage: 20 },
];

const theme = {
  light: {
    background: '#f5f5f5',
    cardBg: '#ffffff',
    text: '#333333',
    textSecondary: '#666666',
    chartGrid: '#e0e0e0',
    shadow: '0 2px 4px rgba(0,0,0,0.1)',
    heartRate: '#8884d8',
    bodyFat: '#82ca9d',
  },
  dark: {
    background: '#1a1a1a',
    cardBg: '#2d2d2d',
    text: '#ffffff',
    textSecondary: '#b3b3b3',
    chartGrid: '#404040',
    shadow: '0 2px 4px rgba(0,0,0,0.3)',
    heartRate: '#bb86fc',
    bodyFat: '#03dac6',
  }
};

export function Estadisticas() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const currentTheme = theme[isDarkMode ? 'dark' : 'light'];

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Container $theme={currentTheme}>
      <Header>
        <Title $theme={currentTheme}>Estadísticas de Salud</Title>
        <ThemeToggle onClick={toggleTheme} $theme={currentTheme}>
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </ThemeToggle>
      </Header>
      
      <StatsGrid>
        <StatCard $theme={currentTheme}>
          <CardTitle $theme={currentTheme}>Ritmo Cardíaco Actual</CardTitle>
          <BigNumber $theme={currentTheme}>85 <span>BPM</span></BigNumber>
        </StatCard>
        
        <StatCard $theme={currentTheme}>
          <CardTitle $theme={currentTheme}>Índice de Grasa Corporal</CardTitle>
          <BigNumber $theme={currentTheme}>20<span>%</span></BigNumber>
        </StatCard>
      </StatsGrid>

      <ChartContainer>
        <ChartCard $theme={currentTheme}>
          <CardTitle $theme={currentTheme}>Ritmo Cardíaco (Últimas 12 horas)</CardTitle>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={heartRateData}>
              <CartesianGrid strokeDasharray="3 3" stroke={currentTheme.chartGrid} />
              <XAxis dataKey="time" stroke={currentTheme.textSecondary} />
              <YAxis stroke={currentTheme.textSecondary} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: currentTheme.cardBg,
                  border: 'none',
                  borderRadius: '8px',
                  color: currentTheme.text
                }}
              />
              <Line 
                type="monotone" 
                dataKey="rate" 
                stroke={currentTheme.heartRate}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard $theme={currentTheme}>
          <CardTitle $theme={currentTheme}>Progreso de Grasa Corporal</CardTitle>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={bodyFatData}>
              <CartesianGrid strokeDasharray="3 3" stroke={currentTheme.chartGrid} />
              <XAxis dataKey="month" stroke={currentTheme.textSecondary} />
              <YAxis stroke={currentTheme.textSecondary} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: currentTheme.cardBg,
                  border: 'none',
                  borderRadius: '8px',
                  color: currentTheme.text
                }}
              />
              <Area 
                type="monotone" 
                dataKey="percentage" 
                stroke={currentTheme.bodyFat}
                fill={currentTheme.bodyFat}
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </ChartContainer>
    </Container>
  );
}

const Container = styled.div`
  padding: 2rem;
  height: 100%;
  background-color: ${props => props.$theme.background};
  transition: all 0.3s ease;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: ${props => props.$theme.text};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.$theme.cardBg};
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  color: ${props => props.$theme.text};
  margin: 0;
  transition: color 0.3s ease;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: ${props => props.$theme.cardBg};
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: ${props => props.$theme.shadow};
  transition: all 0.3s ease;
`;

const ChartContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
`;

const ChartCard = styled.div`
  background: ${props => props.$theme.cardBg};
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: ${props => props.$theme.shadow};
  transition: all 0.3s ease;
`;

const CardTitle = styled.h3`
  font-size: 1.1rem;
  color: ${props => props.$theme.textSecondary};
  margin-bottom: 1rem;
  transition: color 0.3s ease;
`;

const BigNumber = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${props => props.$theme.text};
  transition: color 0.3s ease;
  
  span {
    font-size: 1rem;
    color: ${props => props.$theme.textSecondary};
    margin-left: 0.5rem;
  }
`;
