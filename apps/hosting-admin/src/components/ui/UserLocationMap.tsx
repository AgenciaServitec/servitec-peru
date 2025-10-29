import { useEffect } from "react";
import { Circle, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL(
    "leaflet/dist/images/marker-icon-2x.png",
    import.meta.url
  ).href,
  iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).href,
  shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url)
    .href,
});

export const UserLocationMap = ({ location, onValidateGeofence }) => {
  if (!location) return <p>Ubicación no disponible</p>;

  const geofenceCenter = { lat: -12.1711671, lng: -77.0189769 };
  const geofenceRadius = 8;

  const isInsideGeofence =
    L.latLng(location.lat, location.lng).distanceTo(
      L.latLng(geofenceCenter.lat, geofenceCenter.lng)
    ) <= geofenceRadius;

  useEffect(() => {
    if (onValidateGeofence) {
      onValidateGeofence(isInsideGeofence);
    }
  }, [isInsideGeofence, onValidateGeofence]);

  return (
    <>
      <MapContainer
        center={[location.lat, location.lng]}
        zoom={15}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[location.lat, location.lng]}>
          <Popup>
            ¡Estás aquí! <br />
            {isInsideGeofence
              ? "Dentro de la geocerca ✅"
              : "Fuera de la geocerca ❌"}
          </Popup>
        </Marker>
        <Circle
          center={[geofenceCenter.lat, geofenceCenter.lng]}
          radius={geofenceRadius}
          pathOptions={{ color: isInsideGeofence ? "green" : "red" }}
        />
      </MapContainer>

      <p style={{ textAlign: "center", marginTop: "10px" }}>
        {isInsideGeofence
          ? "El usuario está dentro de la geocerca ✅"
          : "El usuario está fuera de la geocerca ❌"}
      </p>
    </>
  );
};
