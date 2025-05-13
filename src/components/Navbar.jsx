import React, { useContext, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { ThemeContext } from "../App";
import { FaBell } from "react-icons/fa";
import profileImage from "../images/Captura de pantalla 2024-10-02 225054.png"; // Assuming profile image is here, adjust path if needed
import { FaBicycle } from "react-icons/fa";

export function Navbar() {
  const { theme } = useContext(ThemeContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <NavContainer themeUse={theme}>
      <div className="left-section">
        <div className="logo-content">
          <FaBicycle size={32} />
          <h2 className="title">Orizzont</h2>
        </div>
      </div>
      <div className="spacer" />
      <div className="right-section" ref={dropdownRef}>
        <button className="icon-button" aria-label="Notifications">
          <FaBell size={24} />
        </button>
        <button className="icon-button" aria-label="Profile" onClick={toggleDropdown}>
          <ProfileImg src={profileImage} alt="Profile" />
        </button>
        {dropdownOpen && (
          <DropdownMenu>
            <DropdownItem>Mi cuenta</DropdownItem>
            <DropdownItem>Historial</DropdownItem>
            <DropdownItem>Cerrar Sesion</DropdownItem>
          </DropdownMenu>
        )}
      </div>
    </NavContainer>
  );
}

const NavContainer = styled.nav`
  grid-column: 1 / -1;
  height: 60px;
  width: 1;
  background: ${({ themeUse }) => (themeUse === "light" ? "rgb(255,255,255)" : "#222")};
  color: ${({ themeUse }) => (themeUse === "light" ? "#000" : "#fff")};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  .icon-button {
    background: transparent;
    border: none;
    color: ${({ themeUse }) => (themeUse === "light" ? "rgb(45,45,45)" : "rgb(210,210,210)")};
    cursor: pointer;
    margin-left: 15px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: color 0.3s;

    &:hover {
      color: ${({ themeUse }) => (themeUse === "light" ? "#0056b3" : "#82c7ff")};
    }
  }

  .logo-content {
    display: flex;
    align-items: center;
    h2 {
      margin-left: 10px;
      font-weight: 700;
      font-size: 1.5rem;
    }
  }
  .spacer {
    flex-grow: 1;
  }

  position: relative;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 60px;
  right: 0;
  background: ${({ theme }) => theme.bg};
  border: 1px solid ${({ theme }) => theme.bg3};
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  width: 160px;
  z-index: 1000;
`;

const DropdownItem = styled.div`
  padding: 10px 15px;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
  &:hover {
    background: ${({ theme }) => theme.bg3};
  }
`;

const ProfileImg = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
`;

