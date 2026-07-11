export function exportJson(data: unknown[], filename = "crm-records.json") {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json"
    })

    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")

    a.href = url
    a.download = filename

    a.click()

    URL.revokeObjectURL(url)
}