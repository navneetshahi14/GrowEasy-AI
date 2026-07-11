export function createBatches<T>(
    rows: T[],
    batchSize = 20
): T[][]{
    const batches: T[][] = []

    for (let i = 0; i < rows.length; i+= batchSize){
        batches.push(rows.slice(i,i+batchSize));
    }

    return batches
}