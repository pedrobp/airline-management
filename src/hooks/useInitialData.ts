import { useEffect, useState } from 'react'
import { Aircraft, Flight } from '../types'

const API_URL = 'https://recruiting-assessment.alphasights.com/api'

// Hook responsible for fetching the data from the flights/aircraft endpoints
const useInitialData = () => {
  const [aircraft, setAircraft] = useState<Aircraft[]>([])
  const [flights, setFlights] = useState<Flight[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)

    const fetchData = async () => {
      let error = false
      await fetch(`${API_URL}/aircrafts`)
        .then((r) => r.json())
        .then((data) => setAircraft(data))
        .catch(() => {
          error = true
        })

      await fetch(`${API_URL}/flights`)
        .then((r) => r.json())
        .then((data) => setFlights(data))
        .catch(() => {
          error = true
        })

      if (error) alert('Error fetching list of aircraft/flights. Please refresh the page.')
      setIsLoading(false)
    }

    fetchData()
  }, [])

  return { aircraft, flights, isLoading }
}

export default useInitialData
