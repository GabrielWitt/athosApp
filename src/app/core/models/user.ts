export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL?: string;
    emailVerified: boolean;
 }

export interface userFormData {
    uid?: string;
    CI?: number;
    photo?: string;
    email:string;
    phonePersonal?: number;
    phoneHome?: number;
    phoneWork?: number;
    name?: string;
    secondName?: string;
    lastName?: string;
    secondLastName?: string;
    birthDate?: Date;
    type?: string;
    createdAt?: string;
    token?: string;
}

export interface ShortUser {
    uid?: string;
    photo?: string;
    email:string;
    name: string;
}