import styled from "styled-components";
import { useState } from "react";
import { FaMoon, FaSun, FaPaperPlane, FaUser, FaCircle } from "react-icons/fa";

const mockUsers = [
  { id: 1, name: "Ana García", online: true, lastMessage: "¡Hola! ¿Cómo estás?" },
  { id: 2, name: "Carlos Ruiz", online: false, lastMessage: "Nos vemos mañana" },
  { id: 3, name: "María López", online: true, lastMessage: "¿Vamos a entrenar?" },
  { id: 4, name: "Juan Martínez", online: true, lastMessage: "Gracias por la ayuda" },
  { id: 5, name: "Laura Torres", online: false, lastMessage: "De acuerdo" }
];

const mockMessages = [
  { id: 1, senderId: 1, text: "¡Hola! ¿Cómo estás?", timestamp: "10:30" },
  { id: 2, senderId: "me", text: "¡Hola Ana! Muy bien, ¿y tú?", timestamp: "10:31" },
  { id: 3, senderId: 1, text: "Bien también, gracias. ¿Vamos a entrenar hoy?", timestamp: "10:32" },
  { id: 4, senderId: "me", text: "¡Claro! ¿A qué hora?", timestamp: "10:33" }
];

const theme = {
  light: {
    background: "#f5f5f5",
    sidebar: "#ffffff",
    chat: "#ffffff",
    text: "#333333",
    textSecondary: "#666666",
    inputBg: "#ffffff",
    messageBg: "#e3f2fd",
    messageReceived: "#f5f5f5",
    accent: "#2196f3",
    border: "#e0e0e0",
    shadow: "0 2px 4px rgba(0,0,0,0.1)",
    hover: "#f0f0f0"
  },
  dark: {
    background: "#1a1a1a",
    sidebar: "#2d2d2d",
    chat: "#2d2d2d",
    text: "#ffffff",
    textSecondary: "#b3b3b3",
    inputBg: "#404040",
    messageBg: "#404040",
    messageReceived: "#353535",
    accent: "#bb86fc",
    border: "#404040",
    shadow: "0 2px 4px rgba(0,0,0,0.3)",
    hover: "#353535"
  }
};

export function Mensajes() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState(mockUsers[0]);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState(mockMessages);
  
  const currentTheme = theme[isDarkMode ? "dark" : "light"];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageInput.trim()) {
      const newMessage = {
        id: messages.length + 1,
        senderId: "me",
        text: messageInput,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setMessageInput("");
    }
  };

  return (
    <Container $theme={currentTheme}>
      <Header>
        <Title $theme={currentTheme}>Mensajes</Title>
        <ThemeToggle onClick={() => setIsDarkMode(!isDarkMode)} $theme={currentTheme}>
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </ThemeToggle>
      </Header>

      <ChatContainer>
        <UsersList $theme={currentTheme}>
          {mockUsers.map(user => (
            <UserItem 
              key={user.id} 
              $theme={currentTheme}
              $selected={selectedUser.id === user.id}
              onClick={() => setSelectedUser(user)}
            >
              <UserAvatar>
                <FaUser />
                <OnlineStatus $online={user.online}>
                  <FaCircle />
                </OnlineStatus>
              </UserAvatar>
              <UserInfo>
                <UserName $theme={currentTheme}>{user.name}</UserName>
                <LastMessage $theme={currentTheme}>{user.lastMessage}</LastMessage>
              </UserInfo>
            </UserItem>
          ))}
        </UsersList>

        <ChatSection $theme={currentTheme}>
          <ChatHeader $theme={currentTheme}>
            <UserInfo>
              <UserName $theme={currentTheme}>{selectedUser.name}</UserName>
              <OnlineStatus $online={selectedUser.online}>
                <FaCircle /> {selectedUser.online ? "En línea" : "Desconectado"}
              </OnlineStatus>
            </UserInfo>
          </ChatHeader>

          <MessagesContainer $theme={currentTheme}>
            {messages.map(message => (
              <Message 
                key={message.id} 
                $sent={message.senderId === "me"}
                $theme={currentTheme}
              >
                <MessageText>{message.text}</MessageText>
                <MessageTime $theme={currentTheme}>{message.timestamp}</MessageTime>
              </Message>
            ))}
          </MessagesContainer>

          <MessageInputForm onSubmit={handleSendMessage}>
            <MessageInput
              $theme={currentTheme}
              type="text"
              placeholder="Escribe un mensaje..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
            />
            <SendButton $theme={currentTheme} type="submit">
              <FaPaperPlane />
            </SendButton>
          </MessageInputForm>
        </ChatSection>
      </ChatContainer>
    </Container>
  );
}

const Container = styled.div`
  padding: 2rem;
  height: 100vh;
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

const ChatContainer = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
  height: calc(100vh - 120px);
  max-height: calc(100vh - 120px);
`;

const UsersList = styled.div`
  background: ${props => props.$theme.sidebar};
  border-radius: 10px;
  box-shadow: ${props => props.$theme.shadow};
  overflow-y: auto;
  transition: all 0.3s ease;
`;

const UserItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
  background: ${props => props.$selected ? props.$theme.hover : 'transparent'};
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.$theme.hover};
  }
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  position: relative;
`;

const OnlineStatus = styled.div`
  position: absolute;
  bottom: -2px;
  right: -2px;
  font-size: 0.75rem;
  color: ${props => props.$online ? '#4caf50' : '#9e9e9e'};
`;

const UserInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const UserName = styled.div`
  font-weight: bold;
  color: ${props => props.$theme.text};
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const LastMessage = styled.div`
  color: ${props => props.$theme.textSecondary};
  font-size: 0.875rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ChatSection = styled.div`
  background: ${props => props.$theme.chat};
  border-radius: 10px;
  box-shadow: ${props => props.$theme.shadow};
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
`;

const ChatHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${props => props.$theme.border};
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: ${props => props.$theme.background};
`;

const Message = styled.div`
  max-width: 70%;
  align-self: ${props => props.$sent ? 'flex-end' : 'flex-start'};
  background: ${props => props.$sent ? props.$theme.messageBg : props.$theme.messageReceived};
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  position: relative;
`;

const MessageText = styled.div`
  color: ${props => props.$theme?.text};
  margin-bottom: 0.25rem;
`;

const MessageTime = styled.div`
  font-size: 0.75rem;
  color: ${props => props.$theme.textSecondary};
  text-align: right;
`;

const MessageInputForm = styled.form`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-top: 1px solid ${props => props.$theme?.border};
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 1.5rem;
  background: ${props => props.$theme.inputBg};
  color: ${props => props.$theme.text};
  font-size: 1rem;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.$theme.accent};
  }

  &::placeholder {
    color: ${props => props.$theme.textSecondary};
  }
`;

const SendButton = styled.button`
  background: ${props => props.$theme.accent};
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;
