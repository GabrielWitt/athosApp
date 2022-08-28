import { HistoryRecord } from "./calendar";
import { ShortUser } from "./user";

export interface Receipt {
    uid?: string;
    receiptDate: string;
    ruc: '1791430751001';
    receiptNumber: number;
    userUID: string;
    userName: string;
    userCI: string;
    address: string;
    itemDetail: ItemDetail[];
    total: number;
    userSignature: string;
    payerName?: string,
    status: ReceiptStatusList;
    createdBy: ShortUser;
    history?: HistoryRecord[];
}

export interface ItemDetail {
    itemDescription: string;
    numberItems: string;
    unitValue: string;
    totalValue: string;
}

export const ReceiptStatusArray = [
   'Pendiente',
   'Pagado',
] as const;
export type ReceiptStatusList = typeof ReceiptStatusArray[number];
