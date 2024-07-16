import { flexRender, type Table } from "@tanstack/react-table";
import { ColumnsSelector } from "./columns-selector";
import { cn } from "@/lib/utils";
import { ArrowDownWideNarrow, ArrowUpNarrowWide, Expand } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import { Button } from "@components/ui/button";

type Props<TData> = {
  table: Table<TData>;
  columnVisibility: Record<string, boolean>;
  setColumnVisibility: React.Dispatch<React.SetStateAction<{}>>;
};

export function FullScreen<TData>(props: Props<TData>) {
  const { table, columnVisibility, setColumnVisibility } = props;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Expand className="w-4 h-4 mr-2" />
          Full screen
        </Button>
      </DialogTrigger>
      <DialogContent className="w-svh h-svh max-w-full p-0 gap-0 bg-tableTop">
        <DialogTitle className="sr-only">Full screen</DialogTitle>
        <DialogHeader className="p-2">
          <DialogDescription>
            <ColumnsSelector
              table={table}
              columnVisibility={columnVisibility}
              setColumnVisibility={setColumnVisibility}
            />
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-auto">
          <table className="text-xs border-separate border-spacing-0 rounded-lg border border-slate-600">
            <thead className="sticky top-[-1px] z-20">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        className={cn(
                          "py-1 border-r border-slate-600 last:border-r-0 bg-tableTop text-tableText border-separate",
                          header.column.columnDef.meta?.class
                        )}
                      >
                        {header.isPlaceholder ? null : (
                          <div
                            onClick={
                              header.column.getCanSort()
                                ? header.column.getToggleSortingHandler()
                                : undefined
                            }
                            title={
                              header.column.getCanSort()
                                ? header.column.getNextSortingOrder() === "asc"
                                  ? "Sort ascending"
                                  : header.column.getNextSortingOrder() ===
                                    "desc"
                                  ? "Sort descending"
                                  : "Clear sort"
                                : undefined
                            }
                            className={cn(
                              header.column.getCanSort()
                                ? "cursor-pointer select-none"
                                : "",
                              header.column.columnDef.meta?.width,
                              "flex items-center justify-start text-left px-4",
                              header.column.columnDef.meta?.innerClass
                            )}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: (
                                <ArrowUpNarrowWide className="h-4 w-4 ml-2" />
                              ),
                              desc: (
                                <ArrowDownWideNarrow className="h-4 w-4 ml-2" />
                              ),
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row, index) => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td
                          key={cell.id}
                          className={cn([
                            cell.column.columnDef.meta?.width,
                            index % 2 ? "bg-tableAlt" : "bg-tableBottom",
                            "px-4 py-2 border-r border-slate-600 last:border-r-0",
                            cell.column.columnDef.meta?.class,
                          ])}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
