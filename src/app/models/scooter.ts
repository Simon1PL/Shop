import { Product, productType } from './product';

export interface Scooter extends Product {
    maxDistanceKm: number;
    weightKg: number;
}
