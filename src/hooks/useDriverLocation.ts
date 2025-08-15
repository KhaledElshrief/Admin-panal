import { useEffect, useState } from "react";
import { getSocket } from "../api/socket";

type DriverUpdate = {
  driverId: string;
  latitude: number;
  longitude: number;
  timestamp?: number;
};

export function useDriverLocation(driverId: string) {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [path, setPath] = useState<Array<{ lat: number; lng: number }>>([]);

  useEffect(() => {
    if (!driverId) return;
    const socket = getSocket();

    socket.emit("user:subscribeDriver", { driverId });

    const event = `driver:locationUpdate:${driverId}`;
    const handler = (msg: DriverUpdate) => {
      const next = { lat: msg.latitude, lng: msg.longitude };
      setPosition(next);
      setPath((p) =>
        p.length &&
        p[p.length - 1].lat === next.lat &&
        p[p.length - 1].lng === next.lng
          ? p
          : [...p, next]
      );
    };

    socket.on(event, handler);

    return () => {
      socket.emit("user:unsubscribeDriver", { driverId });
      socket.off(event, handler);
    };
  }, [driverId]);

  return { position, path };
}
