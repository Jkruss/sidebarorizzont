import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './CrearRutas.css';

export function CrearRutas() {
    return (
        <div style={{ padding: '20px' }}>
            <h1>Crear Ruta</h1>
            <div className="map-wrapper">
                <div className="map-container">
                    <MapContainer 
                        center={[4.6097, -74.0817]} 
                        zoom={13} 
                        scrollWheelZoom={true}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        />
                    </MapContainer>
                </div>
            </div>
        </div>
    );
}
