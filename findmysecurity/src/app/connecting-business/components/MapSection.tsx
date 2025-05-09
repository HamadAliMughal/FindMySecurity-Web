import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// Common shape for entities with address and name
interface MappableEntity {
  id: number | string;
  name: string;
  address?: string;
}

interface MapSectionProps {
  entities: MappableEntity[];
  title?: string;
}

const defaultCenter = { lat: 51.5074, lng: -0.1278 };
const mapStyles = { width: "100%", height: "400px", borderRadius: "12px" };

export default function MapSection({ entities, title = "Entity Locations" }: MapSectionProps) {
  const markers = entities
    .filter(entity => entity.address)
    .map((entity, index) => ({
      id: entity.id,
      position: {
        lat: defaultCenter.lat + (Math.random() * 0.02 - 0.01),
        lng: defaultCenter.lng + (Math.random() * 0.02 - 0.01),
      },
      title: entity.name,
    }));

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-4xl mx-auto mb-10">
      <h2 className="text-lg md:text-xl font-semibold mb-4">{title}</h2>
      <div className="h-80 sm:h-96 w-full rounded-md overflow-hidden border">
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API || ""}>
          <GoogleMap
            mapContainerStyle={mapStyles}
            center={defaultCenter}
            zoom={13}
          >
            {markers.map(marker => (
              <Marker
                key={marker.id}
                position={marker.position}
                title={marker.title}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}
