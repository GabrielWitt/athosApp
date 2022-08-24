import { ShortUser } from "./user";

export interface Community {
    uid?: string
    name: string;
    address: string;
    country: string;
    state?: string;
    city: string;
    zipCode?: string;
    photo?: string;
    areas?: Area[]
    createdAt?: string;
    propertyType?: string;
}

export interface Area {
    name: string,
    description: string
}

export interface Space {
    uid?: string
    unitNumber: number | string;
    communityUID: string;
    description?: string;
    bathrooms?: number;
    rooms?: number;
    floor?: string;
    squareMeters?: number;
    spaceType?: 'privado'|'comunal';
    type: SpaceTypeList;
    rent?: boolean;
    rentData?: RentSpace;
    photo?: string;
    createdAt?: string;
}

export interface RentSpace {
    weekdays: boolean[];
    starTime: string;
    endTime: string;
    cost: string | number;
    minTime: number;
    maxTime: number;
    capacity?: number;
}

export interface ShortSpace {
    uid: string
    unitNumber: number | string;
    communityUID: string;
    description?: string;
    floor?: string;
    type: SpaceTypeList
    photo?: string;
}

export interface Lease {
    spaceLease: ShortSpace;
    userLease: ShortUser;
    leaseStart: string;
    leaseEnd: string;
    monthlyCost: number;
}

export const SpaceTypeArray = [
    'oficina', 
    'vivienda', 
    'parqueo', 
    'recepción', 
    'bodega', 
    'salón', 
    'tienda', 
    'terraza'
] as const;
export type SpaceTypeList = typeof SpaceTypeArray[number];