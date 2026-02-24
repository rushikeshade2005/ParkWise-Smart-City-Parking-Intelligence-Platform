import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Fix marker icon issue
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
  return (
    <div className="h-[400px] w-full rounded overflow-hidden">
      <MapContainer
        center={[19.076, 72.8777]}   // default city (Mumbai example)
        zoom={12}
        scrollWheelZoom
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

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