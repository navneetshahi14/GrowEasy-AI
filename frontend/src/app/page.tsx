import UploadCard from "@/components/uploads/UploadCard";

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-slate-100">
        <div className="mx-auto flex max-w-7xl flex-col items-center px-6 py-10">
          <h1 className="text-4xl font-bold">
            AI CRM CSV IMPORTER
          </h1>

          <p className="mt-3 text-gray-300">
            Upload any CSV and intelligently map it into CRM records.
          </p>

          <UploadCard />
        </div>

      </main>
    </>
  );
}
