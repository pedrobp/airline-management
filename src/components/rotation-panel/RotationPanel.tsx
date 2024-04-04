import { AnimatePresence, motion } from "framer-motion";
import { Card, FlightCardContent, StackContainer } from "..";
import { useAircraftManagement } from "../../hooks/useAircraftManagement";
import AircraftTimeline from "./AircraftTimeline";
import { useCallback, useMemo, useState } from "react";
import { Flight } from "../../types";
import RemoveModal from "./RemoveModal";

const INITIAL_ANIMATION = { opacity: 0, y: -25 };

function RotationPanel() {
  const { activeAircraft, removeFlights } = useAircraftManagement();

  const [flightToRemove, setFlightToRemove] = useState<Flight | null>(null);

  const subsequentialFlights = useMemo(() => {
    if (!activeAircraft) return [];

    const removedFlightIndex = activeAircraft.rotation.findIndex(
      (f) => flightToRemove?.ident === f.ident
    );
    return activeAircraft.rotation.slice(
      removedFlightIndex + 1,
      activeAircraft.rotation.length
    );
  }, [activeAircraft, flightToRemove?.ident]);

  const handleConfirm = useCallback(() => {
    if (!flightToRemove) return;

    removeFlights([
      flightToRemove.ident,
      ...subsequentialFlights.map((f) => f.ident),
    ]);
    setFlightToRemove(null);
  }, [flightToRemove, removeFlights, subsequentialFlights]);

  return (
    <div className="grid-column">
      <StackContainer title="Rotation" subtitle={activeAircraft?.ident}>
        <AnimatePresence>
          {activeAircraft?.rotation.length ? (
            activeAircraft.rotation.map((f) => (
              <motion.div
                key={f.ident}
                initial={INITIAL_ANIMATION}
                animate={{ opacity: 1, y: 0 }}
                exit={INITIAL_ANIMATION}
                transition={{ duration: 0.2 }}
              >
                <Card
                  title="Flight"
                  subtitle={f.ident}
                  onClick={() => setFlightToRemove(f)}
                >
                  <FlightCardContent flight={f} />
                </Card>
              </motion.div>
            ))
          ) : (
            <span className="text-center grid place-content-center h-full">
              No active flights were assigned for this aircraft yet.
              <span className="text-sm text-secondary">
                Click on a flight to add it to this rotation →
              </span>
            </span>
          )}
        </AnimatePresence>
      </StackContainer>

      <AircraftTimeline />

      <RemoveModal
        flightToRemove={flightToRemove}
        subsequentialFlights={subsequentialFlights}
        onClose={() => setFlightToRemove(null)}
        onConfirm={handleConfirm}
      />
    </div>
  );
}

export default RotationPanel;
