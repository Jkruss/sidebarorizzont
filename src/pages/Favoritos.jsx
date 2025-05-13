import styled from "styled-components";
import { useState } from "react";
import { FaTrash, FaRoute, FaPlus } from "react-icons/fa";

export function Favoritos() {
  const [routes, setRoutes] = useState([
    {
      id: 1,
      name: "Ruta al Parque",
      description: "Ruta para correr por el parque central",
      distance: "5.2",
      duration: "45"
    },
    {
      id: 2,
      name: "Circuito Urbano",
      description: "Recorrido por el centro de la ciudad",
      distance: "3.8",
      duration: "30"
    }
  ]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    distance: "",
    duration: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRoute = {
      id: Date.now(),
      ...formData
    };
    setRoutes([...routes, newRoute]);
    setFormData({
      name: "",
      description: "",
      distance: "",
      duration: ""
    });
  };

  const handleDelete = (id) => {
    setRoutes(routes.filter(route => route.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Container>
      <Title>Rutas Favoritas</Title>

      <FormSection>
        <FormTitle>
          <FaPlus /> Agregar Nueva Ruta
        </FormTitle>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Input
              type="text"
              name="name"
              placeholder="Nombre de la ruta"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Textarea
              name="description"
              placeholder="Descripción de la ruta"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <FormRow>
            <FormGroup>
              <Input
                type="number"
                name="distance"
                placeholder="Distancia (km)"
                value={formData.distance}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="number"
                name="duration"
                placeholder="Duración (min)"
                value={formData.duration}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
          </FormRow>
          <Button type="submit">Agregar Ruta</Button>
        </Form>
      </FormSection>

      <RoutesList>
        {routes.map(route => (
          <RouteCard key={route.id}>
            <RouteHeader>
              <RouteIcon>
                <FaRoute />
              </RouteIcon>
              <RouteInfo>
                <RouteName>{route.name}</RouteName>
                <RouteDescription>{route.description}</RouteDescription>
              </RouteInfo>
              <DeleteButton onClick={() => handleDelete(route.id)}>
                <FaTrash />
              </DeleteButton>
            </RouteHeader>
            <RouteStats>
              <StatItem>
                <StatLabel>Distancia:</StatLabel>
                <StatValue>{route.distance} km</StatValue>
              </StatItem>
              <StatItem>
                <StatLabel>Duración:</StatLabel>
                <StatValue>{route.duration} min</StatValue>
              </StatItem>
            </RouteStats>
          </RouteCard>
        ))}
      </RoutesList>
    </Container>
  );
}

const Container = styled.div`
  padding: 2rem;
  height: 100%;
  background-color: #f5f5f5;
  overflow-y: auto;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 2rem;
`;

const FormSection = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
`;

const FormTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  width: 100%;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #4a90e2;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #4a90e2;
  }
`;

const Button = styled.button`
  background-color: #4a90e2;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #357abd;
  }
`;

const RoutesList = styled.div`
  display: grid;
  gap: 1rem;
`;

const RouteCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const RouteHeader = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
`;

const RouteIcon = styled.div`
  font-size: 1.5rem;
  color: #4a90e2;
  display: flex;
  align-items: center;
`;

const RouteInfo = styled.div`
  overflow: hidden;
`;

const RouteName = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin: 0;
`;

const RouteDescription = styled.p`
  color: #666;
  margin: 0.5rem 0 0;
  font-size: 0.9rem;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #dc3545;
  cursor: pointer;
  padding: 0.5rem;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  transition: color 0.2s;

  &:hover {
    color: #bd2130;
  }
`;

const RouteStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StatLabel = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

const StatValue = styled.span`
  color: #333;
  font-weight: bold;
`;
