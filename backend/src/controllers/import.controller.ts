import type { Request, Response } from "express";
import { success } from "zod";
import { paparseCsv } from "../services/csv.service";
import { validateRows } from "../services/validation.service";
import { processRows } from "../services/mapping.service";

export const importCSV = async (req: Request, res: Response): Promise<void> => {
    try {

        if (!req.file) {
            res.status(400).json({
                success: false,
                message: "CSV file is required"
            })
            return
        }

        const rows = await paparseCsv(req.file.buffer)

        const { validRows, invalidRows } = validateRows(rows)

        const crmRecords = await processRows(validRows)

        res.status(200).json({
            success: true,
            message: "CSV imported successfully",

            stats: {
                totalRows: rows.length,
                validRows: validRows.length,
                invalidRows: invalidRows.length,
                importedRows: crmRecords.length,
            },

            data: crmRecords,
        });
    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: "Failed to parse CSV"
        })
    }
}


