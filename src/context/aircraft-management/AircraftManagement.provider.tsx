import { PropsWithChildren, useCallback, useMemo, useState } from "react";
import { AircraftManagement } from "..";
import { last } from "lodash";
import { Aircraft, Flight, Rotation } from "../../types";

interface ProviderProps {
  aircraft: Aircraft[];
  flights: Flight[];
}

export const TURNAROUND_TIME = 20 * 60;
export const DAY_IN_SECONDS = 24 * 60 * 60;

function AircraftManagementProvider({
  flights,
  aircraft,
  children,
}: PropsWithChildren<ProviderProps>) {
  const [rotation, setRotation] = useState<Rotation>({});
  const [activeAircraftId, setActiveAircraftId] = useState(
    aircraft.length ? aircraft[0].ident : null
  );

  const activeAircraft = useMemo(() => {
    const activeAircraft = aircraft.find((a) => a.ident === activeAircraftId);
    if (!activeAircraftId || !activeAircraft) return null;
    const activeFlightIds = rotation[activeAircraftId] || [];

    return {
      ...activeAircraft,
      rotation: activeFlightIds.map(
        (id) => flights.find((f) => f.ident === id)!
      ),
    };
  }, [activeAircraftId, aircraft, flights, rotation]);

  const canAddFlight = useCallback(
    (flight: Flight) => {
      const alreadyBooked = Object.values(rotation).flat();
      const lastFlight =
        activeAircraft?.rotation && last(activeAircraft.rotation);

      if (alreadyBooked.includes(flight.ident)) return false;
      if (!lastFlight) return true;

      return (
        lastFlight.arrivaltime + TURNAROUND_TIME < flight.departuretime &&
        lastFlight.destination === flight.origin
      );
    },
    [activeAircraft?.rotation, rotation]
  );

  const addFlight = useCallback(
    (flightId: string) => {
      if (!activeAircraft) return;

      const currentRotation = rotation[activeAircraft.ident];
      if (!currentRotation?.includes(flightId)) {
        setRotation((prev) => ({
          ...prev,
          [activeAircraft.ident]: [...(currentRotation || []), flightId],
        }));
      }
    },
    [activeAircraft, rotation]
  );

  const removeFlights = useCallback(
    (flightIds: string[]) => {
      if (!activeAircraft) return;

      const currentRotation = rotation[activeAircraft.ident];
      if (currentRotation) {
        setRotation((prev) => ({
          ...prev,
          [activeAircraft.ident]: currentRotation.filter(
            (r) => !flightIds.includes(r)
          ),
        }));
      }
    },
    [activeAircraft, rotation]
  );

  return (
    <AircraftManagement.Provider
      value={{
        flights,
        aircraft,
        rotation,
        activeAircraft,
        setActiveAircraftId,
        addFlight,
        removeFlights,
        canAddFlight,
      }}
    >
      {children}
    </AircraftManagement.Provider>
  );
}

export default AircraftManagementProvider;
