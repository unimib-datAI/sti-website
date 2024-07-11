import React from "react"
import { type IColumns } from "./types"
import { type ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<IColumns>[] = [
  {
    accessorKey: "author",
    header: "Author",
    meta: {
      width: "w-[250px]"
    }
  },
  {
    accessorKey: "year",
    header: "Year",
    meta: {
      width: "w-[150px]",
      class: "item-center"
    }
  },
  {
    accessorKey: "title",
    header: "Title",
    meta: {
      width: "w-[450px]"
    }
  },
  {
    accessorKey: "conference journal",
    header: "Conference Journal",
    meta: {
      width: "w-[250px]"
    }
  },
  {
    accessorKey: "name of approach",
    header: "Name of Approach",
    meta: {
      width: "w-[300px]"
    }
  },
  {
    accessorKey: "main method",
    header: "Main Method",
    meta: {
      width: "w-[250px]"
    }
  },
  {
    accessorKey: "technique",
    header: "Technique",
  },
  {
    accessorKey: "domain",
    header: "Domain",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "tasks",
    header: "Tasks",
  },
  {
    accessorKey: "steps",
    header: "Steps",
  },
  {
    accessorKey: "user revision",
    header: "User Revision",
  },
  {
    accessorKey: "validation",
    header: "Validation",
  },
  {
    accessorKey: "code availability",
    header: "Code Availability",
  },
  {
    accessorKey: "licence",
    header: "Licence",
  },
  {
    accessorKey: "repository link",
  },
  {
    accessorKey: "inputs",
    header: "Inputs",
  },
  {
    accessorKey: "output format",
    header: "Output Format",
  }
]
