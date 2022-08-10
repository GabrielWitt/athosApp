export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL?: string;
    emailVerified: boolean;
 }

export interface userFormData {
    uid?: string;
    photo?: string;
    email:string;
    name: string;
    lastName: string;
    birthDate: Date;
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