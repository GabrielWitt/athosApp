import { Lease } from "./spaces";

export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL?: string;
    emailVerified: boolean;
 }

export interface UserFormData {
    uid?: string;
    CI?: string;
    photo?: string;
    email:string;
    verified?: boolean;
    phonePersonal?: number | string;
    phoneHome?: number | string;
    phoneWork?: number | string;
    name?: string;
    secondName?: string;
    lastName?: string;
    secondLastName?: string;
    birthDate?: string;
    type?: string;
    createdAt?: string;
    token?: string;
    leases?: Lease[];
    company?: Company[];
}

export interface Company {
    shortName: string;
    companyName: string;
    companyRuc?: string;
}

export interface ShortUser {
    uid?: string;
    photo?: string;
    email:string;
    name: string;
}