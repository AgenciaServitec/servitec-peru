import { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMapEvents, useMap } from "react-leaflet";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCrosshairs,
  faMapMarkerAlt,
  faCircleNotch,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Tooltip } from "../ui";
import { useUserLocation } from "../../hooks";
import "leaflet/dist/leaflet.css";

const MapWrapper = styled.div`
  position: relative;
  height: 350px;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;

  .map-instance {
    height: 100%;
    width: 100%;
  }

  .pin-container {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1000;
    pointer-events: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);

    &.moving {
      transform: translate(-50%, -120%);
    }

    &:not(.moving) {
      transform: translate(-50%, -100%);
    }
  }

  .marker-icon {
    font-size: 40px;
    color: #ff4d4f;
    filter: drop-shadow(0px 3px 2px rgba(0, 0, 0, 0.2));
  }

  .marker-shadow {
    width: 10px;
    height: 3px;
    background: rgba(0, 0, 0, 0.25);
    border-radius: 50%;
    filter: blur(1.5px);
    transition: all 0.2s;

    &.moving {
      transform: scale(0.6);
      opacity: 0.4;
      margin-top: 20px;
    }
  }

  .controls-overlay {
    position: absolute;
    top: 15px;
    right: 15px;
    z-index: 1000;
  }

  .gps-button {
    width: 40px;
    height: 40px;
    background: white;
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    color: #333;
    transition: all 0.2s;

    &:hover {
      color: #1890ff;
      transform: scale(1.05);
    }
    &:active {
      transform: scale(0.95);
    }
  }

  .address-loader {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    background: rgba(255, 255, 255, 0.95);
    padding: 8px 16px;
    border-radius: 30px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    font-weight: 500;
  }

  .fa-spin-custom {
    animation: fa-spin 1s infinite linear;
  }
`;

const MapController = ({ location, value, isNew, forceCenter }) => {
  const map = useMap();

  useEffect(() => {
    if (location?.lat && location?.lng && (isNew || forceCenter > 0)) {
      map.flyTo([location.lat, location.lng], 17, { duration: 1.5 });
    }
  }, [location, forceCenter]);

  useEffect(() => {
    if (value?.lat && value?.lng) {
      map.flyTo([parseFloat(value.lat), parseFloat(value.lng)], 17, {
        duration: 1.5,
      });
    }
  }, [value?.lat, value?.lng]);

  return null;
};
export const LocationPicker = ({ value, onChange, isNew, onAddressFound }) => {
  const {
    location,
    loading: loadingLocation,
    refreshLocation,
  } = useUserLocation();

  const [isMoving, setIsMoving] = useState(false);
  const [isManualMoving, setIsManualMoving] = useState(false);
  const [addressLoading, setAddressLoading] = useState(false);
  const [forceCenter, setForceCenter] = useState(0);
  const [tempCoords, setTempCoords] = useState(null);

  const initialCenter = value?.lat
    ? [parseFloat(value.lat), parseFloat(value.lng)]
    : [-12.046374, -77.042793];

  const getAddress = async (lat, lng, updateForm = false) => {
    setAddressLoading(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await res.json();
      if (data.display_name && onAddressFound) {
        setIsManualMoving(true);
        onAddressFound(data.display_name);

        if (updateForm) {
          onChange({ lat: lat.toString(), lng: lng.toString() });
        }
        setTimeout(() => setIsManualMoving(false), 1000);
      }
    } catch (e) {
      console.error("Error geocoding");
    } finally {
      setAddressLoading(false);
    }
  };

  const handleConfirmLocation = () => {
    if (tempCoords) {
      onChange({
        lat: tempCoords.lat.toString(),
        lng: tempCoords.lng.toString(),
      });
      getAddress(tempCoords.lat, tempCoords.lng);
      setTempCoords(null);
    }
  };

  const MapHandler = () => {
    useMapEvents({
      movestart: () => setIsMoving(true),
      moveend: (e) => {
        setIsMoving(false);
        const { lat, lng } = e.target.getCenter();
        setTempCoords({ lat, lng });
        getAddress(lat, lng, false);
      },
    });
    return null;
  };

  return (
    <MapWrapper className="location-picker-container">
      <div className={`pin-container ${isMoving ? "moving" : ""}`}>
        <FontAwesomeIcon icon={faMapMarkerAlt} className="marker-icon" />
        <div className={`marker-shadow ${isMoving ? "moving" : ""}`} />
      </div>

      <MapContainer
        center={initialCenter}
        zoom={15}
        className="map-instance"
        zoomControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapController
          location={location}
          value={value}
          isNew={isNew}
          forceCenter={forceCenter}
        />
        <MapHandler />
      </MapContainer>

      {tempCoords && !isMoving && (
        <div
          className="confirm-btn-container"
          style={{
            position: "absolute",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1000,
            width: "80%",
          }}
        >
          <Button
            type="primary"
            block
            size="large"
            onClick={handleConfirmLocation}
            style={{
              borderRadius: "8px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            }}
          >
            Confirmar este punto
          </Button>
        </div>
      )}

      <div className="controls-overlay">
        <Tooltip title="Mi ubicación actual" placement="left">
          <button
            type="button"
            className="gps-button"
            disabled={loadingLocation}
            onClick={() => {
              refreshLocation();
              setForceCenter((prev) => prev + 1);
            }}
          >
            <FontAwesomeIcon
              icon={loadingLocation ? faCircleNotch : faCrosshairs}
              spin={loadingLocation}
            />
          </button>
        </Tooltip>
      </div>

      {addressLoading && (
        <div className="address-loader">
          <FontAwesomeIcon icon={faCircleNotch} spin />
          <span>Buscando dirección...</span>
        </div>
      )}
    </MapWrapper>
  );
};
