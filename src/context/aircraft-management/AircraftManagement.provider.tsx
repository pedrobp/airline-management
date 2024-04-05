import { PropsWithChildren, useCallback, useMemo, useState } from 'react'
import { AircraftManagement } from '..'
import { last } from 'lodash'
import { Aircraft, Flight, Rotation } from '../../types'

interface ProviderProps {
  aircraft: Aircraft[]
  flights: Flight[]
}

// Constants
export const TURNAROUND_TIME = 20 * 60
export const DAY_IN_SECONDS = 24 * 60 * 60

function AircraftManagementProvider({ flights, aircraft, children }: PropsWithChildren<ProviderProps>) {
  const [rotation, setRotation] = useState<Rotation>({})
  const [activeAircraftId, setActiveAircraftId] = useState(aircraft.length ? aircraft[0].ident : null)

  // Gets the current available aircraft, based on the activeAircraftId state
  const activeAircraft = useMemo(() => {
    const activeAircraft = aircraft.find((a) => a.ident === activeAircraftId)
    if (!activeAircraftId || !activeAircraft) return null
    const activeFlightIds = rotation[activeAircraftId] || []

    return {
      ...activeAircraft,
      // For convenience, adds the aircraft's rotation to the variable
      rotation: activeFlightIds.map((id) => flights.find((f) => f.ident === id)!),
    }
  }, [activeAircraftId, aircraft, flights, rotation])

  // Determines if a flight can be added to the current rotation
  const canAddFlight = useCallback(
    (flight: Flight) => {
      // Gets all scheduled flights from other aircraft, so there's no conflict
      const alreadyBooked = Object.values(rotation).flat()

      // Gets last flight from the current aircraft's rotation, to check constraints
      const lastFlight = activeAircraft?.rotation && last(activeAircraft.rotation)

      // If the target flight is already booked, it can't be added
      if (alreadyBooked.includes(flight.ident)) return false
      // If it's the aircraft's first flight, it can be added because there's no airport/time constraints so far
      if (!lastFlight) return true

      // Check if the target flight can be added, comparing departure time and airport with the previous flight
      return lastFlight.arrivaltime + TURNAROUND_TIME < flight.departuretime && lastFlight.destination === flight.origin
    },
    [activeAircraft?.rotation, rotation],
  )

  // Adds a flight to the current rotation
  const addFlight = useCallback(
    (flightId: string) => {
      if (!activeAircraft) return

      const currentRotation = rotation[activeAircraft.ident]
      if (!currentRotation?.includes(flightId)) {
        setRotation((prev) => ({
          ...prev,
          [activeAircraft.ident]: [...(currentRotation || []), flightId],
        }))
      }
    },
    [activeAircraft, rotation],
  )

  // Remove one or more flights from the current rotation
  const removeFlights = useCallback(
    (flightIds: string[]) => {
      if (!activeAircraft) return

      const currentRotation = rotation[activeAircraft.ident]
      if (currentRotation) {
        setRotation((prev) => ({
          ...prev,
          [activeAircraft.ident]: currentRotation.filter((r) => !flightIds.includes(r)),
        }))
      }
    },
    [activeAircraft, rotation],
  )

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
  )
}

export default AircraftManagementProvider
