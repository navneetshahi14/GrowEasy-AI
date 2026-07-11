"use client";

import { toast } from "sonner";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FileText, UploadCloud } from "lucide-react";

import { Button } from "@/components/ui/button";

import PreviewTable from "../table/PreviewTable";
import ResultTable from "../table/ResultTable";

import { parseCsv } from "@/utils/parseCSV";
import { importCsv } from "@/services/import.service";

import { CsvRow } from "@/types/csv";
import { ImportResponse } from "@/types/importResponse";
import StatsCard from "../cards/StatsCard";
import ImportProgress from "../progress/ImportProgress";

export default function Dropzone() {
  const [file, setFile] = useState<File | null>(null);

  const [rows, setRows] = useState<CsvRow[]>([]);

  const [loading, setLoading] = useState(false);

  const [importing, setImporting] = useState(false);

  const [result, setResult] = useState<ImportResponse | null>(null);

  const [progress, setProgress] = useState(0);

  const [stage, setStage] = useState("");

  const [showProgress, setShowProgress] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (!acceptedFiles.length) return;

    setFile(acceptedFiles[0]);
    setRows([]);
    setResult(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    accept: {
      "text/csv": [".csv"],
    },
    onDrop,
  });

  const handlePreview = async () => {
    if (!file) return;

    try {
      setLoading(true);

      const parsed = await parseCsv(file);

      setRows(parsed);
      toast.success("CSV parsed successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to parse CSV");
    } finally {
      setLoading(false);
    }
  };

  const handleImport = async () => {
    if (!file) return;

    try {
      setImporting(true);

      setShowProgress(true);

      setProgress(10);
      setStage("Uploading CSV...");

      await new Promise((r) => setTimeout(r, 400));

      setProgress(40);
      setStage("Parsing CSV...");

      await new Promise((r) => setTimeout(r, 400));

      setProgress(70);
      setStage("AI Processing...");

      const response = await importCsv(file);

      setResult(response);

      setProgress(100);
      setStage("Completed");

      toast.success("CSV imported successfully!", {
        description: `${response.stats.importedRows} records imported`,
      });

      setTimeout(() => {
        setShowProgress(false);
      }, 800);
    } catch (err) {
      console.error(err);

      toast.error("Import failed!", {
        description: "Something went wrong while processing the CSV.",
      });

      setShowProgress(false);
    } finally {
      setImporting(false);
    }
  };

  return (
    <>
      <div
        {...getRootProps()}
        className={`cursor-pointer rounded-xl border-2 border-dashed p-12 transition-all
        ${
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 bg-gray-50"
        }`}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center">
          <UploadCloud className="mb-4 h-14 w-14 text-gray-500" />

          <h3 className="text-lg font-semibold">
            {isDragActive ? "Drop CSV here..." : "Drag & Drop CSV here"}
          </h3>

          <p className="mt-2 text-sm text-muted-foreground">
            or click to browse
          </p>
        </div>
      </div>

      {file && (
        <div className="mt-6 flex items-center justify-between rounded-lg border bg-white p-4 shadow-sm">
          <div className="flex items-center gap-4">
            <FileText className="h-10 w-10 text-green-600" />

            <div>
              <h4 className="font-semibold">{file.name}</h4>

              <p className="text-sm text-muted-foreground">
                {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>
          </div>

          <Button
            onClick={(e) => {
              e.stopPropagation();
              handlePreview();
            }}
            disabled={loading}
          >
            {loading ? "Parsing..." : "Preview CSV"}
          </Button>
        </div>
      )}

      {rows.length > 0 && (
        <>
          <PreviewTable data={rows} />

          <div className="mt-6 flex justify-end">
            <Button onClick={handleImport} disabled={importing}>
              {importing ? "Processing AI..." : "Confirm Import"}
            </Button>
          </div>
        </>
      )}

      {result && (
        <div className="mt-10 space-y-8">
          {/* Stats */}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatsCard title="Total Rows" value={result.stats.totalRows} />

            <StatsCard
              title="Valid Rows"
              value={result.stats.validRows}
              className="border-green-200"
            />

            <StatsCard
              title="Invalid Rows"
              value={result.stats.invalidRows}
              className="border-red-200"
            />

            <StatsCard
              title="Imported"
              value={result.stats.importedRows}
              className="border-blue-200"
            />
          </div>

          {/* AI Result */}

          <ResultTable data={result.data} />
        </div>
      )}
      <ImportProgress open={showProgress} progress={progress} stage={stage} />
    </>
  );
}
