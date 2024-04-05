import { PlaneTakeoff, MoveRight, PlaneLanding } from 'lucide-react';
import { Flight } from '../../types';

interface Props {
  flight: Flight;
}

function FlightCardContent({ flight }: Props) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-6">
        <PlaneTakeoff strokeWidth={1.5} size={30} className="text-secondary self-center" />

        <div className="flex flex-col">
          <h2>{flight.origin}</h2>
          <span className="text-lg leading-5">{flight.readable_departure}</span>
        </div>
      </div>

      <div className="flex-1 grid place-content-center text-primary">
        <MoveRight strokeWidth={0.5} size={55} />
      </div>

      <div className="flex gap-6">
        <div className="flex flex-col text-right">
          <h2>{flight.destination}</h2>
          <span className="text-lg leading-5">{flight.readable_arrival}</span>
        </div>

        <PlaneLanding strokeWidth={1.5} size={30} className="text-secondary self-center" />
      </div>
    </div>
  );
}
export default FlightCardContent;
