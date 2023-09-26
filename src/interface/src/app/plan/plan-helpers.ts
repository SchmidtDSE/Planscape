import area from '@turf/area';
import { FeatureCollection } from 'geojson';

export const NOTE_SAVE_INTERVAL = 5000;

const SQUARE_METERS_PER_ACRE = 0.0002471054;

export function calculateAcres(planningArea: GeoJSON.GeoJSON) {
  const squareMeters = area(planningArea as FeatureCollection);
  const acres = squareMeters * SQUARE_METERS_PER_ACRE;
  return Math.round(acres);
}
