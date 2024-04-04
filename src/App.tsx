import { addDays, format } from 'date-fns';
import {
  AircraftPanel,
  FlightsPanel,
  RotationPanel,
  Spinner,
} from './components';
import { AircraftManagementProvider } from './context';
import useInitialData from './hooks/useInitialData';
import { useMemo } from 'react';

function App() {
  const { flights, aircraft, isLoading } = useInitialData();

  const tomorrow = useMemo(
    () => format(addDays(new Date(), 1), 'do MMMM yyyy'),
    []
  );

  return (
    <div className="flex flex-col justify-center items-center pt-4">
      {isLoading ? (
        <Spinner />
      ) : (
        <AircraftManagementProvider aircraft={aircraft} flights={flights}>
          <h3 className="self-center">{tomorrow}</h3>

          <div className="main-grid">
            <AircraftPanel />

            <RotationPanel />

            <FlightsPanel />
          </div>
        </AircraftManagementProvider>
      )}
    </div>
  );
}

export default App;
