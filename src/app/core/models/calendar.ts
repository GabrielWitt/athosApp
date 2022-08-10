import { ShortUser } from "./user";

export interface CalendarItem {
    uid?: string;
    scheduleDate: string;
    startDate: string;
    endDate: string;
    status: 'Solicitado'|'Aprovado'|'Cancelado'|'Terminado'
    notes?: string;
    reservation?: ReservationItem;
    service?: ServiceItem;
    requestBy: ShortUser;
}

export interface ReservationItem {
    spaceUID: string;
    unitNumber?: string | number;
    floor?: string;
    photo?: string;
    guests: number;
}

export interface reservationSlot {
    uid?: string;
    spaceUID: string;
    reservationUID: string;
    scheduleDate: string;
    startDate: string;
    endDate: string;
    unitNumber?: string | number;
    floor?: string;
}

export interface ServiceItem {
    serviceUID: string;
    type?: 'maintenance'|'service';
    spaceUID: string
}