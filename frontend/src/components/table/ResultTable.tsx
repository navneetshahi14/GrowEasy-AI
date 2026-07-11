"use client";

import { ColumnDef } from "@tanstack/react-table";

import { crmRecord } from "@/types/crm";

import { DataTable } from "./DataTable";

import { Button } from "@/components/ui/button";

import { ArrowUpDown } from "lucide-react";

import { exportCsv } from "@/utils/exportCsv";
import { exportJson } from "@/utils/exportJson";

import { Download } from "lucide-react";

const columns: ColumnDef<crmRecord>[] = [
  {
    accessorKey: "name",

    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },

  {
    accessorKey: "email",

    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },

  {
    accessorKey: "mobile",

    header: "Mobile",
  },

  {
    accessorKey: "crm_status",

    header: "Status",
  },

  {
    accessorKey: "city",

    header: "City",
  },

  {
    accessorKey: "country",

    header: "Country",
  },
];

interface Props {
  data: crmRecord[];
}

export default function ResultTable({ data }: Props) {
  return (
    <>
      <div className="mb-4 flex items-center justify-end gap-3">
        <Button variant="outline" onClick={() => exportJson(data)}>
          <Download className="mr-2 h-4 w-4" />
          JSON
        </Button>

        <Button onClick={() => exportCsv(data)}>
          <Download className="mr-2 h-4 w-4" />
          CSV
        </Button>
      </div>
      <DataTable columns={columns} data={data} />
    </>
  );
}
