export function exportCsv(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>[],
  filename = "crm-records.csv"
) {
  if (!data.length) return;

  const headers = Object.keys(data[0]);

  const csv = [
    headers.join(","),

    ...data.map((row) =>
      headers
        .map((header) => {
          const value = row[header] ?? "";

          return `"${String(value).replace(/"/g, '""')}"`;
        })
        .join(",")
    ),
  ].join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = filename;

  link.click();

  URL.revokeObjectURL(url);
}