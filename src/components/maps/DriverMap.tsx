import { useEffect, useMemo, useRef } from "react";
import {
  GoogleMap,
  Marker,
  Polyline,
  useLoadScript,
} from "@react-google-maps/api";
import "./Map.css";
import { useDriverLocation } from "../../hooks/useDriverLocation";

type Props = { driverId: string; apiKey: string };

export default function DriverMap({ driverId, apiKey }: Props) {
  const { isLoaded } = useLoadScript({ googleMapsApiKey: apiKey });
  const { position, path } = useDriverLocation(driverId);
  const mapRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || path.length === 0) return;

    if (path.length === 1) {
      mapRef.current.setCenter(path[0]);
      mapRef.current.setZoom(15);
    } else {
      const bounds = new google.maps.LatLngBounds();
      path.forEach((p) => bounds.extend(p));
      mapRef.current.fitBounds(bounds);
    }
  }, [path]);

  const polyOptions = useMemo(
    () => ({ strokeOpacity: 0.9, strokeWeight: 4 }),
    []
  );

  if (!isLoaded) return <div className="mapLoading">Loading map…</div>;

  if (!position) {
    return (
      <div className="mapWrap">
        <div className="mapCard mapPlaceholder">Waiting for live location…</div>
      </div>
    );
  }

  return (
    <div className="mapWrap">
      <div className="mapCard">
        <GoogleMap
          onLoad={(m) => {
            mapRef.current = m;
          }}
          mapContainerClassName="mapContainer"
          center={position}
          zoom={15}
          options={{
            disableDefaultUI: true,
            zoomControl: true,
            fullscreenControl: false,
            mapTypeControl: false,
            streetViewControl: false,
            clickableIcons: false,
          }}
        >
          {path.length > 1 && <Polyline path={path} options={polyOptions} />}
          <Marker position={position} label={driverId} />
        </GoogleMap>
      </div>
    </div>
  );
}
