export interface ValidationResult<T> {
    validRows: T[];
    invalidRows: T[];
}

export function validateRows< T extends Record<string, any>> (
    rows: T[]
): ValidationResult<T>{
    const validRows: T[] = [];
    const invalidRows: T[] = [];

    for (const row of rows){
        const cleaned: Record<string,any> = {}

        Object.entries(row).forEach(([key,value]) => {
            const cleanedKey = key.trim().toLowerCase();
            cleaned[cleanedKey] = typeof value === "string" ? value.trim() : value
        })

        const hasValue = Object.values(cleaned).some(
            (value) => value !== ""
        )

        if(!hasValue){
            invalidRows.push(cleaned as T)
            continue
        }

        validRows.push(cleaned as T)
    }

    return {
        validRows,
        invalidRows
    }
}
