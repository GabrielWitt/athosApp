import { ShortUser } from "./user";

export interface CalendarItem {
    uid?: string;
    scheduleDate: string;
    startDate: string;
    endDate: string;
    completedDate?: string;
    status: StatusList;
    notes?: NoteService[];
    reservation?: ReservationItem;
    service?: ServiceItem;
    requestBy: ShortUser;
    userUID: string;
    createdAt?: string;
    updatedAt?: string;
    employeeUID?:string;
    employeePhoto?:string;
    employeeFullName?:string;
    history?: HistoryRecord[];
}

export interface NoteService {
    text: string;
    photo?: string;
}

export interface HistoryRecord {
    updateAt: string;
    updateByUID: string;
    updateByName: string;
    status: string;
}

export interface ReservationItem {
    spaceUID: string;
    unitNumber?: string | number;
    floor?: string;
    photo?: string;
    guests: number;
    price: number | string;
}

export interface ServiceItem {
    serviceUID: string;
    name: string;
    maintenance: boolean;
    photo: string;
    preferredDays: boolean[];
    estimatedTime: number;
    cost: string | number;
    spaceUID: string;
    notes: string;
    comments: serviceComment[];
    unitNumber?: string | number;
    floor?: string;
}

export interface reservationSlot {
    uid?: string;
    scheduleDate: string;
    startDate: string;
    endDate: string;
    unitNumber?: string | number;
    floor?: string;
    spaceUID?:string;
}

export interface serviceSlot {
    uid?: string;
    scheduleDate: string;
    startDate: string;
    endDate: string;
    unitNumber?: string | number;
    employeeUID?:string;
    employeePhoto?:string;
    employeeFullName?:string;
}

export interface serviceComment{
    note: string;
    photo?:string;
}

export const StatusArray = [
    'Solicitado',
    'Aprobado',
    'Agendado',
    'En Progreso',
    'Cancelado',
    'Terminado'
] as const;
export type StatusList = typeof StatusArray[number];