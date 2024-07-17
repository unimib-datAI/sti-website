import React from "react";
import {
  type IColumns,
  type IDataPreparation,
  type IDomain,
  type IEntityLinking,
  type IKg,
  type IMethod,
  type ITitle,
  type IUserRevision,
} from "./types";
import { type ColumnDef } from "@tanstack/react-table";
import { cn, extractUniqueValue } from "@/lib/utils";
import { Check, ExternalLink, Filter, Info, X } from "lucide-react";
import { ComboboxPopover } from "@components/ui/combobox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import { Switch } from "@components/ui/switch";
import { Label } from "@components/ui/label";
import { Button } from "@components/ui/button";

export const columns: ColumnDef<IColumns>[] = [
  {
    accessorKey: "year",
    enableHiding: false,
    header: "Year",
    sortingFn: "datetime",
    meta: {
      width: "w-[80px]",
      class: "item-center sticky left-0 z-10",
    },
  },
  {
    accessorKey: "author",
    header: "First author",
    enableHiding: false,
    enableSorting: false,
    meta: {
      width: "w-[110px]",
      class: "sticky left-[81px] z-10",
    },
  },
  {
    accessorKey: "title",
    header: "Title",
    enableHiding: false,
    enableSorting: false,
    cell: (cell) => {
      const title = cell.getValue() as ITitle;
      return title.link ? (
        <a href={title.link} target="_blank">
          {title.text}
        </a>
      ) : (
        <span>{title.text}</span>
      );
    },
    meta: {
      width: "w-[450px]",
      class: "sticky left-[192px] z-10 border-r-4",
    },
  },
  {
    accessorKey: "conference-journal",
    header: (props) => {
      const { table } = props;
      const options = extractUniqueValue({
        table,
        columnId: "conference-journal",
      });

      return (
        <ComboboxPopover
          options={options}
          emptyText="No results found"
          label="Conf. / Journal"
          placeholder="Search..."
          value={
            (table
              .getColumn("conference-journal")
              ?.getFilterValue() as string) ?? ""
          }
          setValue={(value: string) => {
            table.getColumn("conference-journal")?.setFilterValue(value);
          }}
          triggerClassName="text-xs -ml-2 data-[state=open]:bg-slate-800"
          triggerText="Conf. / Journal"
          containerClassName="bg-slate-800"
        />
      );
    },
    enableSorting: false,
    cell: (cell) => (
      <span className="flex justify-center">{cell.getValue() as string}</span>
    ),
    meta: {
      width: "w-[165px]",
    },
  },
  {
    accessorKey: "name-of-approach",
    header: (props) => {
      const { table } = props;
      const options = extractUniqueValue({
        table,
        columnId: "name-of-approach",
      });

      return (
        <ComboboxPopover
          options={options}
          emptyText="No results found"
          label="Name of Approach"
          placeholder="Search..."
          value={
            (table.getColumn("name-of-approach")?.getFilterValue() as string) ??
            ""
          }
          setValue={(value: string) => {
            table.getColumn("name-of-approach")?.setFilterValue(value);
          }}
          triggerClassName="text-xs -ml-2 data-[state=open]:bg-slate-800"
          triggerText="Name of Approach"
          containerClassName="bg-slate-800"
        />
      );
    },
    enableSorting: false,
    meta: {
      width: "w-[170px]",
    },
  },
  {
    accessorKey: "main-method",
    cell: (cell) => {
      const method = cell.getValue() as IMethod;
      const color =
        method.type === "sup"
          ? "bg-teal-700"
          : method.type === "unsup"
          ? "bg-pink-500"
          : "bg-sky-600";
      return (
        <span>
          <span
            className={cn(color, "py-0.5 px-1.5 rounded-full text-[0.7rem]")}
          >
            {method.type}
          </span>
          <span className="ml-2">{method.technique}</span>
        </span>
      );
    },
    header: (props) => {
      const { table } = props;
      const options = extractUniqueValue({
        table,
        columnId: "main-method.type",
      });

      return (
        <ComboboxPopover
          options={options}
          emptyText="No results found"
          label="Main Method"
          placeholder="Search..."
          value={
            (table.getColumn("main-method")?.getFilterValue() as string) ?? ""
          }
          setValue={(value: string) => {
            table.getColumn("main-method")?.setFilterValue(value);
          }}
          triggerClassName="text-xs -ml-2 data-[state=open]:bg-slate-800"
          triggerText="Main Method"
          containerClassName="bg-slate-800"
        />
      );
    },
    filterFn: (row, columnId, filterValue) => {
      const rowValue = row.getValue(columnId) as IMethod;
      return rowValue.type.toLowerCase() === filterValue.toLowerCase();
    },
    enableSorting: false,
    meta: {
      width: "w-[170px]",
    },
  },
  {
    accessorKey: "domain",
    cell: (cell) => {
      const domain = cell.getValue() as IDomain;
      const color =
        domain.domain === "dependent" ? "bg-teal-700" : "bg-sky-600";
      return (
        <span>
          <span
            className={cn(color, "py-0.5 px-1.5 rounded-full text-[0.7rem]")}
          >
            {domain.domain}
          </span>
          <span className="ml-2">{domain.type}</span>
        </span>
      );
    },
    header: (props) => {
      const { table } = props;
      const options = extractUniqueValue({ table, columnId: "domain.domain" });

      return (
        <ComboboxPopover
          options={options}
          emptyText="No results found"
          label="Domain"
          placeholder="Search..."
          value={(table.getColumn("domain")?.getFilterValue() as string) ?? ""}
          setValue={(value: string) => {
            table.getColumn("domain")?.setFilterValue(value);
          }}
          triggerClassName="text-xs -ml-2 data-[state=open]:bg-slate-800"
          triggerText="Domain"
          containerClassName="bg-slate-800"
        />
      );
    },
    filterFn: (row, columnId, filterValue) => {
      const rowValue = row.getValue(columnId) as IDomain;
      return rowValue.domain.toLowerCase() === filterValue.toLowerCase();
    },
    enableSorting: false,
    meta: {
      width: "w-[170px]",
    },
  },
  {
    enableSorting: false,
    id: "tasks",
    header: ({ table }) => {
      const setFilterValue = ({
        task,
        value,
      }: {
        task: string;
        value: boolean | null;
      }) => table.getColumn(`tasks_${task}`)?.setFilterValue(value);

      const getFilterValue = (task: string) =>
        table.getColumn(`tasks_${task}`)?.getFilterValue() ? true : false;

      const isFiltered = table
        .getState()
        .columnFilters.some((item) => item.id.includes("tasks_"));

      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs -ml-2 data-[state=open]:bg-slate-800"
            >
              Tasks
              <Filter
                className="ml-2 h-4 w-4 shrink-0"
                fill={isFiltered ? "currentColor" : "none"}
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            side="right"
            align="start"
            className="flex flex-col bg-slate-800 space-y-2 w-40"
          >
            <p className="pb-4">Filter by task</p>
            <div className="flex items-center space-x-2">
              <Switch
                id="cta"
                checked={getFilterValue("cta")}
                onCheckedChange={setFilterValue.bind(null, {
                  task: "cta",
                  value: getFilterValue("cta") ? null : true,
                })}
              />
              <Label htmlFor="cta">CTA</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="cpa"
                checked={getFilterValue("cpa")}
                onCheckedChange={setFilterValue.bind(null, {
                  task: "cpa",
                  value: getFilterValue("cpa") ? null : true,
                })}
              />
              <Label htmlFor="cpa">CPA</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="cea"
                checked={getFilterValue("cea")}
                onCheckedChange={setFilterValue.bind(null, {
                  task: "cea",
                  value: getFilterValue("cea") ? null : true,
                })}
              />
              <Label htmlFor="cea">CEA</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="cnea"
                checked={getFilterValue("cnea")}
                onCheckedChange={setFilterValue.bind(null, {
                  task: "cnea",
                  value: getFilterValue("cnea") ? null : true,
                })}
              />
              <Label htmlFor="cnea">CNEA</Label>
            </div>
          </PopoverContent>
        </Popover>
      );
    },
    meta: {
      width: "w-auto",
      innerClass: "justify-center",
    },
    columns: [
      {
        accessorKey: "tasks.cta",
        header: "CTA",
        enableSorting: false,
        cell: (cell) => (
          <span className="flex justify-center">
            {cell.getValue() ? (
              <Check className="text-green-400 h-5 w-5" />
            ) : (
              <X className="text-red-400 h-5 w-5" />
            )}
          </span>
        ),
      },
      {
        accessorKey: "tasks.cpa",
        header: "CPA",
        enableSorting: false,
        cell: (cell) => (
          <span className="flex justify-center">
            {cell.getValue() ? (
              <Check className="text-green-400 h-5 w-5" />
            ) : (
              <X className="text-red-400 h-5 w-5" />
            )}
          </span>
        ),
      },
      {
        accessorKey: "tasks.cea",
        header: "CEA",
        enableSorting: false,
        cell: (cell) => (
          <span className="flex justify-center">
            {cell.getValue() ? (
              <Check className="text-green-400 h-5 w-5" />
            ) : (
              <X className="text-red-400 h-5 w-5" />
            )}
          </span>
        ),
      },
      {
        accessorKey: "tasks.cnea",
        header: "CNEA",
        enableSorting: false,
        cell: (cell) => (
          <span className="flex justify-center">
            {cell.getValue() ? (
              <Check className="text-green-400 h-5 w-5" />
            ) : (
              <X className="text-red-400 h-5 w-5" />
            )}
          </span>
        ),
      },
    ],
  },
  {
    id: "steps",
    header: "Steps",
    enableSorting: false,
    meta: {
      width: "w-auto",
      innerClass: "justify-center",
    },
    columns: [
      {
        accessorKey: "steps.data-preparation",
        header: "Data Preparation",
        cell: (cell) => {
          const dataPreparation = cell.getValue() as IDataPreparation;

          return dataPreparation.description ? (
            // <div className="flex justify-center">
            //   <span
            //     className="inline-flex text-white items-center rounded-full px-0.5 cursor-help"
            //     title={`${dataPreparation.description}\n\nSPELL CHECKER: ${dataPreparation["spell-checker"]}\nUNITS OF MEASUREMENTS: ${dataPreparation["units-of-measurements"]}`}
            //   >
            //     <Check className="h-5 w-5 text-green-400" />
            //     <Info className="text-tableText ml-1 h-4 w-4" />
            //   </span>
            // </div>
            <div className="flex justify-center">
              <span className="inline-flex text-white items-center rounded-full px-0.5 cursor-help">
                <Check className="h-5 w-5 text-green-400" />
              </span>
            </div>
          ) : (
            <span className="flex justify-center">
              <X className="text-red-400 h-5 w-5" />
            </span>
          );
        },
        enableSorting: false,
      },
      {
        accessorKey: "steps.subject-detection",
        header: "Subject Detection",
        cell: (cell) => {
          const value = cell.getValue() as string;

          return value ? (
            // <div className="flex justify-center">
            //   <span
            //     className="inline-flex text-white items-center rounded-full px-0.5 cursor-help"
            //     title={value}
            //   >
            //     <Check className="h-5 w-5 text-green-400" />
            //     <Info className="text-tableText ml-1 h-4 w-4" />
            //   </span>
            // </div>
            <div className="flex justify-center">
              <span className="inline-flex text-white items-center rounded-full px-0.5 cursor-help">
                <Check className="h-5 w-5 text-green-400" />
              </span>
            </div>
          ) : (
            <span className="flex justify-center">
              <X className="text-red-400 h-5 w-5" />
            </span>
          );
        },
        enableSorting: false,
      },
      {
        accessorKey: "steps.column-analysis",
        header: "Column Analysis",
        cell: (cell) => {
          const value = cell.getValue() as string;

          return value ? (
            // <div className="flex justify-center">
            //   <span
            //     className="inline-flex text-white items-center rounded-full px-0.5 cursor-help"
            //     title={value}
            //   >
            //     <Check className="h-5 w-5 text-green-400" />
            //     <Info className="text-tableText ml-1 h-4 w-4" />
            //   </span>
            // </div>
            <div className="flex justify-center">
              <span className="inline-flex text-white items-center rounded-full px-0.5 cursor-help">
                <Check className="h-5 w-5 text-green-400" />
              </span>
            </div>
          ) : (
            <span className="flex justify-center">
              <X className="text-red-400 h-5 w-5" />
            </span>
          );
        },
        enableSorting: false,
      },
      {
        accessorKey: "steps.type-annotation",
        header: "Type Annotation",
        cell: (cell) => {
          const value = cell.getValue() as string;

          return value ? (
            // <div className="flex justify-center">
            //   <span
            //     className="inline-flex text-white items-center rounded-full px-0.5 cursor-help"
            //     title={value}
            //   >
            //     <Check className="h-5 w-5 text-green-400" />
            //     <Info className="text-tableText ml-1 h-4 w-4" />
            //   </span>
            // </div>
            <div className="flex justify-center">
              <span className="inline-flex text-white items-center rounded-full px-0.5 cursor-help">
                <Check className="h-5 w-5 text-green-400" />
              </span>
            </div>
          ) : (
            <span className="flex justify-center">
              <X className="text-red-400 h-5 w-5" />
            </span>
          );
        },
        enableSorting: false,
      },
      {
        accessorKey: "steps.predicate-annotation",
        header: "Predicate Annotation",
        cell: (cell) => {
          const value = cell.getValue() as string;

          return value ? (
            // <div className="flex justify-center">
            //   <span
            //     className="inline-flex text-white items-center rounded-full px-0.5 cursor-help"
            //     title={value}
            //   >
            //     <Check className="h-5 w-5 text-green-400" />
            //     <Info className="text-tableText ml-1 h-4 w-4" />
            //   </span>
            // </div>
            <div className="flex justify-center">
              <span className="inline-flex text-white items-center rounded-full px-0.5 cursor-help">
                <Check className="h-5 w-5 text-green-400" />
              </span>
            </div>
          ) : (
            <span className="flex justify-center">
              <X className="text-red-400 h-5 w-5" />
            </span>
          );
        },
        enableSorting: false,
      },
      {
        accessorKey: "steps.datatype-annotation",
        header: "Datatype Annotation",
        cell: (cell) => {
          const value = cell.getValue() as string;

          return value ? (
            // <div className="flex justify-center">
            //   <span
            //     className="inline-flex text-white items-center rounded-full px-0.5 cursor-help"
            //     title={value}
            //   >
            //     <Check className="h-5 w-5 text-green-400" />
            //     <Info className="text-tableText ml-1 h-4 w-4" />
            //   </span>
            // </div>
            <div className="flex justify-center">
              <span className="inline-flex text-white items-center rounded-full px-0.5 cursor-help">
                <Check className="h-5 w-5 text-green-400" />
              </span>
            </div>
          ) : (
            <span className="flex justify-center">
              <X className="text-red-400 h-5 w-5" />
            </span>
          );
        },
        enableSorting: false,
      },
      {
        accessorKey: "steps.entity-linking",
        header: "Entity Linking",
        cell: (cell) => {
          const entityLinking = cell.getValue() as IEntityLinking;

          return entityLinking.description ? (
            // <div className="flex justify-center">
            //   <span
            //     className="inline-flex text-white items-center rounded-full px-0.5 cursor-help"
            //     title={`${entityLinking.description}\n\nCANDIDATE GENERATION: ${entityLinking["candidate-generation"]}\nENTITY DISAMBIGUATION: ${entityLinking["entity-disambiguation"]}`}
            //   >
            //     <Check className="h-5 w-5 text-green-400" />
            //     <Info className="text-tableText ml-1 h-4 w-4" />
            //   </span>
            // </div>
            <div className="flex justify-center">
              <span className="inline-flex text-white items-center rounded-full px-0.5 cursor-help">
                <Check className="h-5 w-5 text-green-400" />
              </span>
            </div>
          ) : (
            <span className="flex justify-center">
              <X className="text-red-400 h-5 w-5" />
            </span>
          );
        },
        enableSorting: false,
      },
      {
        accessorKey: "steps.nil-annotation",
        header: "NIL Annotation",
        cell: (cell) => {
          const value = cell.getValue() as string;

          return value ? (
            // <div className="flex justify-center">
            //   <span
            //     className="inline-flex text-white items-center rounded-full px-0.5 cursor-help"
            //     title={value}
            //   >
            //     <Check className="h-5 w-5 text-green-400" />
            //     <Info className="text-tableText ml-1 h-4 w-4" />
            //   </span>
            // </div>
            <div className="flex justify-center">
              <span className="inline-flex text-white items-center rounded-full px-0.5 cursor-help">
                <Check className="h-5 w-5 text-green-400" />
              </span>
            </div>
          ) : (
            <span className="flex justify-center">
              <X className="text-red-400 h-5 w-5" />
            </span>
          );
        },
        enableSorting: false,
      },
    ],
  },
  {
    accessorKey: "user-revision",
    cell: (cell) => {
      const userRevision = cell.getValue() as IUserRevision;
      const color =
        userRevision.type === "Fully-automated"
          ? "bg-teal-700"
          : userRevision.type === "Semi-automated"
          ? "bg-sky-600"
          : "bg-pink-500";
      return userRevision.description ? (
        <span
          className={cn(
            color,
            "py-0.5 pl-1.5 pr-0.5 rounded-full text-[0.7rem] cursor-help inline-flex"
          )}
          title={userRevision.description}
        >
          {userRevision.type}
          {userRevision.description && (
            <Info className="text-tableText ml-1 h-4 w-4" />
          )}
        </span>
      ) : (
        <span className={cn(color, "py-0.5 px-1.5 rounded-full text-[0.7rem]")}>
          {userRevision.type}
        </span>
      );
    },
    header: (props) => {
      const { table } = props;
      const options = extractUniqueValue({
        table,
        columnId: "user-revision.type",
      });

      return (
        <ComboboxPopover
          options={options}
          emptyText="No results found"
          label="User Revision"
          placeholder="Search..."
          value={
            (table.getColumn("user-revision")?.getFilterValue() as string) ?? ""
          }
          setValue={(value: string) => {
            table.getColumn("user-revision")?.setFilterValue(value);
          }}
          triggerClassName="text-xs -ml-2 data-[state=open]:bg-slate-800"
          triggerText="User Revision"
          containerClassName="bg-slate-800"
        />
      );
    },
    filterFn: (row, columnId, filterValue) => {
      const rowValue = row.getValue(columnId) as IUserRevision;
      return rowValue.type.toLowerCase() === filterValue.toLowerCase();
    },
    enableSorting: false,
    meta: {
      width: "w-[150px]",
    },
  },
  {
    accessorKey: "validation",
    header: "Validation",
    enableSorting: false,
    meta: {
      width: "w-[65ch]",
    },
  },
  {
    accessorKey: "code-availability",
    header: "Code Availability",
    cell: (cell) => {
      const codeAvailability = cell.getValue() as string;
      return (
        <span className="flex justify-center">
          {codeAvailability ? (
            <a href={codeAvailability}>
              <ExternalLink className="h-5 w-5" />
            </a>
          ) : (
            <X className="text-red-400 h-5 w-5" />
          )}
        </span>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "license",
    cell: (cell) => (
      <span className="py-0.5 px-1.5 rounded-full text-[0.7rem] bg-gray-600">
        {cell.getValue() as string}
      </span>
    ),
    header: (props) => {
      const { table } = props;
      const options = extractUniqueValue({
        table,
        columnId: "license",
      });

      return (
        <ComboboxPopover
          options={options}
          emptyText="No results found"
          label="license"
          placeholder="Search..."
          value={(table.getColumn("license")?.getFilterValue() as string) ?? ""}
          setValue={(value: string) => {
            table.getColumn("license")?.setFilterValue(value);
          }}
          triggerClassName="text-xs -ml-2 data-[state=open]:bg-slate-800"
          triggerText="license"
          containerClassName="bg-slate-800"
        />
      );
    },
    enableSorting: false,
  },
  {
    id: "inputs",
    header: "Inputs",
    enableSorting: false,
    meta: {
      width: "w-auto",
      innerClass: "justify-center",
    },
    columns: [
      {
        accessorKey: "inputs.type-of-table",
        header: "Type of table",
        enableSorting: false,
        meta: {
          width: "w-[65ch]",
        },
      },
      {
        accessorKey: "inputs.kg",
        header: "Knowledge Graph",
        enableSorting: false,
        cell: (cell) => {
          const kg = cell.getValue() as IKg;
          return (
            <span>
              {kg["triple-store"]}
              {kg.index && kg["triple-store"] && ` - `}
              {kg.index}
            </span>
          );
        },
        meta: {
          width: "w-[150px]",
        },
      },
    ],
  },
  {
    accessorKey: "output-format",
    header: "Output Format",
    enableSorting: false,
    meta: {
      width: "w-[300px]",
    },
  },
  {
    accessorKey: "checked-by-author",
    header: "Checked by author",
    enableSorting: false,
    cell: (cell) => {
      const checked = cell.getValue() as boolean;

      return checked ? (
        <div className="flex justify-center">
          <span
            className="inline-flex text-white items-center rounded-full px-0.5 cursor-help"
            title="The authors were contacted to validate the classification of their approach."
          >
            <Check className="h-5 w-5 text-green-400" />
            <Info className="text-tableText ml-1 h-4 w-4" />
          </span>
        </div>
      ) : (
        <span className="flex justify-center">
          <X className="text-red-400 h-5 w-5" />
        </span>
      );
    },
    meta: {
      width: "w-[90px]",
    },
  },
];
