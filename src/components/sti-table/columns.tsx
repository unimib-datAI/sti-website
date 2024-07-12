import React from "react"
import { type IColumns } from "./types"
import { type ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<IColumns>[] = [
  {
    accessorKey: "author",
    header: "Author",
    meta: {
      width: "w-[100px]"
    }
  },
  {
    accessorKey: "year",
    header: "Year",
    meta: {
      width: "w-[50px]",
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
    accessorKey: "conference-journal",
    header: "Conference Journal",
    meta: {
      width: "w-[250px]"
    }
  },
  {
    accessorKey: "name-of-approach",
    header: "Name of Approach",
    meta: {
      width: "w-[300px]"
    }
  },
  {
    accessorKey: "main-method",
    header: "Main Method",
    meta: {
      width: "w-[100px]"
    }
  },
  {
    accessorKey: "technique",
    header: "Technique",
    meta: {
      width: "w-[100px]"
    }
  },
  {
    accessorKey: "domain",
    header: "Domain",
    meta: {
      width: "w-[100px]"
    }
  },
  {
    accessorKey: "type",
    header: "Type",
    meta: {
      width: "w-[200px]"
    }
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
    meta: {
      width: "w-auto",
      class: "justify-center"
    },
    columns: [
      {
        accessorKey: "steps.data-preparation",
        header: "Data Preparation",
        meta: {
          width: "w-[65ch]"
        }
      },
      {
        accessorKey: "steps.spell-checker",
        header: "Spell Checker",
      },
      {
        accessorKey: "steps.units-of-measurements",
        header: "Units of Measurements",
      },
      {
        accessorKey: "steps.subject-detection",
        header: "Subject Detection",
        meta: {
          width: "w-[65ch]"
        }
      },
      {
        accessorKey: "steps.column-analysis",
        header: "Column Analysis",
        meta: {
          width: "w-[65ch]"
        }
      },
      {
        accessorKey: "steps.type-annotation",
        header: "Type Annotation",
        meta: {
          width: "w-[65ch]"
        }
      },
      {
        accessorKey: "steps.predicate-annotation",
        header: "Predicate Annotation",
        meta: {
          width: "w-[65ch]"
        }
      },
      {
        accessorKey: "steps.datatype-annotation",
        header: "Datatype Annotation",
        meta: {
          width: "w-[65ch]"
        }
      },
      {
        header: "Entity Linking",
        meta: {
          width: "w-auto",
          class: "justify-center"
        },
        columns: [
          {
            accessorKey: "steps.entity-linking.candidate-generation",
            header: "Candidate Generation",
            meta: {
              width: "w-[200px]"
            }
          },
          {
            accessorKey: "steps.entity-linking.entity-disambiguation",
            header: "Entity Disambiguation",
            meta: {
              width: "w-[200px]"
            }
          },
        ],
      },
      {
        accessorKey: "steps.nil-annotation",
        header: "Nil Annotation",
        meta: {
          width: "w-[65ch]"
        }
      },
    ],
  },
  {
    header: "User Revision",
    meta: {
      width: "w-auto",
      class: "justify-center"
    },
    columns: [
      {
        accessorKey: "user-revision.type",
        header: "Type",
        meta: {
          width: "w-[150px]"
        }
      },
      {
        accessorKey: "user-revision.description",
        header: "Description",
        meta: {
          width: "w-[65ch]"
        }
      },
    ],
  },
  {
    accessorKey: "validation",
    header: "Validation",
    meta: {
      width: "w-[150px]"
    }
  },
  {
    accessorKey: "code-availability",
    header: "Code Availability",
  },
  {
    accessorKey: "licence",
    header: "Licence",
  },
  {
    accessorKey: "repository-link",
  },
  {
    header: "Inputs",
    meta: {
      width: "w-auto",
      class: "justify-center"
    },
    columns: [
      {
        accessorKey: "inputs.type-of-table",
        header: "Type of table",
        meta: {
          width: "w-[150px]"
        }
      },
      {
        header: "Knowledge Graph",
        meta: {
          width: "w-auto",
          class: "justify-center"
        },
        columns: [
          {
            accessorKey: "inputs.kg.triple-store",
            header: "Triple store",
          },
          {
            accessorKey: "inputs.kg.index",
            header: "Index",
            meta: {
              width: "w-[150px]"
            }
          },
        ],
      },
    ],
  },
  {
    accessorKey: "output-format",
    header: "Output Format",
  }
]
