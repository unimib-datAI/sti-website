"use client";

import * as React from "react";
import { type DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type Table } from "@tanstack/react-table";
import { ListFilter } from "lucide-react";

type Checked = DropdownMenuCheckboxItemProps["checked"];

type Props<TData> = {
  table: Table<TData>;
  columnVisibility: Record<string, boolean>;
  setColumnVisibility: React.Dispatch<React.SetStateAction<{}>>;
};

export function ColumnsSelector<TData>(props: Props<TData>) {
  const { table, columnVisibility, setColumnVisibility } = props;

  const columns = table.getAllColumns();

  const showAll = table.getIsAllColumnsVisible() as Checked;
  const setShowAll = table.getToggleAllColumnsVisibilityHandler();

  const labels: {
    [key: string]: string;
  } = {
    "conference-journal": "Conference/Journal",
    "name-of-approach": "Name of Approach",
    "main-method": "Main Method",
    domain: "Domain",
    tasks: "Tasks",
    steps: "Steps",
    "user-revision": "User Revision",
    validation: "Validation",
    "code-availability": "Code Availability",
    license: "License",
    inputs: "Inputs",
    "output-format": "Output Format",
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <ListFilter className="h-4 w-4 mr-2" /> Show columns
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" side="right" align="start">
        <DropdownMenuLabel>Show columns</DropdownMenuLabel>

        <DropdownMenuCheckboxItem
          checked={showAll}
          onCheckedChange={setShowAll}
        >
          Show all columns
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        {columns.map((column) => {
          if (!column.getCanHide()) return;

          const checked =
            column.columns.length > 0
              ? column.columns.every(
                  (subColumn) => columnVisibility[subColumn.id] ?? true
                )
              : columnVisibility[column.id] ?? true;

          const setChecked = () => {
            if (column.columns.length > 0) {
              column.columns.forEach((subColumn) => {
                setColumnVisibility((cols) => ({
                  ...cols,
                  [subColumn.id]: !checked,
                }));
              });
            } else {
              setColumnVisibility((cols) => ({
                ...cols,
                [column.id]: !checked,
              }));
            }
          };

          return (
            <DropdownMenuCheckboxItem
              key={column.id}
              checked={checked}
              onCheckedChange={setChecked}
            >
              {labels[column.id]}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
