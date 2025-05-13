import styled from "styled-components";
import { useContext } from "react";
import { ThemeContext } from "../App";

const newsItems = [
  {
    date: "6 de mayo de 2025",
    title: "Informacion del clima",
    image: "https://media-rockstargames-com.akamaized.net/mfe6/prod/__common/images/c58634497a6a6169b767.jpg",
    link: "/mx/newswire/article/3928aaa9471o3a/grand-theft-auto-vi-watch-trailer-2-now",
  },
  {
    date: "8 de mayo de 2025",
    title: "Rutas",
    image: "https://media-rockstargames-com.akamaized.net/mfe6/prod/__common/images/c58634497a6a6169b767.jpg",
    link: "/mx/newswire/article/7537ooo3914721/secure-the-bag-with-bonuses-on-the-contract-and-more",
  },
  {
    date: "2 de mayo de 2025",
    title: "Ciclismo",
    image: "https://media-rockstargames-com.akamaized.net/mfe6/prod/__common/images/c58634497a6a6169b767.jpg",
    link: "/mx/newswire/article/258aa538o412ok/grand-theft-auto-vi-is-now-coming-may-26-2026",
  },
  {
    date: "2 de mayo de 2025",
    title: "Bicicleta",
    image: "https://media-rockstargames-com.akamaized.net/mfe6/prod/__common/images/c58634497a6a6169b767.jpg",
    link: "/mx/newswire/article/258aa538o412ok/grand-theft-auto-vi-is-now-coming-may-26-2026",
  },
];

export function Home() {
  const { theme } = useContext(ThemeContext);

  return (
    <Container themeUse={theme}>
      <SectionTitle>Noticias</SectionTitle>
      <NewsGrid>
        {newsItems.map(({ date, title, image, link }, index) => (
          <NewsCard key={index} themeUse={theme}>
            <ImageWrapper>
              <NewsImage src={image} alt={title} />
            </ImageWrapper>
            <ContentWrapper>
              <NewsDate themeUse={theme}>{date}</NewsDate>
              <NewsTitle href={link} target="_blank" rel="noopener noreferrer" themeUse={theme}>
                {title}
              </NewsTitle>
            </ContentWrapper>
          </NewsCard>
        ))}
      </NewsGrid>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  padding: 30px;
  background: ${({ themeUse }) => (themeUse === "light" ? "#f5f5f5" : "#121212")};
  color: ${({ themeUse }) => (themeUse === "light" ? "#222" : "#eee")};
  overflow-y: auto;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const SectionTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 25px;
  font-weight: 700;
  color: ${({ themeUse }) => (themeUse === "light" ? "#333" : "rgb(45,45,45)")};
`;

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(320px,1fr));
  gap: 25px;
`;

const NewsCard = styled.div`
  background: ${({ themeUse }) => (themeUse === "light" ? "#fff" : "#1e1e1e")};
  border-radius: 12px;
  box-shadow: ${({ themeUse }) =>
    themeUse === "light"
      ? "0 4px 8px rgba(0,0,0,0.1)"
      : "0 4px 12px rgba(0,0,0,0.7)"};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-6px);
    box-shadow: ${({ themeUse }) =>
      themeUse === "light"
        ? "0 8px 16px rgba(0,0,0,0.15)"
        : "0 8px 24px rgba(0,0,0,0.9)"};
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 180px;
  overflow: hidden;
`;

const NewsImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  ${NewsCard}:hover & {
    transform: scale(1.05);
  }
`;

const ContentWrapper = styled.div`
  padding: 15px 20px;
  display: flex;
  flex-direction: column;
`;

const NewsDate = styled.span`
  font-size: 0.85rem;
  color: ${({ themeUse }) => (themeUse === "light" ? "#666" : "#aaa")};
  margin-bottom: 8px;
`;

const NewsTitle = styled.a`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${({ themeUse }) => (themeUse === "light" ? "#222" : "#eee")};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

