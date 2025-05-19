import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Company, CourseProvider, Professional } from "../types";

interface MapSectionProps {
  data: Professional[] | Company[] | CourseProvider[];
  type: "professionals" | "security companies" | "training providers";
}

const defaultCenter = { lat: 51.5074, lng: -0.1278 };
const mapStyles = { width: "100%", height: "400px", borderRadius: "12px" };

export default function MapSection({ data, type }: MapSectionProps) {
  // Normalize to common marker structure
  const markers = data
    .filter((item: any) => {
      // Support basic presence check
      if (type === "professionals") return item.user?.address;
      return item.address;
    })
    .map((item: any, index) => {
      let title = "";
      if (type === "professionals") {
        title = `${item.user.firstName} ${item.user.lastName}`;
      } else if (type === "security companies") {
        title = item.companyName;
      } else if (type === "training providers") {
        title = item.providerName;
      }

      return {
        id: index,
        position: {
          lat: defaultCenter.lat + (Math.random() * 0.02 - 0.01),
          lng: defaultCenter.lng + (Math.random() * 0.02 - 0.01)
        },
        title,
      };
    });

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-5xl mx-auto mb-10">
      <h2 className="text-lg md:text-xl font-semibold mb-4 capitalize">{type} Map View</h2>
      <div className="h-80 sm:h-96 w-full rounded-md overflow-hidden border">
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API || ""}>
          <GoogleMap mapContainerStyle={mapStyles} center={defaultCenter} zoom={13}>
            {markers.map((marker) => (
              <Marker key={marker.id} position={marker.position} title={marker.title} />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}
