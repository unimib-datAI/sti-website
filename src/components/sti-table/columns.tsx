import React from "react"
import { type IColumns, type ITask } from "./types"
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
    header: "Tasks",
    meta: {
      width: "w-auto",
      class: "justify-center"
    },
    columns: [
      {
        accessorKey: "tasks.cta",
        header: "CTA",
        cell: (cell) => <span className="text-center">{cell.getValue() ? "✅" : "❌"}</span>,
      },
      {
        accessorKey: "tasks.cpa",
        header: "CPA",
        cell: cell => cell.getValue() ? "✅" : "❌",

      },
      {
        accessorKey: "tasks.cea",
        header: "CEA",
        cell: cell => cell.getValue() ? "✅" : "❌",

      },
      {
        accessorKey: "tasks.cnea",
        header: "CNEA",
        cell: cell => cell.getValue() ? "✅" : "❌",
      },
    ],
  },
  {
    header: "Steps",
    columns: [
      {
        accessorKey: "steps.data preparation",
        header: "Data Preparation",
      },
      {
        accessorKey: "steps.spell checker",
        header: "Spell Checker",
      },
      {
        accessorKey: "steps.units of measurements",
        header: "Units of Measurements",
      },
      {
        accessorKey: "steps.subject detection",
        header: "Subject Detection",
      },
      {
        accessorKey: "steps.column analysis",
        header: "Column Analysis",
      },
      {
        accessorKey: "steps.type annotation",
        header: "Type Annotation",
      },
      {
        accessorKey: "steps.predicate annotation",
        header: "Predicate Annotation",
      },
      {
        accessorKey: "steps.datatype annotation",
        header: "Datatype Annotation",
      },
      {
        accessorKey: "steps.entity linking",
        header: "Entity Linking",
        columns: [
          {
            accessorKey: "steps.entity linking.candidate generation",
            header: "Candidate Generation",
          },
          {
            accessorKey: "steps.entity linking.entity disambiguation",
            header: "Entity Disambiguation",
          },
        ],
      },
      {
        accessorKey: "steps.nil annotation",
        header: "Nil Annotation",
      },
    ],
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
