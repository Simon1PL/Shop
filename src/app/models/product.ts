export interface Product {
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
