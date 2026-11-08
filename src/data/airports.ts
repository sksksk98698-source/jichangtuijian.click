import airportsData from "./airports.json"

export interface AirportSpeedRecord {
  region: string
  latency: string
  speed: string
}

export interface AirportBrand {
  rank: number
  slug: string
  name: string
  fullName: string
  tagline: string
  affLink: string
  promoCode: string
  startingPrice: string
  lines: string[]
  protocols: string[]
  clients: string[]
  regions: string[]
  unlock: string[]
  hasSpeedtest: boolean
  speedtestImg: string | null
  unlockImgs: string[]
  speedRecords: AirportSpeedRecord[]
  pros: string[]
  cons: string[]
  isTop10: boolean
  isFeatured: boolean
  bestFor: string
  reviewDate: string
  dataConfidence: string
}

export const airports: AirportBrand[] = airportsData as AirportBrand[]

export function getAllAirports(): AirportBrand[] {
  return airports
}

export function getTop10Airports(): AirportBrand[] {
  return airports.filter((a) => a.isTop10)
}

export function getFeaturedAirport(): AirportBrand {
  return airports.find((a) => a.isFeatured) || airports[0]
}

export function getAirportBySlug(slug: string): AirportBrand | undefined {
  return airports.find((a) => a.slug === slug)
}

export function getSpeedtestedAirports(): AirportBrand[] {
  return airports.filter((a) => a.hasSpeedtest)
}
