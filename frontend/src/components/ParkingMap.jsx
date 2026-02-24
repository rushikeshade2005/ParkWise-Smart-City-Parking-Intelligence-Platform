import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";

const ParkingMap = ({ parkings = [] }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [ready, setReady] = useState(false);

  // ✅ Leaflet mutation INSIDE React lifecycle
  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });

    setReady(true);
  }, []);

  // Get user's current location
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => {
        console.warn("Location access denied");
      }
    );
  }, []);

  if (!ready) return null; // ⛔ prevents early crash

  const center = userLocation
    ? [userLocation.lat, userLocation.lng]
    : [19.076, 72.8777];

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <MapContainer center={center} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {userLocation && (
          <>
            <Marker position={[userLocation.lat, userLocation.lng]}>
              <Popup>You are here</Popup>
            </Marker>
            <Circle
              center={[userLocation.lat, userLocation.lng]}
              radius={500}
              pathOptions={{ color: "blue" }}
            />
          </>
        )}

        {parkings.map((p) => (
          <Marker key={p._id} position={[p.location.lat, p.location.lng]}>
            <Popup>
              <strong>{p.name}</strong>
              <br />₹{p.basePricePerHour}/hr
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default ParkingMap;