import Papa from 'papaparse'

export const paparseCsv = <T = Record<string, string>>(
    buffer: Buffer
): Promise<T[]> => {
    return new Promise((resolve, reject) => {
        const csvString = buffer.toString("utf-8")

        Papa.parse<T>(csvString, {
            header: true,
            skipEmptyLines: true,
            transformHeader: (header) => header.trim(),
            complete: (results) => {
                if (results.errors.length) {
                    return reject(results.errors)
                }
                resolve(results.data)
            },

            error: (error: any)=> reject(error)
        })
    })
}