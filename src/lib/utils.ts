import type { Table } from "@tanstack/react-table";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

type Options = {
  value: string;
  label: string;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractUniqueValue<T = { [key: string]: string }>({
  table,
  columnId,
}: {
  table: Table<T>;
  /**
   * The column id to extract unique values from
   * use dot notation to extract values from nested objects
   */
  columnId: string;
  attribute?: string;
}): Options[] {
  const values = [
    ...new Set<string>(
      table.getCoreRowModel().flatRows.map((row) => {
        if (columnId.includes(".")) {
          const [column, subColumn] = columnId.split(".");
          const rowObject = row.getValue(column) as { [key: string]: string };
          return rowObject[subColumn];
        }

        return row.getValue(columnId);
      })
    ),
  ].filter((value) => value.length > 0);

  const options: Options[] = values.map((value) => ({
    value: value?.toLowerCase(),
    label: value,
  }));

  return options;
}
