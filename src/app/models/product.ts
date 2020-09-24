export interface Product {
    id: string;
    model: string;
    inStock: number;
    priceInPln: number;
    photoUrl: string;
    additionalSpecification: [string, string][];
    instanceOf: productType;
}

export enum productType {
    Bike,
    Scooter
}
