
import countries from 'world-atlas/countries-50m.json'
import { feature } from 'topojson-client'
import { geoNaturalEarth1, geoPath } from 'd3-geo'

// World map projection
const projection = geoNaturalEarth1()
  .fitSize([1200, 510], { type: 'Sphere' })

const pathGenerator = geoPath(projection)

// Accurate geographic country boundaries
const geoCountries = feature(
  countries,
  countries.objects.countries
).features

export const worldPaths = geoCountries
  .map(country => pathGenerator(country))
  .filter(Boolean)

// Convert longitude / latitude to precise SVG coordinates
export function projectCoords(longitude, latitude) {
  const point = projection([longitude, latitude])

  if (!point) return { x: 0, y: 0 }

  return {
    x: Math.round(point[0]),
    y: Math.round(point[1])
  }
}
