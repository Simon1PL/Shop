import { Product, productType } from './product';

export interface Bike extends Product {
    type: bikeType;
    frameSize: frameSize[];
    wheelDiameter: number;
}

export enum bikeType {
    Mountain = 'GÓRSKI',
    Tour = 'TREKKINGOWY',
    City = 'MIEJSKI',
    Road = 'SZOSOWY',
    Ebike = 'ELEKTRYCZNY'
}

export enum frameSize {
    XS = 'XS',
    S = 'S',
    M = 'M',
    L = 'L',
    XL = 'XL',
    XXL = 'XXL'
}
