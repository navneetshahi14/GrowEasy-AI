import { crmRecord } from "./crm";

export interface ImportResponse {
    success: boolean;
    message: string;

    stats: {
        totalRows: number;
        validRows: number;
        invalidRows: number;
        importedRows: number
    };

    data: crmRecord[];
}