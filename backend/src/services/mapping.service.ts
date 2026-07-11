import { extractCRMData } from "./ai.service.js";
import { createBatches } from "./batch.service.js";

export async function processRows<T>(rows: T[],batchSize = 20) {
    const batches = createBatches(rows, batchSize)

    const results: unknown[] = []

    for (let i = 0;i<batches.length; i++) {
        try {
            console.log(
                `Processing batch ${i + 1}/${batches.length}`
            )

            const batch = batches[i]
            if (!batch) {
                console.warn(`Skipping empty batch at index ${i}`)
                continue
            }

            const parsed = await extractCRMData(batch as unknown[])

            if (Array.isArray(parsed)) {
                results.push(...parsed)
            }
        } catch (err) {
            console.error("Batch Failed:", err)
            continue
        }
    }

    return results
}