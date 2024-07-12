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

type Props = {
  data: IColumns[]
}

export const Table = (props: Props) => {
  const { data } = props

  const columns = React.useMemo<ColumnDef<IColumns>[]>(() => col, [])

  const [columnVisibility, setColumnVisibility] = React.useState({})

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
  })

  return (
    <div className='mt-5 overflow-x-auto'>
      <pre>{JSON.stringify(table.getState().columnVisibility, null, 2)}</pre>
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

      <table className='rounded-lg overflow-hidden text-xs'>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className='bg-tableTop text-tableText'>
              {headerGroup.headers.map(header => {
                return (
                  <th key={header.id} colSpan={header.colSpan} className='py-1'>
                    {header.isPlaceholder ? null : (
                      <div
                        className={cn([
                          header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : '',
                            header.column.columnDef.meta?.width,
                          'flex items-center justify-start text-left px-4',
                          header.column.columnDef.meta?.class,
                        ])}

                        onClick={header.column.getToggleSortingHandler()}
                        title={
                          header.column.getCanSort()
                            ? header.column.getNextSortingOrder() === 'asc'
                              ? 'Sort ascending'
                              : header.column.getNextSortingOrder() === 'desc'
                                ? 'Sort descending'
                                : 'Clear sort'
                            : undefined
                        }
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
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
                          'px-4 py-2',
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
  )
};