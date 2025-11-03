import React, { useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const busIcon = new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/512/3097/3097144.png", iconSize: [28,28] });
const boatIcon = new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/512/2038/2038969.png", iconSize: [28,28] });
const chwIcon = new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/512/2965/2965567.png", iconSize: [28,28] });
const nearestIcon = new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/512/190/190411.png", iconSize: [34,34] });

const FacilityMap = ({ facilities = [], userLocation = null }) => {
  const safeFacilities = Array.isArray(facilities) ? facilities : [];
  const center = userLocation ? [userLocation.lat, userLocation.lon] : [22.345, 90.235];

  const nearestId = useMemo(() => {
    if (!userLocation || !safeFacilities.length) return null;
    return safeFacilities[0]?.id || null;
  }, [safeFacilities, userLocation]);

  return (
    <MapContainer center={center} zoom={12} style={{ height: "100%", width: "100%" }}>
      <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {userLocation && <CircleMarker center={[userLocation.lat, userLocation.lon]} pathOptions={{ color: "blue" }} radius={8} />}

      {safeFacilities.map((f) => {
        const position = [Number(f.lat), Number(f.lon)];
        let icon = f.type && f.type.toLowerCase().includes("chw") ? chwIcon : (f.busAccess ? busIcon : boatIcon);
        if (f.id === nearestId) icon = nearestIcon;

        return (
          <Marker key={f.id || Math.random()} position={position} icon={icon} eventHandlers={{
            mouseover: (e) => e.target.openPopup(),
            mouseout: (e) => e.target.closePopup()
          }}>
            <Popup>
              <b>{f.name}</b><br />
              ধরন: {f.type}<br />
              উপজেলা: {f.upazila}, ইউনিয়ন: {f.union}<br />
              খোলার সময়: {f.open}<br />
              {typeof f.distance === "number" && <span>দূরত্ব: {(f.distance/1000).toFixed(2)} km</span>}<br />
              {f.landmark && <small>ল্যান্ডমার্ক: {f.landmark}</small>}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default FacilityMap;
