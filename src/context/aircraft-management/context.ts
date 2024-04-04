import { createContext } from "react";
import { Aircraft, Flight, Rotation } from "../../types";

interface Context {
  aircraft: Aircraft[];
  flights: Flight[];
  rotation: Rotation;
  activeAircraft?: (Aircraft & { rotation: Flight[] }) | null;
  setActiveAircraftId: (id: string) => void;
  addFlight: (flightId: string) => void;
  removeFlights: (flightId: string[]) => void;
  canAddFlight: (flight: Flight) => boolean;
}

export const AircraftManagement = createContext<Context>({
  aircraft: [],
  flights: [],
  rotation: {},
  setActiveAircraftId: () => {},
  addFlight: () => {},
  removeFlights: () => {},
  canAddFlight: () => true,
});
