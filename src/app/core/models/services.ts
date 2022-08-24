export interface Service {
    uid?: string;
    communityUID: string;
    name: string;
    serviceType: ServiceTypeList;
    maintenance: boolean;
    description: string;
    photo: string;
    terms: string;
    estimatedTime: number;
    cost: string | number;
    weekdays: boolean[];
    available: boolean;
    createdAt?: string;
}
export interface ShortService {
    uid: string
    name: string;
    communityUID: string;
    description?: string;
    serviceType: ServiceTypeList;
    photo?: string;
    cost?: number;
}

export const ServiceTypeArray = [
   'Eléctrico',
   'Plomeria',
   'Muebles/Construcción',
   'Limpieza/Jardinería'
] as const;
export type ServiceTypeList = typeof ServiceTypeArray[number];