import { ShortUser } from "./user";

export interface CalendarItem {
    uid?: string;
    scheduleDate: string;
    startDate: string;
    endDate: string;
    status: StatusList;
    notes?: string;
    reservation?: ReservationItem;
    service?: ServiceItem;
    requestBy: ShortUser;
    userUID: string;
}

export interface ReservationItem {
    spaceUID: string;
    unitNumber?: string | number;
    floor?: string;
    photo?: string;
    guests: number;
}

export interface ServiceItem {
    serviceUID: string;
    name: string;
    maintenance: boolean;
    photo: string;
    estimatedTime: number;
    cost: string | number;
    spaceUID: string;
    unitNumber?: string | number;
    floor?: string;
}

export interface reservationSlot {
    uid?: string;
    spaceUID: string;
    scheduleDate: string;
    startDate: string;
    endDate: string;
    unitNumber?: string | number;
    floor?: string;
}

export const StatusArray = [
    'Solicitado',
    'Aprovado',
    'En Progreso',
    'Cancelado',
    'Terminado'
] as const;
export type StatusList = typeof StatusArray[number];