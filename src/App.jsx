import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import { MyRoutes } from "./routers/routes";
import styled from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { Navbar } from "./components/Navbar";
import { Light, Dark } from "./styles/Themes";
import { ThemeProvider } from "styled-components";
export const ThemeContext = React.createContext(null);
function App() {
  const [theme, setTheme] = useState("light");
  const themeStyle = theme === "light" ? Light : Dark;

  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <>
      <ThemeContext.Provider value={{ setTheme, theme }}>
        <ThemeProvider theme={themeStyle}>
          <BrowserRouter>
            <Container className={sidebarOpen ? "sidebarState active" : ""}>
              <Navbar className="navbar" />
              <Sidebar
                className="sidebar"
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
              <main className="main-content">
                <MyRoutes />
              </main>
            </Container>
          </BrowserRouter>
        </ThemeProvider>
      </ThemeContext.Provider>
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-columns: 90px auto;
  grid-template-rows: 60px auto;
  grid-template-areas:
    "navbar navbar"
    "sidebar main";
  background: ${({ theme }) => theme.bgtotal};
  transition: all 0.3s;
  &.active {
    grid-template-columns: 300px auto;
  }
  color: ${({ theme }) => theme.text};

  .navbar {
    grid-area: navbar;
  }
  .sidebar {
    grid-area: sidebar;
  }
  .main-content {
    grid-area: main;
    padding-left: 50px;
  }
`;
export default App;
