import { ShortUser } from "./user";

export interface Notice {
    uid?: string;
    title: string;
    type: NoticeType;
    description: string;
    photo?: string;
    writer: ShortUser;
    comments: Comments[];
    likes?: string[];
}

export interface NoticeType {
    icon: string;
    name: string;
}

export interface Comments {
    uid?: string;
    text: string;
    photo?: string;
    user: ShortUser;
}