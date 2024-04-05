import { Tooltip } from 'react-tooltip'
import { Card } from '..'
import { TURNAROUND_TIME, DAY_IN_SECONDS } from '../../context'
import { useAircraftManagement } from '../../hooks/useAircraftManagement'
import { CircleHelp } from 'lucide-react'

function AircraftPanel() {
  const { aircraft, setActiveAircraftId, activeAircraft, rotation, flights } = useAircraftManagement()

  return (
    <div className="grid-column">
      <div className="grid-column-title">
        <h1>Aircraft</h1>
        <CircleHelp className="text-secondary tt-aircraft" size={16} />
      </div>

      <div className="scrollable-container">
        {aircraft.map((a) => {
          // Gets the rotation for the current iteration aircraft
          const aircraftRotation = (rotation[a.ident] || []).map((id) => flights.find((f) => f.ident === id)!)

          let flightTime = 0

          // For each rotation flight, calculates how many seconds it takes and adds to the flightTime variable
          aircraftRotation.forEach((f) => (flightTime += f.arrivaltime - f.departuretime + TURNAROUND_TIME))

          // Calculates the percentage of the day that the aircraft is busy
          const percentage = (flightTime / DAY_IN_SECONDS) * 100

          return (
            <Card
              key={a.ident}
              title={a.ident}
              subtitle={a.type === 'A320' ? <img width={74} height={20} src="./a320.png" /> : a.type}
              onClick={() => setActiveAircraftId(a.ident)}
              selected={activeAircraft?.ident === a.ident}
            >
              <div className="w-full relative bg-background rounded-md h-8">
                <div
                  className="absolute bg-accent rounded-l-md left-0 top-0 bottom-0 transition-all"
                  style={{ width: `${percentage}%` }}
                />
                <h3 className="text-white absolute left-2 top-1/2 -translate-y-1/2">{Math.round(percentage)}%</h3>
              </div>
            </Card>
          )
        })}
      </div>

      <Tooltip anchorSelect=".tt-aircraft" place="top">
        Available aircraft are displayed below.
        <br />
        Click on an aircraft to see or change it's rotation.
      </Tooltip>
    </div>
  )
}

export default AircraftPanel
