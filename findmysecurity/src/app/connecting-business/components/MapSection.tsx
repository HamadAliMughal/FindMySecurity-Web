import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Professional } from "../types";

interface MapSectionProps {
  professionals: Professional[];
}

const defaultCenter = { lat: 51.5074, lng: -0.1278 };
const mapStyles = { width: "100%", height: "400px", borderRadius: "12px" };

export default function MapSection({ professionals }: MapSectionProps) {
  // Create markers from professionals data
  const markers = professionals
    .filter(pro => pro.user.address)
    .map((pro, index) => ({
      id: index,
      position: {
        lat: defaultCenter.lat + (Math.random() * 0.02 - 0.01),
        lng: defaultCenter.lng + (Math.random() * 0.02 - 0.01)
      },
      title: `${pro.user.firstName} ${pro.user.lastName}`
    }));

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-4xl mx-auto mb-10">
      <h2 className="text-lg md:text-xl font-semibold mb-4">Security Professionals Locations</h2>
      <div className="h-80 sm:h-96 w-full rounded-md overflow-hidden border">
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API || ""}>
          <GoogleMap 
            mapContainerStyle={mapStyles} 
            center={defaultCenter} 
            zoom={13}
          >
            {markers.map((marker) => (
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