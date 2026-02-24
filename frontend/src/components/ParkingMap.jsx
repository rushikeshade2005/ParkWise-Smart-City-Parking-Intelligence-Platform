import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";

// Fix default marker icons (Leaflet bug)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const ParkingMap = ({ parkings }) => {
  const [userLocation, setUserLocation] = useState(null);

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
      (err) => {
        console.error("Location access denied");
      }
    );
  }, []);

  const center = userLocation
    ? [userLocation.lat, userLocation.lng]
    : [19.076, 72.8777]; // fallback city (Mumbai)

  return (
    <div className="h-[400px] w-full rounded overflow-hidden">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* 👤 USER CURRENT LOCATION */}
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

        {/* 🅿️ PARKING LOCATIONS */}
        {parkings.map((p) => (
          <Marker
            key={p._id}
            position={[p.location.lat, p.location.lng]}
          >
            <Popup>
              <div className="text-sm">
                <p className="font-semibold">{p.name}</p>
                <p>₹{p.basePricePerHour}/hr</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default ParkingMap;