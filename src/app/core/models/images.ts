export interface attachmentOptions {
    currentRoute: string;
    pdf?: boolean;
    height?: number, 
    width?: number, 
    data?: any
    limit?: number
}

export interface UserPhoto {
    file?: File;
    webPath: string;
    route?: string;
    data?: any
    deploy?: boolean
    pdf?: any
    type?: string;
}