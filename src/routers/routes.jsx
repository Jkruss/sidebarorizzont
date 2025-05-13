import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Estadisticas } from "../pages/Estadisticas";
import { Informacion } from "../pages/Informacion";
import {Favoritos} from "../pages/Favoritos";
import {Mensajes} from "../pages/Mensajes";
import {Configuracion} from "../pages/Configuracion";
import {CrearRutas} from "../pages/CrearRutas";
export function MyRoutes() {
  return (
   
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/informacion" element={<Informacion />} />
        <Route path="/estadisticas" element={<Estadisticas />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/mensajes" element={<Mensajes />} />
        <Route path="/configuracion" element={<Configuracion />} />
        <Route path="/crearrutas" element={<CrearRutas/>} />
      </Routes>
    
  );
}
