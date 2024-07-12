import React from "react"
import { type IColumns, type IDataPreparation, type IDomain, type IEntityLinking, type IKg, type IMethod, type ITitle, type IUserRevision } from "./types"
import { type ColumnDef } from "@tanstack/react-table"
import { cn } from "@/lib/utils"
import { Check, ExternalLink, Info, X } from "lucide-react"

export const columns: ColumnDef<IColumns>[] = [
  {
    accessorKey: "year",
    header: "Year",
    enableHiding: false,
    meta: {
      width: "w-[50px]",
      class: "item-center"
    }
  },
  {
    accessorKey: "author",
    header: "First author",
    enableHiding: false,
    meta: {
      width: "w-[110px]"
    }
  },
  {
    accessorKey: "title",
    header: "Title",
    enableHiding: false,
    cell: (cell) => {
      const title = cell.getValue() as ITitle
      return (
        <a
          href={title.link}
          target="_blank"
          >{title.text}</a>
      )
    },
    meta: {
      width: "w-[450px]"
    }
  },
  {
    accessorKey: "conference-journal",
    header: "Conf. / Journal",
    cell: (cell) => <span className="flex justify-center">{cell.getValue() as string}</span>,
    meta: {
      width: "w-[120px]"
    }
  },
  {
    accessorKey: "name-of-approach",
    header: "Name of Approach",
    meta: {
      width: "w-[150px]"
    }
  },
  {
    accessorKey: "main-method",
    header: "Main Method",
    cell: (cell) => {
      const method = cell.getValue() as IMethod;
      const color = method.type === "sup" ? "bg-teal-500" : method.type === "unsup" ? "bg-pink-500" : "bg-sky-600";
      return <span><span className={cn(color, "py-0.5 px-1.5 rounded-full text-[0.7rem]")}>{method.type}</span><span className="ml-2">{method.technique}</span></span>
    },
    meta: {
      width: "w-[120px]"
    }
  },
  {
    accessorKey: "domain",
    header: "Domain",
    cell: (cell) => {
      const domain = cell.getValue() as IDomain;
      const color = domain.type === "dependent" ? "bg-teal-500" : "bg-sky-600";
      return <span><span className={cn(color, "py-0.5 px-1.5 rounded-full text-[0.7rem]")}>{domain.domain}</span><span className="ml-2">{domain.type}</span></span>
    },
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
        cell: (cell) => <span className="flex justify-center">{cell.getValue() ? <Check className="text-green-400 h-5 w-5" /> : <X className="text-red-400 h-5 w-5" />}</span>,
      },
      {
        accessorKey: "tasks.cpa",
        header: "CPA",
        cell: cell => <span className="flex justify-center">{cell.getValue() ? <Check className="text-green-400 h-5 w-5" /> : <X className="text-red-400 h-5 w-5" />}</span>,

      },
      {
        accessorKey: "tasks.cea",
        header: "CEA",
        cell: cell => <span className="flex justify-center">{cell.getValue() ? <Check className="text-green-400 h-5 w-5" /> : <X className="text-red-400 h-5 w-5" />}</span>,

      },
      {
        accessorKey: "tasks.cnea",
        header: "CNEA",
        cell: cell => <span className="flex justify-center">{cell.getValue() ? <Check className="text-green-400 h-5 w-5" /> : <X className="text-red-400 h-5 w-5" />}</span>,
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
        cell: (cell) => {
          const dataPreparation = cell.getValue() as IDataPreparation;

          return dataPreparation.description ? (
            <div className="flex justify-center">
              <span className="inline-flex text-white items-center rounded-full px-0.5 cursor-help" title={`${dataPreparation.description}\n\nDATA CLEANING: ${dataPreparation["data-cleaning"]}\nUNITS OF MEASUREMENTS: ${dataPreparation["units-of-measurements"]}`}>
              <Check className="h-5 w-5 text-green-400" />
              <Info className="text-tableText ml-1 h-4 w-4" />
              </span>
            </div>
          ) : (<span className="flex justify-center"><X className="text-red-400 h-5 w-5" /></span>)
        },
      },

      {
        accessorKey: "steps.subject-detection",
        header: "Subject Detection",
        cell: (cell) => {
          const value = cell.getValue() as string;

          return value ? (
            <div className="flex justify-center">
              <span className="inline-flex text-white items-center bg-green-400 rounded-full px-0.5 cursor-help" title={value}>
              <Check className="h-5 w-5 text-green-400" />
              <Info className="text-tableText ml-1 h-4 w-4" />
              </span>
            </div>
          ) : (<span className="flex justify-center"><X className="text-red-400 h-5 w-5" /></span>)
        },
      },
      {
        accessorKey: "steps.column-analysis",
        header: "Column Analysis",
        cell: (cell) => {
          const value = cell.getValue() as string;

          return value ? (
            <div className="flex justify-center">
              <span className="inline-flex text-white items-center rounded-full px-0.5 cursor-help" title={value}>
              <Check className="h-5 w-5 text-green-400" />
              <Info className="text-tableText ml-1 h-4 w-4" />
              </span>
            </div>
          ) : (<span className="flex justify-center"><X className="text-red-400 h-5 w-5" /></span>)
        },
      },
      {
        accessorKey: "steps.type-annotation",
        header: "Type Annotation",
        cell: (cell) => {
          const value = cell.getValue() as string;

          return value ? (
            <div className="flex justify-center">
              <span className="inline-flex text-white items-center rounded-full px-0.5 cursor-help" title={value}>
              <Check className="h-5 w-5 text-green-400" />
              <Info className="text-tableText ml-1 h-4 w-4" />
              </span>
            </div>
          ) : (<span className="flex justify-center"><X className="text-red-400 h-5 w-5" /></span>)
        },
      },
      {
        accessorKey: "steps.predicate-annotation",
        header: "Predicate Annotation",
        cell: (cell) => {
          const value = cell.getValue() as string;

          return value ? (
            <div className="flex justify-center">
              <span className="inline-flex text-white items-center rounded-full px-0.5 cursor-help" title={value}>
              <Check className="h-5 w-5 text-green-400" />
              <Info className="text-tableText ml-1 h-4 w-4" />
              </span>
            </div>
          ) : (<span className="flex justify-center"><X className="text-red-400 h-5 w-5" /></span>)
        },
      },
      {
        accessorKey: "steps.datatype-annotation",
        header: "Datatype Annotation",
        cell: (cell) => {
          const value = cell.getValue() as string;

          return value ? (
            <div className="flex justify-center">
              <span className="inline-flex text-white items-center rounded-full px-0.5 cursor-help" title={value}>
              <Check className="h-5 w-5 text-green-400" />
              <Info className="text-tableText ml-1 h-4 w-4" />
              </span>
            </div>
          ) : (<span className="flex justify-center"><X className="text-red-400 h-5 w-5" /></span>)
        },
      },
      {
        accessorKey: "steps.entity-linking",
        header: "Entity Linking",
        cell: (cell) => {
          const entityLinking = cell.getValue() as IEntityLinking;

          return entityLinking.description ? (
            <div className="flex justify-center">
              <span className="inline-flex text-white items-center rounded-full px-0.5 cursor-help" title={`${entityLinking.description}\n\nCANDIDATE GENERATION: ${entityLinking["candidate-generation"]}\nENTITY DISAMBIGUATION: ${entityLinking["entity-disambiguation"]}`}>
              <Check className="h-5 w-5 text-green-400" />
              <Info className="text-tableText ml-1 h-4 w-4" />
              </span>
            </div>
          ) : (<span className="flex justify-center"><X className="text-red-400 h-5 w-5" /></span>)
        },
      },
      {
        accessorKey: "steps.nil-annotation",
        header: "NIL Annotation",
        cell: (cell) => {
          const value = cell.getValue() as string;

          return value ? (
            <div className="flex justify-center">
              <span className="inline-flex text-white items-center rounded-full px-0.5 cursor-help" title={value}>
              <Check className="h-5 w-5 text-green-400" />
              <Info className="text-tableText ml-1 h-4 w-4" />
              </span>
            </div>
          ) : (<span className="flex justify-center"><X className="text-red-400 h-5 w-5" /></span>)
        },
      },
    ],
  },
  {
    accessorKey: "user-revision",
    header: "User Revision",
    cell: (cell) => {
      const userRevision = cell.getValue() as IUserRevision;
      const color = userRevision.type === "Fully-automated" ? "bg-teal-500" : userRevision.type === "Semi-automated" ? "bg-sky-600" : "bg-pink-500";
      return userRevision.description ? (
          <span className={cn(color,"py-0.5 pl-1.5 pr-0.5 rounded-full text-[0.7rem] cursor-help inline-flex")} title={userRevision.description}>{userRevision.type}{userRevision.description && <Info className="text-tableText ml-1 h-4 w-4" />}</span>
      ) : (
          <span className={cn(color, "py-0.5 px-1.5 rounded-full text-[0.7rem]")}>{userRevision.type}</span>
      )
    },
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
    cell: (cell) => {
      const codeAvailability = cell.getValue() as string;
      return <span className="flex justify-center">{codeAvailability ? <a href={codeAvailability}><ExternalLink className="h-5 w-5" /></a> : <X className="text-red-400 h-5 w-5" />}</span>
    }
  },
  {
    accessorKey: "licence",
    header: "Licence",
    cell: (cell) => <span className="py-0.5 px-1.5 rounded-full text-[0.7rem] bg-gray-600">{cell.getValue() as string}</span>
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
        accessorKey: "inputs.kg",
        header: "Knowledge Graph",
        cell: (cell) => {
          const kg = cell.getValue() as IKg;
          return <span className="flex justify-center">{kg["triple-store"]}{kg.index && ` - ${kg.index}`}</span>
        },
        meta: {
          width: "w-[150px]"
        }
      },
    ],
  },
  {
    accessorKey: "output-format",
    header: "Output Format",
  }
]
