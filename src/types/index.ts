export interface Aircraft {
  ident: string
  type: string
  economySeats: number
  base: string
}

export interface Flight {
  ident: string
  readable_departure: string
  readable_arrival: string
  departuretime: number
  arrivaltime: number
  origin: string
  destination: string
}

export interface Rotation {
  [aircraftId: string]: string[]
}
