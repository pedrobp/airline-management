import { useContext } from 'react'
import { AircraftManagement } from '../context'

// Hook that gets all the data from the AircraftManagement context
export const useAircraftManagement = () => useContext(AircraftManagement)
