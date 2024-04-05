import { CircleHelp } from 'lucide-react';
import { Card, FlightCardContent } from '..';
import { useAircraftManagement } from '../../hooks/useAircraftManagement';
import { useMemo } from 'react';
import { Tooltip } from 'react-tooltip';

function FlightsPanel() {
  const { flights, addFlight, canAddFlight } = useAircraftManagement();

  const sortedFlights = useMemo(
    () =>
      flights.sort((a, b) => {
        const availableA = canAddFlight(a) ? 0 : 1;
        const availableB = canAddFlight(b) ? 0 : 1;

        if (availableA !== availableB) {
          // Prioritize availability
          return availableA - availableB;
        } else {
          // If both flights are either available or unavailable, sort by departure time
          return a.departuretime - b.departuretime;
        }
      }),
    [canAddFlight, flights],
  );

  return (
    <div className="grid-column">
      <div className="grid-column-title">
        <h1>Flights</h1>
        <CircleHelp className="text-secondary tt-flights" size={16} />
      </div>

      <div className="scrollable-container">
        {sortedFlights.map((f) => (
          <Card key={f.ident} title={f.ident} onClick={() => addFlight(f.ident)} disabled={!canAddFlight(f)}>
            <FlightCardContent flight={f} />
          </Card>
        ))}
      </div>

      <Tooltip anchorSelect=".tt-flights" place="top">
        Flights are displayed below, sorted by:
        <br />
        1. Availability <br />
        2. Departure Time <br />
        Click on a flight to add it to the current rotation. <br />
        Unavailable flights (due to time, airport or aircraft constraints) are disabled.
      </Tooltip>
    </div>
  );
}

export default FlightsPanel;
