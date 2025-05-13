import styled from "styled-components";
import { useState, useRef } from "react";
import { FaMoon, FaSun, FaUser, FaCamera, FaGlobe, FaBell, FaLock, FaInfoCircle } from "react-icons/fa";

const languages = [
  { code: "es", name: "Español" },
  { code: "en", name: "English" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" }
];

const theme = {
  light: {
    background: "#f5f5f5",
    cardBg: "#ffffff",
    text: "#333333",
    textSecondary: "#666666",
    border: "#e0e0e0",
    shadow: "0 2px 4px rgba(0,0,0,0.1)",
    hover: "#f0f0f0",
    accent: "#2196f3"
  },
  dark: {
    background: "#1a1a1a",
    cardBg: "#2d2d2d",
    text: "#ffffff",
    textSecondary: "#b3b3b3",
    border: "#404040",
    shadow: "0 2px 4px rgba(0,0,0,0.3)",
    hover: "#353535",
    accent: "#bb86fc"
  }
};

export function Configuracion() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("es");
  const [profileImage, setProfileImage] = useState(null);
  const [notifications, setNotifications] = useState(true);
  const [privacy, setPrivacy] = useState("friends");
  const fileInputRef = useRef(null);
  
  const currentTheme = theme[isDarkMode ? "dark" : "light"];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container $theme={currentTheme}>
      <Header>
        <Title $theme={currentTheme}>Configuración</Title>
        <ThemeToggle onClick={() => setIsDarkMode(!isDarkMode)} $theme={currentTheme}>
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </ThemeToggle>
      </Header>

      <SettingsGrid>
        {/* Perfil */}
        <SettingsCard $theme={currentTheme}>
          <CardHeader>
            <CardTitle $theme={currentTheme}>
              <FaUser /> Perfil
            </CardTitle>
          </CardHeader>
          <ProfileSection>
            <ProfileImageContainer>
              <ProfileImage $image={profileImage} $theme={currentTheme}>
                {!profileImage && <FaUser size={40} />}
              </ProfileImage>
              <CameraButton 
                $theme={currentTheme}
                onClick={() => fileInputRef.current.click()}
              >
                <FaCamera />
              </CameraButton>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                style={{ display: 'none' }}
              />
            </ProfileImageContainer>
            <ProfileInfo $theme={currentTheme}>
              <h3>Usuario Demo</h3>
              <p>usuario@ejemplo.com</p>
            </ProfileInfo>
          </ProfileSection>
        </SettingsCard>

        {/* Idioma */}
        <SettingsCard $theme={currentTheme}>
          <CardHeader>
            <CardTitle $theme={currentTheme}>
              <FaGlobe /> Idioma
            </CardTitle>
          </CardHeader>
          <SettingRow>
            <Select 
              $theme={currentTheme}
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </Select>
          </SettingRow>
        </SettingsCard>

        {/* Notificaciones */}
        <SettingsCard $theme={currentTheme}>
          <CardHeader>
            <CardTitle $theme={currentTheme}>
              <FaBell /> Notificaciones
            </CardTitle>
          </CardHeader>
          <SettingRow>
            <SettingLabel $theme={currentTheme}>
              Activar notificaciones
            </SettingLabel>
            <Toggle 
              $isOn={notifications} 
              $theme={currentTheme}
              onClick={() => setNotifications(!notifications)}
            >
              <ToggleButton $isOn={notifications} />
            </Toggle>
          </SettingRow>
        </SettingsCard>

        {/* Privacidad */}
        <SettingsCard $theme={currentTheme}>
          <CardHeader>
            <CardTitle $theme={currentTheme}>
              <FaLock /> Privacidad
            </CardTitle>
          </CardHeader>
          <SettingRow>
            <Select 
              $theme={currentTheme}
              value={privacy}
              onChange={(e) => setPrivacy(e.target.value)}
            >
              <option value="public">Público</option>
              <option value="friends">Solo Amigos</option>
              <option value="private">Privado</option>
            </Select>
          </SettingRow>
        </SettingsCard>

        {/* Información */}
        <SettingsCard $theme={currentTheme}>
          <CardHeader>
            <CardTitle $theme={currentTheme}>
              <FaInfoCircle /> Información
            </CardTitle>
          </CardHeader>
          <SettingRow>
            <SettingLabel $theme={currentTheme}>
              Versión de la aplicación
            </SettingLabel>
            <SettingValue $theme={currentTheme}>1.0.0</SettingValue>
          </SettingRow>
        </SettingsCard>
      </SettingsGrid>
    </Container>
  );
}

const Container = styled.div`
  padding: 2rem;
  min-height: 100vh;
  background-color: ${props => props.$theme.background};
  transition: all 0.3s ease;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: ${props => props.$theme.text};
  margin: 0;
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
    background-color: ${props => props.$theme.hover};
  }
`;

const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const SettingsCard = styled.div`
  background: ${props => props.$theme.cardBg};
  border-radius: 10px;
  box-shadow: ${props => props.$theme.shadow};
  overflow: hidden;
  transition: all 0.3s ease;
`;

const CardHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${props => props.$theme?.border};
`;

const CardTitle = styled.h2`
  font-size: 1.25rem;
  color: ${props => props.$theme.text};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ProfileSection = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const ProfileImageContainer = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
`;

const ProfileImage = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: ${props => props.$image ? `url(${props.$image})` : props.$theme.hover};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$theme.textSecondary};
`;

const CameraButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${props => props.$theme.accent};
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const ProfileInfo = styled.div`
  text-align: center;
  color: ${props => props.$theme.text};

  h3 {
    margin: 0;
    margin-bottom: 0.5rem;
  }

  p {
    margin: 0;
    color: ${props => props.$theme.textSecondary};
  }
`;

const SettingRow = styled.div`
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SettingLabel = styled.span`
  color: ${props => props.$theme.text};
`;

const SettingValue = styled.span`
  color: ${props => props.$theme.textSecondary};
`;

const Select = styled.select`
  padding: 0.5rem 1rem;
  border-radius: 5px;
  border: 1px solid ${props => props.$theme.border};
  background: ${props => props.$theme.cardBg};
  color: ${props => props.$theme.text};
  font-size: 1rem;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${props => props.$theme.accent};
  }
`;

const Toggle = styled.div`
  width: 50px;
  height: 26px;
  background-color: ${props => props.$isOn ? props.$theme.accent : props.$theme.border};
  border-radius: 13px;
  padding: 2px;
  cursor: pointer;
  position: relative;
  transition: background-color 0.3s ease;
`;

const ToggleButton = styled.div`
  width: 22px;
  height: 22px;
  background-color: white;
  border-radius: 50%;
  transition: transform 0.3s ease;
  transform: translateX(${props => props.$isOn ? "24px" : "0"});
`;
