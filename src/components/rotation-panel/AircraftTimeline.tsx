import { DAY_IN_SECONDS } from "../../context";
import { useAircraftManagement } from "../../hooks/useAircraftManagement";

function AircraftTimeline() {
  const { activeAircraft } = useAircraftManagement();

  return (
    <div className="flex flex-col gap-2 pt-8">
      <div className="w-full relative bg-background rounded-md h-8 text-secondary text-xs">
        <span className="absolute left-0 -top-4 ">00:00</span>
        <span className="absolute left-1/2 -translate-x-1/2 -top-4">12:00</span>
        <span className="absolute right-0 -top-4 ">00:00</span>

        {activeAircraft?.rotation.map((f) => {
          const widthPercentage =
            ((f.arrivaltime - f.departuretime) / DAY_IN_SECONDS) * 100;
          const leftPercentage = (f.departuretime / DAY_IN_SECONDS) * 100;
          return (
            <div
              key={f.ident}
              className="absolute bg-green-500 rounded-l top-0 bottom-0 transition-all"
              style={{
                width: `${widthPercentage}%`,
                left: `${leftPercentage}%`,
              }}
            >
              <div
                key={f.ident}
                className="absolute bg-purple-500 rounded-r-md -right-0.5 top-0 bottom-0 transition-all"
                style={{
                  width: 4,
                }}
              />
            </div>
          );
        })}
      </div>

      <div className="flex gap-6 items-center justify-center">
        <span className="flex items-center gap-2 text-secondary text-xs">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          Scheduled service
        </span>
        <span className="flex items-center gap-2 text-secondary text-xs">
          <div className="w-2 h-2 bg-purple-500 rounded-full" />
          Turnaround Time
        </span>
        <span className="flex items-center gap-2 text-secondary text-xs">
          <div className="w-2 h-2 bg-background rounded-full" />
          Idle Time
        </span>
      </div>
    </div>
  );
}

export default AircraftTimeline;
