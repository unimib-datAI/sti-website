import React from 'react'
import { columns as col } from './columns';

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type SortingFn,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table'
import type { IColumns } from './types';
import { cn } from '@/lib/utils';
import { ArrowDownWideNarrow, ArrowUpNarrowWide } from 'lucide-react';

type Props = {
  data: IColumns[]
}

export const Table = (props: Props) => {
  const { data } = props

  const columns = React.useMemo<ColumnDef<IColumns>[]>(() => col, [])

  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [sorting, setSorting] = React.useState<SortingState>([
    {
      id: 'year',
      desc: true,
    }
  ]);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnVisibility,
      sorting
    },
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    enableSortingRemoval: false,
  })

  /**
   * TODO: Implement sorting by year
   * TODO: Implement filtering by conf, method, domain, tasks, user revision and licence
   * TODO: Implement hiding columns
   * TODO: Implement fullscreen mode
   */

  return (
    <>
    <div className="flex border border-black shadow rounded">
        <div className="px-1 border-b border-black">
          <label>
            <input
                type='checkbox'
                checked={table.getIsAllColumnsVisible()}
                onChange={table.getToggleAllColumnsVisibilityHandler()}
            />
            Toggle All
          </label>
        </div>
        {table.getAllLeafColumns().map(column => {
          if (!column.getCanHide()) return;

          return (
            <div key={column.id} className="px-1">
              <label>
                <input
                    type='checkbox'
                    checked={column.getIsVisible()}
                    onChange={column.getToggleVisibilityHandler()}
                />
                {column.id}
              </label>
            </div>
          )
        })}
      </div>
    <div className='mt-5 overflow-x-auto rounded-lg border border-slate-600'>
      <table className='text-xs'>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className={cn('bg-tableTop text-tableText')}>
              {headerGroup.headers.map(header => {
                return (
                  <th key={header.id} colSpan={header.colSpan} className='py-1 border-r border-slate-600 last:border-r-0'>
                    {header.isPlaceholder ? null : (
                      <div
                        onClick={header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined}
                        title={
                          header.column.getCanSort()
                            ? header.column.getNextSortingOrder() === 'asc'
                              ? 'Sort ascending'
                              : header.column.getNextSortingOrder() === 'desc'
                                ? 'Sort descending'
                                : 'Clear sort'
                            : undefined
                        }
                        className={cn(
                          header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : '',
                            header.column.columnDef.meta?.width,
                          'flex items-center justify-start text-left px-4',
                          header.column.columnDef.meta?.class,
                        )}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: <ArrowUpNarrowWide className='h-4 w-4 ml-2' />,
                          desc: <ArrowDownWideNarrow className='h-4 w-4 ml-2' />,
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table
            .getRowModel()
            .rows.slice(0, 10)
            .map((row, index) => {
              return (
                <tr key={row.id} className={index % 2 ? 'bg-tableAlt' : 'tableBottom' }>
                  {row.getVisibleCells().map(cell => {
                    return (
                      <td key={cell.id} className={
                        cn([
                          cell.column.columnDef.meta?.width,
                          'px-4 py-2 border-r border-slate-600 last:border-r-0',
                          cell.column.columnDef.meta?.class,
                        ])

                      }>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
    </>
  )
};